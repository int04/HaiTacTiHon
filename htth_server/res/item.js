let luffy = require('./item/luffy.js');
let sanji = require('./item/sanji.js');
let item = [];
let dakham = require('./item/dakham.js');
let linhtinh = require('./item/linhtinh.js');

let danangcap = require('./item/danangcap.js');

let nami = require('./item/nami.js');
item = item.concat(luffy,dakham,linhtinh, danangcap,sanji);
item = item.concat(nami);

let zoro = require('./item/zoro.js');
item = item.concat(zoro);

let xathu = require('./item/xathu.js');
item = item.concat(xathu);


module.exports = item;