import viewPointY from "./viewpoint.js";


export default class menuView extends viewPointY {
    constructor() {
        super();
        
    }
    openShowMenu2 = (xcvf,t) => {
        this.deleteMenu();
        let background = new PIXI.Graphics();
        background.beginFill(0x000000, 0.0000001);
        background.drawRect(0, 0, this.gameWidth, this.gameHeight);
        background.endFill();
        this.menu2.addChild(background);

        background.interactive = true;

        let width = this.gameWidth * 0.7;
        let height = this.gameHeight * 0.6;

        width = width > 300 ? 300 : width;
        height = height > 400 ? 400 : height;

        let menu = new PIXI.Graphics();
        menu.name = "menu";
        menu.beginFill(0xf7e7bf, 1);
        menu.drawRect(0, 0, width, height);
        menu.endFill();
        menu.x = (this.gameWidth - width) / 2;
        menu.y = (this.gameHeight - height) / 2;
        this.menu2.addChild(menu);

        menu.alpha = 0;

        TweenMax.to(menu, 1, {alpha: 1});


        let left_down_farme = Math.ceil(height/ 20);

        for(let i = 0; i < left_down_farme; i++){
            let left_down = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_6.png"));
            left_down.x = menu.x;
            left_down.y = menu.y + (i * 20);
            if(left_down.y+60 > menu.y + height) {
                left_down.y = menu.y + height - 60;
            }
            this.menu2.addChild(left_down);
        }

        let right_down_farme = Math.ceil(height/ 20);

        for(let i = 0; i < right_down_farme; i++){
            let right_down = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_6.png"));
            right_down.x = menu.x + width;
            right_down.y = menu.y + (i * 20);
            right_down.scale.x = -1;
            if(right_down.y+60 > menu.y + height) {
                right_down.y = menu.y + height - 60;
            }
            this.menu2.addChild(right_down);
        }



        let center_top_farme = Math.ceil(width/ 20);

        for(let i = 0; i < center_top_farme; i++){
            let center_top = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_1.png"));
            center_top.anchor.set(0.5);
            center_top.x = menu.x + (i * 20) + 10;
            center_top.y = menu.y;
            this.menu2.addChild(center_top);
        }

        let leftTop = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));

        leftTop.anchor.set(0.5);
        leftTop.x = menu.x;
        leftTop.y = menu.y;
        this.menu2.addChild(leftTop);

        let rightTop = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        rightTop.anchor.set(0.5);
        rightTop.x = menu.x + width;
        rightTop.y = menu.y;
        rightTop.scale.x = -1;
        this.menu2.addChild(rightTop);

        let center_bottom_farme = Math.ceil(width/ 20);

        for(let i = 0; i < center_bottom_farme; i++){
            let center_bottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_1.png"));
            center_bottom.anchor.set(0.5);
            center_bottom.x = menu.x + (i * 20) + 10;
            center_bottom.y = menu.y + height;
            center_bottom.scale.y = -1;
            this.menu2.addChild(center_bottom);
        }

        let leftBottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        leftBottom.anchor.set(0.5);
        leftBottom.x = menu.x;
        leftBottom.y = menu.y + height;
        leftBottom.scale.y = -1;
        this.menu2.addChild(leftBottom);

        let rightBottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        rightBottom.anchor.set(0.5);
        rightBottom.x = menu.x + width;
        rightBottom.y = menu.y + height;
        rightBottom.scale.x = -1;
        rightBottom.scale.y = -1;
        this.menu2.addChild(rightBottom);


        let container = new PIXI.Container();
        container.name ="main";
        let w2 = width * 0.8;
        let h2 = height * 0.8;
        container.x = menu.x + (width * 0.1);
        container.y = menu.y + (h2 * 0.1);
        this.menu2.addChild(container);

        let containerBody = new PIXI.Container();
        containerBody.name = "containerBody";
        container.addChild(containerBody);

        let borderName = new PIXI.Graphics();
        borderName.beginFill(0xf2b64e, 1);
        borderName.name = "borderName";
        borderName.drawRect(0, 0, w2*0.8, 30);
        borderName.endFill();
        containerBody.addChild(borderName);
        borderName.x =0;

        let name = new PIXI.Text(xcvf, {fontFamily : 'Arial', fontSize: 20, fill : 0xfe0000, align : 'center'});
        name.anchor.set(0.5);
        name.x = borderName.width / 2;
        name.y = 15;
        borderName.addChild(name);

        let buttonclose = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_point_closetab.png"));
        let array = [];
        let w = 36;
        let h = 36;
        for(let i = 0; i < 2; i++){
            // animation
            let texture = new PIXI.Texture(buttonclose.texture, new PIXI.Rectangle(0, i * 36, w, h));
            array.push(texture);
        }

        let close = new PIXI.AnimatedSprite(array);
        close.anchor.set(0.5);
        close.name ="buttonclose";
        close.x = 0;
        close.y = borderName.height/2;
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
                this.deleteMenu();
            }
        });

        containerBody.addChild(close);

        containerBody.y = h2;
        close.visible = false;
        new TWEEN.Tween(containerBody)
            .to({ y:  0}, 300)
            .easing(TWEEN.Easing.Back.InOut)
            .start().onComplete(() => {
            borderName.x = 0;

            new TWEEN.Tween(borderName)
                .to({ x:    (w2 - borderName.width) / 2}, 300)
                .easing(TWEEN.Easing.Back.InOut)
                .start().onComplete(() => {
                close.visible = true;
                new TWEEN.Tween(close).to({
                    x : borderName.x + borderName.width
                }, 200).easing(TWEEN.Easing.Back.InOut).start()
            });

        });


        // containerBody.height +
        h2 -= (w2 * 0.1);



        let height_a_line= h2 * 0.2;
        height_a_line = height_a_line > 50 ? 50 : height_a_line;

        let div_height = 5;

        let body = new PIXI.Container();
        body.name = "body";
        body.y = borderName.height;
        container.addChild(body);

        body.alpha = 0;
        new TWEEN.Tween(body)
            .to({ alpha:  1}, 500)
            .easing(TWEEN.Easing.Back.InOut)
            .start();



        let backgroundbody = new PIXI.Graphics();
        backgroundbody.beginFill(0x000000, 0.0001);
        backgroundbody.drawRect(0, 0, w2, h2);
        backgroundbody.endFill();
        body.addChild(backgroundbody);




        let hienthinoidung = this.mask(body,backgroundbody);
        hienthinoidung.name = "hienthinoidung";


        t.forEach((element,i) => {

            let border = new PIXI.Graphics();
            border.keycode ="int04";
            border.beginFill(0xf2b64e, 0.0000001);
            border.drawRect(0, 0, w2, height_a_line);
            border.endFill();
            border.y = i * (height_a_line + div_height );

            let text = new PIXI.Text(element[0], {fontFamily : 'Arial', fontSize: 20, fill : 0xfe0000, align : 'center'});
            text.anchor.set(0.5);
            text.x = border.width / 2;
            text.y = border.height / 2;
            border.addChild(text);

            hienthinoidung.addChild(border);

            let div = new PIXI.Graphics();
            div.beginFill(0xd7b988, 1);
            div.drawRoundedRect(0, 0, w2 * 0.8, div_height, 10);
            div.endFill();
            div.y = border.y + border.height;
            div.x = (w2 - div.width) / 2;
            hienthinoidung.addChild(div);

            border.interactive = true;
            border.cursor = 'pointer';
            let time = 0;
            border.on('pointerdown', () => {
                    time = Date.now();
                }
            );

            border.on('pointerup', () => {
                    if(Date.now() - time < 200){
                        if(element[1] === 'event') {
                            this.deleteMenu();
                            return element[2]();
                        }
                        if(element[1] === 'menu') return this.openShowMenu(element[0],element[2]);
                        this[element[1]]((element[2] && element[2] != undefined ? element[2] : null));
                    }
                }
            );




        });

        // viewpoint hienthinoidung

        body.addChild(this.intY(backgroundbody,hienthinoidung));


    }

    openShowMenu = (xcvf,t) => {
        this.closeGiaoTiep();
        this.deleteMenu();
        let background = new PIXI.Graphics();
        background.beginFill(0x000000, 0.0000001);
        background.drawRect(0, 0, this.gameWidth, this.gameHeight);
        background.endFill();
        this.menu.addChild(background);

        background.interactive = true;

        let width = this.gameWidth * 0.7;
        let height = this.gameHeight * 0.6;

        width = width > 300 ? 300 : width;
        height = height > 400 ? 400 : height;

        let menu = new PIXI.Graphics();
        menu.name = "menu";
        menu.beginFill(0xf7e7bf, 1);
        menu.drawRect(0, 0, width, height);
        menu.endFill();
        menu.x = (this.gameWidth - width) / 2;
        menu.y = (this.gameHeight - height) / 2;
        this.menu.addChild(menu);

        menu.alpha = 0;

        TweenMax.to(menu, 1, {alpha: 1});


        let left_down_farme = Math.ceil(height/ 20);

        for(let i = 0; i < left_down_farme; i++){
            let left_down = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_6.png"));
            left_down.x = menu.x;
            left_down.y = menu.y + (i * 20);
            if(left_down.y+60 > menu.y + height) {
                left_down.y = menu.y + height - 60;
            }
            this.menu.addChild(left_down);
        }

        let right_down_farme = Math.ceil(height/ 20);

        for(let i = 0; i < right_down_farme; i++){
            let right_down = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_6.png"));
            right_down.x = menu.x + width;
            right_down.y = menu.y + (i * 20);
            right_down.scale.x = -1;
            if(right_down.y+60 > menu.y + height) {
                right_down.y = menu.y + height - 60;
            }
            this.menu.addChild(right_down);
        }



        let center_top_farme = Math.ceil(width/ 20);

        for(let i = 0; i < center_top_farme; i++){
            let center_top = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_1.png"));
            center_top.anchor.set(0.5);
            center_top.x = menu.x + (i * 20) + 10;
            center_top.y = menu.y;
            this.menu.addChild(center_top);
        }

        let leftTop = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));

        leftTop.anchor.set(0.5);
        leftTop.x = menu.x;
        leftTop.y = menu.y;
        this.menu.addChild(leftTop);

        let rightTop = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        rightTop.anchor.set(0.5);
        rightTop.x = menu.x + width;
        rightTop.y = menu.y;
        rightTop.scale.x = -1;
        this.menu.addChild(rightTop);

        let center_bottom_farme = Math.ceil(width/ 20);

        for(let i = 0; i < center_bottom_farme; i++){
            let center_bottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_1.png"));
            center_bottom.anchor.set(0.5);
            center_bottom.x = menu.x + (i * 20) + 10;
            center_bottom.y = menu.y + height;
            center_bottom.scale.y = -1;
            this.menu.addChild(center_bottom);
        }

        let leftBottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        leftBottom.anchor.set(0.5);
        leftBottom.x = menu.x;
        leftBottom.y = menu.y + height;
        leftBottom.scale.y = -1;
        this.menu.addChild(leftBottom);

        let rightBottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        rightBottom.anchor.set(0.5);
        rightBottom.x = menu.x + width;
        rightBottom.y = menu.y + height;
        rightBottom.scale.x = -1;
        rightBottom.scale.y = -1;
        this.menu.addChild(rightBottom);


        let container = new PIXI.Container();
        container.name ="main";
        let w2 = width * 0.8;
        let h2 = height * 0.8;
        container.x = menu.x + (width * 0.1);
        container.y = menu.y + (h2 * 0.1);
        this.menu.addChild(container);

        let containerBody = new PIXI.Container();
        containerBody.name = "containerBody";
        container.addChild(containerBody);

        let borderName = new PIXI.Graphics();
        borderName.beginFill(0xf2b64e, 1);
        borderName.name = "borderName";
        borderName.drawRect(0, 0, w2*0.8, 30);
        borderName.endFill();
        containerBody.addChild(borderName);
        borderName.x =0;

        let name = new PIXI.Text(xcvf, {fontFamily : 'Arial', fontSize: 20, fill : 0xfe0000, align : 'center'});
        name.anchor.set(0.5);
        name.x = borderName.width / 2;
        name.y = 15;
        borderName.addChild(name);

        let buttonclose = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_point_closetab.png"));
        let array = [];
        let w = 36;
        let h = 36;
        for(let i = 0; i < 2; i++){
            // animation
            let texture = new PIXI.Texture(buttonclose.texture, new PIXI.Rectangle(0, i * 36, w, h));
            array.push(texture);
        }

        let close = new PIXI.AnimatedSprite(array);
        close.anchor.set(0.5);
        close.name ="buttonclose";
        close.x = 0;
        close.y = borderName.height/2;
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
                this.deleteMenu();
            }
        });

        containerBody.addChild(close);

        containerBody.y = h2;
        close.visible = false;
        new TWEEN.Tween(containerBody)
        .to({ y:  0}, 300)
        .easing(TWEEN.Easing.Back.InOut)
        .start().onComplete(() => {
            borderName.x = 0;
            
            new TWEEN.Tween(borderName)
            .to({ x:    (w2 - borderName.width) / 2}, 300)
            .easing(TWEEN.Easing.Back.InOut)
            .start().onComplete(() => {
                close.visible = true;
                new TWEEN.Tween(close).to({
                    x : borderName.x + borderName.width
                }, 200).easing(TWEEN.Easing.Back.InOut).start()
            });
            
        });


        // containerBody.height + 
        h2 -= (w2 * 0.1);

        

        let height_a_line= h2 * 0.2;
        height_a_line = height_a_line > 50 ? 50 : height_a_line;

        let div_height = 5;

        let body = new PIXI.Container();
        body.name = "body";
        body.y = borderName.height;
        container.addChild(body);

        body.alpha = 0;
        new TWEEN.Tween(body)
        .to({ alpha:  1}, 500)
        .easing(TWEEN.Easing.Back.InOut)
        .start();



        let backgroundbody = new PIXI.Graphics();
        backgroundbody.beginFill(0x000000, 0.0001);
        backgroundbody.drawRect(0, 0, w2, h2);
        backgroundbody.endFill();
        body.addChild(backgroundbody);
        


    
        let hienthinoidung = this.mask(body,backgroundbody);
        hienthinoidung.name = "hienthinoidung";
        

        t.forEach((element,i) => {
            
            let border = new PIXI.Graphics();
            border.keycode ="int04";
            border.beginFill(0xf2b64e, 0.0000001);
            border.drawRect(0, 0, w2, height_a_line);
            border.endFill();
            border.y = i * (height_a_line + div_height );

            let text = new PIXI.Text(element[0], {fontFamily : 'Arial', fontSize: 20, fill : 0xfe0000, align : 'center'});
            text.anchor.set(0.5);
            text.x = border.width / 2;
            text.y = border.height / 2;
            border.addChild(text);

            hienthinoidung.addChild(border);

            let div = new PIXI.Graphics();
            div.beginFill(0xd7b988, 1);
            div.drawRoundedRect(0, 0, w2 * 0.8, div_height, 10);
            div.endFill();
            div.y = border.y + border.height;
            div.x = (w2 - div.width) / 2;
            hienthinoidung.addChild(div);

            border.interactive = true;
            border.cursor = 'pointer';
            let time = 0;
            border.on('pointerdown', () => {
                time = Date.now();
            }
            );

            border.on('pointerup', () => {
                if(Date.now() - time < 200){
                    if(element[1] === 'event') return element[2]();
                    if(element[1] === 'menu') return this.openShowMenu(element[0],element[2]);
                    this[element[1]]((element[2] && element[2] != undefined ? element[2] : null));
                }
            }
            );




        });

        // viewpoint hienthinoidung

        body.addChild(this.intY(backgroundbody,hienthinoidung));

        
    }

    deleteMenu = () => {
        let menu = this.menu;

        this.deleteAllChild(this.menu,false);
        this.deleteAllChild(this.menu2,false);
        return false;

        let main = menu.getChildByName("main");
        if(main) {
            let containerBody = main.getChildByName("containerBody");
            if(containerBody) {
                let buttonclose = containerBody.getChildByName("buttonclose");
                if(buttonclose) {

                    TweenMax.to(buttonclose, 0.5, {
                        x: 0,
                        ease: Power4.easeOut,
                        onComplete: () => {
                            buttonclose.visible = false;
                        }
                    });
                }
                let borderName = containerBody.getChildByName("borderName");
                if(borderName) {
                    TweenMax.to(borderName, 0.5, {
                        y: -100,
                        ease: Power4.easeOut,
                        onComplete: () => {
                            borderName.visible = false;
                        }
                    });
                }
            }

            let body = main.getChildByName("body");
            if(body) {
                TweenMax.to(body, 0.5, {
                    alpha: 0,
                    ease: Power4.easeOut,
                    onComplete: () => {
                        body.visible = false;
                    }
                });
            }

        }

        if(menu) {
            TweenMax.to(menu, 0.5, {
                alpha: 0,
                ease: Power4.easeOut,
                onComplete: () => {
                    this.menu.removeChildren();
                    menu.alpha = 1;
                }
            });
        }

    }
}