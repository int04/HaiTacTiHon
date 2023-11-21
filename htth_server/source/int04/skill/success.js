
let int04 = require('../../Model/init04.js');
let cache_skill = require('../../cache/skill.js');
let kill = require('./kill.js');
let program = async (socket,keycode) => {
    let my = socket.my;

    let list = await cache_skill.find({keycode:keycode}).exec();

    let array  =[];
    for(let res of list) {
        if(res.from == my.id)
            array.push(promiseRun(res,socket));
    }

    let result = await Promise.all(array);
    if(result.length == list.length) {
        cache_skill.deleteMany({keycode:keycode}).exec();
    }

}

let promiseRun = (data,socket) => {
    return new Promise( async (res,fai) => {

        let to = data.to;
        let from = data.from;
        let value = data.value;
        let type_to = data.type_to; // loại đối tượng mob, player, boss
        let action = data.action; // loại hành động
        let skill = data.skill; // loại skill

        let info_object;
        if(type_to == 'mob') info_object = await int04.getMob(to);
        if(type_to == 'player') info_object = await int04.getPlayer(to);

        if(info_object) {
            if(action == 'truhp') {
                if(info_object.info.chiso.hp <= 0) {
                    socket.sendMap([
                        to
                    ],-26)
                    return res(true);
                }
                if(info_object.info.chiso.hp - value <= 0) {
                    // giết
                    if(type_to == 'mob' && socket.uid == from) {
                        info_object = kill(info_object,socket);
                    }
                }

                // cộng xp cho người chơi
                if(type_to == 'mob') {
                    let exp = info_object.data.exp;
                    exp = exp || 1;
                    let thiethai = value/info_object.info.chiso.hpmax;
                    if(thiethai > 1) thiethai = 0.1;
                    thiethai = Math.fround(thiethai);
                    let thucnhan = exp*thiethai;
                    thucnhan = Math.round(thucnhan);
                    let nhan = int04.rand(thucnhan,thucnhan*1.2);

                    process.send({
                        since04 : {
                            player : {
                                uid : from,
                                action : 'congexp',
                                value : nhan,
                                skill : skill
                            }
                        }
                    })
                }

                info_object.info.chiso.hp-=value;
                socket.sendMap([
                    0,
                    to,
                    value*-1,
                    data.check,
                    info_object.info.chiso.hp
                ],-17) 
            }

            if(type_to == 'player') {
                process.send({
                    since04 : {
                        player : {
                            uid : to,
                            action : action,
                            value : value
                        }
                    }
                })
            }

            if(type_to == 'mob') int04.setMob(info_object)
        }

        res(true);
    });
}

module.exports = async (socket,data) => {
    let my = socket.my;
    let keycode = data[1];
    if(!keycode) return false;
    program(socket,keycode);

}