import createViewButton_Left from "./buttom_left.js";
import listBox from "../../sms/views/listBox.js";
import lightSms from "../../sms/views/lightSms.js";

export default  class createInfoView extends  createViewButton_Left {
    constructor() {
        super();
    }

    renderInfoPlayer = (width,height) => {
        let my = this.my;
        let w_play = width;
        let h_play = height;


        let background_test = new PIXI.Graphics();
        background_test.beginFill(0x000000,0.0);
        background_test.drawRect(0, 0, width, height);
        background_test.endFill();
        background_test.x = 0;
        background_test.y = 0;
        this.button.addChild(background_test);

        w_play = w_play >250 ? 250 : w_play;
        h_play = h_play > 100 ? 100 : h_play;

        let background_play = new PIXI.Graphics();
        background_play.beginFill(0x000000,0.000005);
        background_play.drawRect(0, 0, w_play, h_play);
        background_play.endFill();
        this.button.addChild(background_play);
        background_play.x = 5;
        background_play.y = 5;
        background_play.name = "khung_nhan_vat_chinh";
        background_play.interactive = true;
        background_play.cursor = "pointer";

        let time_click_player = 0;
        background_play.on("pointerdown", () => {
            time_click_player = new Date().getTime();
        });
        background_play.on("pointerup", () => {
            if(new Date().getTime() - time_click_player < 200) {
                this.hanhTrang();
            }
        });



        let w_play_main = background_play.width * 0.8;
        let h_play_main = background_play.height * 0.6;
        let background_play_main = new PIXI.Graphics();
        background_play_main.beginFill(0xf7e6c6,1.0); // 0xf7e6c6
        background_play_main.drawRect(0, 0, w_play_main, h_play_main);
        background_play_main.endFill();

        background_play_main.name = "main";


        let w_empty = (background_play.width - w_play_main)/2;
        let h_empty = (background_play.height - h_play_main)/2;

        let farme_x = Math.ceil(w_play_main / w_empty);

        for(let i = 0; i < farme_x; i++) {
            let main_top_center = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_bga9"));
            main_top_center.width = w_empty;
            main_top_center.height = h_empty;
            main_top_center.x = w_empty * i;
            main_top_center.y = 0 - h_empty;
            if(main_top_center.x + w_empty >=w_play_main) {
                main_top_center.width = w_play_main - main_top_center.x;
            }
            background_play_main.addChild(main_top_center);

            let main_bottom_center = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_bga15"));
            main_bottom_center.width = w_empty;
            main_bottom_center.height = h_empty;
            main_bottom_center.x = w_empty * i;
            main_bottom_center.y =0 + h_play_main;
            if(main_bottom_center.x + w_empty >= w_play_main) {
                main_bottom_center.width =w_play_main - main_bottom_center.x;
            }
            background_play_main.addChild(main_bottom_center);

        }


        let farme_y = Math.ceil(h_play_main / h_empty);
        for(let i = 0; i < farme_y; i++) {
            let main_top_center = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_bga11"));
            main_top_center.width = w_empty;
            main_top_center.height = h_empty;
            main_top_center.x = 0 - w_empty;
            main_top_center.y = h_empty * i;
            if(main_top_center.y + h_empty >=h_play_main) {
                main_top_center.height = h_play_main - main_top_center.y;
            }
            background_play_main.addChild(main_top_center);

            let main_bottom_center = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_bga13"));
            main_bottom_center.width = w_empty;
            main_bottom_center.height = h_empty;
            main_bottom_center.x = 0 + w_play_main;
            main_bottom_center.y = h_empty * i;
            if(main_bottom_center.y + h_empty >= h_play_main) {
                main_bottom_center.height = h_play_main - main_bottom_center.y;
            }
            background_play_main.addChild(main_bottom_center);

        }

        let main_top_left = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_bga8"));
        main_top_left.width = w_empty;
        main_top_left.height = h_empty;
        main_top_left.x = 0 - w_empty;
        main_top_left.y = 0 - h_empty;
        background_play_main.addChild(main_top_left);

        let main_top_right = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_bga10"));
        main_top_right.width = w_empty;
        main_top_right.height = h_empty;
        main_top_right.x = w_play_main;
        main_top_right.y = 0 - h_empty;
        background_play_main.addChild(main_top_right);

        let main_bottom_left = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_bga12"));
        main_bottom_left.width = w_empty;
        main_bottom_left.height = h_empty;
        main_bottom_left.x = 0 - w_empty;
        main_bottom_left.y = h_play_main;
        background_play_main.addChild(main_bottom_left);

        let main_bottom_right = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_bga14"));
        main_bottom_right.width = w_empty;
        main_bottom_right.height = h_empty;
        main_bottom_right.x = w_play_main;
        main_bottom_right.y = h_play_main;
        background_play_main.addChild(main_bottom_right);





        let borderHP_w = w_play_main * 1;
        let borderHP_h = h_play_main * 0.7;

        let borderHP = new PIXI.Graphics();
        borderHP.name = "borderHP";
        borderHP.beginFill(0x000000,0.000000000000000000005);
        borderHP.drawRect(0, 0, borderHP_w, borderHP_h);
        borderHP.endFill();
        borderHP.x =0;
        borderHP.y = 0;
        background_play_main.addChild(borderHP);


        let _width =  borderHP.width * 1;
        let _height = borderHP.height * 0.4;
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000,0.000000000005);
        graphics.drawRect(0, 0, _width, _height);
        graphics.name = "hpinfo";
        graphics.endFill();
        graphics.x =0;
        graphics.y = 0;
        borderHP.addChild(graphics);

