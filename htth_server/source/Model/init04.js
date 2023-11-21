
let cache_player = require('../cache/player.js');
let cache_mob = require('../cache/mob.js');
let mysqli = require('./mysqli.js');
let kinang = require('../../res/kinang.js');

let expskill = require('../Model/exp/skill.js');
let explevel = require('../Model/exp/my.js');

let checkDanh = (eff) => {
    if(typeof eff != 'object' || !eff || eff.length <=0) return true;
    let status = true;
    for(let i = 0; i < eff.length; i++) {
        let elementEFF = eff[i];
        let idSkill = elementEFF[0];
        let j = elementEFF[1];
        let infoSkill = kinang.find(e => e.id == idSkill);
        if(infoSkill) {
            if(infoSkill.buff && typeof infoSkill.buff == 'object') {
                let getdata = infoSkill.buff[j];
                if(getdata) {
                    let objectGet = getdata[6];
                    objectGet = objectGet || [0,0];
                    if(objectGet[1] == 1) {
                        status = false;
                        break;
                    }
                }
            }
        }
    }
    return status;
}

let checkDi = (eff) => {
    if(typeof eff != 'object' || !eff || eff.length <=0) return true;
    let status = true;
    for(let i = 0; i < eff.length; i++) {
        let elementEFF = eff[i];
        let idSkill = elementEFF[0];
        let j = elementEFF[1];
        let infoSkill = kinang.find(e => e.id == idSkill);
        if(infoSkill) {
            if(infoSkill.buff && typeof infoSkill.buff == 'object') {
                let getdata = infoSkill.buff[j];
                if(getdata) {
                    let objectGet = getdata[6];
                    objectGet = objectGet || [0,0];
                    if(objectGet[0] == 1) {
                        status = false;
                        break;
                    }
                }
            }
        }
    }
    return status;
}

let setMob = (my) => {
    return new Promise((res,fai) => {
        // find and update
        cache_mob.findOneAndUpdate({id : my.id},{
            info : my.info
        },{upsert : true}).then((data) => {
            res(data);
        });

    });
        
}

let getMob = (uid) => {
    return new Promise((res,fai) => {
        cache_mob.findOne({id : uid}).then((player) => {
            if(player) {
                res(player);
            } else {
                res(false);
            }
        });
        
    })
}

let getPlayer = (uid) => {
    return new Promise((res,fai) => {
        cache_player.findOne({uid : uid}).then((player) => {
            if(player) {
                res(player.my);
            } else {
                res(false);
            }
        });
    })
}

let setPlayer = (my) => {
    return new Promise((res,fai) => {
        // find and update
        cache_player.findOneAndUpdate({uid : my.id},{
            my : my,
            map : my.pos.map,
            zone : my.pos.zone
        },{upsert : true}).then((data) => {
            if(!data) {
                cache_player.create({
                    uid : my.id,
                    map : my.pos.map,
                    zone : my.pos.zone,
                    my : my, 
                    name : my.name
                })
            }
            res(true);
        });

    });
        
}

let az = (num) => {
    // random A-Z, a-z 09
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < num; i++) {
        res += str.charAt(Math.floor(Math.random() * str.length));
    }
    return res;
}

let rand = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

let eff = (e) => {
    e = e || {};
    e.choang = e.choang || [0,0];
    return e;
}

let batbai = {
    choang : [0,1], // cấm đánh, cấm đi
}

let isDi = (my) => {
    let a = eff(my.eff);
    let bool = true;
    for(let ten in batbai) {
        let block = batbai[ten][1];
        let effmy = a[ten][0];
        if(effmy == 1 && block == 1 ) {
            bool = false;
        }
    }
    return bool;
}

let item = require('../../res/item.js')

let checkBag = (ruong, id, soluong = 1) => {
    let info_item = item.find(e => e.id == id);
    if(!info_item) return 0;

    if(info_item.type === 'trangbi') {
        let max = ruong.max;
        let count = ruong.data.filter(e => e.active === 'hanhtrang').length;
        if(count >= max) return 0;
    }
    if(info_item.type === 'item') {
        let data = ruong.data.find(e => e.item == id && e.active === 'hanhtrang');
        if(!data) {
            let max = ruong.max;
            let count = ruong.data.filter(e => e.active === 'hanhtrang').length;
            if(count >= max) return 0;
        }
        else {
            if(data.soluong + soluong > 999999) return -1;
        }
    }
    return  ruong.max - ruong.data.filter(e => e.active === 'hanhtrang').length;
}

