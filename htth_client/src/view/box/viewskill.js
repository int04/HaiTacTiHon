import useItemClassView from "./useItem.js";

export default class viewskill extends useItemClassView {
    constructor() {
        super();
    }
    ganphimitem = (data) => {
        let id = data[0];
        let i = data[1];
        let item = this.my.ruong.data.find(e => e.id == id && e.active == 'hanhtrang');
        if(!item) return false;
        this.deleteMenu();
        this.notice('Xin chờ',false);
        this.my.oskill[i] = id;
        this.send(-6,
            [
                1,
                i,
                id
            ]
        )
    }

    sendToServerSkill = (data) => {
        
        let id = data[0];
        let i = data[1];
        let skill = this.skill.find(e => e.id == id);
        if(!skill) return false;

        this.deleteMenu();
        this.notice('Xin chờ',false);
        this.my.oskill[i] = id;

        this.send(-6,
            [
                1,
                i,
                id
            ]
        )

    }

    use_item_button = (id) => {
        let item = this.my.ruong.data.find(e => e.id == id && e.active == 'hanhtrang');
        if(item && item.soluong >=1) {
            let array = [];
            for(let i = 0; i < 10; i++) {
                array.push([
                    'Gán phím '+ (i+1) +'',
                    'ganphimitem',
                    [item.id,i]
                ])
            }
            this.openShowMenu('Gán vào phím tắt',array);
        }
    }

    gan_skill = (id) => {
        let skill = this.skill.find(e => e.id == id);
        if(skill) {
            let array = [];
            for(let i = 0; i < 10; i++) {
                array.push([
                    'Gán phím '+ (i+1) +'',
                    'sendToServerSkill',
                    [skill.id,i]
                ])
            }
            this.openShowMenu('Gán '+skill.name+'',array);
        }
    }

