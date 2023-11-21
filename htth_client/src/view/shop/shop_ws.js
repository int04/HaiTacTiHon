export default  (self) => {
    self.ws.on(-33, (data) => {
        self.chipi(self._('Không thể mua vật phẩm này'));
    });

    self.ws.on(-34, (data) => {
        self.chipi(self._('Tài khoản của bạn không đủ bery để thực hiện.'));
    });

    self.ws.on(-35, (data) => {
        self.chipi(self._('Tài khoản của bạn không đủ ruby để thực hiện.'));
    });

    self.ws.on(-36, (data) => {
        self.chipi(self._('Hành trang đã mang 999 vật phẩm.'));
    });

    self.ws.on(-37, (data) => {
        self.chipi(self._('Hành trang không còn đủ chỗ trống.'));
    });

    self.ws.on(-38, (data) => {
        self.deleteNotice();
        self.chipi(self._('Giao dịch thành công.'));
        let my = self.my;
        my.tien = data[0];
        my.ruong = data[1];
        let check_ruby = self.findText('text_ruby');
        if(check_ruby) {
            check_ruby.text = self.number_format(my.tien.ruby);
        }
        let check_beri = self.findText('text_beri');
        if(check_beri) {
            check_beri.text = self.number_format(my.tien.beri);
        }
    });

    self.ws.on(-39, (data) => {
        self.chipi(self._('Không đủ số lượng để bán'));
    });

    self.ws.on(-40, (data) => {
        self.deleteNotice();
        self.chipi(self._('Giao dịch thành công.'));
        let my = self.my;
        my.tien = data[0];
        my.ruong = data[1];
        let check_ruby = self.findText('text_ruby');
        if(check_ruby) {
            check_ruby.text = self.number_format(my.tien.ruby);
        }
        let check_beri = self.findText('text_beri');
        if(check_beri) {
            check_beri.text = self.number_format(my.tien.beri);
        }

        let item = data[2];
        let id = item[0];
        let newquantiti = item[1];
        let typeItem = item[2];
        if(typeItem === 1) {
            if(newquantiti < 1) {
                let render = self.findText('item_' + id);
                if(render) self.hideTextChild(render);
            }
            else {
                let render = self.findText('quantity_' + id);
                if(render) render.text = newquantiti;
            }
        }
        else {
            let render = self.findText('item_' + id);
            if(render) self.hideTextChild(render);
        }
    });
}