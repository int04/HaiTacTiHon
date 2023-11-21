let int04 = require('../../Model/init04');
let res_mob = require('../../../res/res_mob.js');

module.exports = (info_object, socket) => {
    if(socket.uid <=0) return false;
    let my = socket.my;

    info_object.info.timehs = info_object.info.timehs || 0;

    let base_info = res_mob.find(e => e.uid == info_object.uid);
    if(base_info) {
        if(base_info.time) {
            info_object.info.timehs = base_info.time + Date.now();
        }
    }

    
    return info_object;
}