let mysqli = require('../Model/mysqli');
let validator = require('validator');
let string = require('../Model/string');
let md5 = require('md5');

module.exports = function(res, io) {
    let params = res.req.query;
    let username = params.username;
    let password = params.password;

    if(!username || !password) return res.send({status : false, msg : 'Vui lòng nhập tài khoản và mật khẩu'});
    username = validator.escape(username);
    password = validator.escape(password);
    // check A-ZAz0-9
    if(!validator.isAlphanumeric(username)) return res.send({status : false, msg : 'Tài khoản không hợp lệ'});
    if(!validator.isAlphanumeric(password)) return res.send({status : false, msg : 'Mật khẩu không hợp lệ'});
    // check username
    mysqli.query("SELECT * FROM `nick` WHERE `username` = '"+username+"' AND `password` = '"+md5(password)+"' LIMIT 1",function(err,rows){
        if(rows.length <=0) return res.send({status : false, msg : 'Tài khoản hoặc mật khẩu không đúng'});
        mysqli.query("SELECT * FROM `nhanvat` WHERE `uid` = '"+rows[0].id+"' LIMIT 1",function(err,rows2){
            if(rows2.length <=0) return res.send({status : false, msg : 'Chưa tạo nhân vật.'});
            let json = rows2[0];
            let my = {};
            my.name = json.name;
            my.id = json.id;
            my.info = JSON.parse(json.info);
            my.info = my.info.coban;

            res.send({status : true, msg : 'Đăng nhập thành công', data : my});
        });
    });
}