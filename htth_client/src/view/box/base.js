import menuView from "../chucnang/menu.js";

export default class baseViewBox extends menuView {
    constructor() {
        super();
    }

    closeBox = () => {
        let box = this.box;
        box.alpha = 1;
        new TWEEN.Tween(box)
            .to({alpha: 0}, 500)
            .start()
            .onComplete(() => {
                box.alpha = 1;
            }
        );
        this.deleteAllChild(this.box,false);
    }

    backgroundTien = () => {
        let container = new PIXI.Container();

        let w = this.gameWidth * 0.3;
        let h = this.gameHeight * 0.2;
        w = w > 100 ? 100 : w;
        h = h > 100 ? 100 : h;
        let background = new PIXI.Graphics();
        background.beginFill(0xa28e78, 1);
        background.lineStyle(2, 0xf9f2d3, 1);
        background.drawRect(0, 0, w, h);
        background.endFill();
        container.addChild(background);

        

        let object = [
            [2000,1,'beri'],
            [2047,4,'ruby']
        ];

        let y = 0;
        let container_tien = new PIXI.Container();
        object.forEach((element,i) => {
            let div = new PIXI.Graphics();
            div.beginFill(0x7b634a, 1.5);
            div.drawRect(0, 0, w, 1);
            div.endFill();
            div.y = y + 5 * i;
            container_tien.addChild(div);
            y+=div.height;

            let icon_width_default= 80;
            let icon_height_default = 80;
            let icon_width_render = w * 0.2;
            let icon_height_render = h * 0.2;
            let icon_farme = element[1];
            let icon_img = element[0];

            let baseImg = new PIXI.Sprite(this.coverImg(icon_img));
            
            let array_animations = [];
            for(let i = 0; i < icon_farme; i++){
                let crop = new PIXI.Rectangle(0, i * icon_height_default , icon_width_default, icon_height_default);
                array_animations.push(new PIXI.Texture(baseImg.texture, crop));
            }

            let icon = new PIXI.AnimatedSprite(array_animations);
            icon.animationSpeed = 0.1;
            icon.width = icon_width_render;
            icon.height = icon_height_render;
            icon.x = 0;
            icon.y = div.y + div.height + 5;
            icon.play();
            container_tien.addChild(icon);

            let tien = this.my.tien[element[2]];
            let text = new PIXI.Text(this.number_format(tien), {
                fontFamily: 'Arial',
                fontSize: 10,
                fill: 0xffffff,
                align: 'center'
            });
            let wcon = background.width - icon.width - 5;
            text.x = icon.x + icon.width + 5;
            text.y = icon.y + icon.height/2 - text.height/2;
            text.name = 'text_'+element[2];
            container_tien.addChild(text);


            y+=icon.height;



            
        });
        background.addChild(container_tien);
        container_tien.x = background.width / 2 - container_tien.width / 2;
        container_tien.y = 0;

        // draw again background if h > container_tien.height
        if(h > container_tien.height){
            background.clear();
            background.beginFill(0xa28e78, 1);
            background.lineStyle(2, 0xf9f2d3, 1);
            background.drawRect(0, 0, w, container_tien.height);
            background.endFill();

        }


        container.x = this.gameWidth - w - this.gameWidth * 0.01;
        container.y =  this.gameHeight * 0.01;

        return container;
    }

