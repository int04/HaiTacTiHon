export default  (self) => {
    self.ws.on(-8, () => {
        self.notice(self._('Không tìm thấy vật phẩm'));
    });
    self.ws.on(-9, () => {
        self.notice(self._('Mã lỗi -9, vui lòng báo admin.'));
    });

    self.ws.on(-10, () => {
        self.notice(self._('Bạn chưa đủ cấp độ để sử dụng vật phẩm này'));
    });

    self.ws.on(-11, () => {
        self.notice(self._('Nhân vật của bạn không thể sử dụng vật phẩm này.'));
    });

    self.ws.on(-13, (data) => {
        let id = data[0];
        let trangbi = data[1];
        let info = data[2];
        let skin = data[3];
        let ruong = data[4];
        let getMy = self.getMy(id);

        getMy.trangbi = trangbi;
        getMy.info = info;
        getMy.skin = skin;
        getMy.ruong = ruong;


        if(getMy.id == self.my.id) {
            self.deleteNotice();
            self.hanhTrang();
        }
    });
}