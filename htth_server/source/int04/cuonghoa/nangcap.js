let namespace = require('../../Model/namespace.js');
let init04 = require('../../Model/init04.js');
let item = require('../../../res/item.js');
let config = require('../../../res/config.js');
module.exports = function (socket,data) {
    let my = socket.my;
    let id = data[1];
    let listItem = data[2];
    if(!id || !listItem) return console.log('Error data cuonghoa');
    if(typeof listItem !== 'object') return console.log('Error data cuonghoa line 9');


    // kiểm tra xem có phải trang bị không
    let checkTB = my.ruong.data.find(e => e.id == id && e.active === 'hanhtrang');
    if(!checkTB) return socket.sendCode(-41);

    // kiểm tra trang bị chọn có phải là trang bị hay không
    let infoItemcheckTB = item.find(e => e.id == checkTB.item);
    if(!infoItemcheckTB) return socket.sendCode(-41);
    if(infoItemcheckTB.type !== 'trangbi') return socket.sendCode(-42);

    // kiểm tra các listItem trong hành trang, đồng thời kiểm tra vi phạm nếu tồn tại
    let empty = false; // không có trong rương
    let trung = false; // lặp 2 vật phẩm cùng loại
    let itemWrong = false; // item sai loại
    let stoneLow = false; // đá không đủ trình
    let stoneValue = false; // không đủ đá
    let baove = 0;
    let themtile = 0;
    let nangcap = config.nangcap;
    let tile = nangcap.tile[checkTB.level];
    if(!tile) return socket.sendCode(-42);
    let da = nangcap.da[checkTB.level];
    let haveStone = false;
    if(listItem.length <=1) return socket.sendCode(-43);
    listItem.forEach(s1=> {
        let bag1 = my.ruong.data.find(e => e.id == s1 && e.active === 'hanhtrang');
        if(bag1) {
            let infoItem1 = item.find(e => e.id == bag1.item);
            if(infoItem1) {
                if(infoItem1.type === 'item') {
                    if(infoItem1.type2 === 'botnangcap') {
                        haveStone = true;
                    }
                    if(infoItem1.type2 === 'nangcaotile') {
                        tile += infoItem1.value *1;
                        themtile = infoItem1.value *1;
                    }
                    if(infoItem1.type2 === 'nangcaptut') {
                        baove += infoItem1.value *1;
                    }
                    if(infoItem1.type2 !== 'botnangcap' && infoItem1.type2 !== 'nangcaotile' && infoItem1.type2 !== 'nangcaptut') {
                        itemWrong = true;
                    }
                    else {
                        if(infoItem1.type2 === 'botnangcap' && da > bag1.soluong) {
                            stoneValue = true;
                        }
                        else
                        if(infoItem1.type2 === 'botnangcap' && infoItem1.value < checkTB.phamchat) {
                            stoneLow = true;
                        }
                        else {
                            listItem.forEach(s2=> {
                                let bag2 = my.ruong.data.find(e => e.id == s2 && e.active === 'hanhtrang');
                                if(bag2) {
                                    let infoItem2 = item.find(e => e.id == bag2.item);
                                    if(infoItem2) {
                                        if(s1 !== s2 && infoItem2.type === 'item' && infoItem2.type2 === infoItem1.type2) {
                                            trung = true;
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            } else {
                itemWrong = true;
            }
        }
        else {
            empty = true;
        }


    });

    if(haveStone === false) return socket.sendCode(-47);
    if(empty) return socket.sendCode(-41);
    if(trung) return socket.sendCode(-45);
    if(itemWrong) return socket.sendCode(-46);
    if(stoneLow) return socket.sendCode(-49);
    if(stoneValue) return socket.sendCode(-47);
    let beri = nangcap.beri[checkTB.level];
    if(beri > my.tien.beri) return socket.sendCode(-48);

    let history = {};
    history.beri = beri;
    history.item = [];
    // trừ vp
    listItem.forEach(s1=> {
        let bag1 = my.ruong.data.find(e => e.id == s1 && e.active === 'hanhtrang');
        if(bag1) {
            let infoItem1 = item.find(e => e.id == bag1.item);
            if(infoItem1.type === 'item') {
                if(infoItem1.type2 === 'botnangcap') {
                    history.item.push({
                        old : bag1,
                        value : da,
                    });
                    my.ruong = init04.deleteItem(my.ruong,bag1.id,da);
                }
                if(baove > 0 && infoItem1.type2 === 'nangcaptut') {
                    my.ruong = init04.deleteItem(my.ruong,bag1.id,1);
                    history.item.push({
                        old : bag1,
                        value : 1,
                        type : 'chongtut',
                    });
                }
                if(themtile > 0 && infoItem1.type2 === 'nangcaotile') {
                    my.ruong = init04.deleteItem(my.ruong,bag1.id,1);
                    history.item.push({
                        old : bag1,
                        value : 1,
                        type : 'tile',
                    });
                }
            }
        }
    });
    my.tien.beri -= beri;

    // nâng cấp
    let success = false;
    let old = false;
    if(tile >= init04.rand(0,100)) {
        // thành công
        checkTB.level += 1;
        success = true;
        history.oldLevel = checkTB.level - 1;
        history.newLevel = checkTB.level;
        history.levelUp = true;
    }
    else {
        history.levelUp = false;
        // thất bại
        if(baove === 0) { // tụt theo mốc
            let now = checkTB.level;
            let moi = 0;
            if(now >=0 && now <3) moi = 0;
            else if(now >=3 && now <=5) moi = 3;
            else if(now >5 && now <=8) moi = 6;
            else if(now >8 && now <=10) moi = 9;
            checkTB.level = moi;
            history.oldLevel = now;
            history.newLevel = moi;
        }
        else
        if(baove >= init04.rand(1,100)) {  // không bị tụt cấp
            old = true;
            history.oldLevel = checkTB.level;
            history.newLevel = checkTB.level;
        }
        else {
            // bị tụt 1 cấp
            let now = checkTB.level;
            if(now === 0 || now === 3 || now === 6 || now ===9) {
            } else {
                checkTB.level -= 1;
                history.oldLevel = now;
                history.newLevel = checkTB.level;
            }
        }
    }

    init04.setPlayer(my);
    init04.log(my.id,'nangcap',history);

    socket.send([
        my.tien,
        my.ruong,
        [
            success,
            baove,
            old,
        ]
    ],-50);


}