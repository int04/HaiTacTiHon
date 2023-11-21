let chat = require('./chat.js');
module.exports = (socket,data) => {
    if(socket.uid <=0) return false;
    if(!data) return false;
    if(typeof  data != 'object') return false;
    let type = data[0];
    if(type === 1) return chat(socket,data);

}