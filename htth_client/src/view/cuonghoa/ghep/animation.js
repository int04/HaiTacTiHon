
export default (self, data) => {
    self.deleteNotice();
    self.my.tien = data[0];
    self.my.ruong = data[1];
    let c = data[2];

    let call = () => {
        if(c) {
            self.chipi(self._('Ghép vật phẩm thành công.'));
        }
        else {
            self.chipi(self._('Ghép vật phẩm thất bại.'));
        }
        self.ghep();
    }

    let animation1 = self.findText("animation_run_ghep");
    if(animation1) {
        animation1.visible = true;
        animation1.play();
        animation1.onComplete = () => {
            animation1.visible = false;
            if(!c) {
                call();
            }
            else {
                let animation2 = self.findText("animation_success_ghep");
                animation2.visible = true;
                animation2.play();
                animation2.onComplete = () => {
                    animation2.visible = false;
                    call();
                };
            }
        }
    }




}
