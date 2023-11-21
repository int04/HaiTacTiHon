import inputValueBuy from "./views/inputValueBuy.js";
const buy = (self, id, value = 1) => {
    value = +value;
    if(value < 0) return false;
    if(value > 999999) return this.chipi('Số lượng mua không hợp lệ');
    let check = self.cache.costShop.find(e => e[0] == id);
    if(!check) self.chipi('Không tìm thấy vật phẩm này');
    let costBuy = check[1];
    let costSell = check[2];
    let typeCost = check[3];
    let my = self.my;
    if(!costBuy || costBuy <=0) return self.chipi('Vật phẩm này không thể mua');
    if(!my || !my.tien || !my.tien.beri || !my.tien.ruby) return self.chipi('Tài khoản bạn không có đủ tiền để thực hiện.');
    let tien = my.tien;
    if(typeCost === 1 && tien.beri < costBuy * value) return self.chipi('Bạn không đủ Beri');
    if(typeCost === 2 && tien.ruby < costBuy * value) return self.chipi('Bạn không đủ Ruby');

    self.send(-8, [
        1, // type
        id, // id item
        value, // số lượng
    ]);
    return self.wait(self._('Xin chờ,...'));
}
let inputValue = (self, id, value = 0) => {
    return inputValueBuy(self, id, buy);
}
const viewBuy = (self, id) => {
    let Container = new PIXI.Container();
    let preItem = self.preItem;
    let w = preItem.width * 0.3;
    let h = preItem.height * 0.3;
    w = w > 70 ? 70 : w;
    h = h > 50 ? 50 : h;
    let list = [];

    let infoItem = self.item.find(e => e.id == id);
    if(!infoItem) return self.chipi(self._('Không tìm thấy vật phẩm'));

    if(infoItem.type === 'trangbi')
    {
        list = [
            ['Mua',buy,1],
            ['Đóng']
        ]
    }
    else
    {
        list = [
            ['Mua x1',buy,1],
            ['Mua x10',buy,10],
            ['Mua x50',buy,50],
            ['Số lượng',inputValue,null],
            ['Đóng']
        ]
    }


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
        let txt = new PIXI.Text(self._(element[0]), {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold',wordWrap: true, wordWrapWidth: button.width});
        button.addChild(txt);
        txt.x = (button.width - txt.width) / 2;
        txt.y = (button.height - txt.height) / 2;

        let time = 0;
        button.on('pointerdown', () => {
            time = Date.now();
        });
        button.on('pointerup', () => {
            if(Date.now() - time < 300) {
                if(element[1]) {
                    element[1](self,id,element[2])
                }
                self.preItem.removeChildren();
            }
        });
    });

    Container.y = preItem.height;

    return Container;
}

const sell = (self, id, value = 1) => {
    let my = self.my;
    if(my.id <=0) return false;
    let ruong = my.ruong;
    let item = ruong.data.find(e => e.id == id && e.active === 'hanhtrang');
    if(!item) return false;
    let infoItem = self.item.find(e => e.id == item.item);
    if(!infoItem) return self.chipi(self._('Không tìm thấy vật phẩm'));
    let cost = self.cache.costShop.find(e => e[0] == item.item);
    if(!cost) return self.chipi(self._('Vật phẩm này không thể bán'));
    if(value === -999) value = item.soluong;
    value = value < 0 ? 1 : value;
    if(value > item.soluong) return  self.chipi(self._('Bạn không có đủ vật phẩm để bán'));

    self.send(-8, [
        2, // type
        id, // id item
        value, // số lượng
    ]);
    return self.wait(self._('Xin chờ,...'));
}

const confirm_sell = (self, id, value = 1) => {
    let my = self.my;
    if(my.id <=0) return false;
    let ruong = my.ruong;
    let item = ruong.data.find(e => e.id == id && e.active === 'hanhtrang');
    if(!item) return false;
    let infoItem = self.item.find(e => e.id == item.item);
    if(!infoItem) return self.chipi(self._('Không tìm thấy vật phẩm'));
    let cost = self.cache.costShop.find(e => e[0] == item.item);
    if(!cost) return self.chipi(self._('Vật phẩm này không thể bán'));
    if(value === -999) value = item.soluong;
    value = value < 0 ? 1 : value;
    if(value > item.soluong) return  self.chipi(self._('Bạn không có đủ vật phẩm để bán'));
    let costSell = cost[2] * value
    let typeCost = cost[3];

    self.confirm('Bạn có muốn bán x' + value + ' ' + infoItem.name + ' với giá ' + costSell + ' ' + (typeCost === 1 ? 'Beri' : 'Ruby' + ' Không ?'), () => {
        sell(self, id, value);
    }, () => {

    });

}

const viewSell = (self, id) => {
    let Container = new PIXI.Container();
    let preItem = self.preItem;
    let w = preItem.width * 0.3;
    let h = preItem.height * 0.3;
    w = w > 70 ? 70 : w;
    h = h > 50 ? 50 : h;
    let list = [];

    let my = self.my;
    if(my.id <=0) return self.chipi(self._('Bạn chưa đăng nhập'));

    let ruong = my.ruong;
    let item = ruong.data.find(e => e.id == id && e.active == 'hanhtrang');
    if(!item) return false;

    let infoItem = self.item.find(e => e.id == item.item);
    if(!infoItem) return self.chipi(self._('Không tìm thấy vật phẩm'));

    if(infoItem.type === 'trangbi')
    {
        list = [
            ['Bán',confirm_sell,1],
            ['Đóng']
        ]
    }
    else
    {
        list = [
            ['bán 1',confirm_sell,1],
            ['bán 10',confirm_sell,10],
            ['bán hết',confirm_sell,-999],
            ['Đóng']
        ]
    }


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
        let txt = new PIXI.Text(self._(element[0]), {fontFamily : 'Arial', fontSize: 15, fill : 0xFFFFFF, align : 'center', fontWeight: 'bold',wordWrap: true, wordWrapWidth: button.width});
        button.addChild(txt);
        txt.x = (button.width - txt.width) / 2;
        txt.y = (button.height - txt.height) / 2;

        let time = 0;
        button.on('pointerdown', () => {
            time = Date.now();
        });
        button.on('pointerup', () => {
            if(Date.now() - time < 300) {
                if(element[1]) {
                    element[1](self,id,element[2])
                }
                self.preItem.removeChildren();
            }
        });
    });

    Container.y = preItem.height;

    return Container;
}

export  {
    viewBuy,
    viewSell
}