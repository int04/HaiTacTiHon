let thoat                           =           require('../int04/login/thoat.js');
let msg                             =           require('../../source/int04/msg.js');
let string                          =           require('../../source/Model/string.js');
let CreteFunction                   =           require('./socket.io/createFunction.js');
module.exports = function(io) {
    io.on('connection', (socket) => {
        socket = CreteFunction(socket);
        try {
            msg(socket);
        }
        catch (e) {
            console.log(e);
        }
        socket.on('disconnect', () => {
            thoat(socket);
            console.log(`close:# ${process.pid} - IO.ID: ${socket.id}`);
        });
        
    });
}