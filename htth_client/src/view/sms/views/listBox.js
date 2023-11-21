import viewMessages from "./viewMessages.js";


export default  (self) => {

    let data = [];
    data.push([-999,'Tin đến'])

    let list = self.chat.sms;
    list.forEach((e,i) => {
        let sumNew = e.data.filter(sms => sms[2] === 1 && sms[0] !== self.my.id).length;
       data.push([e.id,e.name + (sumNew > 0 ? ' (' + sumNew + ')' : '')]);
    });

    let array = [];

    data.forEach((e) => {
        array.push([
            e[1],
            'event',
            () => {
                return viewMessages(self,e[0])
            }
        ])
    })

    return self.openShowMenu('Tin nhắn',array)


}