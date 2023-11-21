let ganskill = require('./ganskill.js');
let attack = require('./attack.js');
let success = require('./success.js');
module.exports = function(socket,data) {
    if(socket.uid <=0) return console.log('Chưa đăng nhập');
    if(typeof data != 'object') return console.log('Lỗi kiểu dữ liệu');

    let type = data[0];

    if(!type) return false;
    if(type == 1) return ganskill(socket,data);
    if(type == 2) return attack(socket,data);
    if(type == 3) return success(socket,data);

} 