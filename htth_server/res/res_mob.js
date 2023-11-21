let mob = [
    {
        uid : 1,
        script : {
            type : "sheet",
            img : {
                src : '1000',
                num : 7,
                w : 70,
                h : 70,
            },            
            action : {
                dungyen : [0,1],
                move  : [0,2,3],
                attack : [4,5],
                beattack : [6],
            }
        },
        exp : 300,
        name : "Sói rừng",
        speed : 3,
        chiso : {
            hpmax : 200,
            tancong : 5,
            _dam : 50,
            khang_vat_ly : 30,
            giap : 200,
            exp : 300,
            beri: [100,200],
        },

        skill : {
            'mob_1' : 1, // id skill, level
        },

    }, 

    {
        uid : 2,
        script : {
            type : "img",
            img : "CAwMyHuAOR",     
        },
        exp : 300,
        time : 2000,
        name : "Kiểm thử",
        speed : 5,
        skill : {
            'mob_1' : 1, // id skill, level
        },
        chiso : {
            hpmax : 200,
            hp : 200,
            sat_thuong_vat_ly : 1,
            sat_thuong_phep : 1,
            _chi_mang : 10,
            exp : 300,
            beri: [100,200],
        }

    },

    {
        uid : 'tfff',
        script : {
            type : "img",
            img : "cjHEzoVwKl",
        },
        exp : 300,
        time : 2000,
        name : "Avinda",
        chat : {
            time : 5000,
            tile : 100,
            list : [
                "Đứa nào dám cãi ta",
                "Xem một trùy của ta đây",
                "Nói cho ta nghe xem ai đẹp nhất biển cả này",
            ],
        },
        type : 'boss',
        speed : 5,
        skill : {
            'mob_1' : 1, // id skill, level
        },
        chiso : {
            hpmax : 20000,
            hp : 20000,
            sat_thuong_vat_ly : 1,
            sat_thuong_phep : 1,
            _chi_mang : 10,
            exp : 300,
            beri: [100,200],
        }

    }
];

module.exports = mob;