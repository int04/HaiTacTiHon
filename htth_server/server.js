/**
 * @since04
 * @description: server game Dragon Ball Online
 */
require('dotenv').config();
let mongoose = require('mongoose');
require('mongoose-long')(mongoose);
mongoose.connect(process.env.MONGO_HOST);
// check connection
mongoose.connection.on('connected', function () {
    //console.log('Mongoose default connection open to ' + process.env.MONGO_HOST);
});
require('./source/route/cache.js');
require('./source/route/cluster.js');

