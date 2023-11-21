let int04 = require('../../Model/init04.js');
let mysqli = require('../../Model/mysqli.js');
let md5 = require('md5');
let cache_player = require('../../cache/player.js');
let validator = require('validator');

let checkNick = (id) => {
    return new Promise((res,fai) => {
        mysqli.query(`SELECT * FROM nick WHERE id = ?`,[id],(err,rows) => {
            if(err) return fai(err);
            if(rows.length > 0) return res(rows[0]);
            return res(false);
        });
    });
}

let checkName = (name) => {
    return new Promise((res,fai) => {
        mysqli.query(`SELECT * FROM nhanvat WHERE name = ?`,[name],(err,rows) => {
            if(err) return fai(err);
            if(rows.length > 0) return res(rows[0]);
            return res(false);
        });
    });
}

let getNumNhanVat = (id) => {
    return new Promise((res,fai) => {
        mysqli.query(`SELECT * FROM nhanvat WHERE uid = ?`,[id],(err,rows) => {
            if(err) return fai(err);
            if(rows.length > 0) return res(rows);
            return res([]);
        });
    })
};



module.exports = async function(socket,data) {
    let name = data[1];
    let he = data[2];
    if(!name || !he) return socket.sendCode(-71);
    let nickid = socket.nickID;
    if(!socket.nickID) return socket.sendCode(-69);

    name = validator.escape(name);
    name = name.toLowerCase();
    if(!validator.isAlphanumeric(name)) return socket.sendCode(-71);
    if(name.length < 5 || name.length >= 10) return socket.sendCode(-72);
    if(he < 1 || he > 5) return socket.sendCode(-73);

    let nick = await checkNick(nickid);
    if(!nick) return socket.sendCode(-69);
    let check = await checkName(name);
    if(check) return socket.sendCode(-74);

    let num = await getNumNhanVat(nickid);
    if(num.length >= 3) return socket.sendCode(-75);

    let my = {
        info : {
            coban : {
                he : he,
            }
        }
    }
    my.info.coban.he = he;

    mysqli.query("INSERT INTO `nhanvat` SET `name` = '"+name+"', `uid` = '"+nickid+"', `info` = '"+JSON.stringify(my.info)+"', `server` = '1'", function(err,rows){
       if(err) {
              console.log(err);
              return socket.sendCode(-76);
       }
       socket.sendCode(-77);
    });

}