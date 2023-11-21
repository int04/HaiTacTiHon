
export default (self) => {
    let my = self.my;
    if(my.id <=0) return self.chipi(self._('Bạn chưa đăng nhập'));

    let id = self.cache.duclo.id;

    // kiểm tra xem chọn trang bị chưa
    if(!id) return self.chipi(self._('Bạn chưa chọn trang bị'));

    // kiểm tra xem có phải trang bị không
    let checkTB = my.ruong.data.find(e => e.id == id && e.active === 'hanhtrang');
    if(!checkTB) return self.chipi(self._('Không tìm thấy trang bị'));

    // kiểm tra trang bị chọn có phải là trang bị hay không
    let infoItemcheckTB = self.item.find(e => e.id == checkTB.item);
    if(!infoItemcheckTB) return self.chipi(self._('Không tìm thấy trang bị'));
    if(infoItemcheckTB.type !== 'trangbi') return self.chipi(self._('Không phải trang bị'));

    if(self.cache.duclo.data.length >2) return self.chipi(self._('Để đục lỗ chỉ được chọn 2 vật phẩm'));

    let lo = checkTB.lo || [];
    let lo_chua_duc = lo.filter(e => e === -1).length;
    if(lo_chua_duc <= 0) return self.chipi(self._('Trang bị này đã đục lỗ hết rồi'));

    let tien = self.config.duclo[lo_chua_duc];
    if(my.tien.ruby < tien) return self.chipi(self._('Bạn không đủ ruby để đục lỗ'));

    let sai = false;
    let empty = false;
    self.cache.duclo.data.forEach(e => {
        let bag = my.ruong.data.find(e2 => e2.id == e && e2.active === 'hanhtrang');
        if(bag) {
            let infoItem = self.item.find(e3 => e3.id == bag.item);
            if(infoItem) {
                if(infoItem.type === 'item' && infoItem.type2 !== 'duclo') sai = true;
            }
            else {
                empty = true;
            }
        }
        else {
            empty = true;
        }
    })

    if(sai) return self.chipi(self._('Không có vật phẩm búa đục'));
    if(empty) return self.chipi(self._('Không có vật phẩm này để đục'));

    self.send(-9,[
        3,
        id,
        self.cache.duclo.data
    ])

    return self.wait('Xin chờ...');



}