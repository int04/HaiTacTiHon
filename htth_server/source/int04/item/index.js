
let used = require('./used.js');

module.exports = function(socket,data) {
    if(socket.uid <=0) return console.log('Chưa đăng nhập');
    if(typeof data !='object') return console.log('Sai kiểu dữ liệu');

    if(data[0] == 1) return used(socket,data);
}