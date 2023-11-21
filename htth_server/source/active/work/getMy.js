
module.exports = function(io,uid) 
{
    let allSockets = io.of('/').sockets;
    for(let i of allSockets) {
        let player = i[1];
        if(player.uid == uid) 
        {
            return player;
        }
    }
    return false;
}