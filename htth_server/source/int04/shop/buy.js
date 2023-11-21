let namespace = require('../../Model/namespace.js');
let init04 = require('../../Model/init04.js');
let item_cost = require('../../../res/shop/item_cost.js');
/*
* @name: buy
* @from : int04
* */

module.exports = function(socket,data) {
    let id = data[1];
    let quantity = data[2];
    if(!id || !quantity) return console.log('Error data buy: ID or quantity is null');

    quantity = namespace.int(quantity);

    if(quantity <=0) return console.log('Error quantity <= 0');

    let item = item_cost.find(e => e[0] == id);
    if(!item) return console.log('Error item not found:',id);

    let idItem = item[0];
    let buyItem = namespace.int(item[1]);
    let sellItem = namespace.int(item[2])
    let typeItem = item[3];

    if(buyItem <=0) return socket.sendCode(-33);

    let my = socket.my;

    let cost = buyItem * quantity;
    cost = Math.round(cost);

    if(typeItem === 1 && cost > my.tien.beri) socket.sendCode(-34);
    if(typeItem === 2 && cost > my.tien.ruby) socket.sendCode(-35);

    let slot = init04.checkBag(my.ruong,idItem,quantity);
    console.log("return:",slot)
    if(slot === -1) return socket.sendCode(-36);
    if(slot <=0) return socket.sendCode(-37);

    if(typeItem === 1) my.tien.beri -= cost;
    if(typeItem === 2) my.tien.ruby -= cost;

    my.ruong = init04.updateItem(my.ruong,idItem,quantity);
    init04.setPlayer(my);

    init04.log(my.id,'shop',{
        type : 'buy',
        idItem : idItem,
        cost : cost,
        quantity : quantity,
        cost_type : typeItem,
    })

    socket.send([
        my.tien,
        my.ruong,
    ],-38);




}