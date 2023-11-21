
let bcrypt = require('bcrypt');
let htmlspecialchars = require('htmlspecialchars');
let mysqli = require('./mysqli');
let skill = require('./base/skill');
let item = require('./base/item');
let nhiemvu = require('./base/nhiemvu');

let redis = require('./redis.js');



function eff(data) 
{
	/*
	@desc:  data truyền vào làm tham số của Object.eff
	 */
	if(typeof data != 'object') data = {};
	let array = ['choang','taitaonangluong','thaiduonghasan','hoakhi','khieng','rungu'];
	array.forEach(element => {
		if(data[element] == undefined) data[element] = {active : false, time : 0};

	});
	return data;
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
						his(uid, msg);
					}   
				});  
			}
		} else { 
		} 
	});   
} 




let checkRuong = function(my) 
{
	if(typeof my != 'object') return false;
	let ruong = my.ruong;
	let slot = ruong.slot;
	let itemInHanhTrang = my.ruong.item.filter(e => e.active == 'hanhtrang');
	let soluong = itemInHanhTrang.length;
	return slot - soluong;
}
 

let setItemMax = (id,idvp,my = false, itemInfo = false) => {
	
	soluong = 999;

	if(!my) my = player.find(e => e.id == id);
	if(!my) return 1; // không tìm thấy người chơi
	if(!itemInfo) itemInfo = item.find(e => e.id == idvp);
	if(!itemInfo) return 2; // không tìm thấy vật phẩm

	if(itemInfo.type != 'item') return 3; // không phải vật phẩm

	let daco = my.ruong.item.find(e => e.item == itemInfo.id && e.active == 'hanhtrang');
	if(daco) {
		daco.soluong = daco.soluong*1 + soluong;
		if(daco.soluong <= 0) my.ruong.item = my.ruong.item.filter(e => e.id != daco.id);
	}
	else
	{
		if(checkRuong(my) <=0) return 6; // hành trang không đủ chỗ
		my.ruong.item.push({
			id : makeid(10),
			active : 'hanhtrang',
			item : itemInfo.id,
			soluong : soluong, 
			lastTime : Date.now(),
			khoa : itemInfo.khoa*1,
		});
	}
	
	return my; // trả về thông tin người chơi



}



let setItem = (id,idvp , soluong, itemInfo = false, my = false) => {
	
	soluong = int(soluong);

	if(!my) my = player.find(e => e.id == id);
	if(!my) return 1; // không tìm thấy người chơi
	if(!itemInfo) itemInfo = item.find(e => e.id == idvp);
	if(!itemInfo) return 2; // không tìm thấy vật phẩm

	if(itemInfo.type != 'item') return 3; // không phải vật phẩm

	let daco = my.ruong.item.find(e => e.item == itemInfo.id && e.active == 'hanhtrang');
	if(daco) {
		if(itemInfo.max && itemInfo.max > 0 && daco.soluong+soluong > itemInfo.max) return 4; // vượt quá số lượng tối đa item này được phép mang
		
		daco.soluong = daco.soluong*1 + soluong;

		if(daco.soluong <= 0) my.ruong.item = my.ruong.item.filter(e => e.id != daco.id);
	}
	else
	{
		if(checkRuong(my) <=0) return 6; // hành trang không đủ chỗ

		if(itemInfo.max && itemInfo.max > 0 && soluong > itemInfo.max) return 4; // vượt quá số lượng tối đa item này được phép mang
		else 
		my.ruong.item.push({
			id : makeid(10),
			active : 'hanhtrang',
			item : itemInfo.id,
			soluong : soluong, 
			lastTime : Date.now(),
			khoa : itemInfo.khoa*1,
		});
	}
	/**
	 * [1] : không tìm thấy người chơi
	 * [2] : không tìm thấy vật phẩm
	 * [3] : không phải vật phẩm
	 * [4] : vượt quá số lượng tối đa item này được phép mang
	 * [5] : vượt quá số lượng tối đa 99
	 * [6] : hành trang không đủ chỗ
	 * 
	 */

	return my; // trả về thông tin người chơi



}

