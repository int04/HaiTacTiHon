
let int04 = require('../Model/init04.js');


let tacdung= (socket) => {
    let my = socket.my;
    my = int04.info(my);
    my.eff = my.eff || [];
    let change = 0;
    my.eff.forEach((element,index) => {
        let time = element[3];
        if(time <= Date.now()) {
            my.eff.splice(index,1);
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

let running = async function(io) {

    let allSockets = io.of('/').sockets;

    for(let i of allSockets) {
        let player = i[1];
        if(player.uid >=1) 
        {
            tacdung(player);
        }
    }
    
    
    

    setTimeout(function() {
        running(io);
    }, 1000);
}


module.exports = async function(io) {
    running(io)
}