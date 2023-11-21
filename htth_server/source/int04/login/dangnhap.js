let int04 = require('../../Model/init04.js');
let mysqli = require('../../Model/mysqli.js');

let md5 = require('md5');

let cache_player = require('../../cache/player.js');

let checkAccount = (username, password) => {
    return new Promise((res,fai) => {
        mysqli.query(`SELECT * FROM nick WHERE username = ? AND password = ?`,[username,md5(password)],(err,rows) => {
            if(err) return fai(err);
            if(rows.length > 0) return res(rows[0]);
            return res(false);
        });
    })
}

let getnhanVat = (id) => {
    return new Promise((res,fai) => {
        mysqli.query(`SELECT * FROM nhanvat WHERE uid = ?`,[id],(err,rows) => {
            if(err) return fai(err);
            if(rows.length > 0) return res(rows);
            return res([]);
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

module.exports = async function(socket,data) {
    let username = data[1];
    let password = data[2];
    if(!username || !password) return console.log('lỗi');

    let taikhoan = await checkAccount(username,password);
    if(!taikhoan) return socket.sendCode(-1);

    let id = taikhoan.id;
    let lastUID = taikhoan.uid;

    let nhanvatList = await getnhanVat(id);

    let arrayChar = [];

    socket.nickID = id;

    nhanvatList.forEach(nhanvat => {
        let my = {};
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
        arrayChar.push({
            id : my.id,
            name : my.name,
            level : my.info.coban.level,
            skin : my.skin,
            last : lastUID === my.id,
        })
    });

    socket.send(arrayChar,-68);

}