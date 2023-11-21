
export default (self) => {
    let my = self.my;
    if(my.id <=0) return self.chipi(self._('Bạn chưa đăng nhập'));

    let id = self.cache.khamda.id;

    if(!id) return self.chipi(self._('Bạn chưa chọn trang bị'));

    let checkTB = my.ruong.data.find(e => e.id === id && e.active === 'hanhtrang');
    if(!checkTB) return self.chipi(self._('Không tìm thấy trang bị'));

    let infoItemcheckTB = self.item.find(e => e.id == checkTB.item);
    if(!infoItemcheckTB) return self.chipi(self._('Không tìm thấy trang bị'));
    if(infoItemcheckTB.type !== 'trangbi') return self.chipi(self._('Không phải trang bị'));

    if(self.cache.khamda.data.length >2) return self.chipi(self._('Để đục lỗ chỉ được chọn 2 vật phẩm'));


    let lo = checkTB.lo || [];
    let lo_chua_duc = lo.filter(e => e === 0).length;
    if(lo_chua_duc <= 0) return self.chipi(self._('Trang bị này không còn lỗ trống để khảm đá'));


    let sai = false;
    let empty = false;
    self.cache.khamda.data.forEach(e => {
        let bag = my.ruong.data.find(e2 => e2.id === e && e2.active === 'hanhtrang');
        if(bag) {
            let infoItem = self.item.find(e3 => e3.id == bag.item);
            if(infoItem) {
                if(infoItem.type === 'item' && infoItem.type2 !== 'dakham') sai = true;
            }
            else {
                empty = true;
            }
        }
        else {
            empty = true;
        }
    })

    if(sai) return self.chipi(self._('Loại đá này không thể khảm vào vật phẩm.'));
    if(empty) return self.chipi(self._('Không tìm thấy trang bị này'));

    self.send(-9,[
        4,
        id,
        self.cache.khamda.data
    ])

    return self.wait('Xin chờ...');



}