let deleteItem = (ruong, id, soluong = 1) => {
    let Bag = ruong.data.find(e => e.id === id);
    if(Bag) {
        let infoItem = item.find(e => e.id == Bag.item);
        if(infoItem) {
            if(infoItem.type === 'trangbi') {
                ruong.data = ruong.data.filter(e => e.id != id);
            }
            if(infoItem.type === 'item') {
                if(Bag.soluong - soluong <= 0) {
                    ruong.data = ruong.data.filter(e => e.id != id);
                }
                else {
                    Bag.soluong -= soluong;
                }
            }
        }
    }
    return ruong;
}

let getItem = (ruong, id, type = 'all') => {
    let bag;
    if(type === 'all') bag = ruong.data.find(e => e.id === id);
    else if(type === 'hanhtrang') bag = ruong.data.find(e => e.id === id && e.active === 'hanhtrang');
    else if(type === 'trangbi') bag =ruong.data.find(e => e.id === id && e.active === 'trangbi');
    else if(type === 'ruong') bag = ruong.data.find(e => e.id === id && e.active === 'ruong');
    return bag;
}

let updateItem = (ruong, id, soluong = 1, phamchat = 1) => {
    let info_item = item.find(e => e.id == id);
    if(info_item && info_item.type === 'trangbi') {
        let data = addItem(id, phamchat, soluong);
        if(data) {
            ruong.data.push(data);
        }
    }
    if(info_item && info_item.type === 'item') {
        let checked = ruong.data.find(e => e.item == id && e.active === 'hanhtrang');
        if(checked && checked.soluong) {
            checked.soluong += soluong;
        }
        else {
            let data = addItem(id, phamchat, soluong);
            if(data) {
                ruong.data.push(data);
            }
        }
    }
    return ruong;
}

let addItem = (id, phamchat = 1, soluong = 999) => {
    /* 
        @phamchat 
            => 1 => trắng
            => 2 => Xanh
            => 3 => Tím
            => 4 => Cam
    */
    let base_dong_them = [
        'khang_phep',
        'khang_vat_ly',
        'sat_thuong_phep',
    ];
    let data = {};
    let info_item = item.find(e => e.id == id);
    if(info_item && info_item.type == 'trangbi') {

        data.id = az(11);
        data.phamchat = phamchat;
        let mayman = 0;
        if(phamchat == 1) mayman = rand(1,5);
        if(phamchat == 2) mayman = rand(5,10);
        if(phamchat == 3) mayman = rand(10,15);
        if(phamchat == 4) mayman = rand(15,20);
        let dongthem = 0;
        if(phamchat == 3) dongthem = 1;
        if(phamchat == 4) dongthem = 2;
        
        let tontai = [];
        while(dongthem > 0) {
            let rand_dongthem = base_dong_them[rand(0,base_dong_them.length - 1)];
            if(tontai.indexOf(rand_dongthem) == -1) {
                tontai.push(rand_dongthem);
                dongthem--;
            }
        }
        data.dong = tontai;
        data.mayman = mayman;
        data.level = 0;
        data.lo = [-1,-1,-1,-1];
        data.time = Date.now();
        data.item = id;
        data.soluong = 1;
        data.active = 'hanhtrang';

        return data;
    }
    else 
    if(info_item && info_item.type == 'item') {
        data.id = az(11);
        data.time = Date.now();
        data.item = id;
        data.soluong = soluong;
        data.active = 'hanhtrang';
        return data;
    }
    else {
        return false;
    }
}

let base = [
    '_haki',
    'haki',
    'sat_thuong_phep',
    '_sat_thuong_phep',
    'sat_thuong_vat_ly',
    '_sat_thuong_vat_ly',
    'khang_phep',
    '_khang_phep',
    'khang_vat_ly',
    '_khang_vat_ly',
    'hpmax',
    'mpmax',
    '_hpmax',
    '_mpmax',
    'hoi_chieu',
    '_sat_thuong_chi_mang',
    '_chi_mang',
    '_giam_sat_thuong_chi_mang',
    '_hoi_mau',
    '_hoi_mp',
    '_tru_mp',
    '_tru_hp'
    
];

