
export default (self) => {
    self.ws.on(-65, (data) => {
        self.chipi(self._('Trang bị này không còn lỗ trống để có thể khảm.'));
    });
    self.ws.on(-66, (data) => {
        self.chipi(self._('Loại đá này không thể khảm vào vật phẩm.'));
    });

    self.ws.on(-67, (data) => {
        self.deleteNotice();
        self.my.tien = data[0];
        self.my.ruong = data[1];
        self.chipi(self._('Khảm đá thành công.'));
        self.khamda();
    });
}