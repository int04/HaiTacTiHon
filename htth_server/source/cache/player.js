let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Created = new Schema({
    uid : {type : Number, required : true, index : true},
    map : {type : Number, required : true, index : true},
    zone : {type : Number, required : true, index : true},
    my : {type : Object, default : {}},
    name : {type : String},
});

module.exports = mongoose.model('player', Created); 