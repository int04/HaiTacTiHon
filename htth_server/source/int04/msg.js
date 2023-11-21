
let login = require('./login/login.js');
let map = require('./map/map.js');
let move = require('./map/move.js');
let get = require('./map/get.js');

let base_item = require('../../res/item.js');
let base_skill = require('../../res/kinang.js');

let item = require('./item/index.js');
let int04 = require('../Model/init04.js')

let skill = require('./skill/route.js');

let tinh = require('./tinhnang/route.js');
let res_map = require('../../res/res_map.js');

let idShop = require('../../res/shop/shop.js');
let costShop = require('../../res/shop/item_cost.js');
let config = require('../../res/config.js');
let ghep = require('../../res/ghep.js');
let shop = require('./shop/route.js');
let cuonghoa = require('./cuonghoa/index.js');
module.exports = function(socket) {

    socket.send([
        base_item,
        int04.expskill,
        base_skill,
        int04.explevel,
        res_map,
        idShop,
        costShop,
        config,
        ghep,
    ],'_')

    socket.on('-1', function(data) {
        login(socket, data);
    });
    socket.on(-2, function(data) {
        map(socket, data);
    });
    socket.on(-3, function(data) {
        move(socket, data);
    })

    socket.on(-4, function(data) {
        get(socket, data);
    })

    socket.on(-5, function(data) {
        item(socket, data);
    }
    )

    socket.on(-6, function(data) {
        skill(socket, data);
    }
    )

    socket.on(-7, function(data) {
        tinh(socket, data);
    });

    socket.on(-8, function(data) {
        shop(socket, data);
    });

    socket.on(-9, function(data) {
        cuonghoa(socket, data);
    });

    
}