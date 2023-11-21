import updateSkill from "./skill.js";

export  default  class renderEffProfile extends  updateSkill {
    constructor() {
        super();
        this.timeRefresh_effect = 0;
    }

    update_text_thong_bao = (delta) => {
        let chat_thong_bao = this.button.getChildByName("chat_thong_bao");
        if(!chat_thong_bao) return false;
        if(chat_thong_bao.visible === true) {
            let data = chat_thong_bao.getChildByName("data");
            if(!data) return false;

            let txt = data.getChildByName("text");
            if(!txt)  return false;
            txt.x -= delta * 4;
            if(txt.x <= -txt.width) {
                chat_thong_bao.visible = false;
                this.deleteAllChild(chat_thong_bao,false);
            }
        }
        else {
            if(this.cache_thong_bao.length >=1) {
                let text = this.cache_thong_bao.shift();
                this.chat.all.push([-999,text])
                this.create_chat_thong_bao(text);
            }
        }
    }

    update_text_chat_the_gioi = (delta) => {
        let chat_the_gioi = this.button.getChildByName("chat_the_gioi");
        if(!chat_the_gioi) return false;
        if(chat_the_gioi.visible === true) {
            let data = chat_the_gioi.getChildByName("data");
            if(!data) return false;
            let background_text = data.getChildByName("backgorund_text");
            if(!background_text) return false;
            let txt = background_text.getChildByName("txt");
            if(!txt) return  false;
            txt.x -= delta * 1.1;
            if(Math.round(txt.x) <= -Math.round(txt.width)) {
                this.deleteEvent('chatthegioi');
                this.deleteAllChild(chat_the_gioi,false);
                chat_the_gioi.visible = false;
            }
        }
        else {
            if(this.cache_chat_the_gioi.length >=1) {
                let text = this.cache_chat_the_gioi.shift();
                this.create_chat_the_gioi(text[0],text[1],text[2]);
            }
        }
    }

    updateProfileEffect = (delta) => {
        let my = this.my;
        if(!my) return false;
        this.update_text_chat_the_gioi(delta);
        this.update_text_thong_bao(delta);
        this.timeRefresh_effect += delta;
        if(this.timeRefresh_effect <=10) return false;
        this.timeRefresh_effect = 0;
        let container = this.button.getChildByName("hieuung");
        if(!container) return false;
        this.deleteAllChild(container,false);
        let widthScreen = this.gameWidth * 0.5;
        let heightScreen = this.gameHeight * 0.5;

        let square_width = widthScreen * 0.3;
        let square_height = heightScreen * 0.3;
        square_height = square_height > 45 ? 45  : square_height;
        square_width = square_width > 40 ? 40 : square_width;

        /*
        * @int04
        * @format_data: [id,i,level,time]
        *  */
        let eff = my.eff;
        let spaceX = 5;
        let have = [];
        let i = -1;
        if(!eff) return false;
        eff.forEach((e) => {
            let idskill = e[0];
            let data_skill = this.skill.find(e => e. id === idskill);
            if(data_skill) {
                if(!have.find(q => q === data_skill.id)) {
                    i++;
                    have.push(data_skill.id);
                    let square = new PIXI.Graphics();
                    square.beginFill(0x000000,0.000001);
                    square.drawRect(0, 0, square_width, square_height);
                    square.endFill();
                    square.x = (square_width + spaceX) * i;
                    square.y = 0;
                    container.addChild(square);
                    let width = square.width;
                    let height = square.height*0.8;

                    let avatar = new PIXI.Sprite(this.coverImg(data_skill.avatar));
                    avatar.width = width;
                    avatar.height = height;
                    square.addChild(avatar);

                    let txt = new PIXI.Text(this.coverTime(e[3]), {
                        fontFamily: 'Arial',
                        fontSize: 12,
                        fill: 0xFFFFFF,
                        align: 'center',
                        fontWeight: 'bold',
                    });
                    txt.anchor.set(0.5);
                    txt.x = width/2
                    txt.y = height + 5;
                    square.addChild(txt);

                }
            }
        });




    }
}