import baseViewBox from "./base.js";

export default class useItemClassView extends baseViewBox {
    constructor() {
        super();
    }

    use_item = (id) => {
        let my = this.my;
        if(my.id <=0) return false;
        let ruong = my.ruong.data;
        let data = ruong.find(e => e.id == id && e.active == 'hanhtrang');
        if(!data) return this.notice(this._('Có lỗi xẩy ra'));

        this.send(-5,[
            1,
            data.id,
        ])
    }

    btn_hanhtrang = (id) => {
        let Container = new PIXI.Container();
        let preItem = this.preItem;
        let w = preItem.width * 0.3;
        let h = preItem.height * 0.3;
        w = w > 70 ? 70 : w;
        h = h > 50 ? 50 : h;

        let list = [
            ['sử dụng','use_item'],
            ['Gán phím','use_item_button'],

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
}