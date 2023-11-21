/**
 * @since04
 * @create is function socket.
 */
let string = require('../../../source/Model/string.js');
let init04 = require('../../../source/Model/init04.js');
module.exports = function(socket) {

    let phu = `~~snowly~~`;

    socket.uid = 0;

    socket.leaveMap = function () {
        let map = socket.map || 0;
        let zone = socket.zone || 0;
        socket.leave(map + '_' + zone);
    }

    socket.joinMap = function (map, zone) {
        // leave old map
        socket.leaveMap();
        socket.map = map;
        socket.zone = zone;
        return socket.join(map + '_' + zone);
    }

    socket.joinPT = function () {
        let my = socket.my;
        if (!my) return false;
        if (my.skin.bangID >= 1) {
            socket.join("BANG_" + my.skin.bangID);
        }
    }

    socket.leavePT = function () {
        let my = socket.my;
        if (!my) return false;
        if (my.skin.bangID >= 1) {
            socket.leave("BANG_" + my.skin.bangID);
        }
    }

    socket.sendAll = function (data, name) {
        socket.broadcast.emit(name || phu + string.az(string.rand(2, 6)), data);
        socket.emit(name || phu + string.az(string.rand(2, 6)), data);

    }


    socket.sendPT = function (data, name) {
        let my = socket.my;
        if (!my) return false;
        if (my.skin.bangID >= 1) {
            socket.to("BANG_" + my.skin.bangID).emit(name || phu + string.az(string.rand(2, 6)), data);
            socket.emit(name || phu + string.az(string.rand(2, 6)), data);
        }
    }

    socket._sendMap = function (data, name) {
        return socket.broadcast.to(socket.map + '_' + socket.zone).emit(name || phu + string.az(string.rand(2, 6)), data);
    }

    socket.sendTo = async function (data, id, name) {
        if (id == socket.uid) return socket.emit(name || phu + string.az(string.rand(2, 6)), data);
        let client = await init04.getPlayer(id);
        if (!client) return false;
        return socket.to(client.socket).emit(name || phu + string.az(string.rand(2, 6)), data);
    }

    socket.sendMap = function (data, name) {
        socket.to(socket.map + '_' + socket.zone).emit(name || phu + string.az(string.rand(2, 6)), data);
        socket.emit(name || string.az(string.rand(2, 6)), data);
    }

    socket.send = function (data, name = null) {
        socket.emit(name || phu + string.az(string.rand(2, 6)), data);
    }

    socket.since04 = function (data, name = null) {
        return socket.send(data, name);
    }

    socket.sendCode = function (code) {
        socket.emit(code);
    }

    socket.noti = function (msg) {
        return socket.send({noti: msg})
    }

    socket.chipi = function (msg) {
        return socket.send({chipi: msg})
    }

    socket.sendToChipi = function (msg, id) {
        return socket.sendTo({chipi: msg}, id)
    }

    socket.sendToNoti = function (msg, id) {
        return socket.sendTo({
            noti: msg
        }, id)
    }

    socket.worker = function (msg, name = null) {
        process.send({
            since04 : msg
        });
    }

    
    socket.sendIO = function(data,id) 
    {           
    }

    console.log(`# ${process.pid} - IO to ID: ${socket.id}`);

    socket.emit('r', 'connect')

    return socket;

}