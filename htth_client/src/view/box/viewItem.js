import viewskill from "./viewskill.js";

export default class baseViewItem extends viewskill {
    constructor() {
        super();
    }



    createBackgroundPreViewItem = (o) => {
        this.deleteAllChild(this.preItem,false);

        let width = this.gameWidth * 0.8;
        width = width > 300 ? 300 : width;

        let height = this.gameHeight * 0.6;
        height = height > 300 ? 300 : height;

        let background = new PIXI.Graphics();
        background.interactive = true;
        background.beginFill(0x5b4a35, 1);
        background.lineStyle(2, 0xf9f2d3, 1);
        background.drawRect(0, 0, width, height);
        background.endFill();

        this.preItem.addChild(background);

        let _20 = height * 0.6;
        _20 = _20 > 50 ? 50 : _20;
        let backgroundTitle = new PIXI.Graphics();
        backgroundTitle.interactive = true;
        backgroundTitle.beginFill(0xFFFFFF, 0.0000000000000001);
        backgroundTitle.drawRect(0, 0, width, _20);
        backgroundTitle.endFill();
        backgroundTitle.name= "title";

        background.addChild(backgroundTitle);

        let body = new PIXI.Graphics();
        body.interactive = true;
        body.beginFill(0xFFFFFF, 0.000000001);
        body.drawRect(0, 0, width, height - _20 - 5);
        body.endFill();
        body.name= "body";
        body.y = _20 + 5;

        background.addChild(body);


        let mask = new PIXI.Graphics();
        mask.beginFill(0xffffff, 0.00000001);
        mask.drawRect(0, 0, body.width, body.height);
        mask.endFill();
        body.mask = mask;
        body.addChild(mask);

        this.preItem.alpha = 0;
        TweenMax.to(this.preItem, 0.5, {alpha: 1});

        return background;
    }

    

