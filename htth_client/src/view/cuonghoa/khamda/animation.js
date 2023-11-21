export default (self, data) => {
    let my = self.my;
    my.tien = data[0];
    my.ruong = data[1];
    let status = data[2];
    self.deleteNotice();

    let thanhcong = status[0] ? 1 : 0
    let o_nangcap_0 = self.findText('o_nangcap_0');
    let o_nangcap_1 = self.findText('o_nangcap_1');
    if(o_nangcap_1) {
        if(o_nangcap_0) {
            self.move(o_nangcap_0,{
                x : o_nangcap_1.x,
                y : o_nangcap_1.y,
            },1000,null,null, () => {
                let eff = self.findText("animation_run_nangcap");
                let msg = () => {
                    if(status[0]) {
                        self.chipi(self._('Nâng cấp thành công'));
                    }
                    else {
                        if(status[1] >=1) {
                            if(status[2]) {
                                self.chipi(self._('Nâng cấp thất bại, trang bị được bảo vệ cấp thành công.'));
                            }
                            else {
                                self.chipi(self._('Nâng cấp thất bại, trang bị của bạn bị tụt 1 cấp độ.'));
                            }
                        }
                        else {
                            self.chipi(self._('Nâng cấp thất bại ! Hãy thử lại nhé !'));
                        }
                    }
                    self.nangcap();
                }
                if(eff) {
                    eff.visible = true;
                    eff.play();
                    eff.onComplete = () => {
                        eff.visible = false;
                        let eff_thanhcong = self.findText("animation_success_nangcap");
                        if(thanhcong === 1 && eff_thanhcong) {
                            eff_thanhcong.visible = true;
                            eff_thanhcong.play();
                            eff_thanhcong.onComplete = () => {
                                msg();
                                eff_thanhcong.visible = false;
                            }
                        }
                        else if(thanhcong === 0) {
                            msg();
                        }

                    }
                }
            });
        }

    }


}