    btn_skill_gan = (id) => {
        let Container = new PIXI.Container();
        let preItem = this.preItem;
        let w = preItem.width * 0.3;
        let h = preItem.height * 0.3;
        w = w > 70 ? 70 : w;
        h = h > 50 ? 50 : h;

        let list = [
            ['Gán phím','gan_skill'],
            ['Đóng','']
        ]
        let spaceX = 5;

        list.forEach((element,i) => {
            let button = new PIXI.Graphics();
            button.interactive = true;
            button.beginFill(0x86715b, 1);
            button.lineStyle(2, 0xf9f2d3, 1);
            button.drawRoundedRect(0, 0, w, h, 5);
            button.endFill();
            button.name = element[1];
            button.x = i * (w + spaceX);
            button.y = 0;
            Container.addChild(button);
            let txt = new PIXI.Text(element[0], {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold',wordWrap: true, wordWrapWidth: button.width});
            button.addChild(txt);
            txt.x = (button.width - txt.width) / 2;
            txt.y = (button.height - txt.height) / 2;

            let time = 0;
            button.on('pointerdown', () => {
                time = Date.now();
            });
            button.on('pointerup', () => {
                if(Date.now() - time < 300) {
                    if(element[1].length >=1) {
                        this[button.name](id);
                    }
                    this.preItem.removeChildren();
                }
            });
        });

        Container.y = preItem.height;

        return Container;
    }

    showInfoSkill = (o,data,button = false) => {
        if(!o) return console.log('Không có ô');
        if(!data) return console.log('ko có data');

        let skill = this.skill.find(e => e.id == data[0]);

        let background = this.createBackgroundPreViewItem(o);
        let title = background.getChildByName("title");

        let color_background = 0xFF7F24;

        let container = new PIXI.Container();
        let txt1 = new PIXI.Text(skill.name, {fontFamily : 'Arial', fontSize: 15, fill : color_background, align : 'center', fontWeight: 'bold'});
        txt1.x = 0;
        txt1.y = 0;
        container.addChild(txt1);

        let type = {
            hotro : 'Hỗ trợ',
            tancong : 'Tấn công',
            bidong : 'Bị động',
        }

        let txt_soluong = new PIXI.Text(this._("Kĩ năng "+type[skill.type]) , {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});
        txt_soluong.x = txt1.x + txt1.width/2 - txt_soluong.width/2;
        txt_soluong.y = txt1.height + 5;
        container.addChild(txt_soluong);
        

        title.addChild(container);
        container.x = (title.width - container.width)/2;
        container.y = (title.height - container.height)/2;



        let body = background.getChildByName("body");

        let text = new PIXI.Container();
        let y = 0;
        let div = new PIXI.Graphics();
        div.beginFill(0xFFFFFF);
        div.drawRect(0,0,body.width*0.5,1);
        div.endFill();
        text.addChild(div);
        div.x = body.width/2 - div.width/2;
        
        y+= 5;
        
        let mota = new PIXI.Text(skill.mota, {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'left', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10});
        mota.x = 10;
        mota.y = y;
        text.addChild(mota);
        y+= mota.height + 2;


        if(skill.type == 'tancong') {
            let text_st = new PIXI.Text(this._("Gây: ") + Math.round(skill.value + skill.value/100*data[1] ) +"% sát thương " + (skill.st == 1 ? this._('Vật lý') : (this._('Phép'))), {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'left', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10});
            text_st.x = 10;
            text_st.y = y;
            text.addChild(text_st);
            y+= text_st.height + 2;
            let loai_st = new PIXI.Text(this._("Năng lượng: ") + Math.round(skill.mp + skill.mp/100 * data[1]), {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'left', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10});
            loai_st.x = 10;
            loai_st.y = y;
            text.addChild(loai_st);
            y+= loai_st.height + 2;

            let loai_stx = new PIXI.Text(this._("Thời gian chờ: ") + skill.time + "mili giây", {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'left', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10});
            loai_stx.x = 10;
            loai_stx.y = y;
            text.addChild(loai_stx);
            y+= loai_stx.height + 2;
            
            if(skill.buff && typeof skill.buff == 'object') {
                skill.buff.forEach(element => {
                    let tenthuoctinh = element[0];
                    let value = element[1];
                    let thoigiantacdung = element[2];
                    let tile = element[3];
                    let doituong = element[4];
                    let tinh = value + value/100*data[1];
                    let getThuocTinh = this.getThuocTinh(tenthuoctinh);
                    let render;
                    let array = [0,'bản thân','đối thủ','đồng đội'];
                    if(tile*1 >=100) render = ''+(tinh > 0 ? this._('Tăng') : this._('Giảm'))+' '+tinh+''+getThuocTinh.value+' '+getThuocTinh.name+' trong '+thoigiantacdung+' giây cho '+array[doituong]+' ';
                    else render = ''+tile+'% '+(tinh > 0 ? this._('Tăng') : this._('Giảm'))+' '+tinh+''+getThuocTinh.value+' '+getThuocTinh.name+' trong '+thoigiantacdung+' giây cho '+array[doituong]+' ';
                    let t_2 = new PIXI.Text(render, {fontFamily : 'Arial', fontSize: 15, fill : 0xCC6633, align : 'left', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10 });
                    t_2.x = 10;
                    t_2.y = y;
                    text.addChild(t_2);
                    y+= t_2.height + 2;

                });
            }
        }

        if(skill.type == 'hotro') {
    
            if(skill.buff && typeof skill.buff == 'object') {
                skill.buff.forEach(element => {
                    let tenthuoctinh = element[0];
                    let value = element[1];
                    let thoigiantacdung = element[2];
                    let tile = element[3];
                    let doituong = element[4];
                    let tinh = value + value/100*data[1];
                    let getThuocTinh = this.getThuocTinh(tenthuoctinh);
                    let render;
                    let array = [0,'bản thân','đối thủ','đồng đội'];
                    if(tile*1 >=100) render = ''+(tinh > 0 ? this._('Tăng') : this._('Giảm'))+' '+tinh+''+getThuocTinh.value+' '+getThuocTinh.name+' trong '+thoigiantacdung+' giây cho '+array[doituong]+' ';
                    else render = ''+tile+'% '+(tinh > 0 ? this._('Tăng') : this._('Giảm'))+' '+tinh+''+getThuocTinh.value+' '+getThuocTinh.name+' trong '+thoigiantacdung+' giây cho '+array[doituong]+' ';
                    let t_2 = new PIXI.Text(render, {fontFamily : 'Arial', fontSize: 15, fill : 0xCC6633, align : 'left', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10 });
                    t_2.x = 10;
                    t_2.y = y;
                    text.addChild(t_2);
                    y+= t_2.height + 2;

                });
            }

            let loai_st = new PIXI.Text(this._("Năng lượng: ") + Math.round(skill.mp + skill.mp/100 * data[1]), {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'left', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10});
            loai_st.x = 10;
            loai_st.y = y;
            text.addChild(loai_st);
            y+= loai_st.height + 2;

            let loai_stx = new PIXI.Text(this._("Thời gian chờ: ") + skill.time + "mili giây", {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'left', fontWeight: 'bold', wordWrap: true, wordWrapWidth: body.width - 10});
            loai_stx.x = 10;
            loai_stx.y = y;
            text.addChild(loai_stx);
            y+= loai_stx.height + 2;
        }


        if(skill.type == 'bidong') {
    
            if(skill.buff && typeof skill.buff == 'object') {
                for(let tenthuoctinh in skill.buff) {
                    let tinh = skill.buff[tenthuoctinh] + skill.buff[tenthuoctinh]/100*data[1];
                    tinh = Math.round(tinh);
                    let getThuocTinh = this.getThuocTinh(tenthuoctinh);
                    let render = ''+(tinh > 0 ? this._('Tăng') : this._('Giảm'))+' '+tinh+''+getThuocTinh.value+' '+getThuocTinh.name+' ';
                    let t_2 = new PIXI.Text(render, {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold'});
                    t_2.x = 10;
                    t_2.y = y;
                    text.addChild(t_2);
                    y+= t_2.height + 2;
                }
            }
        }
        
        
        this.viewpointItem(body,text);

        if(button && skill.type != 'bidong' ) {
            let data_data = this[button](skill.id);
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
}