export default (self) => {
    self.ws.on(-59, (data) => {
        self.chipi(self._('Không tìm thấy trang bị'));
    });
    self.ws.on(-60, (data) => {
        self.chipi(self._('Bạn chỉ được  chọn 2 món để đục thôi'));
    });
    self.ws.on(-61, (data) => {
        self.chipi(self._('Trang bị đã được đục hết các lỗ'));
    });
    self.ws.on(-62, (data) => {
        self.chipi(self._('Bạn không có đủ ruby để thực hiện chức năng này'));
    });
    self.ws.on(-63, (data) => {
        self.chipi(self._('Không tìm thấy búa đục.'));
    });
    self.ws.on(-64, (data) => {
        self.deleteNotice();
        self.my.tien = data[0];
        self.my.ruong = data[1];
        self.chipi(self._('Đục lỗ thành công'));
        self.duclo();
    });
}