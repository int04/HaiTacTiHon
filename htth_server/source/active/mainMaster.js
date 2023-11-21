let mobCron = require('./mobCron.js');

module.exports = (master) => {
    console.log('chạy main')
    let io = {};
    io.sendMap = function(data,info, name = null)
    {
        return master.send({io : {sendMap : [data,info,name]}});
    }
    io.sendAll = function(data, name = null)
    {
        return master.send({io : {sendAll : [data,name]}});
    }
    io.master = master;

    mobCron(io);
}