import baseShowInfoItem from "./baseItem.js";



export default class ruongView extends baseShowInfoItem {
    constructor( ) {
        super();
        this.tab.my = [
            [9200,"hanhTrang","Hành trang"],
            [9201,"TrangBi","Trang bị"],
            [9202,"thongTin","Thông tin"],
            [9203,"classkinang","Kĩ năng"]

        ];
    }
    classkinang = (name = 'classkinang') => {
        let my = this.my;
        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);

        let body = this.box.getChildByName('body');



        let nen = new PIXI.Graphics();
        nen.beginFill(0x856c4e,1.5);
        nen.lineStyle(2,0x6a4b2a,1);
        nen.drawRect(0,0,body.width*0.95,body.height*0.95);
        nen.endFill();
        body.addChild(nen);
        nen.x = (body.width - nen.width) / 2;
        nen.y = (body.height - nen.height) / 2;

        this.maskPointDefault(nen);
        let render = new PIXI.Container();

        let y = 0;

        let list_skill = this.skill;
        // sort object.type follow tancong => chudong => bidong
        list_skill.sort((a,b) => {
            if(a.type == b.type) {
                return 0;
            }
            if(a.type == 'tancong') {
                return -1;
            }
            if(b.type == 'tancong') {
                return 1;
            }
            if(a.type == 'hotro') {
                return -1;
            }
            if(b.type == 'hotro') {
                return 1;
            }
            if(a.type == 'bidong') {
                return -1;
            }
            if(b.type == 'bidong') {
                return 1;
            }
            return 0;
        });
        let i = 0;
        list_skill.forEach(element => {
            let myskill = my.skill.find(e => e[0] && e[0] == element.id);
            if(myskill) {
                let background = new PIXI.Graphics();
                background.keycode = 'int04';
                let width = nen.width * 0.95;
                let height = nen.height * 0.3;
                height = height > 60 ? 60 : height;
                background.beginFill(0x000000,0.0000000001);
                background.drawRect(0,0,width,height);
                background.endFill();
                background.x = nen.width / 2 - background.width / 2;
                background.y = y;
                render.addChild(background);
                y += height +  5 * i;
                i++;

                background.interactive = true;
                background.cursor = 'help';
                let time = 0;
                background.on('pointerdown',() => {
                    time = Date.now();
                });
                background.on('pointerup',() => {
                    if(Date.now() - time < 300) {
                        this.showInfoSkill(background,myskill,'btn_skill_gan');
                    }
                });


                let containerKinang = new PIXI.Container();
                background.addChild(containerKinang);

                let icon_w = background.width * 0.3;
                let icon_h = background.height * 0.9;
                icon_w = icon_w > 45 ? 45 : icon_w;

                let icon = new PIXI.Sprite(this.coverImg(element.avatar));
                icon.width = icon_w;
                icon.height = icon_w;
                icon.x = 0;
                icon.y = 0;
                containerKinang.addChild(icon);

                let background_info = new PIXI.Graphics();
                background_info.beginFill(0x000000,0.0000000001);
                background_info.drawRect(0,0,background.width - icon.width,icon.height);
                background_info.endFill();
                background_info.x = icon.width;
                background_info.y = 0;
                containerKinang.addChild(background_info);

                let container_info = new PIXI.Container();
                background_info.addChild(container_info);

                let name = new PIXI.Text(element.name,{
                    fontFamily : 'Arial',
                    fontSize: 15,
                    fill : 0xffffff,
                    align : 'center'
                });
                name.x = 5;
                name.y = 0;
                container_info.addChild(name);

                let background_button_info_desc = new PIXI.Graphics();
                background_button_info_desc.beginFill(0xFFFFFF,0.000000001);
                background_button_info_desc.drawRect(0,0,background_info.width,background_info.height - name.height);
                background_button_info_desc.endFill();
                background_button_info_desc.x = 0;
                background_button_info_desc.y = name.height;
                container_info.addChild(background_button_info_desc);

                let desc_level_width = background_button_info_desc.width * 0.3;
                desc_level_width = desc_level_width > 100 ? 100 : desc_level_width;

                let background_button_info_desc_level = new PIXI.Graphics();
                background_button_info_desc_level.beginFill(0x000000,0.000000001);
                background_button_info_desc_level.drawRect(0,0,desc_level_width,background_button_info_desc.height);
                background_button_info_desc_level.endFill();
                background_button_info_desc_level.x = 0;
                background_button_info_desc_level.y = 0;
                background_button_info_desc.addChild(background_button_info_desc_level);

                let level = new PIXI.Text('Cấp ' + myskill[1],{
                    fontFamily : 'Arial',
                    fontSize: 15,
                    fill : 0x00FF00,
                    align : 'center'
                });
                level.x = 5;
                level.y = background_button_info_desc_level.height / 2 - level.height / 2;
                background_button_info_desc_level.addChild(level);

                let background_button_info_desc_info = new PIXI.Graphics();
                background_button_info_desc_info.beginFill(0x000000,0.00000001);
                background_button_info_desc_info.drawRect(0,0,background_button_info_desc.width - background_button_info_desc_level.width,background_button_info_desc.height);
                background_button_info_desc_info.endFill();
                background_button_info_desc_info.x = background_button_info_desc_level.width;
                background_button_info_desc_info.y = 0;
                background_button_info_desc.addChild(background_button_info_desc_info);

                let my_exp = myskill[3];
                let exp_need = this.expskill[myskill[1]];
                exp_need = !exp_need ? 9999 : exp_need;
                let tile = my_exp / exp_need * 100;
                tile = tile > 100 ? 100 : tile;

                // created process bar
                let background_button_info_desc_info_process = new PIXI.Graphics();
                background_button_info_desc_info_process.beginFill(0x000000,1);
                background_button_info_desc_info_process.drawRect(0,0,background_button_info_desc_info.width,background_button_info_desc_info.height);
                background_button_info_desc_info_process.endFill();
                background_button_info_desc_info_process.x = 0;
                background_button_info_desc_info_process.y = 0;
                background_button_info_desc_info.addChild(background_button_info_desc_info_process);

                let background_button_info_desc_info_process_1 = new PIXI.Graphics();
                background_button_info_desc_info_process_1.beginFill(0x00FF00,1);
                background_button_info_desc_info_process_1.drawRect(0,0,background_button_info_desc_info_process.width * tile / 100,background_button_info_desc_info_process.height);
                background_button_info_desc_info_process_1.endFill();
                background_button_info_desc_info_process_1.x = 0;
                background_button_info_desc_info_process_1.y = 0;
                background_button_info_desc_info_process.addChild(background_button_info_desc_info_process_1);


                // created show text
                let float = Math.fround(tile).toFixed(2);
                let text = new PIXI.Text(''+float+'%',{
                    fontFamily : 'Arial',
                    fontSize: 15,
                    fill : 0xffffff,
                    align : 'center'
                });
                text.x = background_button_info_desc_info_process.width / 2 - text.width / 2;
                text.y = background_button_info_desc_info_process.height / 2 - text.height / 2;
                background_button_info_desc_info_process.addChild(text);







                container_info.y = background_info.height / 2 - container_info.height / 2;

                containerKinang.x = 0;
                containerKinang.y = (background.height - containerKinang.height) / 2;

            }
        });