let checkInfoDeTu = function(my)
{

	//if(typeof detu != 'object') return false;
	//if(my.name == undefined) return false;
	my.name = my.name || 'DeTu';
	my.id = my.id || makeid(11);
	my.eff = my.eff || {};
	my.eff = {
		choang : my.eff.choang || {active : false, time : 0},
		taitaonangluong : my.eff.taitaonangluong || {active : false, time : 0},
		thaiduonghasan : my.eff.thaiduonghasan || {active : false, time : 0},
	}

	my.skin = my.skin || {};
	my.skin = {
		ao : my.skin.ao || 'STHDKHJcHw',
		quan : my.skin.quan || 'ysGYTJEHob',
		dau : my.skin.dau || 'xBzUeMrWbl',
		theobo : my.skin.theobo || '',
		bang : my.skin.bang || 0,
		coPK : my.skin.coPK || 0,
	};

	my.trangbi = my.trangbi || {};
	my.trangbi = {
		ao : my.trangbi.ao || 0,
		quan : my.trangbi.quan || 0,
		dau : my.trangbi.dau || 0,
		gang : my.trangbi.gang || 0,
		rada : my.trangbi.rada || 0,
		giay : my.trangbi.giay || 0,
		caitrang : my.trangbi.caitrang || 0,
	}

	my.pos = my.pos || {};
	my.pos = {
		x : my.pos.x || 754,
		y : my.pos.y || -256,
		map : my.pos.map || 0,
		zone : my.pos.zone || 0,
	}

	my.info = my.info || {};
	my.info.act = my.info.act || 'dungyen';
	my.info.move = my.info.move || 'right';
	my.info.speed = my.info.speed || 5;
	my.info.coban = my.info.coban || {};
	my.info.trangthai = 'ditheo';
	my.info.coban = {
		avatar : my.info.coban.avatar || 516,
		avatarShow : my.info.coban.avatarShow || 516,
		sucmanh : my.info.coban.sucmanh || 1000,
		tiemnang : my.info.coban.tiemnang || 1000,
		tiemnangFull : my.info.coban.tiemnangFull || 1000,
		type : my.info.coban.type || 'traidat',
	}
	my.info.chiso = my.info.chiso || {};

	
	my.info.chiso = {
		suckhoe : my.info.chiso.suckhoe || 100,
		suckhoe_max : my.info.chiso.suckhoe_max || 100,
		hpFull : my.info.chiso.hpFull || 0,
		kiFull : my.info.chiso.kiFull || 0,
		sucdanh : my.info.chiso.sucdanh || 0,
		giap : my.info.chiso.giap || 0,
		chimang : my.info.chiso.chimang || 0,
		hoiKi : my.info.chiso.hoiKi || 0,
		hoiMau : my.info.chiso.hoiMau || 0,
		hutKi : my.info.chiso.hutKi || 0,
		hutMau : my.info.chiso.hutMau || 0,
		phanDon : my.info.chiso.phanDon || 0,
		hoiChieu : my.info.chiso.hoiChieu || 0,
		hoiki30s : my.info.chiso.hoiki30s || 0,
		hoihp30s : my.info.chiso.hoihp30s || 0,
		hp : my.info.chiso.hp || 0,
		ki : my.info.chiso.ki || 0,

		hpGoc : my.info.chiso.hpGoc || 0,
		kiGoc : my.info.chiso.kiGoc || 0,
		sucdanhGoc : my.info.chiso.sucdanhGoc || 0,
		giapGoc : my.info.chiso.giapGoc || 0,
		chimangGoc : my.info.chiso.chimangGoc || 0,
	}

	my.skill = my.skill || [];




	return my;

}

