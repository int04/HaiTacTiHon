
let getMy = require('./getMy');
let int04 = require('../../Model/init04.js');
let explevel = require('../../Model/exp/my.js');
let expskill = require('../../Model/exp/skill.js');
let truhp = (socket,value,old = {}) => {
    let my = socket.my;
    my = int04.info(my);
    if(my.info.chiso.hp <=0) {
        socket.sendMap([
            my.id,
        ],-26)
        return false;
    }
    if(my.info.chiso.hp - value <=0) {
        // chết
        socket.sendMap([
            my.id,
        ],-26)
    }
    my.info.chiso.hp-=value;

    if(old && old.call) {
        socket.sendMap([
            my.id,
            my.info.chiso.hp
        ],-27)
    }

    int04.setPlayer(my);
}

let congexp = (socket,value,skillID) => {
    let my = socket.my;
    my = int04.info(my);
    let exp_next_level = explevel[my.info.coban.level];
    exp_next_level = exp_next_level || 1;
    my.info.coban.exp+=value;
    
    let lay_nua = explevel[my.info.coban.level+1];
    if(lay_nua == undefined) {
        if(my.info.coban.exp >= exp_next_level ) {
            my.info.coban.exp -= 1;
        }
    }
    else 
    {
        if(my.info.coban.exp >= exp_next_level ) {
            my.info.coban.exp = exp_next_level;
        }
    }

    let mySkill = my.skill.find(e => e[0] == skillID);
    let newexp = 0;
    let change_exp = 0;
    if(mySkill) {
        newexp = value/100 * 10;
        newexp = Math.round(newexp);

        let skill_level = mySkill[1];
        let exp_next_level_skill = expskill[skill_level];
        exp_next_level_skill = exp_next_level_skill || 1;
        mySkill[3]+=newexp;

        let lay_nua_skill = expskill[skill_level+1];
        if(lay_nua_skill == undefined) {
            if(mySkill[3] >= exp_next_level_skill ) {
                mySkill[3] -= 1;
            }
        }
        else 
        {
            if(mySkill[3] >= exp_next_level_skill ) {
                mySkill[3] = exp_next_level_skill;
            }
        }

        change_exp = mySkill[3];

        if(mySkill[3] >= exp_next_level_skill ) {
            mySkill[3] = 0;
            mySkill[1]++;
            socket.send([
                my.skill
            ],-24)
        }

    }

    socket.sendMap([
        my.id,
        value,
        my.info.coban.exp,
        skillID,
        change_exp,
    ],-22)

    if(my.info.coban.exp >= exp_next_level ) {
        my.info.coban.exp = 0;
        my.info.coban.level++;
        socket.sendMap([
            my.id,
            my.info.coban,
        ],-23)
    }

    int04.setPlayer(my);

}

let setff = (socket, eff) => {

    let my = socket.my;
    my = int04.info(my);
    my.eff = my.eff || [];
    let change = 0;
    eff.forEach(element => {
        let check = my.eff.find(e => e[0] == element[0] && e[1] == element[1]);
        if(!check) {
            my.eff.push(element);
            change = 1;
        }
    });

    if(change == 1) {
        my = int04.sprite(my);
        socket.sendMap([
            my.id,
            my.eff,
            my.info.chiso
        ], -28);
        int04.setPlayer(my);
    }

}


module.exports = function(io,data) {
    let uid = data.uid;
    if(!uid) return console.log('Thiếu UID');
    let socket = getMy(io,uid);
    if(!socket) return false;
    if(socket.uid <=0) return console.log('UID không hợp lệ');
    let my = socket.my;
    if(!my) return console.log('Không tìm thấy my');

    if(data.action == 'truhp') return truhp(socket,data.value,data);
    if(data.action == 'congexp') return congexp(socket,data.value,data.skill);
    if(data.action == 'eff') return setff(socket,data.eff);



}