
export default  (self) => {
    let icon = self.getDiv('icon_SMS');
    if(icon) {
        let count_new = 0;
        self.chat.sms.forEach(e => {
            e.data.forEach(e2 => {
                if(e2[2] === 1) count_new++;
            });
        });
        if(count_new >=1) {
            icon.loop = true;
            icon.gotoAndPlay(0);
        }
        else {
            icon.loop = false;
            icon.gotoAndStop(0);
        }

    }
}