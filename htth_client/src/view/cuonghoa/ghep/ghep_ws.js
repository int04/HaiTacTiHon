import animation_ghep from "./animation.js";

export  default  (self) => {
    self.ws.on(-51, (data) => {
        self.chipi(self._('Không tìm thấy công thức để ghép, vui lòng kiểm tra lại nguyên liệu.'));
    });
    self.ws.on(-52, (data) => {
        self.chipi(self._('Bạn không có đủ bery để ghép vật phẩm này.'));
    });
    self.ws.on(-53, (data) => {
        self.chipi(self._('Bạn không có đủ ruby để ghép vật phẩm này.'));
    });
    self.ws.on(-54, (data) => {
        self.chipi(self._('Danh sách nguyên liệu chưa đủ.'));
    });
    self.ws.on(-55, (data) => {
        self.chipi(self._('Bạn không còn nguyên liệu này ở hành trang.'));
    });
    self.ws.on(-56, (data) => {
        self.chipi(self._('Số lượng nguyên liệu chưa đủ, hãy bổ sung thêm để có thể ghép vật phẩm.'));
    });
    self.ws.on(-57, (data) => {
        self.chipi(self._('không tìm thấy vật phẩm trong công thức này.'));
    });
    self.ws.on(-58, (data) => {
        animation_ghep(self,data);

    });
}