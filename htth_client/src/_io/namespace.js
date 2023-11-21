import mapView from "../view/map/map.js";
import login_ws from "../view/login/login_ws.js";
import map_ws from "../view/map/map_ws.js";
import ruong_ws from "../view/box/ruong_ws.js";
import shop_ws from "../view/shop/shop_ws.js";
import nangcap_ws from "../view/cuonghoa/nangcap/nangcap_ws.js";
import ghep_ws from "../view/cuonghoa/ghep/ghep_ws.js";
import duc_ws from "../view/cuonghoa/duclo/duc_ws.js";
import khamda_ws from "../view/cuonghoa/khamda/khamda_ws.js";
import renderSMS from "../view/sms/views/renderSMS.js";
import websocket_SMS from "../view/sms/views/websocket_SMS.js";
export default class io_namespace extends mapView {
    constructor() {
        super();
        this.cache.ghep = [];
        this.isConnect = false;
        this.isConnectFail = 0;
    }

    getInfoClientDevice = () => {
        return {
            "name_device": window.navigator.userAgent,
            "version": window.navigator.appVersion,
            "platform": window.navigator.platform,
            "language": window.navigator.language,
            "cookie": window.navigator.cookieEnabled,
            "online": window.navigator.onLine,
            "screen": {
                "width": window.screen.width,
                "height": window.screen.height,
                "colorDepth": window.screen.colorDepth
            },

            "location": {
                "href": window.location.href,
                "host": window.location.host,
                "hostname": window.location.hostname,
                "port": window.location.port,
                "pathname": window.location.pathname,
                "protocol": window.location.protocol,
                "search": window.location.search
            },
            "connection": navigator.connection,

        }
    }