let checkinfo = function(my)
{
	if(typeof my != 'object') my = {};
	my.tien = my.tien || {zeni : 0, vang : 0};
	my.tien.zeni = my.tien.zeni || 0;
	my.tien.vang = my.tien.vang || 0;
	my.tien.zeni = int(my.tien.zeni);
	my.tien.vang = int(my.tien.vang);

	// sử dụng item 
	my.used = my.used || {};
	my.used = {
		dauthan : my.used.dauthan || 0,
		dauthan_time : my.used.dauthan_time || 0,
	}

	// các gói hiệu ứng
	my.eff = my.eff || {};
	my.eff = {
		choang : my.eff.choang || {active : false, time : 0},
		taitaonangluong : my.eff.taitaonangluong || {active : false, time : 0},
		thaiduonghasan : my.eff.thaiduonghasan || {active : false, time : 0},
		hoakhi : my.eff.hoakhi || {active : false, time : 0, timeawait : 0, status : false},
		khieng : my.eff.khieng || {active : false, time : 0},
		rungu : my.eff.rungu || {active : false, time : 0},
	}

	my.nhiemvu = my.nhiemvu || {
		id : 1,
		data : {},
		now : 0,
	};

	

	// skin nhân vật
	my.skin = my.skin || {};
	my.skin = {
		ao : my.skin.ao || 'STHDKHJcHw',
		quan : my.skin.quan || 'ysGYTJEHob',
		dau : my.skin.dau || 'xBzUeMrWbl',
		theobo : my.skin.theobo || '',
		bang : my.skin.bang || 0,
		bangID : my.skin.bangID || -1,
		coPK : my.skin.coPK || 0,
	};

	// trang bị đang mặc
	my.trangbi = my.trangbi || {};
	my.trangbi = {
		ao : my.trangbi.ao || 0,
		quan : my.trangbi.quan || 0,
		dau : my.trangbi.dau || 0,
		gang : my.trangbi.gang || 0,
		rada : my.trangbi.rada || 0,
		giay : my.trangbi.giay || 0,
		caitrang : my.trangbi.caitrang || 0,
	}

	// rương đồ
	my.ruong = my.ruong || {};
	my.ruong = {
		slot : my.ruong.slot || 20,
		ruong  : my.ruong.ruong || 10,
		item : my.ruong.item || [],
	}

	my.ruong.item.forEach((element,index) => {
		if(element.hsd >=1 && element.hsd <= Date.now()) {
			my.ruong.item.splice(index,1);
		}
	});

	// update kĩ năng

	// ô skill
	my.oskill = my.oskill || [0,0,0,0,0];


	// vị trí

	my.pos = my.pos || {};
	my.pos = {
		x : my.pos.x || 754,
		y : my.pos.y || -256,
		map : my.pos.map || 0,
		zone : my.pos.zone || 0,
	}

	// info
	my.info = my.info || {};
	my.info.act = my.info.act || 'dungyen';
	my.info.move = my.info.move || 'right';
	my.info.speed = my.info.speed || 5;
	my.info.coban = my.info.coban || {};
	my.info.coban = {
		avatar : my.info.coban.avatar || 516,
		avatarShow : my.info.coban.avatarShow || 516,
		sucmanh : my.info.coban.sucmanh || 1000,
		tiemnang : my.info.coban.tiemnang || 1000,
		tiemnangFull : my.info.coban.tiemnangFull || 1000,
		tiemnangCong : my.info.coban.tiemnangCong || 0,
		type : my.info.coban.type || 'none',
		khoidau : my.info.coban.khoidau || 1,
	}
	my.info.chiso = my.info.chiso || {};

	
	my.info.chiso = {
		suckhoe : my.info.chiso.suckhoe || 0,
		suckhoe_max : my.info.chiso.suckhoe_max || 100,
		hpFull : my.info.chiso.hpFull || 0,
		kiFull : my.info.chiso.kiFull || 0,
		sucdanh : my.info.chiso.sucdanh || 0,
		giap : my.info.chiso.giap || 0,
		chimang : my.info.chiso.chimang || 0,
		hoiKi : my.info.chiso.hoiKi || 0,
		hoiMau : my.info.chiso.hoiMau || 0,
		hutKi : my.info.chiso.hutKi || 0,
		hutMau : my.info.chiso.hutMau || 0,
		phanDon : my.info.chiso.phanDon || 0,
		hoiChieu : my.info.chiso.hoiChieu || 0,
		hoiki30s : my.info.chiso.hoiki30s || 0,
		hoihp30s : my.info.chiso.hoihp30s || 0,
		hp : my.info.chiso.hp || 0,
		ki : my.info.chiso.ki || 0,

		hpGoc : my.info.chiso.hpGoc || 0,
		kiGoc : my.info.chiso.kiGoc || 0,
		sucdanhGoc : my.info.chiso.sucdanhGoc || 0,
		giapGoc : my.info.chiso.giapGoc || 0,
		chimangGoc : my.info.chiso.chimangGoc || 0,
	}

	my.skill = my.skill || [];

	my.skill.forEach((element,i) => {
		let findskill = skill.find(e => e.id == element.id && (e.class == my.info.coban.type || e.class == 'all') );
		if(!findskill || element.type == 'bidong')  {
			// delete 
			my.skill.splice(i,1);
		} 
		else 
		{
			element.xep = findskill.xep;
		}
	});

	let base_skill = skill.filter(e => e.class ==  my.info.coban.type || e.class == 'all');
	base_skill.forEach(element => {
		let findskill = my.skill.find(e => e.id == element.id);
		if(!findskill && element.type != 'bidong')  {
			my.skill.push({
				id : element.id,
				level : 1,
				lasttime : 0,
				time : 0,
				xep : element.xep,
			})
		} 
	});

	my.detu = my.detu || {};

	


	if(my.nhiemvu.data.id == undefined) {
		my.nhiemvu.data = {};
		let newnv = nhiemvu.find(e => e.id == (my.nhiemvu.id) && (e.class == my.info.coban.type || e.class == 'all'));
		if(newnv) 
		{
			let list = newnv.list;
			if(list[my.nhiemvu.now] != undefined) 
			{
				my.nhiemvu.data = {
					id : list[my.nhiemvu.now].id || my.nhiemvu.now ,
					type : list[my.nhiemvu.now].type,
					have : 0,
					need : list[my.nhiemvu.now].value,
				}
			}
			else 
			{
				// hết nhiệm vụ
				my.nhiemvu.data = {};
				my.nhiemvu.now = 0;
				my.nhiemvu.id += 1;
				my = checkinfo(my);
			}
		}
	}
 
	if(my.nhiemvu.data.id) 
	{
		if(my.nhiemvu.data.type != 'talk' && my.nhiemvu.data.need <= my.nhiemvu.data.have)
		{
			my.nhiemvu.now += 1;
			my.nhiemvu.data = {};
			my = checkinfo(my);
		}
	}


	return my;
}

