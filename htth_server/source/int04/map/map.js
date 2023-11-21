
let int04 = require('../../Model/init04');
let checkzone = require('./checkzone.js');
let res_map = require('../../../res/res_map.js');
let fs = require('fs');
let npc = require('../../../res/res_npc.js')
let createmob = require('./createmob.js');

let cache_mob = require('../../cache/mob.js');
let cache_player = require('../../cache/player.js');
let res_zone = require('../../../res/zone.js')
let vaomap = (socket,idmap,zone = null, x = null, y = null) => {

    if(idmap) {
        let map = res_map.find(e => e.id == idmap);
        if(map) {
            let my = socket.my;

            let path = './res/map/'+map.src;
            fs.readFile(path, 'utf8', async function(err, contents) {
                if(err) return console.log('Lỗi đọc file map: '+err);

                let tienhanh = async () =>  {

                    if(x != null) my.pos.x = x;
                    if(y != null) my.pos.y = y;
                    my.pos.map = idmap;
                    my.pos.zone = zone;
                    createmob(my.pos.map,my.pos.zone,socket);

                    int04.setPlayer(my);
                    socket.joinMap(idmap,zone)
                    int04.save(my);
                    
                    
                    let listnpc = npc.filter(e => e.map == idmap);
                    let listMob = await cache_mob.find({map: idmap, zone: zone}).exec();
                    let listPlayer = await  cache_player.find({map: idmap, zone: zone,  uid: { $ne: my.id }}).exec();
                    let listZone = res_zone.filter(e => e[0] == idmap);
                    socket.send([
                        contents,
                        listnpc,
                        listMob, 
                        listPlayer,
                        listZone,
                        // ... các mục khác...
                    ],-4)



                }

                let kiemtra = async () => {
                    let check = await checkzone(idmap,zone);
                    if(check == false) {
                        zone = zone + 1;
                        kiemtra();
                    }
                    else {
                        tienhanh();
                    }
                        
                }

                if(zone != null) {
                    let check = await checkzone(idmap,zone);
                    if(check == false) {
                        return console.log('khu đã đầy');
                    }
                    else {
                        tienhanh();
                    }
                }
                else 
                {
                    zone = 1;
                    kiemtra();
                }

                

            });

        }
        else {
            console.log('Không tìm thấy bản đồ')
            socket.sendCode(-32);
        }
    }

};

module.exports = function(socket,data) {

    if(socket.uid <=0) return false;

    if(typeof data != 'object') return false;
    let type = data[0];
    if(!type) return false;
    if(type == 1) {
        vaomap(socket,data[1],data[2],data[3],data[4]);
    }

}