let resetChiso = (data) => {
    for(let i = 0; i < base.length; i++) {
        let name = base[i];
        data[name] = 0;
    }
    return data;
}

let chiso = (data) => {
    // có thêm thuộc tính _ là %
    for(let i = 0; i < base.length; i++) {
        let name = base[i];
        data[name] = data[name] || 0;
    }
    return data;
}

let info = (my) => {

    my.nhiemvu = my.nhiemvu || {};
    my.tien = my.tien || {};
    my.tien.beri = my.tien.beri || 0;
    my.tien.ruby = my.tien.ruby || 0;
    my.eff = my.eff || [];

    my.skin = my.skin || {};

    my.skin.dau = my.skin.dau || "iLvVMIbTpy";
    my.skin.ao = my.skin.ao || "kFFosytneB";
    my.skin.quan = my.skin.quan || "QSHGPlNDTK";
    my.skin.toc = my.skin.toc || "axDwxOtydX";
    my.skin.non = my.skin.non || "axDwxOtydX";
    my.skin.lung = my.skin.lung || "axDwxOtydX";
    my.skin.tay = my.skin.tay || "axDwxOtydX";
    my.skin.id = my.skin.id || null;


    my.trangbi = my.trangbi || {};
    my.trangbi.vukhi = my.trangbi.vukhi || 0;
    my.trangbi.daychuyen = my.trangbi.daychuyen || 0;
    my.trangbi.nhan = my.trangbi.nhan || 0;
    my.trangbi.non = my.trangbi.non || 0;
    my.trangbi.ao = my.trangbi.ao || 0;
    my.trangbi.quan   = my.trangbi.quan || 0;
    my.trangbi.toc = my.trangbi.toc || 0;

    my.trangbi.caitrang = my.trangbi.caitrang || {};
    my.trangbi.face = my.trangbi.face || 0;


    my.skill = my.skill || [];

    if( !my.oskill || typeof my.oskill  != 'object')
    {
        my.oskill = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    }

    my.pos = my.pos || {};
    my.pos.x = my.pos.x || 476;
    my.pos.y = my.pos.y || 426;
    my.pos.zone = my.pos.zone || 0;
    my.pos.map = my.pos.map || 1;


    my.khac = my.khac || {};

    my.info = my.info || {};

    my.info.coban = my.info.coban || {};
    my.info.coban.level = my.info.coban.level || 1;
    my.info.coban.exp = my.info.coban.exp || 0;
    my.info.coban.he = my.info.coban.he || 1;
    my.info.coban.speed = my.info.coban.speed || 5;


    my.info.tiemnang = my.info.tiemnang || {};
    my.info.tiemnang.sucmanh = my.info.tiemnang.sucmanh || 0;
    my.info.tiemnang.phongthu = my.info.tiemnang.phongthu || 0;
    my.info.tiemnang.theluc = my.info.tiemnang.theluc || 0;
    my.info.tiemnang.tinhthan = my.info.tiemnang.tinhthan || 0;
    my.info.tiemnang.nhanhnhen = my.info.tiemnang.nhanhnhen || 0;


    my.info.chiso = my.info.chiso || {};
    my.info.chiso.hp = my.info.chiso.hp || 100;
    my.info.chiso.hp = my.info.chiso.hp < 0 ? 100 : my.info.chiso.hp;
    my.info.chiso.mp = my.info.chiso.mp || 100;
    my.info.chiso.hpmax = my.info.chiso.hpmax || 100;
    my.info.chiso.mpmax = my.info.chiso.mpmax || 100;
    my.info.chiso.sat_thuong_phep = my.info.chiso.sat_thuong_phep || 0;
    my.info.chiso.sat_thuong_vat_ly = my.info.chiso.sat_thuong_vat_ly || 15;

    my.info.chiso = chiso(my.info.chiso);

    my.ruong = my.ruong || {};
    my.ruong.data = my.ruong.data || [];
    my.ruong.max = my.ruong.max || 20;

    my.skill.forEach((element,i) => {
        let checked = kinang.find(e => e.id == element[0]);
        if(!checked) {
            my.skill.splice(i,1);
        }
    });

    let he = my.info.coban.he;
    let base_kinang = kinang.filter(e => e.class && e.class == he && e.class !=6); 
    base_kinang.forEach(element => {
        let mySkill = my.skill.find( e=> e[0] && e[0] == element.id);
        if(!mySkill) {
            my.skill.push([
                element.id, // 0 > id 
                0, // 1 > level
                0, // 2 > time
                0, // 3 => exp
                0, // 4 => time use last
            ])
        }
    });

    return my;
}

