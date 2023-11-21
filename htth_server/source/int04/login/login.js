let int04 = require('../../Model/init04.js');

let dangnhap = require('./dangnhap.js');
let nhanvat = require('./nhanvat.js');
let tao = require('./tao.js');
let reg = require('./reg.js');
let thoat = require('./thoat.js');
module.exports = function(socket,data) {

    if(typeof data != 'object') return false;
    let type = data[0];
    if(!type) return false;

    if(type === 1) dangnhap(socket,data);
    if(type === 2) nhanvat(socket,data);
    if(type === 3) tao(socket,data);
    if(type === 4) reg(socket,data);
    if(type === 5) thoat(socket,data);

}