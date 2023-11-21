let int04 = require('../../Model/init04.js');
let cache_player = require('../../cache/player.js');

module.exports = function(socket,data) {
    if(!socket.uid) return false;
    if(typeof data != 'object') return console.log('Lỗi dữ liệu');
    let x = data[0];
    let y = data[1];
    let my = socket.my;
    my.pos.x = x;
    my.pos.y = y;
    socket._sendMap([
        my.id,
        my.pos.x,
        my.pos.y,
    ],-6);
    int04.setPlayer(my);
}