let int04 = require('../../Model/init04.js');
let mysqli = require('../../Model/mysqli.js');

let md5 = require('md5');

let cache_player = require('../../cache/player.js');


let getnhanVat = (id,nickid) => {
    return new Promise((res,fai) => {
        mysqli.query(`SELECT * FROM nhanvat WHERE id = ? and uid = ?`,[id,nickid],(err,rows) => {
            if(err) return fai(err);
            if(rows.length > 0) return res(rows[0]);
            return res(false);
        });
    })
};


let coverJson = (data) => {
    try {
        return JSON.parse(data);
    }
    catch(e) {
        return undefined;
    }
}

let update = (id, charID) => {
    return new Promise((res,fai) => {
        mysqli.query(`UPDATE nick SET uid = ? WHERE id = ?`,[charID,id],(err,rows) => {
            if(err) return fai(err);
            return res(true);
        });
    });
}



module.exports = async function(socket,data) {

    let nickid = socket.nickID;
    if(!socket.nickID) return socket.sendCode(-69);

    let spriteID = data[1];
    if(!spriteID) return socket.sendCode(-70);

    let nhanvat = await getnhanVat(spriteID, nickid);
    if(!nhanvat) return socket.sendCode(-2);
    await update(nickid,spriteID);
    let my = {};
    my.socket = socket.id;
    my.id =     nhanvat.id;
    my.nickid = nhanvat.uid;
    my.name = nhanvat.name;
    my.nhiemvu = coverJson(nhanvat.nhiemvu);
    my.tien = coverJson(nhanvat.tien);
    my.eff = coverJson(nhanvat.eff);
    my.skin = coverJson(nhanvat.skin);
    my.trangbi = coverJson(nhanvat.trangbi);
    my.ruong = coverJson(nhanvat.ruong);
    my.skill = coverJson(nhanvat.skill);
    my.info = coverJson(nhanvat.info);
    my.pos = coverJson(nhanvat.pos);
    my.khac = coverJson(nhanvat.khac);
    my.oskill = coverJson(nhanvat.oskill);

    my.action = {
        move : 'left',
        action  : 'dungyen'
    }
    my.type = 'player';

    my = int04.sprite(my);

    let additem = int04.addItem('xzcd',3);

    //my.ruong.data.push(additem);

    socket.my = my;
    socket.uid = my.id;

    socket.send(my,-3);


    await cache_player.findOneAndDelete({uid:my.id});
    await cache_player.create({
        uid : my.id,
        map : my.pos.map,
        zone : my.pos.zone,
        my : my,
        name : my.name
    });




}