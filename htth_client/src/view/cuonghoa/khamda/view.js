import created_ui_1 from "../../shop/views/createUI.js";
import bag from "./bag.js";
import btn_action from "./action.js";


const Text = (self,text,body) => {
    return new PIXI.Text(self._(text),{
        fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center',
        wordWrap: true,
        wordWrapWidth: body.width * 0.9,
        breakWords: true,
        whiteSpace: "normal",
    });
}

let resetItem = (self) => {
    let list = self.cache.khamda.data;
    list.forEach(id => {
        let bag = self.my.ruong.data.find(e => e.id === id && e.active === 'hanhtrang');
        if(!bag) {
            self.cache.khamda.data = self.cache.khamda.data.filter(e => e !== id);
        }
        else {
            let infoItem = self.item.find(e => e.id == bag.item);
            if(infoItem) {
                if(infoItem.type === 'item' && bag.soluong <=0) {
                    self.cache.khamda.data = self.cache.khamda.data.filter(e => e !== id);
                }
            }
            else {
                self.cache.khamda.data = self.cache.khamda.data.filter(e => e !== id);
            }
        }
    });

    let select = self.cache.khamda.id;
    if(select !==0) {
        let bag = self.my.ruong.data.find(e => e.id === select && e.active === 'hanhtrang');
        if(!bag) {
            self.cache.khamda.id = 0;
            self.cache.khamda.data = [];
        }
    }
}

