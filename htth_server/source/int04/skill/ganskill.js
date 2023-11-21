
let int04 = require('../../Model/init04.js');

module.exports = function(socket,data) {
    let my = socket.my;
    my = int04.info(my);
    let i = data[1];
    let id = data[2];
    my.oskill[i] = id;
    socket.sendCode(-14);
}