        let _width_avatar = graphics.width * 0.2;
        _width_avatar = _width_avatar > 20 ? 20 : _width_avatar;
        let _height_avatar = graphics.height * 1;

        let icon_hp = this.cropImg("x2Main_Image_interface_iconmphp",0,0*1,20,21);
        let icon_hp_avatar = new PIXI.Sprite(icon_hp);
        icon_hp_avatar.width = _width_avatar;
        icon_hp_avatar.height = _height_avatar;
        icon_hp_avatar.x = 0;
        icon_hp_avatar.y = 0;
        graphics.addChild(icon_hp_avatar);

        let _width_hp = graphics.width  - _width_avatar;
        let _height_hp = graphics.height * 1;

        let hp = my.info.chiso.hp;
        let hpmax = my.info.chiso.hpmax;
        let hp_percent = hp / hpmax * 100;
        let hpfull = new PIXI.Graphics();
        hpfull.beginFill(0x993300,1);
        hpfull.drawRect(0, 0, _width_hp, _height_hp);
        hpfull.endFill();
        hpfull.x = _width_avatar;
        hpfull.y = 0;
        hpfull.name = "background_hp";
        graphics.addChild(hpfull);

        let hp_percent_w = _width_hp * hp_percent / 100;
        let hp_percent_h = _height_hp * 1;
        let hp_percent_full = new PIXI.Graphics();
        hp_percent_full.beginFill(0xFF0000,1);
        hp_percent_full.drawRect(0, 0, hp_percent_w, hp_percent_h);
        hp_percent_full.endFill();
        hp_percent_full.x = 0;
        hp_percent_full.y = 0;
        hp_percent_full.name = "hpget";
        hpfull.addChild(hp_percent_full);

        let txt = new PIXI.Text(hp + "/" + hpmax, {fontFamily : 'Arial', fontSize: 12, fill : 0xffffff, align : 'center'});
        txt.name = "txt";
        txt.x =  (hpfull.width - txt.width) / 2;
        txt.y = (hpfull.height - txt.height) / 2;
        hpfull.addChild(txt);


        let _width_mp =  _width;
        let _height_mp = borderHP.height * 0.4;

        let graphics_mp = new PIXI.Graphics();
        graphics_mp.name = "mpinfo";
        graphics_mp.beginFill(0x000000,0.0000001);
        graphics_mp.drawRect(0, 0, _width_mp, _height_mp);
        graphics_mp.endFill();
        graphics_mp.x =0;
        graphics_mp.y = _height +  borderHP.height * 0.1;
        borderHP.addChild(graphics_mp);

        let _width_avatar_mp = graphics_mp.width * 0.2;
        _width_avatar_mp = _width_avatar_mp > 20 ? 20 : _width_avatar_mp;
        let _height_avatar_mp = graphics_mp.height * 1;

        let icon_mp = this.cropImg("x2Main_Image_interface_iconmphp",0,1*21,20,21);
        let icon_mp_avatar = new PIXI.Sprite(icon_mp);
        icon_mp_avatar.width = _width_avatar_mp;
        icon_mp_avatar.height = _height_avatar_mp;
        icon_mp_avatar.x = 0;
        icon_mp_avatar.y = 0;
        graphics_mp.addChild(icon_mp_avatar);


        let mp = my.info.chiso.mp;
        let mpmax = my.info.chiso.mpmax;
        let mp_percent = mp / mpmax * 100;
        let mpfull = new PIXI.Graphics();
        mpfull.beginFill(0x333333,1);
        mpfull.drawRect(0, 0, _width_mp - icon_mp_avatar.width, _height_mp);
        mpfull.endFill();
        mpfull.x = _width_avatar_mp;
        mpfull.name = "background_mp";
        mpfull.y = 0;
        graphics_mp.addChild(mpfull);