const view = (self, id) => {
    resetItem(self);
    self.box.removeChildren();
    let backgroud =  self.backGroundBox();
    let ui1 = created_ui_1(self,[
        [9208,"shop","Khảm đá",id,view],
        [9200,"hanhtrang","Hành trang",id,bag],

    ],'shop');

    let body = self.box.getChildByName('body');


    let hienthinoidung = new PIXI.Container();
    hienthinoidung.name = "container";

    // mask


    let my = self.my;

    let data = [];
    // sort data by data.time ASC
    let preview = self.cache.khamda.data;
    if(preview && preview.length >=1) {
        preview.forEach(e => {
            let item = my.ruong.data.find(ee => ee.id === e && ee.active === 'hanhtrang');
            if(item) {
                data.push(item);
            }
        });
    }

    if(body) {
        let num_o = data.length + 10;
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
                        self.previewItemBag(o,data[i],'btn_khamda');
                    }

                });
                o = self.showItem(o,data[i]);
                o.name = "o_nguyen_lieu_"+data[i].id;
            }






            hienthinoidung.addChild(o);
        }








        let nen_tren = new PIXI.Graphics();
        nen_tren.beginFill(0x000000,0.05);
        nen_tren.drawRect(0,0,body.width,body.height*0.6);
        nen_tren.endFill();
        body.addChild(nen_tren);

        let left = new PIXI.Graphics();
        left.beginFill(0x000000,0.000000000005);
        left.drawRect(0,0,nen_tren.width*0.6,nen_tren.height);
        left.endFill();
        nen_tren.addChild(left);

        let left_top = new PIXI.Graphics();
        left_top.beginFill(0x000000,0.00000002);
        left_top.drawRect(0,0,left.width,nen_tren.height*0.7);
        left_top.endFill();
        left.addChild(left_top);

        let num_box = 2;
        let oo_w = left_top.width * 0.2;
        oo_w = oo_w > 48 ? 48 : oo_w;
        let oo_h = oo_w;

        let spaceX = 15;
        let containerO = new PIXI.Container();
        for(let i = 0; i < num_box; i++) {
            let o = new PIXI.Graphics();
            o.beginFill(0xae9069,0.5);
            o.drawRect(0,0,oo_w,oo_h);
            o.endFill();
            o.x = spaceX + (i * (oo_w + spaceX));
            o.y = 0;



            let idItem = self.cache.khamda.id;
            if(idItem) {
                let event = false;
                let item = my.ruong.data.find(e => e.id === idItem && e.active === 'hanhtrang');
                let createData = item;
                if(!item) {
                }
                else {
                    let infoItem = self.item.find(e => e.id == item.item);
                    if(!infoItem || infoItem && infoItem.type !== 'trangbi') {
                    }
                    else {
                        if(i === 0) {
                            o = self.showItem(o,item);
                            event = true;
                            createData = item;
                        }
                        else {
                            let lo = createData.lo || [];
                            let lo_chua_duc = lo.filter(e => e === 0).length;
                            if(lo_chua_duc >=1 && self.cache.khamda.data.length === 2) {

                                let idItem = 0;

                                self.cache.khamda.data.forEach(idVPBag => {
                                    let checkBag = my.ruong.data.find(e => e.id === idVPBag && e.active === 'hanhtrang');
                                    if(checkBag) {
                                        let infoItem = self.item.find(e => e.id === checkBag.item);
                                        if(infoItem && infoItem.type === 'item' && infoItem.type2 === 'dakham') {
                                            idItem = infoItem.id;
                                        }
                                    }
                                });

                                if(idItem) {
                                    let newData = JSON.parse(JSON.stringify(createData));
                                    newData.lo = newData.lo || [];

                                    for(let j = 0; j < newData.lo.length; j++) {
                                        if(newData.lo[j] === 0) {
                                            newData.lo[j] = idItem;
                                            break;
                                        }
                                    }
                                    o = self.showItem(o,newData);
                                    event = true;
                                    createData = newData;

                                    let animation_run = self.createAnimationArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],0.5,false,'./assets/eff/6/');
                                    o.addChild(animation_run);
                                    animation_run.name = "animation_run_nangcap";
                                    animation_run.width = oo_w*2;
                                    animation_run.height = oo_h*2;
                                    animation_run.x = -oo_w* 0.5;
                                    animation_run.y = -oo_h*0.5;
                                    animation_run.visible = false;

                                    let animation_success = self.createAnimationArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],0.5,false,'./assets/eff/9/');
                                    o.addChild(animation_success);
                                    animation_success.name = "animation_success_nangcap";
                                    animation_success.width = oo_w*2;
                                    animation_success.height = oo_h*2;
                                    animation_success.x = -oo_w* 0.5;
                                    animation_success.y = -oo_h*0.5;
                                    animation_success.visible = false;
                                }


                            }
                        }
                    }
                }

                if(event === true) {
                    o.interactive = true;
                    o.cursor = 'pointer';
                    let time = 0;
                    o.on('pointerdown', () => {
                        time = Date.now()
                    });
                    o.on('pointerup', () => {
                        if(Date.now() - time < 200) {
                            self.previewItemBag(o,createData,'btn_khamda');
                        }
                    });
                }

                o.name = "o_nangcap_"+i;

            }
            containerO.addChild(o);
        }

        left_top.addChild(containerO);
        containerO.x = (left_top.width - containerO.width) / 2;
        containerO.y = (left_top.height - containerO.height) / 2;



        let left_bottom = new PIXI.Graphics();
        left_bottom.beginFill(0x000000,0.1);
        left_bottom.drawRect(0,0,left.width,nen_tren.height*0.3);
        left_bottom.endFill();
        left_bottom.y = left.height - left_bottom.height;
        left.addChild(left_bottom);

        let button_width = left_bottom.width * 0.3;
        button_width = button_width > 100 ? 100 : button_width;

        let button_height = left_bottom.height * 0.5;
        button_height = button_height > 50 ? 50 : button_height;

        let button = new PIXI.Graphics();
        button.beginFill(0x86715b,1);
        button.drawRect(0,0,button_width,button_height);
        button.lineStyle(1, 0xf9f2d3, 3);
        button.endFill();
        button.x = (left_bottom.width - button.width) / 2;
        button.y = (left_bottom.height - button.height) / 2;
        button.interactive = true;
        button.keycode = 'int04';
        button.cursor = 'pointer';
        button.name = "button_nangcap_item";
        let time_button = 0;
        button.on('pointerdown', () => {
            time_button = Date.now()
        });
        button.on('pointerup', () => {
            if(Date.now() - time_button < 200) {
                btn_action(self);
            }
        });
        left_bottom.addChild(button);

        let text = new PIXI.Text(self._('Khảm'),{fontFamily : 'Arial', fontSize: 14, fill : 0xffffff, align : 'center'});
        text.anchor.set(0.5);
        text.x = button.width / 2;
        text.y = button.height / 2;
        button.addChild(text);

        let right = new PIXI.Graphics();
        right.beginFill(0x000000,0.2);
        right.drawRect(0,0,nen_tren.width*0.4,nen_tren.height);
        right.endFill();
        right.x = nen_tren.width - right.width;
        nen_tren.addChild(right);

        let containerText = new PIXI.Container();

        if(self.cache.khamda.id) {
            let bag = my.ruong.data.find(e => e.id === self.cache.khamda.id && e.active === 'hanhtrang');
            if(bag) {
                let level = bag.level;
                let config = self.config.nangcap;
                let lo = bag.lo || [];
                let lo_chua_duc = lo.filter(e => e === 0).length;
                if(lo_chua_duc <=0) {
                    let text1 = Text(self,'Vật phẩm này đã hết lỗ để có thể khảm',right);
                    containerText.addChild(text1);
                }
                else {
                    let text1 = Text(self,'Bạn hãy chọn đá cần khảm, sau đó bấm khảm để có thể ghép đá vào trang bị.',right);
                    containerText.addChild(text1);


                }
            }
        }
        else {
            let text1 = Text(self,'Lựa chọn vật phẩm có lỗ khảm, sau đó chọn đá để khảm.',right);
            containerText.addChild(text1);
        }


        containerText.x = (right.width - containerText.width) / 2;
        containerText.y = (right.height - containerText.height) / 2;
        self.maskPointDefault(right);
        self.viewPointDefault(right,containerText);



        let nen_duoi = new PIXI.Graphics();
        nen_duoi.beginFill(0x000000,0.0000001);
        nen_duoi.drawRect(0,body.height - body.height*0.40,body.width,body.height*0.4);
        nen_duoi.endFill();
        body.addChild(nen_duoi);

        nen_duoi.y =body.height*0.6;


        let viewport = new pixi_viewport.Viewport({
            screenWidth: nen_duoi.width,
            screenHeight: nen_duoi.height,
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

        nen_duoi.addChild(viewport);





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

export default (self,id) => {
    console.log('open')
    view(self,id);
}