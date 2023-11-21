const selectItem = (self, id) => {
    let my = self.my;
    if(my.id <=0) return self.chipi(self._('Bạn chưa đăng nhập'));

    let ruong = my.ruong;
    let item = ruong.data.find(e => e.id == id && e.active === 'hanhtrang');
    if(!item) return self.chipi(self._('Không tìm thấy vật phẩm'));

    let infoItem = self.item.find(e => e.id == item.item);
    if(!infoItem) return self.chipi(self._('Không tìm thấy vật phẩm'));

    // tháo item chọn id
    if(checkList(self, id)) {
        self.cache.ghepItem.data = self.cache.ghepItem.data.filter(e => e !== id);
        return self.ghep();
    }

    // mặc vào

    // kiểm tra xem idITEM có tồn tại chưa
    let tontai = false;
    self.cache.ghepItem.data.forEach(idList => {
        let checkBag = ruong.data.find(e => e.id == idList && e.active === 'hanhtrang');
        if(checkBag) {
            if(checkBag.item === item.item) tontai = true;
        }
    })
    if(tontai) return self.chipi(self._('Đã có vật phẩm giống hết món này trong danh sách ghép'));

    self.cache.ghepItem.data.push(id);
    return self.ghep();



}

const checkList = (self, id) => {
    if(self.cache.ghepItem.data.find(e => e === id)) return true;
    return false;
}

const btn_ghep = (self, id) => {
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
     btn_ghep,
    selectItem
}