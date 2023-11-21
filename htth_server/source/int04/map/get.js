let int04 = require('../../Model/init04.js');
let cache_player = require('../../cache/player.js');
let cache_mob = require('../../cache/mob.js');
let npc = require('../../../res/res_npc.js')
let res_zone = require('../../../res/zone.js')
module.exports = async function(socket,data) {
    if(!socket.uid) return false;
    let my = socket.my;
    let idmap = my.pos.map;
    let zone = my.pos.zone;
    let listnpc = npc.filter(e => e.map == idmap);
    let listMob = await cache_mob.find({map: idmap, zone: zone}).exec();
    let listPlayer = await  cache_player.find({map: idmap, zone: zone,  uid: { $ne: my.id }}).exec();
    let listZone = res_zone.filter(e => e[0] == idmap);
    socket.send([
        listnpc,
        listMob,
        listPlayer,
        listZone
    ],-7)
    console.log('Lấy dữ liệu')
}