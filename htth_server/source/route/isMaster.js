/**
 * @since04
 */
let rand = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let cluster                         =           require("cluster");
let http                            =           require("http");
let numCPUs                         =           require("os").cpus().length;
let {setupMaster, setupWorker}      =           require("@socket.io/sticky");
let {createAdapter, setupPrimary}   =           require("@socket.io/cluster-adapter");

let express                         =           require('express');
let app                             =           express();


/* ############################        PROCESS                             ################################ */

let httpServer = http.createServer(app);
let reset = require("./reset.js");
let mainMaster = require("../active/mainMaster.js");
let start = async () => {
    setupMaster(httpServer, {loadBalancingMethod: "least-connection"});

    setupPrimary();

    cluster.setupMaster({serialization: "advanced"});

    httpServer.listen(process.env.PORT);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`,worker.id);
        let newWorker = cluster.fork();
    });

    let master = {};
    master.send = (decodeData, all = false) => {
        let array = [];
        if(all) {
            for (const id in cluster.workers) {
                let pid = cluster.workers[id].process.pid;
                cluster.workers[id].send(decodeData);
            }
        }
        else {
            for (const id in cluster.workers) {
                let pid = cluster.workers[id].process.pid;
                array.push([id,pid]);
            }
            let index = rand(0,array.length-1);
            let pid = array[index][1];
            let id = array[index][0];
            decodeData.pid = pid;
            cluster.workers[id].send(decodeData);

        }

    }
    mainMaster(master);

    // nhận data từ từ các worker
    cluster.on("message", (worker, msg) => {
        if(msg.since04)
        {
            //console.log(`main ${process.pid} nhận từ ${worker.process.pid}: ${JSON.stringify(msg)}`);
            for (const id in cluster.workers) {
                cluster.workers[id].send(msg);

            }
        }
    });
}

start();

module.exports = {};
