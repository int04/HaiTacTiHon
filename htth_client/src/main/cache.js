import socketIoMsgpackParser from '../../lib/encode.js'

export default class cacheInt04 {
    constructor() {
        this.cache = {};
        this.pcSettimeEntactive = null;
        this.pcKey = '';
        this.click = "int04";
        this.images = [];
        this.cache_player = [];
        this.cache_skill = [];
        this.cache_action = [];
        this.cache_chat = [];
        this.item = [];
        this.skill = [];
        this.objectMy();
        this.tab = {};
        this.expskill = [];
        this.explevel = [];
        this.pcSettimeEntactiveY = null;
        this.auto = false;
        this.cache_thong_bao = ["trò chơi dành cho người trên 18 tuổi, chơi quá 180 phút sẽ có hại cho sức khỏe."];
        this.cache_chat_the_gioi = [];
        this.danh = false;
        this.cache_event = [];

        this.pointer = null;
        this.listPointer = [];

        this.listMap = [];
        this.isGoToZone = false;

        this.config = {
            map : 0, // 0 is normal, 1 is sea
        };

    }


    deletePointer = (name) => {
        let check = this.listPointer.find(e => e[0] === name);
        if(check) {
            this.listPointer.splice(this.listPointer.indexOf(check), 1);
        }
    }

    getPointer = (name) => {
        let check = this.listPointer.find(e => e[0] === name);
        if(check) {
            return check[1];
        }
        return false;
    }

    addPointer = (name,data) => {
        let check = this.listPointer.find(e => e[0] === name);
        if(!check) {
            this.listPointer.push([name,data]);
        }
        this.pointer = name;
    }

    deleteEvent = (name) => {
        let index = this.cache_event.find(e=> e[0] === name);
        if(index) {
            let id_interval = index[1];
            clearInterval(id_interval);
            this.cache_event.splice(this.cache_event.indexOf(index), 1);
        }
    }

    objectMy = () => {
        this.my = {
            id: 0,
            username : 'admin',
            name : 'int04',
            skin : {
                dau : "iLvVMIbTpy",
                ao : "kFFosytneB",
                quan : "QSHGPlNDTK",
                toc : "axDwxOtydX",
                non : "axDwxOtydX",
                lung : "axDwxOtydX",
                tay : "axDwxOtydX",
            },
            pos : {
                map : 0,
                zone : 0,
                x : 30,
                y : 200,
            },
            action : {
                'move' : 'left',
                action : 'dungyen',
            },
            info : {
                chiso: {},
                coban : {
                    speed : 5,
                }
            },
            type : 'player'

        };
    }

    randomAZ(length) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

    getSprite = (id) => {
        let myid = this.getMy(id);
        if(!myid) return false;
        let player = this.player.getChildByName(myid.id);
        if(player) {
            return player;
        }
        return false;
    }

    getSpriteItem = (id) => {
        let player = this.playerItem.getChildByName(id);
        if(player) {
            return player;
        }
        return false;
    }

    deleteObject = (id) => {
        let cache = this.cache_player.find(e => e.id == id);
        if(cache) {
            this.cache_player.splice(this.cache_player.indexOf(cache), 1);
            this.deleteSprite(id);
        } 
    }

    deleteSprite = (id) => {
        
        let player = this.player.getChildByName(id);
        if(player) {
            this.player.removeChild(player);
            console.log('Xóa')
        }

        let playerItem = this.playerItem.getChildByName(id);
        if(playerItem) {
            this.playerItem.removeChild(playerItem);
        }
    }


    getMy = (id) => {
        if(id == this.my.id) {
            return this.my;
        }
        let object = this.cache_player.find(e => e.id == id);
        if(object) {
            return object;
        }
        return false;
    }

    getImg = name => {
        let re = this.images.find(e => e.name == name);
        if (re) return re['list'];
        else return {
            
        };
    }

    coverImg(name,path = './assets/int04/') {
        if(typeof name == 'number') name = name.toString();
        return PIXI.Texture.from(path + name + '.png');
    }

    

    action = (id, action) => {
        let obb = this.cache_action.find(e => e.id == id);
        if(obb) {
            obb.action = action;
        }
        else 
        {
            this.cache_action.push({
                id : id,
                action : action
            });
        }
        let uid = this.getMy(id);
        if(uid) {
            uid.action.action = action;
        }
    }

    getAction = (id) => {
        let obb = this.cache_action.find(e => e.id == id);
        if(obb) {
            return obb.action;
        }
        return false;
    }

    ConnectToServer = () => {
        this.CallWebsocket();
        this.methodWebsocket();
        this.createObjectIO();
        this.handleData();
    }


    CallWebsocket() {
        this.ws = io(this.gameInfo.server, {
            transports: [ 'websocket'],
            //parser: socketIoMsgpackParser,

        });
    }

    methodWebsocket() {
        this.send = function(name, data) {
            if(data) {
                this.ws.emit(name, data);
            } else this.ws.emit(name);
        }

        this.to = function(name, data) {
            if(data) this.send(name, data);
            else this.send(name);
        }

    }

    lang = (e) => {
        return e;
    }
    _ = (e) => {
        return this.lang(e);
    }


    setCookie = (cname, cvalue, exdays = 30) => {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 *1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie = (cname) => {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while(c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    countAllChild = (children) => {
        let count = 0;
        let time = Date.now();
        if(children.children.length >=1) {
            children.children.forEach(e => {
                count += this.countAllChild(e);
            })
        }

        return count + 1;
    }

    deleteAllChild = (children, parent = true) => {
        if(children.children.length >=1) {
            children.children.forEach(e => {
                this.deleteAllChild(e);
            })
        }
        if(parent)
        {
            children.destroy();
        }
        children.removeChildren();
    }

    deleteChild = (children) => {
        if(children.children.length >=1) {
            children.children.forEach(e => {
                this.deleteAllChild(e);
            })
        }
        children.removeChildren();

    }

    memoryUsed = () => {
        if ('memory' in window.performance) {
            const memoryInfo = window.performance.memory;
            return Math.round(memoryInfo.usedJSHeapSize / (1024 * 1024));
        }
        return 0;
    }




}