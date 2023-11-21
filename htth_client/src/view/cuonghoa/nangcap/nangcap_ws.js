import animation_nangcap from "./animation.js";

export  default (self) => {
    self.ws.on(-41, (data) => {
        self.chipi(self._('Không tìm thấy trang bị'));
    });
    self.ws.on(-42, (data) => {
        self.chipi(self._('Không phải trang bị'));
    });
    self.ws.on(-43, (data) => {
        self.chipi(self._('Trang bị đã đạt cấp tối đa.'));
    });
    self.ws.on(-44, (data) => {
        self.chipi(self._('Thiếu vật phẩm nâng cấp.'));
    });
    self.ws.on(-45, (data) => {
        self.chipi(self._('Nâng cấp thất bại, có loại vật phẩm cùng loại với nhau.'));
    });
    self.ws.on(-46, (data) => {
        self.chipi(self._('Nâng cấp thất bại, có vật phẩm không thể sử dụng để có thể nâng cấp'));
    });
    self.ws.on(-47, (data) => {
        self.chipi(self._('Bạn không đủ đá để nâng cấp'));
    });
    self.ws.on(-48, (data) => {
        self.chipi(self._('Bạn không đủ beri để nâng cấp.'));
    });
    self.ws.on(-49, (data) => {
        self.chipi(self._('Để nâng cấp trang bị này, bạn cần có loại đá cấp cao hơn.'));
    });

    self.ws.on(-50, (data) => {
        animation_nangcap(self,data);
    });
}