let int04 = require('../../Model/init04.js');
let mysqli = require('../../Model/mysqli.js');
let md5 = require('md5');
let cache_player = require('../../cache/player.js');
let validator = require('validator');

let checkExits = (username) => {
    return new Promise((resolve,reject) => {
        mysqli.query(`SELECT * FROM nick WHERE username = ?`,[username],(err,rows) => {
            if(err) return reject(err);
            if(rows.length > 0) return resolve(true);
            return resolve(false);
        });
    });
}

module.exports =  async  function(socket,data) {

    let username = data[1];
    let password = data[2];
    if(!username || !password) return console.log('Chưa có thông tin');

    username = validator.escape(username);
    username = username.toLowerCase();
    if(!validator.isAlphanumeric(username)) return socket.sendCode(-78);
    if(username.length < 5 || username.length >= 16) return socket.sendCode(-78);

    password = validator.escape(password);
    if(password.length < 5 || password.length >= 16) return socket.sendCode(-78);


    let exits = await checkExits(username);
    if(exits) return socket.sendCode(-79);

    password = md5(password);

    mysqli.query(`INSERT INTO nick (username,password) VALUES (?,?)`,[username,password],(err,rows) => {
        if(err) return socket.sendCode(-80);
        socket.sendCode(-81);
    });




}