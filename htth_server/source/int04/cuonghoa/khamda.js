let namespace = require('../../Model/namespace.js');
let init04 = require('../../Model/init04.js');
let item = require('../../../res/item.js');
let config = require('../../../res/config.js');
module.exports = function(socket,data) {
    let my = socket.my;
    let id = data[1];
    let itemData = data[2];
    if(!id) return console.log('no ID');
    if(typeof itemData !== 'object') return console.log('Error data cuonghoa line 9');

    let checkTB = my.ruong.data.find(e => e.id === id && e.active === 'hanhtrang');
    if(!checkTB) return socket.sendCode(-59);

    let infoItemcheckTB = item.find(e => e.id == checkTB.item);
    if(!infoItemcheckTB) return socket.sendCode(-59);
    if(infoItemcheckTB.type !== 'trangbi') return socket.sendCode(-59);

    if(itemData.length >2) return socket.sendCode(-60);

    let lo = checkTB.lo || [];
    let lo_chua_duc = lo.filter(e => e === 0).length;
    if(lo_chua_duc <= 0) return socket.sendCode(-65);


    let sai = false;
    let empty = false;
    let idItem = '';
    let idItemData = '';
    itemData.forEach(e => {
        let bag = my.ruong.data.find(e2 => e2.id === e && e2.active === 'hanhtrang');
        if(bag) {
            let infoItem = item.find(e3 => e3.id == bag.item);
            if(infoItem) {
                if(infoItem.type === 'item' && infoItem.type2 !== 'dakham') sai = true;
                if(infoItem.type === 'item' && infoItem.type2 === 'dakham') {
                    idItem = bag.id;
                    idItemData = bag.item;
                }
            }
            else {
                empty = true;
            }
        }
        else {
            empty = true;
        }
    })

    if(sai) return socket.sendCode(-66);
    if(empty) return socket.sendCode(-59);

    let history = {};
    history.itemID = idItemData;
    history.itemIdCreated = idItem;
    history.old_lo = lo;

    for(let i = 0; i < checkTB.lo.length; i++) {
        if(checkTB.lo[i] === 0) {
            checkTB.lo[i] = idItemData;
            break;
        }
    }
    history.new_lo = checkTB.lo;

    my.ruong = init04.deleteItem(my.ruong,idItem,1);

    init04.log(my.id, 'khamda', history);

    socket.send([
        my.tien,
        my.ruong,
    ],-67)


}