let sprite = (my,socket = false) => {
    my = info(my);
    my.info.chiso = chiso(my.info.chiso);
    my.info.chiso = resetChiso(my.info.chiso);
    // cập nhật lại các chỉ số
    my.info.chiso.hpmax = 100;
    my.info.chiso.mpmax = 100;
    my.info.chiso.sat_thuong_phep = 0;
    my.info.chiso.sat_thuong_vat_ly = 15;

    /*
    my.skin.dau =  "iLvVMIbTpy";
    my.skin.ao =  "kFFosytneB";
    my.skin.quan =  "QSHGPlNDTK";
    my.skin.toc = "axDwxOtydX";
    my.skin.non =  "axDwxOtydX";
    my.skin.lung =  "axDwxOtydX";
    my.skin.tay =  "axDwxOtydX";
    my.skin.id = null;
    */

    // set skin mắc định
    let he = my.info.coban.he;
    /*
    * 1 => luffy
    * 2 => sanji
    * 3 => nami
    * 4 => zoro
    * 5 => usopp
    * */
    let base = {
        ao : ["kFFosytneB","NjeYgxYqhI","HNbjvDRvQM","QTIydsakBM","dLwtvlNxiY"],
        tay : ["axDwxOtydX","KaVgueHoaP","axDwxOtydX","TKHxwNhWSU","CMnZavSAps"],
        lung : ["axDwxOtydX","axDwxOtydX","qMXbcUQWdM","axDwxOtydX","axDwxOtydX"],
        quan : ["QSHGPlNDTK","yEIqrdJLIw","TEjmlGHLxb","sFQjWHwTeb","dvuZmZtEqC"],
        toc : ["vAiaeYISIt","vAiaeYISIt","gJhSCfBzai","vAiaeYISIt","vAiaeYISIt"],
        dau : ['iLvVMIbTpy','iLvVMIbTpy','iLvVMIbTpy','iLvVMIbTpy','iLvVMIbTpy'],
        non : ['vqFwgeDhai','axDwxOtydX','axDwxOtydX','axDwxOtydX','axDwxOtydX'],
    }
    for(let ten in base) {
        let array = base[ten];
        let index = he - 1;
        my.skin[ten] = array[index];
    }

    // cộng chỉ số đồ
    for(let loaitrangbi in my.trangbi){
        let id = my.trangbi[loaitrangbi];
        let infoItem = my.ruong.data.find(e => e.id === id && e.active === 'trangbi');
        if(infoItem) {
            let baseItem = item.find(e => e.id == infoItem.item);
            if(baseItem && baseItem.type === 'trangbi') {
                // set sprite
                if(baseItem.script && typeof baseItem.script == 'object') {
                    for(let loaiskin in baseItem.script) {
                        my.skin[loaiskin] = baseItem.script[loaiskin];
                    }
                }

                // cộng thuộc tính của trang bị
                if(baseItem.thuoctinh && typeof baseItem.thuoctinh == 'object') {
                    for(let tenthuoctinh in baseItem.thuoctinh) {
                        let mayman = infoItem.mayman; // độ may mắn
                        let level = infoItem.level; // cấp độ cường hóa
                        let phamchat = infoItem.phamchat; // phẩm chất trắng - xanh - tím - cam
                        let giatrigoc = baseItem.thuoctinh[tenthuoctinh]; // giá trị gốc của trang bị
                        let tinh = giatrigoc + giatrigoc * (mayman /100); // cộng thêm thuộc tính gốc từ % may mắn
                        tinh+= tinh * (level*phamchat /100); // cộng thêm thuộc tính từ cường hóa
                        tinh = Math.round(tinh); // làm tròn nó 
                        my.info.chiso[tenthuoctinh]  = my.info.chiso[tenthuoctinh]  || 0;
                        my.info.chiso[tenthuoctinh] += tinh;
                    }
                }  

                // cộng thêm sát thương dòng (Với item có phẩm chất đặc biệt)
                if(infoItem.dong && typeof infoItem.dong == 'object') {
                    infoItem.dong.forEach(tenthuoctinh => {
                        let mayman = infoItem.mayman; // độ may mắn
                        let level = infoItem.level; // cấp độ cường hóa
                        let phamchat = infoItem.phamchat; // phẩm chất trắng - xanh - tím - cam
                        let level_item = baseItem.level; // cấp độ yêu cầu sử dụng
                        level_item  = level_item < 0 ? 1 : level_item; // nếu 0
                        let level_yc = Math.ceil(level_item/10); // nghĩa là lấy cấp nhỏ, ví dụ 10 -> 1, 20 -> 2, 30 -> 3
                        let giatrigoc = level_yc * phamchat; // phẩm chất càng cao thì giá trị càng cao
                        let tinh = giatrigoc + giatrigoc * (mayman /100); // cộng thêm thuộc tính gốc từ % may mắn
                        tinh+= tinh * ((level*phamchat + 5 )/100); // cộng thêm thuộc tính từ cường hóa
                        tinh = Math.round(tinh);
                        my.info.chiso[tenthuoctinh]  = my.info.chiso[tenthuoctinh]  || 0;
                        my.info.chiso[tenthuoctinh] += tinh;
                    });
                }

                // nếu trang bị có đục lỗ
                if(infoItem.lo && typeof infoItem.lo == 'object') {
                    infoItem.lo.forEach(element => {
                        let idItem = element;
                        if(idItem != 0 && idItem != -1) {
                            // ID = 0 => có lỗ nhưng chưa khảm
                            // ID = -1 => không có lỗ
                            let baseItem2 = item.find(e => e.id == idItem);
                            if(baseItem2 && baseItem2.thuoctinh) {
                                for(let tenthuoctinh in  baseItem2.thuoctinh) {
                                    let tinh = baseItem2.thuoctinh[tenthuoctinh];
                                    my.info.chiso[tenthuoctinh]  = my.info.chiso[tenthuoctinh]  || 0;
                                    my.info.chiso[tenthuoctinh] += tinh;
                                }
                            }
                        }
                    });
                }
            }
            else 
            {
                my.trangbi[loaitrangbi] = 0;
            }
        }
        else 
        {
            my.trangbi[loaitrangbi] = 0;
        }
    }

    // phần này cộng thêm các chỉ số như của kĩ năng bị động,..
    my.skill.forEach(element => {
        let id = element[0];
        let base_skill = kinang.find(e => e.id == id);
        if(base_skill) {
            if(base_skill.type && base_skill.type === 'bidong' && base_skill.buff && typeof base_skill.buff == 'object') {
                for(let tenthuoctinh in base_skill.buff) {
                    let tinh = base_skill.buff[tenthuoctinh];
                    my.info.chiso[tenthuoctinh]  = my.info.chiso[tenthuoctinh]  || 0;
                    my.info.chiso[tenthuoctinh] += tinh;
                }
            }
        }
    });

    // phần này cộng các hiệu ứng kĩ năng

    /* 
                    baseSkill.id, // id skill
                    i, /// i
                    level,  // cấp
                    Date.now() + time*1000,
    */

    my.eff.forEach(element => {
        let  idSkill = element[0];
        let i = element[1];
        let level = element[2];
        let time = element[3];
        let infoSkill = kinang.find(e => e.id == idSkill);
        if(infoSkill) {
            if(infoSkill.buff && typeof infoSkill.buff == 'object') {
                let getdata = infoSkill.buff[i];
                if(getdata) {
                    let tenthuoctinh = getdata[0];
                    let giatri = getdata[1];
                    let tinh = giatri + giatri * (level/100);
                    tinh = Math.round(tinh);
                    my.info.chiso[tenthuoctinh]  = my.info.chiso[tenthuoctinh]  || 0;
                    my.info.chiso[tenthuoctinh] += tinh;
                }
            }
        }
    });


    // tính % từ các thuộc tính có _ 
    for(let tenthuoctinh in my.info.chiso) {
        my.info.chiso[tenthuoctinh] = Math.round(my.info.chiso[tenthuoctinh]);

        if(tenthuoctinh.indexOf('_') == 0) {
            // remove _ in first
            let tenthuoctinh2 = tenthuoctinh.replace('_','');
            // check exist
            if(my.info.chiso[tenthuoctinh2]) {
                let tinh = my.info.chiso[tenthuoctinh2] * (my.info.chiso[tenthuoctinh]/100);
                tinh = Math.round(tinh);
                my.info.chiso[tenthuoctinh2] += tinh;
            }
            else 
            {
                my.info.chiso[tenthuoctinh2] = 0;
            }
        }
    }

    if(my.info.chiso.hp && my.info.chiso.hpmax && my.info.chiso.hp > my.info.chiso.hpmax) {
        my.info.chiso.hp = my.info.chiso.hpmax;
    }
    if(my.info.chiso.mp && my.info.chiso.mpmax && my.info.chiso.mp > my.info.chiso.mpmax) {
        my.info.chiso.mp = my.info.chiso.mpmax;
    }


    return my;
}