    backGroundBox = (timeShowMenu = 500) => {
        this.closeBox();
        this.closeGiaoTiep();
        this.deleteMenu();

        let box = this.box;
        let backgound = new PIXI.Graphics();
        backgound.beginFill(0x000000, 0.0001);
        backgound.drawRect(0, 0, this.gameWidth,this.gameHeight);
        backgound.endFill();
        backgound.interactive = true;
        box.addChild(backgound);

        box.addChild(this.backgroundTien());

        let w = this.gameWidth * 0.9;
        w = w > 500 ? 500 : w;
        let h = this.gameHeight * 0.8;
        h = h > 400 ? 400 : h;

        box.w = w;
        box.h = h;
        let khung = new PIXI.Graphics();
        khung.beginFill(0xf8e4ad, 1);
        khung.lineStyle(2, 0x6a5131, 1);
        khung.drawRoundedRect(0, 0, w, h, 0);
        khung.endFill();
        khung.x = (this.gameWidth - w) / 2;
        khung.y = (this.gameHeight - h) / 2;
        box.addChild(khung);

        let uiRight_width = 20;
        let uiRight_height =40;
        let ui_right_num = Math.ceil(h / uiRight_height);

        for(let i = 0; i < ui_right_num; i++){
            let ui_right = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_tab0.png"));
            ui_right.x =(this.gameWidth - w) / 2 + 3;
            ui_right.y = ((this.gameHeight - h) / 2) +  i * uiRight_height;
            ui_right.height = uiRight_height;
            if(ui_right.y + uiRight_height > (this.gameHeight - h) / 2 + h) ui_right.height = (this.gameHeight - h) / 2 + h - ui_right.y;
            ui_right.scale.x = -0.5;
            box.addChild(ui_right);

            let ui_right2 = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_tab0.png"));
            ui_right2.x =(this.gameWidth - w) / 2 + w - 3;
            ui_right2.y = ((this.gameHeight - h) / 2) +  i * uiRight_height;
            ui_right2.width = uiRight_width;
            ui_right2.height = uiRight_height;
            if(ui_right2.y + uiRight_height > (this.gameHeight - h) / 2 + h) ui_right2.height = (this.gameHeight - h) / 2 + h - ui_right2.y;
            box.addChild(ui_right2);
        }


        let topRight = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_tab1.png"));
        topRight.x = (this.gameWidth - w) / 2 + w ;
        topRight.y = (this.gameHeight - h) / 2 ;
        // rotate -20 degree

        topRight.rotation = -0.45;

        topRight.width = 18;
        topRight.height = 6;
        box.addChild(topRight);
        
        let topLeft = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_tab1.png"));
        topLeft.x = (this.gameWidth - w) / 2 ;
        topLeft.y = (this.gameHeight - h) / 2  - 0;
        topLeft.scale.x = -1;
        // rotate -20 degree
        topLeft.rotation = 0.40;
        topLeft.width = 18;
        topLeft.height = 6;
        box.addChild(topLeft);


        let bottomRight = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_tab1.png"));
        bottomRight.x = (this.gameWidth - w) / 2 + w ;
        bottomRight.y = (this.gameHeight - h) / 2 + h;
        // rotate -20 degree
        bottomRight.rotation = 0.10;
        bottomRight.width = 18;
        bottomRight.height = 6;
        box.addChild(bottomRight);


        let bottomLeft = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_tab1.png"));
        bottomLeft.x = (this.gameWidth - w) / 2 ;
        bottomLeft.y = (this.gameHeight - h) / 2 + h;
        bottomLeft.scale.x = -1;
        // rotate -20 degree
        bottomLeft.rotation = -0.10;
        bottomLeft.width = 18;
        bottomLeft.height = 6;
        box.addChild(bottomLeft);


        box.alpha = 0;
        new TWEEN.Tween(box)
            .to({alpha: 1}, timeShowMenu)
            .start();

        


        return box;
    }

