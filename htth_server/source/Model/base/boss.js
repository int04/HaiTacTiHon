
let data= [
    {
        id : 987,
        name : 'Tàu bảy bảy',
        script : {
            theobo : "glyZJ"
        },
        chiso : {
            hp : 100000,
            sucdanh : 30,
            giap : 0,
        },
        speed : 5,
        skill : {
            1 : 7, // 1 là id skill, 7 là level
            2 : 7,
    
            
        },
        noti : {
            block_die : false, 
            block_on : false,
        },
        hoisinh : 5, // nếu 0 thì sẽ không hồi sinh lại
        map : [21], // map random khi hồi sinh
        on : 1, // tự động đẩy vào khi bật server
        die : [], // khi chết tạo ra các boss này
        start : [], // khi hồi sinh cùng tạo ra các boss này.
        item : [], // item rớt khi chết
        chat : {
            on : ["Muốn sống thì mau giao Ngọc Rồng ra đây.","Ngươi có 3 phút để chạy","tàu bảy bảy ta trước giờ chưa ngán ai cả", "chạm vào ta thì ngươi chết chắc"],
            kill : [],
            die : ["Tàu bảy bảy ta sẽ không chịu thua đâu !"],
            delay : 10000,
        }
    },
    {
        id : 1,
        name : 'Super Broly',
        script : {
            ao: "OdcEjQVJAu",
            quan: "wlOVtVQfck",
            dau: "sFMvEpAPHB",
        },
        chiso : {
            hp : 5000000,
            sucdanh : 30000,
            giap : 0,
        },
        speed : 5,
        skill : {
            1 : 7, // 1 là id skill, 7 là level
            2 : 7,
            6 : 7,
            7 : 7,
            12 : 1,
            10 : 1,
            8: 1,
        },
        hoisinh : 1, // nếu 0 thì sẽ không hồi sinh lại
        map : [0], // map random khi hồi sinh
        on : 0, // tự động đẩy vào khi bật server
        die : [2], // khi chết tạo ra các boss này
        start : [], // khi hồi sinh cùng tạo ra các boss này.
        item : [
            {id : 'ock', soluong : 1000000, tile : 100},
            {id : 'ock', soluong : 1000000, tile : 100},
            {id : 'ock', soluong : 1000000, tile : 100},
            {id : 'ock', soluong : 1000000, tile : 100},
            {id : 'ock', soluong : 1000000, tile : 100},
            {id : 'ock', soluong : 1000000, tile : 100},
            {id : 'ock', soluong : 1000000, tile : 100},
            {id : 'fd5', soluong :1, tile : 100, hsd : 10},
            {id : 24, soluong :1, tile : 100, hsd : 10},
            {id :264, soluong :1, tile : 100, hsd : 10},

        ], // item rớt khi chết
        chat : {
            on : ["$ xin lỗi ta đi", "Ta chấp ngươi 3 skill trước $", "$ tránh xa ta ra"],
            kill : ["Chừa nha $, giám động vào ta à"],
            die : ["Các ngươi nhớ đấy ! nhất định ta sẽ quay trở lại."],
            delay : 10000,
        }
    }, 

    {
        id : 2,
        name : 'Thượng đế',
        script : {
            
            theobo : "fiRbs",
        },
        chiso : {
            hp : 5000000,
            sucdanh : 3000,
            giap : 0,
        },
        speed : 5,
        skill : {
            1 : 7, // 1 là id skill, 7 là level
            2 : 7,
            6 : 7,
            7 : 7,
        },
        hoisinh : 0, // nếu 0 thì sẽ không hồi sinh lại
        map : [0], // map random khi hồi sinh
        on : 0, // tự động đẩy vào khi bật server
        die : [], // khi chết tạo ra các boss này
        start : [], // khi hồi sinh cùng tạo ra các boss này.
        chat : {
            on : ["Ta cho các ngươi 3 phút suy ngẫm"],
            kill : ["Chừa nha $, giám động vào ta à"],
            die : ["Các ngươi nhớ đấy ! nhất định ta sẽ quay trở lại."],
            delay : 3000,
        }
    }
];


module.exports = data;