let mysql = require('mysql');


let con = mysql.createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database:  process.env.DB_NAME,
});


con.connect(function(err) {
	if (err) throw err;
});

module.exports = con;