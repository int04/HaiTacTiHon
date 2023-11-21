let int04 = require('../../Model/init04.js');
let cache_player = require('../../cache/player.js');
module.exports = function(socket) {
    let my = socket.my;
    if(socket.uid >=1) {
        socket.uid = 0;
        socket.nickID = 0;
        socket.leaveMap();
        int04.save(my);
        cache_player.deleteOne({
            uid: my.id
        }).exec();
        console.log(my.name,' OUT');
        socket.my = {};
    }
} 