function resetChiSo(my) 
{
	my.info.chiso.hpFull =0;
	my.info.chiso.kiFull =0;
	my.info.chiso.sucdanh =0;
	my.info.chiso.giap = 0;
	my.info.chiso.chimang  = 0;
	my.info.chiso.hoiKi = 0;
	my.info.chiso.hoiMau = 0;
	my.info.chiso.hutKi = 0;
	my.info.chiso.hutMau =0;
	my.info.chiso.phanDon =0;
	my.info.chiso.hoiChieu =0;
	my.info.chiso.hoiki30s=0;
	my.info.chiso.hoihp30s=0;
	return my;
}

let updatePlayer = function(id,socket = false) 
{
	if(typeof id == 'object') {
		return updatePlayer_done(id,socket);
	}
	redis.getPlayer(id).then(data => {
		return updatePlayer_done(data,socket);
	});
}


let updatePlayer_done = function(my,socket = false) 
{
	if(typeof my != 'object') return false;
	my = checkinfo(my);
	try {
		let he = my.info.coban.type; 

		let skinOld = {
			traidat : {ao : "ShKDzlJEkr", quan : "VwUvuLvFKR", dau : "QbPhVhGmRc"},
			namek : {ao : "VqyVqCVEwt", quan : "DVlmZNfDhj", dau : "lMzpmFtgCj"},
			saiyan : {ao : "QIysZgQBGv", quan : "QHUNKiBNGE", dau : "gNiPLfNjlC"},
		}
		let avatar = {
			traidat : [0,518,519,734], // yamncha, kirin, gohan
			namek : [0,523,524,525], // picolo, octieu, kemi 
			saiyan : [0,520,521,522], // VEGETA, CALIT, KAKAROT
		}
		let dau = {
			traidat : ["","fghjfghjttttt","sLeNYzwVYi","sdfgsdfgrty55"],
			saiyan : ["","XnPloWDTdg","gNiPLfNjlC", "sdfgdfgyyyutyuyt"],
			namek : ["","gBPszFjQfJ","DZJzuIdkku","XZzRFLjcjA"]
		};
		my.skin.ao = skinOld[he].ao;
		my.skin.quan = skinOld[he].quan;
		my.skin.dau = dau[he][my.info.coban.khoidau];
		my.skin.theobo = "";
		my.info.coban.avatar = avatar[he][my.info.coban.khoidau];

		// xử lý nếu anh ta có đệ tử
		if(my.detu && typeof my.detu == 'object' && my.detu.id != undefined) 
		{
			let he2 = my.detu.info.coban.type;
			my.detu.skin.ao = skinOld[he2].ao;
			my.detu.skin.quan = skinOld[he2].quan;
			my.detu.skin.dau = skinOld[he2].dau;
			my.detu.skin.theobo = "";
			my.detu = resetChiSo(my.detu);
			my.detu.info.chiso.hpFull = my.detu.info.chiso.hpGoc; // hp ban đầu
			my.detu.info.chiso.kiFull = my.detu.info.chiso.kiGoc; // ki ban đầu
			my.detu.info.chiso.sucdanh = my.detu.info.chiso.sucdanhGoc; // sức đánh ban đầu
			my.detu.info.chiso.giap = my.detu.info.chiso.giapGoc; // giáp ban đầu
			my.detu.info.chiso.chimang = my.detu.info.chiso.chimangGoc; // chỉ mạng ban đầu

			// cập nhật thêm chỉ số trang bị
			my.detu.info.coban.avatarShow = my.detu.info.coban.avatar; // avatar hiển thị

			let hpthem = 0;
			let kithem = 0;
			let sucdanhthem = 0;
			let giapthem = 0;

			let caitrang = {
				ao : "",
				quan : "",
				dau : "",
				avatar : "",
				theobo : ""
			}

			for(let type in my.detu.trangbi)
			{
				if(my.detu.trangbi[type] !=0)
				{
					let info = my.ruong.item.find(e => e.id == my.detu.trangbi[type]);
					if(info && info.info)
					{
						let infoItem = item.find(e => e.id == info.item);
						my.detu.info.chiso.hpFull += info.info.hp;
						my.detu.info.chiso.kiFull += info.info.ki;
						my.detu.info.chiso.sucdanh += info.info.sucdanh;
						my.detu.info.chiso.giap += info.info.giap;
						my.detu.info.chiso.chimang += info.info.chimang;
						my.detu.info.chiso.hoiKi += info.info.hoiki;
						my.detu.info.chiso.hoiMau += info.info.hoimau;
						my.detu.info.chiso.hutKi += info.info.hutki;
						my.detu.info.chiso.hutMau += info.info.hutmau;
						my.detu.info.chiso.phanDon += info.info.phandon;
						my.detu.info.chiso.hoiChieu += info.info.hoichieu;
						my.detu.info.chiso.hoiki30s += info.info.hoiki30s;
						my.detu.info.chiso.hoihp30s += info.info.hoihp30s;
		
						
						hpthem +=info.info.gochp;
						kithem +=info.info.gocki;
						sucdanhthem +=info.info.gocsucdanh;
						giapthem +=info.info.gocgiap;

						if(type == 'ao' || type == 'quan' || type == 'dau') 
						{
							my.detu.skin[type] = infoItem.script[type];
							if(type == 'dau') 
							{
								my.detu.info.coban.avatarShow = infoItem.script.avatar;
							}
						}
						if(type == 'caitrang') 
						{
							my.detu.skin[type] = infoItem.script[type];
							my.detu.info.coban.avatarShow = infoItem.script.avatar;
							caitrang.ao = infoItem.script.ao;
							caitrang.quan = infoItem.script.quan;
							caitrang.dau = infoItem.script.dau;
							caitrang.avatar = infoItem.script.avatar;
							caitrang.theobo = infoItem.script.theobo;
						}

					}
				}
			}

			if(caitrang.ao != "" && caitrang.quan != "" && caitrang.dau != "") 
			{
				my.detu.skin.ao = caitrang.ao;
				my.detu.skin.quan = caitrang.quan;
				my.detu.skin.dau = caitrang.dau;
			}
			if(caitrang.theobo != "") my.detu.skin.theobo = caitrang.theobo;
			if(caitrang.avatar != "") my.detu.info.coban.avatar = caitrang.avatar;

			my.detu.info.chiso.hpFull += my.detu.info.chiso.hpFull/100 * hpthem;
			my.detu.info.chiso.kiFull += my.detu.info.chiso.kiFull/100 * kithem;
			my.detu.info.chiso.sucdanh += my.detu.info.chiso.sucdanh/100 * sucdanhthem;
			my.detu.info.chiso.giap += my.detu.info.chiso.giap/100 * giapthem;


			if(my.detu.info.chiso.hp > my.detu.info.chiso.hpFull) my.detu.info.chiso.hp = my.detu.info.chiso.hpFull;
			if(my.detu.info.chiso.ki > my.detu.info.chiso.kiFull) my.detu.info.chiso.ki = my.detu.info.chiso.kiFull;

			if(my.detu.info.trangthai != 'venha')
			{
				socket.sendMap({
					_j : rand(1,100),
					_1 : my.detu.id, 
					_2 : my.detu.info,
					_3 : my.detu.skin,
				})
			}

		}
	
		
		my = resetChiSo(my); // reset chỉ số

		my.info.speedgoc = 5.5;

		my.info.chiso.hpFull = my.info.chiso.hpGoc; // hp ban đầu
		my.info.chiso.kiFull = my.info.chiso.kiGoc; // ki ban đầu
		my.info.chiso.sucdanh = my.info.chiso.sucdanhGoc; // sức đánh ban đầu
		my.info.chiso.giap = my.info.chiso.giapGoc; // giáp ban đầu
		my.info.chiso.chimang = my.info.chiso.chimangGoc; // chỉ mạng ban đầu

		// cập nhật thêm chỉ số trang bị
		my.info.coban.avatarShow = my.info.coban.avatar; // avatar hiển thị

		let hpthem = 0;
		let kithem = 0;
		let sucdanhthem = 0;
		let giapthem = 0;

		let caitrang = {
			ao : "",
			quan : "",
			dau : "",
			avatar : "",
			theobo : ""
		}

		for(let type in my.trangbi)
		{
			if(my.trangbi[type] !=0)
			{
				let info = my.ruong.item.find(e => e.id == my.trangbi[type]);
				if(info && info.info)
				{
					let infoItem = item.find(e => e.id == info.item);
					my.info.chiso.hpFull += info.info.hp;
					my.info.chiso.kiFull += info.info.ki;
					my.info.chiso.sucdanh += info.info.sucdanh;
					my.info.chiso.giap += info.info.giap;
					my.info.chiso.chimang += info.info.chimang;
					my.info.chiso.hoiKi += info.info.hoiki;
					my.info.chiso.hoiMau += info.info.hoimau;
					my.info.chiso.hutKi += info.info.hutki;
					my.info.chiso.hutMau += info.info.hutmau;
					my.info.chiso.phanDon += info.info.phandon;
					my.info.chiso.hoiChieu += info.info.hoichieu;
					my.info.chiso.hoiki30s += info.info.hoiki30s;
					my.info.chiso.hoihp30s += info.info.hoihp30s;
	
					
					hpthem +=info.info.gochp;
					kithem +=info.info.gocki;
					sucdanhthem +=info.info.gocsucdanh;
					giapthem +=info.info.gocgiap;

					if(type == 'ao' || type == 'quan' || type == 'dau') 
					{
						my.skin[type] = infoItem.script[type];
						if(type == 'dau') 
						{
							my.info.coban.avatarShow = infoItem.script.avatar;
						}
					}
					if(type == 'caitrang') 
					{
						my.skin[type] = infoItem.script[type];
						my.info.coban.avatarShow = infoItem.script.avatar;
						caitrang.ao = infoItem.script.ao;
						caitrang.quan = infoItem.script.quan;
						caitrang.dau = infoItem.script.dau;
						caitrang.avatar = infoItem.script.avatar;
						caitrang.theobo = infoItem.script.theobo;
					}
				}
				else 
				{
					my.trangbi[type] = 0;
				}
			}
		}

		if(caitrang.ao != "" && caitrang.quan != "" && caitrang.dau != "") 
		{
			my.skin.ao = caitrang.ao;
			my.skin.quan = caitrang.quan;
			my.skin.dau = caitrang.dau;
		}
		if(caitrang.theobo && caitrang.theobo != "") my.skin.theobo = caitrang.theobo;
		if(caitrang.avatar != "") my.info.coban.avatar = caitrang.avatar;

		my.info.chiso.hpFull += my.info.chiso.hpFull/100 * hpthem;
		my.info.chiso.kiFull += my.info.chiso.kiFull/100 * kithem;
		my.info.chiso.sucdanh += my.info.chiso.sucdanh/100 * sucdanhthem;
		my.info.chiso.giap += my.info.chiso.giap/100 * giapthem;

		my.info.chiso.hpFull  = Math.round(my.info.chiso.hpFull);
		my.info.chiso.kiFull  = Math.round(my.info.chiso.kiFull);
		my.info.chiso.sucdanh = Math.round(my.info.chiso.sucdanh);
		my.info.chiso.giap    = Math.round(my.info.chiso.giap);
		my.info.chiso.chimang = Math.round(my.info.chiso.chimang);
		my.info.chiso.ki 	= Math.round(my.info.chiso.ki);
		my.info.chiso.hp 	= Math.round(my.info.chiso.hp);
		my.info.speed = my.info.speedgoc;

 
		if(my.info.chiso.hp > my.info.chiso.hpFull) my.info.chiso.hp = my.info.chiso.hpFull;
		if(my.info.chiso.ki > my.info.chiso.kiFull) my.info.chiso.ki = my.info.chiso.kiFull;

		if(my.eff.hoakhi.active) 
		{
			let dau = ["","vEoiJHVKpF","iyllaoerRK","hcBzYukWds","tciUNqqkZM","VXjoGnprvD","EnkxoguoXO","MLMVFMQpSN"];
			my.info.chiso.hpFull*=2;
			my.info.chiso.kiFull*=2;
			my.info.chiso.chimang +=110;
			my.skin.theobo = "";
			my.skin.ao = "CyUXUeUBeb";
			my.skin.quan = "irRvqoBzOR";
			my.skin.dau =dau[my.eff.hoakhi.level];
			my.info.coban.avatar = 2249;
			my.info.speed += 1;
		}

		if(socket)
		socket.sendMap({
			_j : rand(1,100),
			_1 : my.id, 
			_2 : my.info,
			_3 : my.skin,
		})
		

		redis.setPlayer(my.id,my);


		return my;


	}
	catch(e) 
	{
		console.log(e);
	}
}

