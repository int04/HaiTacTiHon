let namespace = require('../../Model/namespace.js');
let init04 = require('../../Model/init04.js');
let item = require('../../../res/item.js');
let config = require('../../../res/config.js');
let ghep = require('../../../res/ghep.js');
module.exports = function (socket,data) {
    let my = socket.my;
    let index = data[1];
    let itemList = data[2];
    if(typeof  itemList !== 'object') return console.log('Error data cuonghoa line 9');

    if(index === -1) return socket.sendCode(-51);

    let congthuc = ghep[index];
    if(!congthuc) return socket.sendCode(-51);

    let tien = congthuc[1];

    if(tien) {
        let myTien = my.tien;
        let beri = tien[0];
        let ruby = tien[1];
        if(beri && beri > myTien.beri) return socket.sendCode(-52);
        if(ruby && ruby > myTien.ruby) return socket.sendCode(-53);
    }

    let createItem = [];

    let itemNeed = congthuc[2];
    if(itemNeed.length !== itemList.length) return socket.sendCode(-51);
    let noItem = false;
    let noQuantity = false;
    let demdu = 0;
    itemNeed.forEach(e_can => {
        if(e_can) {
            let idItem = e_can[0];
            let quantity = e_can[1];
            itemList.forEach(idmyItem => {
                let bag = my.ruong.data.find(e => e.id == idmyItem && e.active === 'hanhtrang');
                if(bag) {
                    if(bag.item === idItem) {
                        demdu++;
                        if(bag.soluong < quantity) noQuantity = true;

                        createItem.push({
                            id : bag.id,
                            item : bag.item,
                            value : quantity,
                            value_fail : quantity - (e_can[2] || 0),
                            value_return : e_can[2] || 0,
                        })
                    }
                }
                else {
                    noItem = true;
                }
            });
        }
    });

    if(demdu !== itemNeed.length) return socket.sendCode(-54);

    if(noItem) return socket.sendCode(-55);
    if(noQuantity) return socket.sendCode(-56);

    let ItemGhep = congthuc[0];
    let idVP = ItemGhep[0];
    let tile = ItemGhep[1];
    let phamchat = ItemGhep[2];
    if(!idVP || !tile) return socket.sendCode(-57);

    let infoItem = item.find(e => e.id == idVP);
    if(!infoItem) return socket.sendCode(-57);

    let history = {};

    if(tien) {
        let myTien = my.tien;
        let beri = tien[0];
        let ruby = tien[1];
        my.tien.beri-= beri || 0;
        my.tien.ruby-= ruby || 0;
        history.tien = {
            beri : beri || 0,
            ruby : ruby || 0,
        }
    }

    /*createItem.push({
                            id : bag.id,
                            value : quantity,
                            value_fail : quantity - (e_can[2] || 0),
                            value_return : e_can[2] || 0,
                        })*/
    let historyItem = [];
    if(tile >= init04.rand(1,100)) {
        // thành công
        history.type = 'success';
        createItem.forEach(e => {
            historyItem.push({
                id : e.id,
                value : e.value,
                item : e.item,
            });
            my.ruong = init04.deleteItem(my.ruong,e.id,e.value);
        });
        phamchat = phamchat || 1;
        phamchat = phamchat < 1 ? 1 : phamchat;
        my.ruong = init04.updateItem(my.ruong,idVP,1,phamchat);
        history.newItem = {
            id : idVP,
            value : 1,
            phamchat : phamchat,
        };
    }
    else {
        history.type = 'fail';
        createItem.forEach(e => {
            my.ruong = init04.deleteItem(my.ruong,e.id,e.value_fail);
            historyItem.push({
                id : e.id,
                value : e.value_fail,
                item : e.item,
            });
        });
    }

    history.delItem = historyItem;

    init04.setPlayer(my);
    init04.log(my.id,'ghep',history);

    socket.send([
        my.tien,
        my.ruong,
        history.type === 'success' ? true : false,
    ],-58)


}