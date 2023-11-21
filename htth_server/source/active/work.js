let player = require('./work/player.js');
let main = function(io,data) 
{
    if(data.player) return player(io,data.player);
}

module.exports = function(io) 
{
    process.on("message", (msg) => {
        if(msg.since04)
        {
           // console.log(`#${process.pid} nhận: ${JSON.stringify(msg.since04)}`);
            return main(io,msg.since04);
        }
        if(msg.io) {
            let pid = process.pid;
            if(msg.io.sendMap) {
                let data = msg.io.sendMap[0];
                let info = msg.io.sendMap[1];
                let name = msg.io.sendMap[2];
                io.to(info.pos.map+'_'+info.pos.zone).emit(name || string.az(string.rand(2,5)),data)
            }
            if(msg.io.sendAll) {
                let data = msg.io.sendAll[0];
                let name = msg.io.sendAll[1];
                io.emit(name || string.az(string.rand(2,5)),data)
            }
        }
    });

    let port = process.env.PORT;
}