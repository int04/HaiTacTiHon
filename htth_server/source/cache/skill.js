let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Created = new Schema({
	keycode : {type : Number, required : true, index : true},
    value : {type :Number},
    from : {type : String, required : true},
    to : {type : String, required : true},
    type_to : {type : String, required : true},
    action : {type : String, required : true},
    check : {type : Number, default : 0},
    skill : {type : String, default : ''},

});

module.exports = mongoose.model('skill', Created); 