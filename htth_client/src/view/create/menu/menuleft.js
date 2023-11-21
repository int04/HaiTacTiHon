import createButtonRight from "./buttom_right.js";

export  default  class menuleftView extends  createButtonRight {
    constructor() {
        super();
    }

    closeMenuLeftView = () => {
        let background2 = this.menuLeft.getChildByName("body");
        let background = this.menuLeft.getChildByName("background");
        background.interactive = false;
        if(background2) {
            this.move(background2, {x : -background2.width}, 500, null, null, () => {
                let button = this.button;
                this.deleteAllChild(this.menuLeft,false);
                let icon_open = button.getChildByName('icon_menu');
                if(icon_open) {
                    let oldy = icon_open.y;
                    icon_open.alpha = 1;
                }
            });

        }
        this.deletePointer('menuleft');
    }

    openMenuLeftView = () => {
        this.menuLeft.removeChildren();
        let width = this.gameWidth;
        let height = this.gameHeight;
        let background = new PIXI.Graphics();
        background.beginFill(0x000000);
        background.drawRect(0, 0, width, height);
        background.name = "background";
        background.endFill();
        background.alpha = 0.00000000000000005;
        this.menuLeft.addChild(background);

        background.interactive = true;
        background.on('pointerdown', (event) => {
            this.closeMenuLeftView();
        });

        let width2 = width * 0.4;
        width2 = width2 > 70 ? 70 : width2;

        let background2 = new PIXI.Graphics();
        background2.beginFill(0x000000);
        background2.drawRect(0, 0, width2, height);
        background2.endFill();
        background2.name ="body";
        background2.alpha = 0.6;
        this.menuLeft.addChild(background2);

        let hienthinoidung = this.mask(background2,background2);
        background2.addChild(hienthinoidung);

        let list = [
            ["x2Main_Image_point_quick_0","bạn bè"],
            ["x2Main_Image_point_quick_2","auto"],
            ["x2Main_Image_point_quick_3","Chọn cờ"],
            ["x2Main_Image_point_quick_8","Chát thế giới",this.inputChatWorld],
            ["x2Main_Image_point_quick_11","Nạp tiền"],
            ["x2Main_Image_point_quick_9","Thoát game", this.logOut]
        ];
        let y = 0;
        let spaceY = 5;
        list.forEach((item,index) => {
            let container = new PIXI.Container();
            hienthinoidung.addChild(container);
            let icon = this.animation(item[0],60,120,2);
            icon.x = 0;
            icon.y = 0;
            icon.name = "icon";
            container.addChild(icon);

            let text = new PIXI.Text(item[1],{fontFamily : 'Arial', fontSize: 11, fill : 0xffffff, align : 'center', fontWeight: 'bold'});
            text.x = icon.width/2 - text.width/2;
            text.y = icon.height + 5;
            container.addChild(text);

            container.y = y;
            y += container.height + spaceY;

            container.keycode = 'int04';

            container.interactive = true;
            container.cursor = 'pointer';
            let time = 0;
            container.on('pointerdown', (event) => {
                time = Date.now();
                container.getChildByName('icon').gotoAndStop(1);
            });
            container.on('pointerup', (event) => {
                if(Date.now() - time < 200) {
                    this.closeMenuLeftView();
                    let callback = item[2];
                    if(callback) callback();
                }
                container.getChildByName('icon').gotoAndStop(0);
            });


        });

        // create view point
        let text = hienthinoidung;
        let body = background2;
        if(text.height < body.height) {
            let height = body.height - text.height;
            let newpxi = new PIXI.Graphics();
            newpxi.beginFill(0x000000, 0.000000000800001);
            newpxi.drawRect(0, 0, body.width, height);
            newpxi.endFill();
            newpxi.x = 0;
            newpxi.y = text.height;
            text.addChild(newpxi);
        }

        let viewport = new pixi_viewport.Viewport({
            screenWidth: body.width,
            screenHeight: body.height,
            worldWidth: body.width,
            worldHeight: text.height ,
        });
        viewport.name = "viewport";
        viewport
            .drag({
                direction: 'y',

            })

        viewport.bounce({
            top: true,
            bottom: true,
            time: 10.1,
            ease: 'easeInOutSine',
        });

        text.name = "hienthinoidung";

        viewport.addChild(text);
        body.addChild(viewport);
        viewport.pages = -1;

        let pointerStartTime = 0;
        let point = -1;
        viewport.on('pointerdown', (event) => {
            pointerStartTime = Date.now();
            this.addPointer('menuleft',viewport);
        });
        this.addPointer('menuleft',viewport);

        viewport.on("pointerup", (event) => {
            if(Date.now() - pointerStartTime < 200) {
                let x = event.data.global.x;
                let y = event.data.global.y;
                let pointMenu = hienthinoidung.toLocal(new PIXI.Point(x, y));
                pointMenu.x = Math.round(pointMenu.x);
                pointMenu.y = Math.round(pointMenu.y);
                let children = hienthinoidung.children.filter(e => e.keycode === 'int04');
                for(let i = 0; i < children.length; i++) {
                    let icon = children[i].getChildByName('icon');
                    if(icon) {
                        icon.gotoAndStop(0);
                    }
                }
                for(let i = 0; i < children.length; i++) {

                    if(children[i].x <= pointMenu.x && pointMenu.x <= children[i].x + children[i].width && children[i].y <= pointMenu.y && pointMenu.y <= children[i].y + children[i].height) {
                        point = i;
                        let current = children[i];
                        let event = this.getAllInteractiveChildren(current);
                        if(event.length > 0) {
                            background.interactive = true;
                            background.cursor = 'pointer';
                            background.on('pointerdown', () => {
                                event[0].emit('pointerdown');
                            });
                            background.on('pointerup', () => {
                                event[0].emit('pointerup');
                            });
                        }
                    }
                }

            } else {
                clearInterval(this.pcSettimeEntactiveY);
                setTimeout(function() {
                    clearInterval(this.pcSettimeEntactiveY);
                    eventGame();
                }, 200);
            }
        });
        let eventGame = () => {
            return false;
            if(this.pcSettimeEntactiveY) clearInterval(this.pcSettimeEntactiveY);
            this.pcSettimeEntactiveY = setInterval(() => {
                let event = this.pcKey;
                if(this.menuLeft.children.length <= 0) {
                    clearInterval(this.pcSettimeEntactiveY);
                    return false;
                }
                let children = hienthinoidung.children.filter(e => e.keycode === 'int04');
                if(event === 'ArrowUp') {
                    point -= 1;
                    if(point < 0) point = children.length - 1;

                } else if(event === 'ArrowDown') {
                    point += 1;
                    if(point >= children.length) point = 0;
                }
                if(event === 'Enter') {
                    let current = children[point];
                    let event = this.getAllInteractiveChildren(current);
                    if(event.length > 0) {
                        event[0].emit('pointerdown');
                        event[0].emit('pointerup');
                    }
                }
                if(children[point] && this.pcKey.length >= 1) {
                    for(let i = 0; i < children.length; i++) {
                        let icon = children[i].getChildByName('icon');
                        if(icon) {
                            icon.gotoAndStop(0);
                        }
                    }


                    let icon = children[point].getChildByName('icon');
                    if(icon) {
                        icon.gotoAndStop(1);
                    }

                    let current = children[point];
                    let eventdata = this.findInteractiveObjects(current);


                    if(eventdata.length > 0) {
                        background.interactive = true;
                        background.cursor = 'pointer';
                        background.on('pointerdown', () => {
                            eventdata[0].emit('pointerdown');
                        });
                        background.on('pointerup', () => {
                            eventdata[0].emit('pointerup');
                        });

                    }

                }
                this.pcKey = '';
            }, 50);
        };

        eventGame();


        background2.x = -background2.width;
        this.move(background2, {x : 0}, 500, null, null, null);
        let button = this.button;
        let icon_open = button.getChildByName('icon_menu');
        if(icon_open) {
            this.move(icon_open, {alpha : 0}, 500, null, null, null);
        }

    }
}