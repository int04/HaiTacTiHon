let nangcap = require('./nangcap.js');
let ghep = require('./ghep.js');
let duclo = require('./duclo.js');
let khamda = require('./khamda.js');
module.exports = function(socket,data) {
    if(socket.uid <=0) return console.log('No login');
    if(typeof data !== 'object') return console.log('Error data cuonghoa');
    let type = data[0];
    if(type === 1) return nangcap(socket,data);
    if(type === 2) return ghep(socket,data);
    if(type === 3) return duclo(socket,data);
    if(type === 4) return khamda(socket,data);
}