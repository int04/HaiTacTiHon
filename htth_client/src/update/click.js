import updateChat from "./chat.js";

export default class updateClick extends updateChat {
    constructor() {
        super();
        this.dxCheck = {
            player : 300,
            npc : 100,
            mob : 400,
        }
        this.logPlayerClick = [];
    }

    changeClick = () => {
        /* Thay đổi con trỏ chuột bởi người chơi */
        if(this.my.id <=0) return false;
        let mySprite = this.getSprite(this.my.id);
        let myX = mySprite.x;
        let myY = mySprite.y;
        let have = 0;
        let listPlayer = this.player.children.filter(e => e.name != this.my.id);
        for(let i = 0; i < listPlayer.length; i++) {
            let element = listPlayer[i];
            let x = element.x;
            let y = element.y;
            let dx = this.dx(myX, myY,x,y);
            let getMy = this.getMy(element.id);
            if(getMy) {
                if(getMy.type == 'mob' && getMy.info && getMy.info.chiso && getMy.info.chiso.hp <=0) continue;
                let dx_max = this.dxCheck[getMy.type];
                if(dx <= dx_max && !this.logPlayerClick.find(e => e == getMy.id)) {
                    this.click = element.id;
                    have = 1;
                    this.logPlayerClick.push(getMy.id);
                    break;
                }
            }
        }
        if(have == 0) {
            this.logPlayerClick = [];
            if(this.click != null) {
                this.logPlayerClick.push(this.click);
            }
        }
    }

    noClick = (delta) => {
        /* Nếu chưa có mục tiêu chọn, tự động chọn mục tiêu */
        let mySprite = this.getSprite(this.my.id);
        let myX = mySprite.x;
        let myY = mySprite.y;
        
        let listPlayer = this.player.children.filter(e => e.name != this.my.id);
        listPlayer.forEach(element => {
            let x = element.x;
            let y = element.y;
            let dx = this.dx(myX, myY,x,y);
            let getMy = this.getMy(element.id);
            if(getMy) {
                if(getMy.type == 'mob' && getMy.info && getMy.info.chiso && getMy.info.chiso.hp <=0) {

                }
                else 
                {
                    let dx_max = this.dxCheck[getMy.type];
                    if(dx <= dx_max) {
                        this.click = element.id;
                    }
                }
            }
        });
    }

    isClick = (delta) => {
        let player_mmo = this.button.getChildByName("player_mmo");
        if(!player_mmo) return false;
        /* Nếu đã có mục tiêu, xem khoảng cách, nếu vượt quá yêu cầu thì sẽ thoát */
        let mySprite = this.getSprite(this.my.id);
        let myX = mySprite.x;
        let myY = mySprite.y;

        let element = this.getSprite(this.click);
        if(!element) {
            this.click = null;
            player_mmo.visible = false;
            return false;
        }
        let x = element.x;
        let y = element.y;
        let dx = this.dx(myX, myY,x,y);
        let getMy = this.getMy(element.id);
        if(!getMy) {
            player_mmo.visible = false;
            return this.click = null;
        }
        if(getMy.type === 'mob' && getMy.info && getMy.info.chiso && getMy.info.chiso.hp <=0) {
            this.click = null;
            player_mmo.visible = false;
            return false;
        }
        let dx_max = this.dxCheck[getMy.type];
        if(dx > dx_max) {
            this.click = null;
            player_mmo.visible = false;
            return  false;
        }
        player_mmo.visible = true;
        let name = player_mmo.getChildByName("name_player");
        let hp = player_mmo.getChildByName("hp_player");
        if(name) {
            name.text = getMy.name;
            name.x =player_mmo.width/2 -name.width/2;
        }
        if(hp) {
            let int = getMy;
            int.info.chiso = int.info.chiso || {};
            int.info.chiso.hp = int.info.chiso.hp || 27;
            hp.text = int.info.chiso.hp;
            hp.x =player_mmo.width/2 -hp.width/2;
        }
    }

    updateClick = (delta) => {
        if(this.my.id <=0) return false;
        if(this.click != null) this.isClick(delta);
        else this.noClick(delta);

    }
}