import keyPress from "../../input/keypress.js";

export  default  class chat_the_gioi_view extends  keyPress {
    constructor() {
        super();
    }

    create_chat_thong_bao = (msg = "trò chơi dành cho người trên 12 tuổi. Chơi quá 180 phút một ngày sẽ có hại cho sức khỏe.") => {
        let chat_thong_bao = this.button.getChildByName("chat_thong_bao");
        if(chat_thong_bao) {
            let w = this.gameWidth;
            let h = this.gameHeight * 0.3;
            h = h > 30  ? 30 : h;
            let background = new PIXI.Graphics();
            background.beginFill(0x000000,0.7);
            background.drawRect(0, 0, w, h);
            background.endFill();
            background.name = "data";
            chat_thong_bao.addChild(background);
            chat_thong_bao.visible = true;
            chat_thong_bao.x = 0;
            chat_thong_bao.y = this.gameHeight - h;

            let mask = new PIXI.Graphics();
            mask.beginFill(0x000000,0.7);
            mask.drawRect(0, 0, w, h);
            mask.endFill();
            mask.name = "mask";
            chat_thong_bao.addChild(mask);
            chat_thong_bao.mask = mask;

            let text = new PIXI.Text(msg, { fontFamily: 'Arial', fontSize: 16, fill: 0xFFFFFF, align: 'center' });
            text.x = chat_thong_bao.width;
            text.y = background.height/2 - text.height/2;
            text.name = "text";
            background.addChild(text);
        }
    }

    create_chat_the_gioi = (skin = {},name = 'admin',txt = 'Trò chơi dành cho người trên 12 tuổi, chơi quá 180 phút một ngày sẽ có hại cho sức khỏe.') => {
        let x = this.gameWidth * 0.5;
        let y =0;
        let background_info_player = this.button.getChildByName("player_mmo");
        if(background_info_player) {
            let w = background_info_player.width;
            let h = background_info_player.height;
            let width = this.gameWidth* 0.5;
            let height = this.gameHeight * 0.5;
            height -= h;

            let chat_the_gioi = this.button.getChildByName("chat_the_gioi");

            if(chat_the_gioi) {
                chat_the_gioi.visible = true;
                let height_chat_thegioi = height * 1;
                let w2 = width * 1;
                w2 = w2 > 350 ? 350 : w2;
                height_chat_thegioi = height_chat_thegioi > 100 ? 100 : height_chat_thegioi;
                let background_chat_thegioi = new PIXI.Graphics();
                background_chat_thegioi.beginFill(0x000000,0.5);
                background_chat_thegioi.drawRect(0, 0, w2, height_chat_thegioi);
                background_chat_thegioi.endFill();
                background_chat_thegioi.name = "data";

                let w_30 = background_chat_thegioi.width * 0.3;
                let h_30 = background_chat_thegioi.height * 1;
                w_30 = w_30 > 60 ? 60 : w_30;

                let background_avatar = new PIXI.Graphics();
                background_avatar.beginFill(0x000000,0.000000000000005);
                background_avatar.drawRect(0, 0, w_30, h_30);
                background_avatar.endFill();
                background_avatar.x = 0;
                background_avatar.y = background_chat_thegioi.height/2 - background_avatar.height/2;
                background_chat_thegioi.addChild(background_avatar);


                let avatar = this.create_sprite_ctg(skin);
                avatar.scale.x=-1;
                avatar.x = background_avatar.width/2 - avatar.width/2;
                background_avatar.addChild(avatar);

                let text_name = new PIXI.Text(name+":", { fontFamily: 'Arial', fontSize: 14, fill: 0xFFFFFF, align: 'center' });
                text_name.x =  background_avatar.width + 5;
                text_name.y = 0;
                background_chat_thegioi.addChild(text_name);

                let height_con = background_chat_thegioi.height - text_name.height;
                height_con = height_con*0.5;
                let background_text = new PIXI.Graphics();
                background_text.name = "backgorund_text";
                background_text.beginFill(0x000000,0.0000000000005);
                background_text.lineStyle(1, 0xFFFFFF, 1);
                background_text.drawRect(0, 0, background_chat_thegioi.width - background_avatar.width - 5, height_con);
                background_text.endFill();
                background_text.x = background_avatar.width + 5;
                background_text.y = (background_avatar.height- text_name.height)/2 - text_name.height/2;
                background_chat_thegioi.addChild(background_text);

                let mask = new PIXI.Graphics();
                mask.beginFill(0x000000,0.5);
                mask.drawRect(0, 0, background_chat_thegioi.width - background_avatar.width - 5, height_con);
                mask.endFill();
                mask.x = background_avatar.width + 5;
                mask.y = (background_avatar.height- text_name.height)/2 - text_name.height/2;
                background_chat_thegioi.addChild(mask);
                background_text.mask = mask;

                let tinnhan = new PIXI.Text(txt, { fontFamily: 'Arial', fontSize: 14, fill: 0xFFFFFF, align: 'center' });
                tinnhan.x = background_text.width;
                tinnhan.name = "txt";
                tinnhan.y = background_text.height/2 - tinnhan.height/2;
                background_text.addChild(tinnhan);




                chat_the_gioi.x = x + width - w2 - 3;
                chat_the_gioi.y = y + h +5;
                chat_the_gioi.addChild(background_chat_thegioi);
            }
        }
    }
}