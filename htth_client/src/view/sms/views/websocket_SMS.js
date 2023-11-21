import renderSMS from "./renderSMS.js";
import newSMS from "./newSMS.js";
import lightSms from "./lightSms.js";
export default (self) => {
    self.ws.on("S_OFFLINE", () => {
        self.chipi("Người chơi này đã thoát game rồi.")
    });

    self.ws.on("SMS_ME", (data)=> {
        let to = data[0];
        let sms = data[1];
        let name = data[2];
        let log = self.chat.sms.find(e => e.id === to);
        if(log) {
            log.data.push([self.my.id, sms, 0]);
        }
        else {
            self.chat.sms.push({
                id : to,
                name : name,
                data : [
                    [self.my.id, sms, 0]
                ]
            });
        }
        // kiểm tra cập nhật render mới tự động
        let who = self.getDiv('body_SMS_'+to);
        if(who) {
            let text = self.my.name+': '+sms;
            renderSMS(self, text,0x00ff00);
        }
    });
    self.ws.on("SMS_REVICE", (data)=> {
        let from = data[0];
        let name = data[1];
        let text = data[2];
        let log = self.chat.sms.find(e => e.id === from);
        let who = self.getDiv('body_SMS_'+from);
        let xem = who ? 0 : 1;

        if(log) {
            log.data.push([from, text, xem]);
        }
        else {
            self.chat.sms.push({
                id : from,
                name : name,
                data : [
                    [from, text, xem]
                ]
            });
        }
        if(who) {
            text = name+': '+text;
            renderSMS(self, text);
        }
        else {
            newSMS(self, [from, name, text]);
            lightSms(self)
        }
    });
}