let update = function(id, fill = 'all')
{
	if(typeof id == 'object') return update_done(id, fill);
	else return updateIsInt(id, fill);
	
}

let updateIsInt = function(id, fill = 'all')
{
	redis.getPlayer(id).then(my => {
		if(!my) return;
		my = update_done(my, fill);
	})
}

let update_done = function(my, fill = 'all')
{
	

	if(!my) return;



	if(fill == 'all')
	{
		try {
			mysqli.query("UPDATE `nhanvat` SET `tien` = '"+JSON.stringify(my.tien)+"', `used` = '"+JSON.stringify(my.used)+"',  `eff` = '"+JSON.stringify(my.eff)+"',  `skin` = '"+JSON.stringify(my.skin)+"',  `trangbi` = '"+JSON.stringify(my.trangbi)+"',  `ruong` = '"+JSON.stringify(my.ruong)+"',  `skill` = '"+JSON.stringify(my.skill)+"', `oskill` = '"+JSON.stringify(my.oskill)+"',  `info` = '"+JSON.stringify(my.info)+"',  `pos` = '"+JSON.stringify(my.pos)+"', `detu` = '"+JSON.stringify(my.detu)+"', `nhiemvu` = '"+JSON.stringify(my.nhiemvu)+"'  WHERE `id` = '"+my.id+"'   ",function(err,rows){
				if(err) throw err;
			});
		}
		catch(e) 
		{
			console.log(e);
		}
	}
	else 
	{
		try {
			mysqli.query("UPDATE `nhanvat` SET `"+fill+"` = '"+JSON.stringify(my[fill])+"'   WHERE `id` = '"+my.id+"'    ",function(err,rows){});
		}
		catch(e) 
		{
			console.log(e);
		}
	}
} 




