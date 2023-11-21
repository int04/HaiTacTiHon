let traidat = require("./json/traidat.js");
let rada = require("./json/rada.js");
let saiyan = require("./json/saiyan.js");
let namek= require("./json/namek.js");
let sachvo = require("./json/sachvo.js");
let caitrang = require("./json/caitrang.js");
let ruong = require("./json/ruong.js");

let khac = require("./json/khac.js");

let nhiemvu = require("./json/nhiemvu.js");

let list = [];
list = list.concat(traidat, rada, saiyan,namek,sachvo,caitrang, ruong,khac,nhiemvu);
module.exports = list;
