import created_ui_1 from "./createUI.js";
import shop from "./boxshop.js";
import hanhtrang from "./boxshop_bag.js";

export default (self, id) => {
    let BasedataShop = self.cache.idShop.find(e => e[0] === id);
    if(!BasedataShop) return self.chipi('Không tìm thấy danh mục cửa hàng');
    let listShop = BasedataShop[1];
    let backgroud =  self.backGroundBox();
    let ui1 = created_ui_1(self,[
        [9209,"shop","Cửa hàng",id,shop],
        [9200,"hanhtrang","Hành trang",id,hanhtrang],

    ],'hanhtrang');

    let body = self.box.getChildByName('body');


    let hienthinoidung = new PIXI.Container();
    hienthinoidung.name = "container";

    // mask
    let mask = new PIXI.Graphics();
    mask.beginFill(0x000000,0.5);
    mask.drawRect(0,0,body.width,body.height);
    mask.endFill();
    hienthinoidung.mask = mask;
    body.addChild(mask);

    let my = self.my;
    let data = my.ruong.data.filter(e => e.active === 'hanhtrang');
    // sort data by data.time ASC
    data.sort((a,b) => {
        return a.time - b.time;
    });
    if(body) {
        let num_o = self.my.ruong.max;
        let o_w = body.width * 0.2;
        o_w = o_w > 48 ? 48 : o_w;
        let o_h = o_w;

        let space_x = 2;
        let space_y = 2;

        let num_x = Math.floor(body.width / (o_w + space_x));
        for(let i = 0; i < num_o; i++) {
            let o = new PIXI.Graphics();
            o.beginFill(0xae9069,0.5);
            o.drawRect(0,0,o_w,o_h);
            o.endFill();
            o.x = (i % num_x) * (o_w + space_x);
            o.y = Math.floor(i / num_x) * (o_h + space_y);
            o.interactive = true;
            o.keycode = 'int04';
            o.cursor = 'pointer';
            let time = 0;


            if(data[i]) {
                o.on('pointerdown', () => {
                    time = Date.now()
                });
                o.on('pointerup', () => {
                    if(Date.now() - time < 200) {
                        self.previewItemBag(o,data[i],'btnShopSell','buy');
                    }

                });
                o = self.showItem(o,data[i]);

            }






            hienthinoidung.addChild(o);
        }

        if(hienthinoidung.height < body.height) {
            let height = body.height;
            let width = body.width;
            let background = new PIXI.Graphics();
            background.beginFill(0x000000,0.000000005);
            background.drawRect(0,0,width,height);
            background.endFill();
            hienthinoidung.addChild(background);
        }

        let viewport = new pixi_viewport.Viewport({
            screenWidth: body.width,
            screenHeight: body.height,
            worldWidth: hienthinoidung.width,
            worldHeight: hienthinoidung.height ,
        });
        viewport.name = "viewport";

        viewport
            .drag({
                direction: 'y',
                pressDrag: true,
                factor: 1,

            })
            .decelerate({
                friction: 0.95,
                bounce: 0.8,
                minSpeed: 0.01,
            })
        viewport.bounce({
            top: true,
            bottom: true,
            friction: 0.5,
            time: 3.5,
            ease: 'easeInOutSine',
        });

        viewport.setZoom(1);
        viewport.addChild(hienthinoidung);
        body.addChild(viewport);




        let pointerStartTime = 0;
        let point = -1;
        let point_X = -1;
        let point_Y = -1;
        viewport.on('pointerdown', (event) => {
            pointerStartTime = Date.now();
        });

        viewport.on("pointerup", (event) => {
            if(Date.now() - pointerStartTime < 200) {
                let x = event.data.global.x;
                let y = event.data.global.y;
                let pointMenu = hienthinoidung.toLocal(new PIXI.Point(x, y));
                pointMenu.x = Math.round(pointMenu.x);
                pointMenu.y = Math.round(pointMenu.y);
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }
                for(let i = 0; i < children.length; i++) {

                    if(children[i].x <= pointMenu.x && pointMenu.x <= children[i].x + children[i].width && children[i].y <= pointMenu.y && pointMenu.y <= children[i].y + children[i].height) {
                        let width = children[i].width;
                        let height = children[i].height;
                        let background = new PIXI.Graphics();
                        background.lineStyle(1, 0xFFFFFF, 1);
                        background.beginFill(0xf8fe4a, 0.000001);
                        background.drawRoundedRect(0, 0, width, height, 0);
                        background.endFill();
                        background.name = "xanhle";
                        children[i].addChild(background);
                        let current = children[i];
                        let event = self.findInteractiveObjects(current);
                        if(event.length > 0) {
                            event[0].emit('pointerdown');
                            event[0].emit('pointerup');
                        }
                        point_X = i % num_x;
                        point_Y = Math.floor(i / num_x);
                        point = i;
                    }
                }

            } else {
                clearInterval(self.pcSettimeEntactive);
                setTimeout(function() {
                    clearInterval(self.pcSettimeEntactive);
                    eventGame();
                }, 200);
            }
        });



        let eventGame = () => {
            if(self.pcSettimeEntactive) clearInterval(self.pcSettimeEntactive);
            self.pcSettimeEntactive = setInterval(() => {
                let event = self.pcKey;
                if(self.box.children.length <= 0) {
                    clearInterval(self.pcSettimeEntactive);
                    return false;
                }
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');

                if(event == 'ArrowUp') {
                    if(point_Y == -1) {
                        point_Y = 0;
                    } else {
                        point_Y--;
                    }
                } else if(event == 'ArrowDown') {
                    if(point_Y == -1) {
                        point_Y = 0;
                    } else {
                        point_Y++;
                    }
                } else if(event == 'ArrowLeft') {
                    if(point_X == -1) {
                        point_X = 0;
                    } else {
                        point_X--;
                    }
                } else if(event == 'ArrowRight') {
                    if(point_X == -1) {
                        point_X = 0;
                    } else {
                        point_X++;
                    }
                }
                if(point_X >= 0 && point_Y >= 0) {
                    point = point_Y * num_x + point_X;
                } else if(point_X >= 0 && point_Y == -1) {
                    point = point_X;
                } else if(point_X == -1 && point_Y >= 0) {
                    point = point_Y;
                } else {
                    point = -1;
                }


                if(event == 'Enter' && point >= 0) {
                    let current = children[point];
                    let eventdata = self.findInteractiveObjects(current);
                    if(eventdata.length > 0) {
                        eventdata[0].emit('pointerdown');
                        eventdata[0].emit('pointerup');
                    }
                }


                if(children[point] && self.pcKey.length >= 1) {
                    for(let i = 0; i < children.length; i++) {
                        children[i].removeChild(children[i].getChildByName('xanhle'));
                    }

                    viewport.moveCenter(children[point].x, children[point].y);
                    let width = children[point].width;
                    let height = children[point].height;
                    let background = new PIXI.Graphics();
                    background.lineStyle(1, 0xFFFFFF, 1);
                    background.beginFill(0xf8fe4a, 0.000000001);
                    background.drawRoundedRect(0, 0, width, height, 0);
                    background.endFill();
                    background.name = "xanhle";
                    children[point].addChild(background);

                    let current = children[point];
                    let eventdata = self.findInteractiveObjects(current);


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
                self.pcKey = '';
            }, 30);
        };

        eventGame();

    }
}