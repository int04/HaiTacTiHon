import selectChar from "./selectChar.js";

export default (self) => {
    self.ws.on(-1, () => {
        self.notice('Tài khoản hoặc mật khẩu không chính xác');
    });

    self.ws.on(-2, () => {
        self.notice(self._('Tài khoản của bạn không có nhân vật này.'));
    });
    self.ws.on(-3, (data) => {
        self.my = data;
        self.create_sprite_my(self.my);
        self.closeLogin();
        self.deleteNotice();
        self.goto(self.my.pos.map,null,self.my.pos.x,self.my.pos.y);
        self.loadGame.visible = true;
        self.renderButton(); // tạo các nút trên màn hình
        self.test_event_login();
    });
    self.ws.on(-68, (data) => {
        return selectChar(self,data);
    });
    self.ws.on(-69, () => {
        self.loginPage();
        self.notice(self._('Không tìm thấy tài khoản của bạn.'));
    });
    self.ws.on(-70, () => {
        self.loginPage();
        self.notice(self._('Không tìm thấy nhân vật này.'));
    });
    self.ws.on(-71, () => {
        self.notice(self._('Chỉ được sử dụng kí tự a-z và 0-9.'));
    });
    self.ws.on(-72, () => {
        self.notice(self._('Tên nhân vật từ 5 - 10 kí tự.'));
    });
    self.ws.on(-73, () => {
        self.notice(self._('bạn chưa chọn nhân vật muốn đồng hành.'));
    });
    self.ws.on(-74, () => {
        self.notice(self._('Tên nhân vật đã được người khác sử dụng, vui lòng chọn tên khác.'));
    });
    self.ws.on(-75, () => {
        self.notice(self._('Tài khoản đã có 3 nhân vật, không thể tạo thêm.'));
    });
    self.ws.on(-76, () => {
        self.notice(self._('Có lỗi xảy ra trong quá trình tạo nhân vật.'));
    });
    self.ws.on(-77, () => {
        self.connectGame();
    });
    self.ws.on(-78, () => {
        self.notice(self._('Tài khoản và mật khẩu chỉ được sử dụng kí tự A-Z.'));
    });
    self.ws.on(-79, () => {
        self.notice(self._('Tài khoản bạn đăng ký đã tồn tại, vui lòng sử dụng tài khoản khác.'));
    });
    self.ws.on(-80, () => {
        self.notice(self._('Có lỗi xảy ra, không thể đăng ký tài khoản.'));
    });
    self.ws.on(-81, () => {
        self.notice(self._('Đăng ký tài khoản thành công. Chúc bạn chơi game vui vẻ.'));
    });
}