
let int04 = require('../../Model/init04.js');
let skill = require('../../../res/kinang.js');
let cache_skill = require('../../cache/skill.js')
let cache_mob = require('../../cache/mob.js')

let tinhdame = require('./tinhdame.js');

let getMob = function (map, zone) {
    return new Promise((res,fai) => {
        cache_mob.find({ map: map, zone: zone }).then((data) => {
            res(data);
        });
    });
}
let dx = (x1, y1, x2, y2) => {
    let x = x1 - x2;
    let y = y1 - y2;
    return Math.sqrt(x * x + y * y);
}

module.exports = async function(socket,data) {
    let my =socket.my;
    my = int04.info(my); 
    
    let idSkill = data[1];
    let idVictim = data[2];
    let type = data[3]; // mob, player, boss
    let victim = false;
    if(type == 'mob') victim = await int04.getMob(idVictim);
    if(type == 'player') victim = await int04.getPlayer(idVictim);
    if(type == 'boss') victim = await int04.getBoss(idVictim);

    let baseSkill = skill.find(e => e.id == idSkill);
    if(!baseSkill || baseSkill.type == 'bidong') return console.log('Ko thấy skill hoặc là bị động');

    let mySkill = my.skill.find(e => e[0] == idSkill);
    if(!mySkill) return console.log('Nhân vật ko có skill này');

    let time = mySkill[2];
    time = time || 0;
    if(time > Date.now()) return console.log('Chưa hết thời gian chờ');


    if(baseSkill.type == 'tancong' && !victim) return console.log('Ko tìm thấy đối tượng',victim);

    let myChiSo = my.info.chiso;
    let victimChiSo = victim.info.chiso;
    if(baseSkill.type == 'tancong' && victimChiSo.hp <= 0) return console.log('Đối tượng đã chết');

    let mpNeed =  Math.round(baseSkill.mp + baseSkill.mp/100 * mySkill[1]);
    if(mpNeed > myChiSo.mp) return console.log('Không đủ mana');

    my.info.chiso.mp -= mpNeed;
    let hoichieu = myChiSo.hoi_chieu;
    let timeCong =  baseSkill.time - hoichieu;
    timeCong = timeCong < 200 ? 200 : timeCong;
    mySkill[2] = Date.now() + timeCong;
    mySkill[4] = Date.now();

    socket.send([
        mySkill[0],
        timeCong,
        my.info.chiso.mp
    ],-15)

    if(baseSkill.type == 'tancong') {
        let tinh = tinhdame(myChiSo,victimChiSo,mySkill[1],baseSkill);
        let dame = tinh.dame;
        let keycode = int04.rand(1000,999999);
        let promise = [];
        let b= cache_skill.create({
            keycode : keycode,
            value : dame,
            from : my.id, 
            to : victim.id,
            type_to : type,
            action : 'truhp',
            check :  tinh.type,
            skill : baseSkill.id,
        })
        promise.push(b);
        let listMob = await getMob(my.pos.map,my.pos.zone);
        let lan = baseSkill.lan || 0;
        if(listMob.length > 0) {
            listMob.forEach(element => {
                if(element.id != victim.id && lan > 0 && dx(element.x,element.y,victim.x,victim.y) < 200 && element.info.chiso.hp >=1 ) {
                    let tinh = tinhdame(myChiSo,element.info.chiso,mySkill[1],baseSkill);
                    let dame = tinh.dame;
                    promise.push(cache_skill.create({
                        keycode : keycode,
                        value : dame,
                        from : my.id,
                        to : element.id,
                        type_to : 'mob',
                        action : 'truhp',
                        check :  tinh.type,
                        skill : baseSkill.id,
                    }));
                    lan--;
                }
            });
        }
        await Promise.all(promise);


        socket.sendMap([
            keycode,
            mySkill[1],
            baseSkill.script,
            my.id,
            victim.id,
        ],-16)
    }

    if(baseSkill.buff) {
        let level = mySkill[1];
        let list_to = [];
        let list_me = [];
        baseSkill.buff.forEach((element,i) => {
            let tenthuoctinh = element[0];
            let value = element[1] >> 0;
            let time = element[2];
            let tile = element[3];
            let doituong = element[4];

            if(tile >= int04.rand(1,100)) {
                let cover = [
                    baseSkill.id,
                    i,
                    level,
                    Date.now() + time*1000,
                ];
                if(doituong === 1) list_me.push(cover);
                if(doituong === 2) list_to.push(cover);


            }
        });

        if(list_to.length >=1 &&  type == 'mob') {
            let eff = victim.eff;
            victim.eff = victim.eff || [];
            list_to.forEach(element => {
                let check = victim.eff.find(e => e[0] == element[0] && e[1] == element[1]);
                if(!check) {
                    victim.eff.push(element)
                }
            });
            //lưu
            cache_mob.updateOne({_id : victim._id},{eff : victim.eff}).then((data) => {
                // gửi tới client
                socket.sendMap([
                    victim.id,
                    victim.eff,
                    false
                ],-28)
            });
        }
        if(list_to.length >=1 &&  type == 'player') {
            process.send({
                since04 : {
                    player : {
                        uid : victim.id,
                        action : 'eff',
                        eff : list_me,
                    }
                }
            })
        }

        if(list_me.length >=1) {
            process.send({
                since04 : {
                    player : {
                        uid : socket.uid,
                        action : 'eff',
                        eff : list_me,
                    }
                }
            })
        }

    }


}