    previewItemBag = (o,data,button = false,typeical = '') => {
        if(!o) return console.log('Không có ô');
        if(!data) return console.log('ko có data');
        let item = this.item.find(e => e.id == data.item);

        data.may = data.may || 0;
        data.mayman = data.mayman || 0;
        data.level = data.level || 0;
        data.phamchat = data.phamchat || 0;
        data.doben = data.doben || 0;


        let background = this.createBackgroundPreViewItem(o);
        let title = background.getChildByName("title");

        let phamchat = 1;
        phamchat = data.phamchat || 0;
        let _back = [0,0,0x20B2AA,0x8B658B,0xFF7F24];
        if(item.type ==='item') phamchat = item.phamchat;
        let color_background = _back[phamchat];

        let container = new PIXI.Container();
        let txt1 = new PIXI.Text(item.name, {fontFamily : 'Arial', fontSize: 15, fill : color_background, align : 'center', fontWeight: 'bold'});
        txt1.x = 0;
        txt1.y = 0;
        container.addChild(txt1);

        let lo = data.lo || [];
        let i = 0;
        let dataCost = false;
        if(typeical === 'buy' || typeical === 'sell') {
            dataCost = this.cache.costShop.find(e => e[0] == data.id);
        }
        if(typeical === 'buy' && dataCost) {
            let txt_soluong = new PIXI.Text(this._("Giá: ") + this.number_format(dataCost[1]) + " " + (dataCost[3] === 1 ? 'Bery' : 'Ruby'), {fontFamily : 'Arial', fontSize: 15, fill : color_background, align : 'center', fontWeight: 'bold'});
            txt_soluong.x = txt1.x + txt1.width/2 - txt_soluong.width/2;
            txt_soluong.y = txt1.height + 5;
            container.addChild(txt_soluong);
        }
        else if(typeical === 'sell' && dataCost) {
            let txt_soluong = new PIXI.Text(this._("Bán được: ") + this.number_format(dataCost[2])  + " " + (dataCost[3] === 1 ? 'Bery' : 'Ruby'), {fontFamily : 'Arial', fontSize: 15, fill : color_background, align : 'center', fontWeight: 'bold'});
            txt_soluong.x = txt1.x + txt1.width/2 - txt_soluong.width/2;
            txt_soluong.y = txt1.height + 5;
            container.addChild(txt_soluong);
        }
        else if(typeof lo == 'object' && lo && item.type === 'trangbi') {
            let khamngoc = new PIXI.Container();
            container.addChild(khamngoc);
            lo.forEach((element) => {
                if(element !== -1) {
                    let w = 30;
                    let h = 30;
                    let spaceX = 5;
                    let box = new PIXI.Graphics();
                    box.beginFill(0x000000, 0.000000000800001);
                    box.lineStyle(2, 0xd3ac45, 1);
                    box.drawRect(0, 0, w, h);
                    box.endFill();
                    box.x = i * (w + spaceX);
                    box.y = txt1.height + 5;
                    khamngoc.addChild(box);
                    i++;

                    if(element !=0) {
                        let item2 = this.item.find(e => e.id == element);
                        if(item2) {
                            let o_w = box.width;
                            let o_h = box.height;
                            let img = item2.img;
                            let src = img.src;
                            let num_farme = img.num;
                            let sprite;
                            if(num_farme >1) {
                                let array = [];
                                let width = 80;
                                let height = 80;
                                let texture_goc = new PIXI.Sprite(this.coverImg(src));
                                for(let i = 0; i < num_farme; i++) {
                                    let texture = new PIXI.Texture(texture_goc.texture, new PIXI.Rectangle(0, i*height, width, height));
                                    array.push(texture);
                                }
                                sprite = new PIXI.AnimatedSprite(array);
                                sprite.animationSpeed = 0.15;
                                sprite.play();
                            }
                            else 
                            {
                                sprite = new PIXI.Sprite(this.coverImg(src));
                            }
                            
                            sprite.width = o_w * 0.8;
                            sprite.height = o_h * 0.8;
                            sprite.x = (o_w - sprite.width)/2;
                            sprite.y = (o_h - sprite.height)/2;
                            box.addChild(sprite);
                        }
                    }

                }
            });
            khamngoc.x = (container.width - khamngoc.width)/2;

        }
        else 
        if(item.type === 'item') {
            let txt_soluong = new PIXI.Text(this._("Số lượng: ") + data.soluong, {fontFamily : 'Arial', fontSize: 15, fill : color_background, align : 'center', fontWeight: 'bold'});
            txt_soluong.x = txt1.x + txt1.width/2 - txt_soluong.width/2;
            txt_soluong.y = txt1.height + 5;
            container.addChild(txt_soluong);
        }

        title.addChild(container);
        container.x = (title.width - container.width)/2;
        container.y = (title.height - container.height)/2;



        let body = background.getChildByName("body");

        let text = new PIXI.Container();
        
        if(item.type === 'item') {
            let div = new PIXI.Graphics();
            div.beginFill(0xFFFFFF, 1);
            div.drawRect(0, 0, body.width * 0.5, 1);
            div.endFill();
            div.x = body.width/2 - div.width/2;
            div.y = 0;
            text.addChild(div);
            let txt_1 = new PIXI.Text(item.mota, {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10});
            txt_1.x =5;
            txt_1.y =  div.y + div.height;
            text.addChild(txt_1);
        }
        else 
        {
            let y = 0;
            let div = new PIXI.Graphics();
            div.beginFill(0xFFFFFF, 1);
            div.drawRect(0, 0, body.width * 0.5, 1);
            div.endFill();
            div.x = body.width/2 - div.width/2;
            div.y = 0;
            text.addChild(div);
            y+= div.height;

            let t_1 = new PIXI.Text(this._("Thông tin"), {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'left', fontWeight: 'bold'});
            t_1.x = body.width/2 - t_1.width/2;
            t_1.y =  y;
            text.addChild(t_1);
            y+= t_1.height;

            let txt_1 = new PIXI.Text(this._("Level: ") + item.level, {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});
            txt_1.x =5;
            txt_1.y =  y;
            text.addChild(txt_1);
            y+= txt_1.height;

            let txt_2 = new PIXI.Text(this._("Độ bền: ") + ( data.doben || 100), {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});
            txt_2.x =5;
            txt_2.y =  y;
            text.addChild(txt_2);
            y+= txt_2.height;

            y+=5;
            let div2 = new PIXI.Graphics();
            div2.beginFill(0xFFFFFF, 1);
            div2.drawRect(0, 0, body.width * 0.5, 1);
            div2.endFill();
            div2.x = body.width/2 - div2.width/2;
            div2.y = y;
            text.addChild(div2);
            y+= div2.height;


            let t_12 = new PIXI.Text(this._("Cường hóa +")+ data.level, {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});
            t_12.x = body.width/2 - t_12.width/2;
            t_12.y =  y;
            text.addChild(t_12);
            y+= t_12.height;



            if(item.thuoctinh) {
                for(let tenthuoctinh in item.thuoctinh) {
                    let mayman = data.mayman;
                    let level = data.level;
                    let phamchat = data.phamchat;
                    let giatrigoc = item.thuoctinh[tenthuoctinh];
                    let tinh = giatrigoc + giatrigoc * (mayman /100);
                    tinh+= tinh * (level*phamchat /100);
                    tinh = Math.round(tinh);
                    let getThuocTinh = this.getThuocTinh(tenthuoctinh);
                    let render = ''+(tinh > 0 ? this._('Tăng') : this._('Giảm'))+' '+tinh+''+getThuocTinh.value+' '+getThuocTinh.name+' ';
                    let t_2 = new PIXI.Text(render, {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});
                    t_2.x =5;
                    t_2.y =  y;
                    text.addChild(t_2);
                    y+= t_2.height;
                }
            }
            // dòng sát thương thêm
            if(data.dong) {
                y+=5;
                let div2 = new PIXI.Graphics();
                div2.beginFill(0xFFFFFF, 1);
                div2.drawRect(0, 0, body.width * 0.5, 1);
                div2.endFill();
                div2.x = body.width/2 - div2.width/2;
                div2.y = y;
                text.addChild(div2);
                y+= div2.height;
                let t_12 = new PIXI.Text(this._("Chỉ số đặc biệt"), {fontFamily : 'Arial', fontSize: 15, fill : 0xFF7F50, align : 'center', fontWeight: 'bold'});
                t_12.x = body.width/2 - t_12.width/2;
                t_12.y =  y;
                text.addChild(t_12);
                y+= t_12.height;
                data.dong.forEach(tenthuoctinh => {
                    let mayman = data.mayman;
                    let level = data.level;
                    let phamchat = data.phamchat;
                    let level_item = item.level;
                    level_item  = level_item < 0 ? 1 : level_item;
                    let level_yc = Math.ceil(level_item/10);
                    let giatrigoc = level_yc * phamchat;
                    let tinh = giatrigoc + giatrigoc * (mayman /100);
                    tinh+= tinh * ((level*phamchat + 5 )/100);
                    tinh = Math.round(tinh);
                    let getThuocTinh = this.getThuocTinh(tenthuoctinh);
                    let render = ''+(tinh > 0 ? this._('Tăng') : this._('Giảm'))+' '+tinh+''+getThuocTinh.value+' '+getThuocTinh.name+' ';
                    let t_2 = new PIXI.Text(render, {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});
                    t_2.x =5;
                    t_2.y =  y;
                    text.addChild(t_2);
                    y+= t_2.height;
                });
            }

            if(data.lo && typeof data.lo == 'object') {
                y+=10;
                let div2 = new PIXI.Graphics();
                div2.beginFill(0xFFFFFF, 1);
                div2.drawRect(0, 0, body.width * 0.5, 1);
                div2.endFill();
                div2.x = body.width/2 - div2.width/2;
                div2.y = y;
                text.addChild(div2);
                y+= div2.height;
                let t_12 = new PIXI.Text(this._("Chỉ số khảm đá"), {fontFamily : 'Arial', fontSize: 15, fill : 0x008080, align : 'center', fontWeight: 'bold'});
                t_12.x = body.width/2 - t_12.width/2;
                t_12.y =  y;
                text.addChild(t_12);
                y+= t_12.height;
                let list_UP = [];
                data.lo.forEach(element => {
                    let idItem = element;
                    if(idItem !== 0 && idItem !== -1) {
                        let item2 = this.item.find(e => e.id == idItem);
                        if(item2 && item.thuoctinh) {
                            for(let tenthuoctinh in item2.thuoctinh) {
                                let tinh = item2.thuoctinh[tenthuoctinh];

                                let indexOf = list_UP.findIndex(e => e[0] === tenthuoctinh);
                                if(indexOf === -1) {
                                    list_UP.push([tenthuoctinh,tinh])
                                }
                                else {
                                    list_UP[indexOf][1]+= tinh;
                                }
                            }
                        }
                    }
                });
                list_UP.forEach(element => {
                    let tenthuoctinh = element[0];
                    let tinh = element[1];
                    let getThuocTinh = this.getThuocTinh(tenthuoctinh);
                    let render = ''+(tinh > 0 ? this._('Tăng') : this._('Giảm'))+' '+tinh+''+getThuocTinh.value+' '+getThuocTinh.name+' ';
                    let t_2 = new PIXI.Text(render, {fontFamily : 'Arial', fontSize: 14, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});
                    t_2.x =7;
                    t_2.y =  y;
                    text.addChild(t_2);
                    y+= t_2.height;
                });
            }




        }

        

        this.viewpointItem(body,text);

        if(button) {
            let data_data = this[button](data.id);
            background.addChild(data_data);
        }
        
        let position = o.toGlobal(new PIXI.Point(0, 0));
        background.y =  position.y;
        background.x =  position.x;

        if(background.y + background.height > this.gameHeight) {
            let c = background.y + background.height - this.gameHeight;
            background.y-= c;
        }
        if(background.x + background.width > this.gameWidth) {
            let c = background.x + background.width - this.gameWidth;
            background.x-= c;
        }

    }

    viewpointItem = (body,text) => {

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
            worldWidth: text.width,
            worldHeight: text.height ,
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
        viewport.addChild(text);
        body.addChild(viewport);

        // automatically scroll to y down unitl the end 

        let startFunc = () => {
            return setInterval(() => {
                let height_of_container = text.height;
                let height_of_viewport = viewport.screenHeight;
                let y = viewport.y;
                if(Math.round(y) > Math.round(-height_of_container + height_of_viewport)) {
                    viewport.y -= 1;
                }
                else {
                    clearInterval(scroll);
                }
            }, 50);
        }

        let scroll = startFunc();

        viewport.interactive = true;
        viewport.cursor = 'grab';
        let time = 0;
        viewport.on('pointerdown', (e) => {
            clearInterval(scroll);
        });
        viewport.on('pointerup', (e) => {
            scroll = startFunc();
        }
        );
            



    }
} 