        let mp_percent_w = _width_mp * mp_percent / 100;
        let mp_percent_h = _height_mp * 1;
        let mp_percent_full = new PIXI.Graphics();
        mp_percent_full.beginFill(0x0000FF,1);
        mp_percent_full.drawRect(0, 0, mp_percent_w, mp_percent_h);
        mp_percent_full.endFill();
        mp_percent_full.x = 0;
        mp_percent_full.name = "mpget";
        mp_percent_full.y = 0;
        mpfull.addChild(mp_percent_full);

        let txt_mp = new PIXI.Text(mp + "/" + mpmax, {fontFamily : 'Arial', fontSize: 12, fill : 0xffffff, align : 'center'});
        txt_mp.x =  (mpfull.width - txt_mp.width) / 2;
        txt_mp.y = (mpfull.height - txt_mp.height) / 2;
        txt_mp.name = "txt";
        mpfull.addChild(txt_mp);










        let BorderLevel = new PIXI.Graphics();
        BorderLevel.beginFill(0xFFFFFF,0.000001);
        BorderLevel.drawRect(0, 0, borderHP_w, h_play_main - borderHP_h);
        BorderLevel.endFill();
        BorderLevel.x =0;
        BorderLevel.y = borderHP_h;
        background_play_main.addChild(BorderLevel);
        BorderLevel.name = "BorderLevel";

        let w_avatar_level = BorderLevel.width * 0.2;
        let h_avatar_level = BorderLevel.height * 1;
        w_avatar_level = w_avatar_level > 20 ? 20 : w_avatar_level;

        let icon_avatar = this.cropImg("x2Main_Image_interface_iconmphp",0,2*21,20,21);
        let icon_avatar_level = new PIXI.Sprite(icon_avatar);
        icon_avatar_level.width = w_avatar_level;
        icon_avatar_level.height = h_avatar_level;
        icon_avatar_level.x = 0;
        icon_avatar_level.y = 0;
        BorderLevel.addChild(icon_avatar_level);

        let txtlevel = new PIXI.Text(my.info.coban.level, {fontFamily : 'Arial', fontSize: icon_avatar_level.height*0.7, fill : 0x000000, align : 'center', fontWeight: 'bold' });
        txtlevel.x =  icon_avatar_level.width +3;
        txtlevel.y = (BorderLevel.height - txtlevel.height) / 2;
        txtlevel.name = "txtlevel";
        BorderLevel.addChild(txtlevel);



        background_play_main.x = (background_play.width - w_play_main) / 2;
        background_play_main.y = (background_play.height - h_play_main) / 2;
        background_play.addChild(background_play_main);


        let button_icon_w = width * 0.3;
        button_icon_w = button_icon_w > 32 ? 32 : button_icon_w;
        // tạo các nút chức năng
        let button_chat = this.animation("x2Main_Image_interface_mess",44,64,2);
        button_chat.name = "sms";
        button_chat.div = "icon_SMS";
        button_chat.width = button_icon_w;
        this.button.addChild(button_chat);
        button_chat.animationSpeed = 0.2;
        button_chat.x = background_play.width - button_chat.width*2;
        button_chat.y = background_play.y + background_play.height;
        button_chat.interactive = true;
        button_chat.cursor = 'pointer';
        let time_chat = 0;
        button_chat.on('pointerdown', () => {
            time_chat = Date.now();
            button_chat.gotoAndStop(1);
        });
        button_chat.on('pointerup', () => {
            if(Date.now() - time_chat < 200){
                // open tin nhan
                listBox(this);
            }
            button_chat.gotoAndStop(0);
            lightSms(this)
        });

        let button_bang = this.animation("x2Main_Image_point_other_5",50,100,2);
        button_bang.name = "sms_bang";
        button_bang.width = button_icon_w;
        button_bang.height = button_icon_w;
        this.button.addChild(button_bang);
        button_bang.animationSpeed = 0.2;
        button_bang.x = button_chat.x + button_chat.width;
        button_bang.y = button_chat.y;
        button_bang.interactive = true;
        let time_chat_bang = 0;
        button_bang.on('pointerdown', () => {
            time_chat_bang = Date.now();
            button_bang.gotoAndStop(1);
        }
        );
        button_bang.on('pointerup', () => {
            if(Date.now() - time_chat_bang < 200){
                // open bang
            }
            button_bang.gotoAndStop(0);
        });

        // create thêm các hiệu ứng cho kĩ năng

        let container_eff = new PIXI.Container();
        container_eff.name = "hieuung";
        container_eff.x = background_play.x;
        container_eff.y = button_bang.y + button_bang.height;
        this.button.addChild(container_eff);


    }
}