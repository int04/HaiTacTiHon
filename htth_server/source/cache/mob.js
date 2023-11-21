let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Created = new Schema({
	id : {type : String, required : true, index : true, unique : true},
    uid : {type : String, required : true, index : true},
    map : {type : Number, required : true, index : true},
    zone : {type : Number, required : true, index : true},
    x : {type : Number, default : 0},
    y : {type : Number, default : 0},
    info :  {type : Object, default : {}},
    time : {type : Number, default : 0},
    data : {type : Object, default : {}},
    eff : {type : Object, default : []},
});

module.exports = mongoose.model('mob', Created); 