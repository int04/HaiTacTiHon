
export default (self) => {
    let my = self.my;
    if(my.id <=0) return self.chipi(self._('Bạn chưa đăng nhập'));

    let index = self.cache.ghepItem.id;
    if(index === -1) return self.chipi(self._('Chưa tìm được vật phẩm cần ghép. Hãy bỏ thêm nguyên liệu'));

    let congthuc = self.cache.ghep[index];
    if(!congthuc) return self.chipi(self._('Không tìm thấy công thức ghép, hãy kiểm tra lại nguyên liệu'));

    let tien = congthuc[1];

    if(tien) {
        let myTien = my.tien;
        let beri = tien[0];
        let ruby = tien[1];
        if(beri && beri > myTien.beri) return self.chipi(self._('Bạn không đủ Bery để ghép vật phẩm này'));
        if(ruby && ruby > myTien.ruby) return self.chipi(self._('Bạn không đủ Ruby để ghép vật phẩm này'));
    }

    let itemNeed = congthuc[2];
    let itemList = self.cache.ghepItem.data;

    let noItem = false;
    let noQuantity = false;

    if(itemNeed.length !== itemList.length) return self.chipi(self._('Danh sách nguyên liệu không hợp lệ.'));

    let demdu = 0;
    itemNeed.forEach(e_can => {
        if(e_can) {
            let idItem = e_can[0];
            let quantity = e_can[1];
            itemList.forEach(idmyItem => {
                let bag = my.ruong.data.find(e => e.id == idmyItem && e.active === 'hanhtrang');
                if(bag) {
                    if(bag.item === idItem) {
                        demdu++;
                        if(bag.soluong < quantity) noQuantity = true;
                    }
                }
                else {
                    noItem = true;
                }
            });
        }
    });

    if(demdu !== itemNeed.length) return self.chipi(self._('Danh sách nguyên liệu không hợp lệ.'));

    if(noItem) return self.chipi(self._('Thiếu nguyên liệu để ghép vật phẩm này'));
    if(noQuantity) return self.chipi(self._('Thiếu số lượng nguyên liệu để ghép vật phẩm này'));





    self.send(-9,[
        2,
        index,
        itemList
    ])

    let button = self.findText('button_ghep_item');
    if(button) button.visible = false;
    return self.wait('Xin chờ...');


}