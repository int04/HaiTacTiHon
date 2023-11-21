/* 
    @http api for server
*/
const con = require('../Model/mysqli.js');
let login = require('./login.js');
module.exports = function(app, io) {


    app.get('/api/login', function(req, res) {
        console.log(`# ${process.pid} - to HTTP `);
        login(res,io)
    });    


}