let thoigianget = function()
{
	process.env.TZ = 'Asia/Ho_Chi_Minh';
    let time        =  {};
    time.ngay       = (new Date()).getDate();
    time.thang      = (new Date()).getMonth()+1;
    time.nam        = (new Date()).getFullYear();
    time.thoigian   = Date.now();
	time.ngaythangnam =``+time.nam+`-`+time.thang+`-`+time.ngay+``;
	time.start =``+time.nam+`-`+time.thang+`-01`;
	time.end =``+time.nam+`-`+time.thang+`-31`;
    return time;
}
let thoigiantinh = function(data)
{
   var result="";
   var d = new Date(+data);
   result = ``+ d.getHours()+`:`+d.getMinutes()+`:`+
   d.getSeconds()+` `+d.getDate() + `/`+(d.getMonth()+1)+`/`+d.getFullYear()+``;
   return result;
}

// mã hóa pass
let generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null)
}
let int = function(c)
{
	if(!parseInt(c))
	{
		return 0;
	}
	else 
	{
		return parseInt(c);
	}
}
let html = function(stringtext)
{
	let a = htmlspecialchars(stringtext)
	a = a.replace(/\\/g,'/');  
	return a;
}

// so sánh pass
let validPassword = function(password, Hash) {
	Hash = Hash.replace('$2y$', '$2a$');

	return bcrypt.compareSync(password, Hash)
}

