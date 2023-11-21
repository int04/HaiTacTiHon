const selectItem = (self, id) => {
    let my = self.my;
    if(my.id <=0) return self.chipi(self._('Bạn chưa đăng nhập'));

    let ruong = my.ruong;
    let item = ruong.data.find(e => e.id == id && e.active === 'hanhtrang');
    if(!item) return self.chipi(self._('Không tìm thấy vật phẩm'));

    let infoItem = self.item.find(e => e.id == item.item);
    if(!infoItem) return self.chipi(self._('Không tìm thấy vật phẩm'));

    if(infoItem.type === 'trangbi' && self.cache.khamda.id !== 0 && checkList(self, id)) {
        self.cache.khamda.data = self.cache.khamda.data.filter(e => e !== self.cache.khamda.id);
        self.cache.khamda.id = 0;
        return self.khamda();
    }

    if(infoItem.type === 'trangbi' && self.cache.khamda.id !== 0) {
        self.cache.khamda.data = self.cache.khamda.data.filter(e => e !== self.cache.khamda.id);
        self.cache.khamda.id = 0;
    }
    if(checkList(self, id)) {
        if(infoItem.type === 'trangbi') self.cache.khamda.id = 0;
        self.cache.khamda.data = self.cache.khamda.data.filter(e => e !== id);
        return self.khamda();
    }

    if(infoItem.type === 'item') {
        if(infoItem.type2 !== 'dakham') return self.chipi(self._('Vật phẩm này không thể nâng cấp'));
    }

    // check xem tồn tại loại vp này chưa
    let vipham = false;
    self.cache.khamda.data.forEach(idvp=> {
        let bag = my.ruong.data.find(e => e.id == idvp && e.active === 'hanhtrang');
        if(bag) {
            let infoItem2 = self.item.find(e => e.id == bag.item);
            if(idvp !== id && infoItem.type === 'item' && infoItem2 && infoItem2.type === 'item' && infoItem2.type2 === infoItem.type2  ) {
                vipham = true;
            }
        }
    });

    if(vipham) return self.chipi(self._('Không thể chọn 2 vật phẩm cùng loại với nhau'));

    if(infoItem.type === 'trangbi') {
        self.cache.khamda.id = id;
    }
    self.cache.khamda.data.push(id);
    return self.khamda();



}

const checkList = (self, id) => {
    if(self.cache.khamda.data.find(e => e === id)) return true;
    return false;
}

const btn_khamda = (self, id) => {
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
    let item = ruong.data.find(e => e.id == id && e.active === 'hanhtrang');
    if(!item) return false;

    let infoItem = self.item.find(e => e.id == item.item);
    if(!infoItem) return self.chipi(self._('Không tìm thấy vật phẩm'));

    if(checkList(self, id)) {
        list = [
            ['Bỏ ra',selectItem,1],
            ['Đóng']
        ]
    }
    else {
        list = [
            ['Chọn',selectItem,2],
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
    btn_khamda,
    selectItem
}