    created_ui_1 = (tab,onclickChoose, showName = '') => {
        let box = this.box;
        let w = box.w;
        let h = box.h;

        let h_max = h * 0.9;

        let _30 = w * 0.2;
        _30 = _30 > 50 ? 50 : _30;

        let background = new PIXI.Graphics();
        background.beginFill(0x000000, 0.0000000001);
        background.drawRect(0, 0, _30, h_max);
        background.endFill();
        background.interactive = true;
        background.x = (this.gameWidth - w) / 2;
        background.y = (this.gameHeight - h) / 2 + h * 0.1;
        box.addChild(background);
        background.alpha = 0;
        new TWEEN.Tween(background)
            .to({alpha: 1}, 500)
            .start();


        let space = 5;
        let TableName = '';
        tab.forEach((element,i) => {
            let img = element[0];
            let onclick = element[1];
            let name = element[2];
            let parma = element[3];
            
            let height = background.height * 0.2;
            height = height > 48 ? 48 : height;
            let sprite = new PIXI.Sprite(this.coverImg(img));
            sprite.x = 0;
            sprite.y = 0 +  i * (height + space);
            sprite.width = height;
            sprite.height = height;
            sprite.interactive = true;
            sprite.cursor = 'help';
            background.addChild(sprite);
            if(onclick == onclickChoose) {
                TableName = name;
                // create circle alpha 0.5
                let circle = new PIXI.Graphics();
                circle.beginFill(0xffaa00, 0.8);
                circle.drawCircle(0, 0, height/2);
                circle.endFill();
                circle.x = sprite.x + height/2;
                circle.y = sprite.y + height/2;
                background.addChild(circle);
            }
            let time = 0;
            sprite.on('pointerdown', () => {
                time = Date.now();
            });
            sprite.on('pointerup', () => {
                if(Date.now() - time < 200) {
                    if(parma && parma !== undefined)
                        this[onclick](parma);
                    else
                        this[onclick]();
                }
            }
            );

        });

        let _70 = w - _30;

        let body = new PIXI.Graphics();
        body.beginFill(0xf8e4ad, 1);
        body.drawRect(0, 0, _70, h_max);
        body.endFill();
        body.interactive = true;
        body.x = (this.gameWidth - w) / 2 + _30;
        body.y = (this.gameHeight - h) / 2 + h * 0.1;
        box.addChild(body);
        body.name = 'body';

        let graphic_name = new PIXI.Graphics();
        graphic_name.beginFill(0xf2b64e, 1);
        graphic_name.drawRect(0, 0, _70, h*0.1);
        graphic_name.endFill();
        graphic_name.interactive = true;
        box.addChild(graphic_name);
        graphic_name.x = (this.gameWidth - w) / 2 + w - _70;
        graphic_name.y = 0;

        new TWEEN.Tween(graphic_name)
        .to({y: (this.gameHeight - h) / 2}, 500)
        .easing(TWEEN.Easing.Back.Out)
        .start();

        TableName = showName.length > 0 ? showName : TableName;


        let graphic_name_text = new PIXI.Text(TableName, {fontFamily : 'Arial', fontSize: 15, fill : 0xffffff, align : 'center'});
        graphic_name_text.x = graphic_name.width / 2 - graphic_name_text.width / 2;
        graphic_name_text.y = graphic_name.height / 2 - graphic_name_text.height / 2;
        graphic_name.addChild(graphic_name_text);

        let buttonclose = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_point_closetab.png"));
        let array = [];
        for(let i = 0; i < 2; i++){
            // animation
            let texture = new PIXI.Texture(buttonclose.texture, new PIXI.Rectangle(0, i * 36, 36, 36));
            array.push(texture);
        }

        let close = new PIXI.AnimatedSprite(array);
        close.anchor.set(0.5);
        close.name ="buttonclose";
        close.x = 0;
        close.y = graphic_name.height/2;
        close.animationSpeed = 0.1;
        close.loop = false;
        close.interactive = true;
        close.cursor = 'pointer';

        let time = 0;
        close.on('pointerdown', () => {
            time = Date.now();
        });
        close.on('pointerup', () => {
            if(Date.now() - time < 200){
                close.play();
                this.closeBox();
            }
        });

        graphic_name.addChild(close);

        new TWEEN.Tween(close)
        .to({x: graphic_name.width - close.width / 2}, 1000)
        .easing(TWEEN.Easing.Back.Out)
        .start();



    }
}