let save = (my) => {
    let id = my.id;
    mysqli.query("UPDATE `nhanvat` SET `nhiemvu` = '"+JSON.stringify(my.nhiemvu)+"', `tien` = '"+JSON.stringify(my.tien)+"', `eff` = '"+JSON.stringify(my.eff)+"', `skin` = '"+JSON.stringify(my.skin)+"', `trangbi` = '"+JSON.stringify(my.trangbi)+"', `skill` = '"+JSON.stringify(my.skill)+"', `oskill` = '"+JSON.stringify(my.oskill)+"', `pos` = '"+JSON.stringify(my.pos)+"', `khac` = '"+JSON.stringify(my.khac)+"', `info` = '"+JSON.stringify(my.info)+"', `ruong` = '"+JSON.stringify(my.ruong)+"' WHERE `id` = '"+id+"'", function(res,data) {
        if(res) {
            console.log("Lỗi lưu nhân vật");
        }
        console.log('Lưu nhân vật thành công')
    });
}

function his (uid, msg, json = {}) {
    // clear console
    const date = new Date();
    const timestamp = date.getTime();

    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;

    const partitionName = `p_${year}_${month}_${day}`;
    const partitionValue = `${year}-${month}-${day}`;

    const insertQuery = `
	  INSERT INTO log (uid, created_date, created_time_int, MSG, json)
	  VALUES (${uid}, '${partitionValue}', ${timestamp}, '${msg}', '${JSON.stringify(json)}')
	`;


    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const year2 = currentDate.getFullYear();
    const month2 = currentDate.getMonth() + 1;
    const day2 = currentDate.getDate();
    const partitionValue2 = `${year2}-${month2 < 10 ? '0' + month2 : month2}-${day2 < 10 ? '0' + day2 : day2}`;

    mysqli.query(insertQuery, (error, results, fields) => {
        if(error) {
            console.log(error)
            if(error.code === 'ER_NO_PARTITION_FOR_GIVEN_VALUE')
            {
                let createPartitionQuery = `
					ALTER TABLE log
					ADD PARTITION (PARTITION ${partitionName} VALUES LESS THAN (TO_DAYS('${partitionValue2}')))
				`;
                mysqli.query(createPartitionQuery, (error, results, fields) => {
                    if(error) {
                        console.log(error);
                    }
                    else {
                        console.log('Tao partition thanh cong');
                        his(uid, msg, json);
                    }
                });
            }
        } else {
        }
    });
}



module.exports = {
    expskill : expskill,
    explevel : explevel,
    az : az,
    rand : rand,
    sprite : sprite,
    getPlayer : getPlayer,
    setPlayer : setPlayer,
    info : info,
    eff : eff,
    isDi : isDi,
    save : save,
    addItem : addItem,
    chiso : chiso,
    setMob,
    getMob,
    resetChiso,
    checkDanh,
    checkDi,
    log : his,
    checkBag,
    updateItem,
    deleteItem,
    getItem

}