let cutEmail = function(email) {
	let data = email.split('@');
	let string = '';
	let start = '';
	if (data[0].length > 7) {
		start = data[0].slice(0, 6);
	}else{
		start = data[0].slice(0, data[0].length-3);
	}
	return string.concat(start, '***@', data[1]);
}

let cutPhone = function(phone) {
	let string = '';
	let start = phone.slice(0, 3);
	let end   = phone.slice(phone.length-2, phone.length);
	return string.concat(start, '*****', end);
}

let validateEmail = function(t) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)
}

let checkPhoneValid = function(phone) {
	return /^[\+]?(?:[(][0-9]{1,3}[)]|(?:84|0))[0-9]{7,10}$/im.test(phone);
}

let phoneCrack = function(phone) {
	let data = phone.match(/^[\+]?(?:[(][0-9]{1,3}[)]|(?:84|0))/im);
	if (data) {
		return {
			region: data[0],
			phone:  phone.slice(data[0].length, phone.length),
		};
	}
	return data;
}

let nFormatter = function(t, e) {
	for (var i = [{
		value: 1e18,
		symbol: 'E'
	}, {
		value: 1e15,
		symbol: 'P'
	}, {
		value: 1e12,
		symbol: 'T'
	}, {
		value: 1e9,
		symbol: 'G'
	}, {
		value: 1e6,
		symbol: 'M'
	}, {
		value: 1e3,
		symbol: 'k'
	}], o = /\.0+$|(\.[0-9]*[1-9])0+$/, n = 0; n < i.length; n++)
		if (t >= i[n].value)
			return (t / i[n].value).toFixed(e).replace(o, '$1') + i[n].symbol;
	return t.toFixed(e).replace(o, '$1');
}