    createObjectIO = () => {

        this.ws.on('connect', (data) => {
            console.log('connect to server:'+this.ws.io.uri);
            this.isConnect = true;
            this.isConnectFail = 0;
            let deviceInfo = this.getInfoClientDevice();
            this.send('~int04',[
                1,2,3,4,5,6,7,8,9,0
            ])
        });

        this.ws.on('disconnect', (data) => {
            console.log('Disconect to server')
            this.isConnect = false;
            this.isConnectFail = 0;
            this.notice(this._('Mất kết nối tới máy chủ, vui lòng đăng nhập lại.'));
            this.loginPage();
            this.deleteSprite(this.my.id);
        });

        this.ws.on('_', (data) => {
            this.item = data[0];
            this.expskill = data[1];
            this.skill = data[2];
            this.explevel = data[3];
            this.listMap = data[4];
            this.cache.idShop = data[5];
            this.cache.costShop = data[6];
            this.config = data[7];
            this.cache.ghep = data[8];

            let clientVersion = this.gameInfo.version;
            let serverVersion = this.config.version.now;
            let  minVersion = this.config.version.min;
            let home = this.config.version.home;
            console.log('clientVersion',clientVersion);
            console.log('serverVersion',serverVersion);
            console.log('minVersion',minVersion);
            if(minVersion > clientVersion) {
                this.notice(this._("You can't play game because you're using the low version (v."+clientVersion+"), download the new version v.("+serverVersion+") at : "+home+""),false);
                return false;
            }
        });



        this.ws.on(-12, () => {
            this.deleteNotice();
        });

        login_ws(this);
        map_ws(this);
        ruong_ws(this);
        shop_ws(this);
        nangcap_ws(this);
        ghep_ws(this);
        duc_ws(this);
        khamda_ws(this);
        websocket_SMS(this);



        this.ws.on(-14, () => {
            this.deleteNotice();
        });

        this.ws.on(-15, (data) => {
            let my = this.my;
            if(my.id <=0) return false;
            let skill = my.skill.find(e => e[0] == data[0]);
            if(skill) {
                skill[2] = Date.now() + data[1];
                skill[4] = Date.now();
            }
            my.info.chiso.mp = data[2];
        });

        this.ws.on(-16, (data) => {
            let keycode = data[0];
            let level = data[1];
            let script = data[2];
            let from = data[3];
            let to = data[4];

            let check1 = this.getSprite(from);
            let check2 = this.getSprite(to);
            if(check2 && check1) {
                let get1 = this.getMy(from);
                if(check1.x < check2.x) {
                    get1.action.move = 'right';
                }
                else
                {
                    get1.action.move = 'left';
                }

                let get2 = this.getMy(to);
                if(get1.action.move === 'right') {
                    if(get2.action.action === 'dungyen') {
                        get2.action.move = 'left';
                    }
                }
                else
                {
                    if(get2.action.action === 'dungyen') {
                        get2.action.move = 'right';
                    }
                }
            }
            this.setSkill({
                from : from,
                to : to,
                type : script,
                keycode : keycode,
                value : 0,
            });
        });

        this.ws.on(-17, (data) => {
            let name = data[0];
            let id = data[1];
            let value = data[2];
            let type = data[3];
            let hpcon = data[4];
            let getMy = this.getMy(id);
            if(getMy) {
                if(hpcon != 'empty')
                    getMy.info.chiso.hp = hpcon;
            }
            else
            {
                this.getObjectMap();
            }
            this.setSkill({
                from : id,
                type : 'hp',
                value : value ,
                st : type,
            })
        });

        this.ws.on(-18, (data) => {
            let id = data[0];
            let who = data[1];
            let value = data[2];
            let newinfo = data[3];
            let quanlity = data[4];
            let idItem = data[5];

            let getMy = this.getMy(id);
            if(getMy) {

                let array = ['','hp','mp'];
                getMy.info.chiso[array[who]] = newinfo;
                let myItem = getMy.ruong.data.find(e => e.id == idItem);
                if(myItem) {
                    myItem.soluong = quanlity;
                    if(myItem.soluong <=0) {
                        getMy.ruong.data = getMy.ruong.data.filter(e => e.id != idItem);
                    }
                }
                if(value !=0) {
                    this.setSkill({
                        from : id,
                        who : who,
                        type : 'conghp',
                        value : value,
                    })
                }
                if(getMy.id == this.my.id) {
                    this.deleteNotice();
                    if(this.box.children.length >=1) {
                        this.hanhTrang();
                    }
                }
            }
        });

        this.ws.on(-19, () => {
            this.notice(this._('Bạn không thể sử dụng vật phẩm khi đang bị thương'));
        });

        this.ws.on(-20, () => {
            this.notice(this._('Đã hết vật phẩm'));
        });
        this.ws.on(-21, () => {
            this.notice(this._('Có lỗi xẩy ra, vui lòng thử lại sau. #-21'));
        });

        this.ws.on(-22, (data) => {
            let id = data[0];
            let exp_cong = data[1];
            let exp_info = data[2];
            let skill_id = data[3];
            let new_exp = data[4];
            let getMy = this.getMy(id);
            if(getMy) {
                if(skill_id) {
                    let skill = getMy.skill.find(e => e[0] == skill_id);
                    if(skill) {
                        skill[3] = new_exp;
                    }
                }
                getMy.info.coban.exp = exp_info;
                if(exp_cong !=0) {
                    this.setSkill({
                        from : id,
                        type : 'congexp',
                        value : exp_cong,
                    })
                }
            }
        });

        this.ws.on(-23, (data) => {
            let id = data[0];
            let coban = data[1];
            let getMy = this.getMy(id);
            if(getMy) {
                getMy.info.coban = coban;
            }
        });

        this.ws.on(-24, (data) => {
            let skill = data[0];
            this.my.skill = skill;
        });


        this.ws.on(-25, (data) => {
            let idmob = data[0];
            let hp = data[1];
            let getMy = this.getMy(idmob);
            if(getMy) {
                getMy.info.chiso.hp = hp;

            }
            else
            {
                this.getObjectMap();
            }
        });

        this.ws.on(-26, (data) => {
            let id = data[0];
            let getMy = this.getMy(id);
            if(getMy) {
                getMy.info.chiso.hp = 0;
            }
            else
            {
                this.getObjectMap();
            }
        });

        this.ws.on(-27, (data) => {
            let id = data[0];
            let hp = data[1];
            let getMy = this.getMy(id);
            if(getMy) {
                getMy.info.chiso.hp = hp;
            }
        });

        this.ws.on(-28, (data) => {
            let id = data[0];
            let eff = data[1];
            let chiso = data[2];
            let getMy = this.getMy(id);
            if(getMy) {
                getMy.eff = eff;
                if(chiso) {
                    getMy.info.chiso = chiso;
                }
            }
            else
            {
                this.getObjectMap();
            }

        });

        this.ws.on(-29, (data) => {
            let uid = data[0];
            let msg = data[1];
            this.ioInsertChat({
                _1 : uid,
                _2 : msg,
            });
            let getMy = this.getMy(uid);
            if(getMy) {
                let name = getMy.name;
                let text = ''+name+':'+msg;
                this.chat.all.push([
                    -995,
                    text
                ])
                let who = this.getDiv('body_SMS_-999');
                if(who) {
                    renderSMS(this,text);
                }

            }
        });

        this.ws.on(-30, (data) => {
            let my = this.my;
            my.tien.beri = data[0];
            my.tien.ruby = data[1];
        });

        this.ws.on(-31, (data) => {
           let skin = data[0];
           let name = data[1];
           let noidung = data[2];
           this.cache_chat_the_gioi.push([skin,name,noidung]);
        });


        this.ws.on(-32, (data) => {
            this.isGoToZone = false;
        });


        this.ws.on('BOSS_SPAWN',data => {
            let name_map = data[0];
            let zone = data[1];
            let name_boss = data[2];
            this.cache_thong_bao.push(name_boss + " đã xuất hiện tại " + name_map + " -  khu " + zone)
        })




        /*
        this.ws.on(-, (data) => {
            this.chipi(this._(''));
        });

-81
         */



    }

    getObjectMap = () => {
        this.send(-4);
    }


    
}