
let int04 = require('../../Model/init04.js');

let item = require('../../../res/item.js');
module.exports = function(socket,data) {
    let my = socket.my;
    my = int04.info(my);
    let id = data[1];
    if(!id) return false;

    if(my.info.chiso.hp <=0) {
        return socket.sendCode(-19);
    }

    let myItem = my.ruong.data.find(e => e.id == id && e.active == 'hanhtrang');
    if(!myItem) {
        socket.sendCode(-8);
        return console.log('ko tìm thấy item');
    }

    let baseItem = item.find(e => e.id == myItem.item);
    if(!baseItem) {
        socket.sendCode(-9);
        return console.log('Không đọc được dữ liệu');
    }

    if(baseItem.level && baseItem.level >=1 && my.info.coban.level < baseItem.level) {
        socket.sendCode(-10);
        return console.log('level không đủ');
    }

    if(baseItem.class && baseItem.class >=1 && my.info.coban.he != baseItem.class) {
        socket.sendCode(-11);
        return console.log('class không đủ');
    }
    if(baseItem.type == 'trangbi') {
        let type = baseItem.type2;
        // kiểm tra xem đã có trang bị chưa
        if(my.trangbi[type] && my.trangbi[type] != 0) {
            let oldItem = my.ruong.data.find(e => e.id == my.trangbi[type] && e.active == 'trangbi');
            if(oldItem) {
                oldItem.active = 'hanhtrang';
                oldItem.time = Date.now();
            }
            my.trangbi[type] = 0;
        }
        my.trangbi[type] = id;
        myItem.active = 'trangbi';
        myItem.time = Date.now();
        my = int04.sprite(my);

        int04.setPlayer(my);
        
        socket.sendMap([
            my.id,
            my.trangbi,
            my.info,
            my.skin,
            my.ruong
        ],-13);
    }
    else 
    if(baseItem.type == 'item' && myItem.soluong <=0) {
        my.ruong.data.splice(my.ruong.data.indexOf(myItem),1);
        return socket.sendCode(-20);
    }
    else 
    if(baseItem.type == 'item' && baseItem.type2 == 'thucan') {
        if(baseItem.thuoctinh) {
            let type = {
                hp : 1,
                mp : 2
            }
            let res = '';
            let cong = 0;
            for(let name in baseItem.thuoctinh) {
                cong = baseItem.thuoctinh[name];
                if(cong != 0 ) {
                    my.info.chiso[name] +=cong;
                    res = name;
                    if(my.info.chiso[name] > my.info.chiso[name + 'max']) {
                        my.info.chiso[name] = my.info.chiso[name + 'max'];
                    }
                }
            }
            if(res.length >=1) {
                myItem.soluong -=1;
                if(myItem.soluong <=0) {
                    my.ruong.data.splice(my.ruong.data.indexOf(myItem),1);
                }
                int04.setPlayer(my);

                socket.sendMap([
                    my.id,
                    type[res],
                    cong,
                    my.info.chiso[res],
                    myItem.soluong,
                    myItem.id,
                ],-18);
            }
            else 
            {
                socket.sendCode(-21);
            }
        }
    }
    else 
    {
        socket.sendCode(-12);
    }
}