let anPhanTram = function(bet, so_nhan, ti_le, type = false){
	// so_nhan: số nhân
	// ti_le: tỉ lệ thuế
	// type: Thuế tổng, thuế gốc
	let vV = bet*so_nhan;
	let vT = !!type ? vV : bet;
	return vV-Math.ceil(vT*ti_le/100);
}

// kiểm tra chuỗi chống
let isEmpty = function(str) {
	return (!str || 0 === str.length)
}

// đổi số thành tiền
let numberWithCommas = function(number) {
	if (number) {
		let result = (number = parseInt(number)).toString().split(',');
		return result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','),
		result.join(',')
	}
	return '0'
}

// Lấy số từ chuỗi
let getOnlyNumberInString = function(t) {
	let e = t.match(/\d+/g);
	return e ? e.join('') : ''
}

// thêm số 0 trước dãy số (lấp đầy bằng số 0)
let numberPad = function(number, length) {
	// number: số
	// length: độ dài dãy số
	let str = '' + number
	while(str.length < length)
		str = '0' + str

	return str
}

let shuffle = function(array) {
	let m = array.length, t, i;
	while (m) {
		i = Math.floor(Math.random()*m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

let ThongBaoNoHu = function(io, data){
	io.clients.forEach(function(client){
		if (void 0 === client.admin && (client.auth === false || client.scene === 'home')) {
			client.red({pushnohu:data});
		}
	});
}

let ThongBaoBigWin = function(io, data){
	io.clients.forEach(function(client){
		if (void 0 === client.admin && (client.auth === false || client.scene === 'home')) {
			client.red({news:{t:data}});
		}
	});
}
let _formatMoneyVND = (num, digits) => {
  const si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "K" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ]
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
}
let rand = function(min, max)
{
	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min) + min);
}
let  makeid = function(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

let tienti = function(value)
{
	let a = 1000000000;
	let b = value;
	if(Math.fround(b/a) >=1) return Math.fround(b/a).toFixed(2)+' Tỉ';
	else if(Math.fround(b/1000000) >=1) return Math.fround(b/1000000).toFixed(2)+' Tr';
	else if(Math.fround(b/1000) >=1) return Math.fround(b/1000).toFixed(2)+' K';
	else  return b+'';
}
let tinhgio = function(value)
{
	let a = Date.now();
	let b = value;
	let c = (a - b)/1000;
	/* 
		Thuật toán :
		nếu a - b < 60;
	*/
	let phut = c/60;
	if(phut <= 60) return ' '+phut.toFixed(0)+'ph trước.';
	let gio = phut/60;
	if(gio >=1) return ''+gio.toFixed(0)+'h trước.';

}

function dateNow() {
	var d = new Date();
	d.setHours(d.getHours() + 7);
	return d.getTime();
  }


function bug(msg) {
	console.log(msg);
}

function coverTime(timestamp) {
	var date = new Date(timestamp);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ?
		'0' + seconds : seconds) + ' ' + (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) +
		'/' + year;
}

let choang = function() {
	let list = ['thaiduonghasan','rungu'];
	return list;
}


let checkInt = function(c)
{
	if(typeof c == 'string') c = parseInt(c);

	if(isNaN(c)) c = 0;
	c = Math.round(c);
	return c;
}


let getMy = function(id) 
{
	let my = player.find(e => e.id == id);
	if(!my) return false;
	return my;
}

module.exports = {
	getMy : getMy,
	choang : choang,
	eff : eff,
	coverTime : coverTime,
	log : his,
	bug : bug,
	setItemMax : setItemMax,
	detu : checkInfoDeTu,
	setItem : setItem,
	info : checkinfo,
	checkRuong : checkRuong,
	updatePlayer : updatePlayer,
	update : update,
	dateNow : dateNow,
	int : checkInt,
	tinhgio : tinhgio,
	tienti : tienti,
	az : makeid,
	rand : rand,
	time : thoigianget,
	thoigian : thoigiantinh,
	html : html,
	password:  generateHash,
	checkpassword: validPassword,
	anPhanTram:    anPhanTram,
	isEmpty:       isEmpty,
	number_format: numberWithCommas,
	getOnlyNumberInString: getOnlyNumberInString,
	numberPad:       numberPad,
	shuffle:         shuffle,
	validateEmail:   validateEmail,
	checkPhoneValid: checkPhoneValid,
	phoneCrack:      phoneCrack,
	nFormatter:      nFormatter,
	ThongBaoNoHu:    ThongBaoNoHu,
	ThongBaoBigWin:  ThongBaoBigWin,
	cutEmail:        cutEmail,
	cutPhone:        cutPhone,
	_formatMoneyVND: _formatMoneyVND
}
