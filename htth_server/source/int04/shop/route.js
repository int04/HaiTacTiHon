let buy = require('./buy.js');
let sell = require('./sell.js');
module.exports = function(socket,data) {
    if(typeof data != 'object') return console.log('error data is not object');
    if(socket.uid <=0) return console.log('No login');
    if(data[0] === 1) return buy(socket,data);
    if(data[0] === 2) return sell(socket,data);

}