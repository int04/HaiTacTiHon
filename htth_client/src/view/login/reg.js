
export default (self,username,password) => {
    if(!username || username.length < 5 || username.length >=15) return self.notice(self._('Tài khoản từ 5 - 15 kí tự.'));
    if(!password || password.length < 5 || password.length >=15) return self.notice(self._('Mật khẩu từ 5 - 15 kí tự.'));

    self.send(-1,[4,username, password]);

    return self.wait('Đang tạo tài khoản, vui lòng chờ....');

}