let namespace = require('../../Model/namespace.js');
let init04 = require('../../Model/init04.js');
let item_cost = require('../../../res/shop/item_cost.js');
let item = require('../../../res/item.js');

module.exports = function(socket,data) {
    let id = data[1];
    let quantity = data[2];
    if(!id || !quantity) return console.log('Error data buy: ID or quantity is null');
    quantity = namespace.int(quantity);
    if(quantity <=0) return console.log('Error quantity <= 0');

    let my = socket.my;
    let ruong = my.ruong;

    let getItem = init04.getItem(ruong,id,'hanhtrang');
    if(!getItem) return console.log('NO ITEM IN BAG');

    let itemCost = item_cost.find(e => e[0] === getItem.item);
    if(!itemCost) return console.log('Error item not found:',id);
    let idItem = itemCost[0];
    let buyItem = namespace.int(itemCost[1]);
    let sellItem = namespace.int(itemCost[2])
    let typeItem = itemCost[3];

    if(sellItem <=0) return console.log('ITEM does NOT SELL');
    if(quantity > getItem.soluong) return socket.sendCode(-39);

    let cost = sellItem * quantity;

    if(typeItem === 1) my.tien.beri += cost;
    if(typeItem === 2) my.tien.ruby += cost;

    my.ruong = init04.deleteItem(my.ruong,id,quantity);
    init04.setPlayer(my);

    init04.log(my.id,'shop',{
        type : 'sell',
        id : id,
        idItem : idItem,
        cost : cost,
        quantity : quantity,
        cost_type : typeItem,
        old_data : {
            ITEM : getItem,
        }
    });

    let newQuantity = 0;
    let updateNewQuantity = init04.getItem(ruong,id,'hanhtrang');
    if(updateNewQuantity) newQuantity = updateNewQuantity.soluong;
    let typeItemInfo = item.find(e => e.id == idItem);
    let textureItem = 0;
    if(typeItemInfo && typeItemInfo.type === 'item') textureItem = 1;

    socket.send([
        my.tien,
        my.ruong,
        [
            id, newQuantity, textureItem
        ],
    ],-40);



}