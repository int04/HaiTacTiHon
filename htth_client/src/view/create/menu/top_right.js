import chat_the_gioi_view from "./chat.js";

export  default  class topRightViewInfo extends  chat_the_gioi_view {
    constructor() {
        super();
    }
    created_top_right_view_info_player = (width,height) => {

        let x = width;
        let y = 0;
        let background_test = new PIXI.Graphics();
        background_test.beginFill(0x000000,0.0);
        background_test.drawRect(0, 0, width, height);
        background_test.endFill();
        background_test.x = x;
        background_test.y = 0;
        this.button.addChild(background_test);

        let w = width * 0.8;
        let h = height * 0.3;

        w = w > 150 ? 150 : w;
        h = h > 50 ? 50: h;

        let background_info_player = new PIXI.Graphics();
        background_info_player.beginFill(0x000000,0.5);
        background_info_player.drawRect(0, 0, w, h);
        background_info_player.endFill();
        background_info_player.x = x + width - w - 10;
        background_info_player.y = y;
        this.button.addChild(background_info_player);

        background_info_player.name ="player_mmo";

        let name = new PIXI.Text('Name: ', { fontFamily: 'Arial', fontSize: 14, fill: 0x00d829, align: 'center' });
        name.x =background_info_player.width/2 - name.width/2;
        name.y = background_info_player.y + 10;
        background_info_player.addChild(name);
        name.name = "name_player";

        let hp = new PIXI.Text('HP: ', { fontFamily: 'Arial', fontSize: 14, fill: 0xFFFFFF, align: 'center' });
        hp.x =background_info_player.width/2 - hp.width/2;
        hp.y = name.y + name.height;
        background_info_player.addChild(hp);
        hp.name = "hp_player";

        let chat_the_gioi = new PIXI.Container();
        chat_the_gioi.name = "chat_the_gioi";
        chat_the_gioi.visible = false;
        this.button.addChild(chat_the_gioi);

        let chat_thong_bao = new PIXI.Container();
        chat_thong_bao.name = "chat_thong_bao";
        chat_thong_bao.visible = false;
        this.button.addChild(chat_thong_bao);




    }

}