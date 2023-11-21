
export default (self) => {
    let my = self.my;
    if(my.id <=0) return self.chipi(self._('Bạn chưa đăng nhập'));

    let id = self.cache.nangcap.id;

    // kiểm tra xem chọn trang bị chưa
    if(!id) return self.chipi(self._('Bạn chưa chọn trang bị'));

    // kiểm tra xem có phải trang bị không
    let checkTB = my.ruong.data.find(e => e.id == id && e.active === 'hanhtrang');
    if(!checkTB) return self.chipi(self._('Không tìm thấy trang bị'));

    // kiểm tra trang bị chọn có phải là trang bị hay không
    let infoItemcheckTB = self.item.find(e => e.id == checkTB.item);
    if(!infoItemcheckTB) return self.chipi(self._('Không tìm thấy trang bị'));
    if(infoItemcheckTB.type !== 'trangbi') return self.chipi(self._('Không phải trang bị'));

    // kiểm tra các listItem trong hành trang, đồng thời kiểm tra vi phạm nếu tồn tại
    let empty = false; // không có trong rương
    let trung = false; // lặp 2 vật phẩm cùng loại
    let itemWrong = false; // item sai loại
    let stoneLow = false; // đá không đủ trình
    let stoneValue = false; // không đủ đá
    let haveStone = false;
    let listItem = self.cache.nangcap.data;
    let nangcap = self.config.nangcap;
    let tile = nangcap.tile[checkTB.level];
    if(!tile) return self.chipi(self._('Trang bị đã đạt cấp độ tối đa rồi.'));
    let da = nangcap.da[checkTB.level];
    // kiểm tra trùng
    if(listItem.length <=1) return self.chipi(self._('Bạn chưa chọn đủ vật phẩm'));
    listItem.forEach(s1=> {
        let bag1 = my.ruong.data.find(e => e.id == s1 && e.active === 'hanhtrang');
        if(bag1) {
            let infoItem1 = self.item.find(e => e.id == bag1.item);
            if(infoItem1) {
                if(infoItem1.type === 'item') {
                    if(infoItem1.type2 !== 'botnangcap' && infoItem1.type2 !== 'nangcaotile' && infoItem1.type2 !== 'nangcaptut') {
                        itemWrong = true;
                    }
                    else {
                        if(infoItem1.type2 === 'botnangcap') {
                            haveStone = true;
                        }
                        if(infoItem1.type2 === 'botnangcap' && da > bag1.soluong) {
                            stoneValue = true;
                        }
                        else
                        if(infoItem1.type2 === 'botnangcap' && infoItem1.value < checkTB.phamchat) {
                            stoneLow = true;
                        }
                        else {
                            listItem.forEach(s2=> {
                                let bag2 = my.ruong.data.find(e => e.id == s2 && e.active === 'hanhtrang');
                                if(bag2) {
                                    let infoItem2 = self.item.find(e => e.id == bag2.item);
                                    if(infoItem2) {
                                        if(s1 !== s2 && infoItem2.type === 'item' && infoItem2.type2 === infoItem1.type2) {
                                            trung = true;
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            } else {
                itemWrong = true;
            }
        }
        else {
            console.log(bag1)
            empty = true;
        }


    });
    if(haveStone === false) return self.chipi(self._('Bạn chưa chọn đá nâng cấp'));

    if(empty) return self.chipi(self._('Không tìm thấy vật phẩm'));
    if(trung) return self.chipi(self._('Không thể chọn 2 vật phẩm cùng loại với nhau'));
    if(itemWrong) return self.chipi(self._('Vật phẩm này không thể nâng cấp'));
    if(stoneLow) return self.chipi(self._('Loại đá bạn lựa chọn không thể nâng cấp vật phẩm này.'));
    if(stoneValue) return self.chipi(self._('Bạn không có đủ đá để nâng cấp.'));

    let beri = nangcap.beri[checkTB.level];
    if(beri > my.tien.beri) return self.chipi(self._('Bạn không có đủ beri để nâng cấp'));

    let button_nangcap = self.findText('button_nangcap_item');
    if(button_nangcap) {
        button_nangcap.visible = false;
    }

    self.send(-9,[
        1,
        id,
        listItem
    ])


    return self.wait(self._('Xin chờ...'));

}