        this.viewPointDefaultY(nen,render);

        
    }

    thongTin = (name = 'thongTin') => {
        let my = this.my;
        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);

        let body = this.box.getChildByName('body');



        let nen = new PIXI.Graphics();
        nen.beginFill(0x856c4e,1.5);
        nen.lineStyle(2,0x6a4b2a,1);
        nen.drawRect(0,0,body.width*0.95,body.height*0.95);
        nen.endFill();
        body.addChild(nen);
        nen.x = (body.width - nen.width) / 2;
        nen.y = (body.height - nen.height) / 2;

        this.maskPointDefault(nen);
        let render = new PIXI.Container();

        let y = 0;

        let chiso = [
            'haki',
            '_haki',
            'hpmax',
            'mpmax',
            'sat_thuong_vat_ly',
            'sat_thuong_phep',
            'khang_vat_ly',
            'khang_phep',
            '_hpmax',
            '_mpmax',
            '_chi_mang',
            '_sat_thuong_chi_mang',
            '_giam_sat_thuong_chi_mang',
            '_hoi_mau',
            '_hoi_mp',
            '_sat_thuong_vat_ly',
            '_sat_thuong_phep',
            '_khang_vat_ly',
            '_khang_phep',
            'hoi_chieu'
        ];
        for(let tenthuoctinh of chiso) {
            let tinh = my.info.chiso[tenthuoctinh] || 0;
            let getThuocTinh = this.getThuocTinh(tenthuoctinh);
            let text = ''+getThuocTinh.name+' '+tinh+''+getThuocTinh.value+'  ';
            if(tenthuoctinh.indexOf('_') == 0) {
                text = (tinh >= 0 ? this._("Tăng") : this._('Giảm')) + " "  +text;
            }
            let txt1 = new PIXI.Text(text,{fontFamily : 'Arial', fontSize: 15, fill : 0xffffff, align : 'left', fontWeight: 'bold', WordWrap: true, WordWrapWidth: nen.width - 10});
            txt1.x =0;
            txt1.y = y;
            y+= txt1.height + 5;
            render.addChild(txt1);
        }
        render.x = 15;


        this.viewPointDefault(nen,render);

        
    }

    TrangBi = (name = 'TrangBi') => {
        let my = this.my;

        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);

        let body = this.box.getChildByName('body');



        let nen = new PIXI.Graphics();
        nen.beginFill(0x000000,0.0000000001);
        nen.drawRect(0,0,body.width*0.95,body.height*0.95);
        nen.endFill();
        body.addChild(nen);
        nen.x = (body.width - nen.width) / 2;
        nen.y = (body.height - nen.height) / 2;

        let tab_width_left = nen.width * 0.3;
        let tab_height_left = nen.height;
        tab_width_left = tab_width_left > 48 ? 48 : tab_width_left;

        let background_left = new PIXI.Graphics();
        background_left.beginFill(0xFFFFFF,0.0000000000000005);
        background_left.drawRect(0,0,tab_width_left,tab_height_left);
        background_left.endFill();
        nen.addChild(background_left);

        let list_box_left = [
            'vukhi', 'nhan', 'daychuyen', 'caitrang'
        ];
        let container_left = new PIXI.Container();
        background_left.addChild(container_left);
        let space_Y = 5;
        list_box_left.forEach((element,i) => {
            let width = tab_width_left;
            let height = (tab_height_left - space_Y*  (list_box_left.length) ) / (list_box_left.length);
            height = height > 48 ? 48 : height;
            let box = new PIXI.Graphics();
            box.beginFill(0xae9069,1.0000000001);
            box.lineStyle(2,0x6a4b2a,1);
            box.drawRect(0,0,width,height);
            box.endFill();
            box.x = 0;
            box.y = i * height + i * space_Y;
            container_left.addChild(box);

            if(my.trangbi[element] && my.trangbi[element] !=0) {
                box.interactive = true;
                box.cursor = 'help';
                let time = 0;
                let data = my.ruong.data.find(e => e.id == my.trangbi[element] && e.active == 'trangbi');
                if(data) {
                    box.on('pointerdown', () => {
                        time = Date.now()
                    });
                    box.on('pointerup', () => {
                        if(Date.now() - time < 200) {
                            this.previewItemBag(box,data);
                        }
                    });

                    box = this.showItem(box,data);
                }

            }

        });
        container_left.y = (tab_height_left - container_left.height) / 2;


        let backgorund_right = new PIXI.Graphics();
        backgorund_right.beginFill(0xFFFFFF,0.000000000005);
        backgorund_right.drawRect(0,0,tab_width_left,tab_height_left);
        backgorund_right.endFill();
        backgorund_right.x =  nen.width - backgorund_right.width;
        nen.addChild(backgorund_right);

        let list_box_right = [
            'non', 'ao', 'quan', 'thucuoi'
        ];
        let container_right = new PIXI.Container();
        backgorund_right.addChild(container_right);

        list_box_right.forEach((element,i) => {
            let width = tab_width_left;
            let height = (tab_height_left - space_Y*  (list_box_left.length) ) / (list_box_left.length);
            height = height > 48 ? 48 : height;
            let box = new PIXI.Graphics();
            box.beginFill(0xae9069,1.0000000001);
            box.lineStyle(2,0x6a4b2a,1);
            box.drawRect(0,0,width,height);
            box.endFill();
            box.x = 0;
            box.y = i * height + i * space_Y;
            container_right.addChild(box);

            if(my.trangbi[element] && my.trangbi[element] !=0) {
                box.interactive = true;
                box.cursor = 'help';
                let time = 0;
                let data = my.ruong.data.find(e => e.id == my.trangbi[element] && e.active == 'trangbi');
                if(data) {
                    box.on('pointerdown', () => {
                        time = Date.now()
                    });
                    box.on('pointerup', () => {
                        if(Date.now() - time < 200) {
                            this.previewItemBag(box,data);
                        }
                    });

                    box = this.showItem(box,data);
                }

            }

        });

        container_right.y = (tab_height_left - container_right.height) / 2;



        let background_center_width = nen.width - tab_width_left * 2;
        let background_center_height = nen.height * 0.8;
        let background_center = new PIXI.Graphics();
        background_center.beginFill(0xFFFFFF,0.0000000001);
        background_center.drawRect(0,0,background_center_width,background_center_height);
        background_center.endFill();
        background_center.x = tab_width_left;
        background_center.y = (nen.height - background_center.height) / 2;
        nen.addChild(background_center);

        let bw = background_center.width * 0.9;
        let bh = background_center.height * 1;
        let center = new PIXI.Graphics();
        center.beginFill(0xae9069,1.5);
        center.lineStyle(1,0x6a4b2a,1);

        center.drawRect(0,0,bw,bh);
        center.endFill();
        center.x = (background_center.width - center.width) / 2;
        center.y = (background_center.height - center.height) / 2;
        background_center.addChild(center);


        let let_info_width = center.width * 0.6;
        let let_info_height = center.height * 1;
        let let_info = new PIXI.Graphics();
        let_info.beginFill(0xae9069,0.00000001);

        let_info.drawRect(0,0,let_info_width,let_info_height);
        let_info.endFill();
        let_info.x = 0;
        let_info.y = (center.height - let_info.height) / 2;
        center.addChild(let_info);

        let right_info_width = center.width - let_info.width;
        let right_info_height = center.height * 0.5;
        let right_info = new PIXI.Graphics();
        right_info.beginFill(0xae9069,0.0000000000000005);

        right_info.drawRect(0,0,right_info_width,right_info_height);
        right_info.endFill();
        right_info.x = let_info.width;
        right_info.y =  (center.height - right_info.height) / 2;
        center.addChild(right_info);

        let sprite_show = this.created_sprite_skin_hi(my,'dungyen');
        sprite_show.x = (right_info.width - sprite_show.width) / 2;
        sprite_show.y = (right_info.height - sprite_show.height) / 2;
        right_info.addChild(sprite_show);
        sprite_show.alpha = 0;
        // shake sprite

        let b = TweenMax.to(sprite_show,0.1,{x: sprite_show.x - 3,repeat:-1,yoyo:true});

        TweenMax.to(sprite_show,1,{alpha:1}
        ).eventCallback('onComplete',() => {
            b.kill();
        });




        
    }

    hanhTrang = (name = 'hanhTrang') => {

        let backgroud =  this.backGroundBox();
        let ui1 = this.created_ui_1(this.tab.my,name);

        let body = this.box.getChildByName('body');


        let hienthinoidung = new PIXI.Container();
        hienthinoidung.name = "container";

        // mask
        let mask = new PIXI.Graphics();
        mask.beginFill(0x000000,0.5);
        mask.drawRect(0,0,body.width,body.height);
        mask.endFill();
        hienthinoidung.mask = mask;
        body.addChild(mask);

        let my = this.my;
        let data = my.ruong.data.filter(e => e.active == 'hanhtrang');
        // sort data by data.time ASC
        data.sort((a,b) => {
            return a.time - b.time;
        });
        if(body) {
            let num_o = this.my.ruong.max;
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
                            this.previewItemBag(o,data[i],'btn_hanhtrang');
                        }
                        
                    });
                    o = this.showItem(o,data[i]);

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
                        let event = this.findInteractiveObjects(current);
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
                clearInterval(this.pcSettimeEntactive);
                setTimeout(function() {
                    clearInterval(this.pcSettimeEntactive);
                    eventGame();
                }, 200);
            }
        });

        

        let eventGame = () => {
            if(this.pcSettimeEntactive) clearInterval(this.pcSettimeEntactive);
            this.pcSettimeEntactive = setInterval(() => {
                let event = this.pcKey;
                if(this.box.children.length <= 0) {
                    clearInterval(this.pcSettimeEntactive);
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
                    let eventdata = this.findInteractiveObjects(current);
                    if(eventdata.length > 0) {
                        eventdata[0].emit('pointerdown');
                        eventdata[0].emit('pointerup');
                    }
                }

                
                if(children[point] && this.pcKey.length >= 1) {
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
            }, 30);
        };

        eventGame();

        }
    }
}