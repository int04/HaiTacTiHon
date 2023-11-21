let int04 = require('../../Model/init04.js');
let res_mob = require('../../../res/res_mob.js');
let cache_mob = require('../../cache/mob.js');
let mob = require('../../../res/mob.js');
let mapBase = require('../../../res/res_map.js');
module.exports = async function(map,zone,socket) {

    let mobinmap = mob[map];
    if(mobinmap) {
        let sum = await cache_mob.count({ map : map, zone : zone }).exec();
        if(sum <=0) {
            for(let uid in mobinmap) {
                let XY = mobinmap[uid];
                for(let i = 0; i < XY.length; i+=2) {
                    let x = XY[i];
                    let y = XY[i+1];
                    let base_mob = res_mob.find(e => e.uid == uid);
                    if(base_mob) {
                        let chiso = int04.chiso(base_mob.chiso);
                        if(base_mob.type && base_mob.type === 'boss') {
                            let baseMap = mapBase.find(e => e.id == map);
                            let name = baseMap.name;
                            socket.sendAll([
                                name,
                                zone,
                                base_mob.name,
                            ],"BOSS_SPAWN");
                        }
                        cache_mob.create({
                            id : int04.az(6),
                            uid : base_mob.uid, 
                            map : map,
                            zone : zone,
                            x : x,
                            y : y,
                            info : {
                                coban : {},
                                chiso : chiso,
                            },
                            time : Date.now(),
                            data : base_mob,
                        });
                    }

                }
            }
        }
    }

}