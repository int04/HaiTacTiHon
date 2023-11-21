/**
 * @snowlyvn
 * Cache route
 */

cache = {
    pk: {
        moi: [],
        in : [],
    }
}
BOSS = [];
BOSS_DIE = [];
PTxin = [];
PTmoi = [];
chatPT = [];
NPC = []
player = []
vatpham = []
donDanh = [];
mob = [];
giaodich = {
    moi: [],
    dang: [],
};

let vao = require('../../source/Model/base/vao.js');
let string = require('../../source/Model/string.js');
for (let i = 0; i < vao.length; i++) {
    let e = vao[i];
    e.id = string.az(6, 10);
}

module.exports = {};