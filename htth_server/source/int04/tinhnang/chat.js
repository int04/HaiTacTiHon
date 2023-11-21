let int04 = require('../../Model/init04.js');
let namespace = require('../../Model/namespace.js');
let chat_zone = (socket,data) => {
    let noidung = data[2];
    if(!noidung) return false;
    if(noidung.length >= 150) return false;
    if(noidung.length <= 0) return false;
    let uid = socket.uid;
    socket.sendMap([
        uid,
        noidung
    ],-29);
}

let chat_all = (socket,data) => {
    let noidung = data[2];
    if(!noidung) return false;
    if(noidung.length >= 150) return false;
    if(noidung.length <= 0) return false;
    let uid = socket.uid;
    let my = socket.my;
    if(my.tien.ruby < 5 && my.tien.beri < 50000) {
        return false;
    }
    if(my.tien.ruby >=5) {
        my.tien.ruby -= 5;
        int04.log(uid,'chatMSG_ruby',data);
    }
    else
    if(my.tien.beri >= 50000) {
        my.tien.beri -= 50000;
        int04.log(uid,'chatMSG_beri',data);
    }
    socket.send([my.tien.beri,my.tien.ruby],-30);
    socket.sendAll([
        my.skin,
        my.name,
        noidung
    ],-31);
    int04.setPlayer(my);

}

let chat_private = async (socket,data) => {
    let my = socket.my;
    let to = data[2];
    let text = data[3];
    if(!to || !text) return console.log('no ID || no text');
    to = namespace.toInt(to);
    if(text.length >= 300 || text.length <= 0) return console.log('text length');
    let toPlayer = await int04.getPlayer(to);
    if(!toPlayer) return socket.sendCode("S_OFFLINE");

    socket.send([
        to,
        text,
        toPlayer.name,
    ],'SMS_ME');
    socket.sendTo([
        my.id,
        my.name,
        text
    ],to,'SMS_REVICE');

}

module.exports = (socket,data) => {
    let type = data[1];
    if(socket.uid <=0) return console.log('No login')
    if(type === 1) chat_zone(socket,data);
    if(type === 2) chat_all(socket,data);
    if(type === 3) chat_private(socket,data);

}