let skill_active = [
    {
        'xep' : -9,
        'id' : -9,
        'type' : 'bidong',
        'name' : 'HP gốc',
        'object': 'hpGoc',
        'value' : {
            traidat : 20,
            saiyan : 20,
            namek : 20,
        }, // HP/20 + HP
        'class' : 'all', // tộc
        'avatar' : '567' 
    },
    {
        'xep' : -8,

        'id' : -8,
        'type' : 'bidong',
        'name' : 'KI gốc',
        'object': 'kiGoc',
        'value' : {
            traidat : 20,
            saiyan : 20,
            namek : 20,
        }, // HP/20 + HP
        'class' : 'all', // tộc
        'avatar' : '569' 
    },
    {
        'xep' : -7,

        'id' : -7,
        'type' : 'bidong',
        'name' : 'Sức đánh gốc',
        'object': 'sucdanhGoc',
        'value' : {
            traidat : 20,
            saiyan : 20,
            namek : 20,
        }, // HP/20 + HP
        'class' : 'all', // tộc
        'avatar' : '538' 
    },
    {
        'xep' : -6,

        'id' : -6,
        'type' : 'bidong',
        'name' : 'Chí mạng gốc',
        'object': 'chimangGoc',
        'value' : {
            traidat : [],
            saiyan : [],
            namek : [],
        }, // HP/20 + HP
        'class' : 'all', // tộc
        'avatar' : '568' 
    },
    {
        'xep' : -5,

        'id' : -5,
        'type' : 'bidong',
        'name' : 'Giáp gốc',
        'object': 'giapGoc',
        'value' : {
            traidat : 500000,
            saiyan : 500000,
            namek : 500000,
        }, // HP/500000 + HP
        'class' : 'all', // tộc
        'avatar' : '721' 
    },
    {
        id : 0,
        'name' : 'Đấm Dragon',
        'class' : 'traidat',
        'pos' : {
            x : 30,
            y : 20, // max
        }, 
        'time' : [0,2.0,1.9,1.8,1.7,1.6,1.5,1.0], // thời gian hồi
        'dame' : [0,100,110,120,130,140,150,160], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'script' : ['attack'], // script của nhân vật
        'effdelay' : [[],[]], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[], ['eff_attack']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : -1,

    }
    ,


    /// trái đất

    {
        'xep' : 1,

        id : 1,
        'name' : 'Đấm Dragon',
        'class' : 'traidat',
        'mota' : 'Đòn đánh cận chiến',
        'desc' : 'Gây ra $% sát thương.',
        'dx' : 70,
        
        'kit' : 1,
        'time' : [0,0.5,1.9,1.8,1.7,1.6,1.5,0.3], // thời gian hồi
        'dame' : [0,100,110,120,130,140,150,160], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'script' : ['attack'], // script của nhân vật
        'effdelay' : [
            [],
            [],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[], ['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 539,
        'ob' : 'donDam',

    }, 

    {
        xep : 2,
        id : 2,
        'name' : 'Kamejoko',
        'class' : 'traidat',
        'mota' : 'Chưởng kamejoko của Quy Lão tiên sinh, có sức mạnh công phá lớn.',
        'desc' : 'Sát thương: $%',
        'dx' : 400,
        'kit' : 1,

        'time' : [0,3,2.9,2.8,2.7,2.6,2.5,2.6], // thời gian hồi
        'dame' : [0,150,170,185,200,220,230,240], // sát thương
        'ki' : [0,15,35,60,90,150,225,400], // ki tiêu tốn
        'script' : ['kamejoko'], // script của nhân vật
        'effdelay' : [
            [],
            [],
            [], [], ['het_traidat'], ['het_traidat'], ['het_traidat'], ['het_traidat']
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[], ['Kamejoko'],['Kamejoko'],['Kamejoko'],['Kamejoko'],['Kamejoko'],['Kamejoko'],['Kamejoko']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 540,
        'ob' : 'skill',

    }, 


    {
        xep : 3,
        id : 3,
        'name' : 'Thái dương hạ san',
        'mota' : 'Làm chói mắt kẻ thù',
        'class' : 'traidat',
        'desc' : 'Làm chói mắt kẻ thù trong $ giây',
        'dx' : 400000,
        'kit' : 1,

        'time' : [0,15,15,15,15,15,15,15], // thời gian hồi
        'dame' : [0,3,4,5,6,7,8,9], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'script' : ['gong'], // script của nhân vật
        'effdelay' : [
            [],
            ['choang'],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'buff', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 717,
        'ob' : 'skill',

    }

,
    {
        xep : 4,
        id : 4,
        'name' : 'Kaioken',
        'class' : 'traidat',
        'mota' : 'Đòn đánh với sát thương cực kì mạnh lên đối thủ',
        'desc' : 'Sát thương: $%',
        'pos' : {
            x : 30,
            y : 20, // max
        }, 
        'kit' : 1,
        'dx' : 70,


        'time' : [0,0.3,0.3,0.3,0.3,0.3,0.3,0.3], // thời gian hồi
        'dame' : [0,170,180,190,200,210,220,230], // sát thương
        'ki' : [0,10,35,40,90,110,130,150], // ki tiêu tốn
        'script' : ['attack'], // script của nhân vật
        'effdelay' : [
            [],
            ['kaioken','nen_kaioken'],
            ['kaioken','nen_kaioken'], ['kaioken','nen_kaioken'], ['kaioken','nen_kaioken'], ['kaioken','nen_kaioken'], ['kaioken','nen_kaioken'], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[],['kaioken_attack'],['kaioken_attack'],['kaioken_attack'],['kaioken_attack'],['kaioken_attack'],['kaioken_attack'],['kaioken_attack']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 716,
        'ob' : 'donDamKaioKen',

    },

    {
        xep : 5,
        id : 5,
        'name' : 'Quả cầu kênh khí',
        'class' : 'traidat',
        'mota' : 'Hấp thụ toàn bộ năng lượng của vạn vật, tạo ra một quả cầu có sức mạnh công phá siêu lớn vào đối phương.',
        'desc' : 'Sát thương: $%',
        'dx' : 400,

        'kit' : 2,
        'time' : [0,3,19,18,16,15,14,13], // thời gian hồi
        'dame' : [0,1100,1200,1300,1400,1500,1600,1700], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'script' : ['gong'], // script của nhân vật
        'effdelay' : [
            [],
            ['quacauKenhKi'],
            ['kaioken','nen_kaioken'], ['kaioken','nen_kaioken'], ['kaioken','nen_kaioken'], ['kaioken','nen_kaioken'], ['kaioken','nen_kaioken'], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[],['quacauKenhKi_attack'],['kaioken_attack'],['kaioken_attack'],['kaioken_attack'],['kaioken_attack'],['kaioken_attack'],['kaioken_attack']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [10000,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 711,
        'ob' : 'skill',

    }, 

    {
        xep : 6,
        id : 14,
        'name' : 'Ru ngủ',
        'mota' : 'Ru ngủ đối phương trong 1 khoảng thời gian.',
        'class' : 'traidat',
        'desc' : 'Thời gian ru ngủ $ giây.',
        'dx' : 400,

        'kit' : 2,
        'time' : [0,3,19,18,16,15,14,13], // thời gian hồi
        'dame' : [0,3,4,5,6,7,8,9], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'effdelay' : [
            [],
            ['choang'],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'buff', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 3782,
        'ob' : 'skill',
        'need' : true,

    },


    /// saiyan

    {
        xep : 1,
        id : 15,
        'name' : 'Đấm galick',
        'class' : 'saiyan',
        'mota' : 'Đòn đánh cận chiến',
        'desc' : 'Gây ra $% sát thương.',
        'dx' : 70,

        'kit' : 1,
        'time' : [0,1.0,0.9,0.8,0.7,0.6,0.6,0.5], // thời gian hồi
        'dame' : [0,110,120,130,140,150,160,170], // sát thương
        'ki' : [0,5,9,12,15,20,32,44], // ki tiêu tốn
        'script' : ['attack'], // script của nhân vật
        'effdelay' : [
            [],
            [],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[], ['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 539,
        'ob' : 'donDam',

    }, 


    {
        xep : 2,
        id : 6,
        'name' : 'Atomic',
        'class' : 'saiyan',
        'desc' : 'Sát thương: $%',
        'mota' : 'Chưởng atomic của người xaiyan, tấn công với nguồn năng lượng lớn.',
        'dx' : 400,

        'kit' : 1,

        'time' : [0,2,1.9,1.8,1.7,1.6,1.5,1.4], // thời gian hồi
        'dame' : [0,110,120,130,140,150,160,170], // sát thương
        'ki' : [0,10,14,25,30,75,100,150], // ki tiêu tốn
        'script' : ['kamejoko'], // script của nhân vật
        'effdelay' : [
            [],
            ['het'],
            ['het'], ['het'], ['het'], ['het'], ['het'], ['het']
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[], ['AtumoicEff'],['AtumoicEff'],['AtumoicEff'],['AtumoicEff'],['AtumoicEff'],['AtumoicEff'],['AtumoicEff']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 540,
        'ob' : 'skill',

    }, 

    {
        xep : 3,
        id : 7,
        'name' : 'Masenko',
        'class' : 'namek',
        'mota' : 'Vận công của người Namek với tốc độ siêu nhanh.',
        'desc' : 'Sát thương: $%',
        'dx' : 400,

        'kit' : 1,

        'time' : [0,0.9,0.8,0.7,0.6,0.5,0.4,0.7], // thời gian hồi
        'dame' : [0,100,105,110,115,120,125,130], // sát thương
        'ki' : [0,2,4,8,10,12,15,20], // ki tiêu tốn
        'script' : ['dam2'], // script của nhân vật
        'effdelay' : [
            [],
            ['het_namek'],
            ['het_namek'], ['het_namek'], ['het_namek'], ['het_namek'], ['het_namek'], ['het_namek']
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[], ['masenkoName'],['masenkoName'],['masenkoName'],['masenkoName'],['masenkoName'],['masenkoName'],['masenkoName']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 540,
        'ob' : 'skill_one',

    }, 

   
   

    {
        xep : 4,
        id : 8,
        'name' : 'Tái tạo năng lượng',
        'mota' : 'Hồi phục HP và KI',
        'class' : 'saiyan',
        'desc' : 'Phục hồi $% HP và KI',
        'dx' : 4000000,

        'kit' : 1,

        'time' : [0,20,18,17,16,15,14,13], // thời gian hồi
        'dame' : [0,3,4,5,6,7,8,9], // tác dụng
        'ki' : [0,0,0,0,0,0,0,0,0,0], // ki tiêu tốn
        'script' : ['gong'], // script của nhân vật
        'obb' : 'taitaonangluong',
        'to' : 'me',
        'effdelay' : [
            [],
            ['taitaonnl'],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'buff', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn. 
        'avatar' : 720,
        'ob' : 'skill',

    }, 


    {
        "xep" : 5,
        id : 10,
        'name' : 'Tự phát nổ',
        'mota' : 'Tự biến bản thân thành quả boom để tiêu diệt đối phương.',
        'class' : 'saiyan',
        'desc' : 'Sát thương: $%',
        'dx' : 400000,

        'kit' : 2,

        'time' : [0,150,120,100,90,80,70,60], // thời gian hồi
        'dame' : [0,100,110,120,130,140,150,160], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'script' : ['gong'], // script của nhân vật
        'effdelay' : [
            [],
            ['choang'],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'buff', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 2248,
        'ob' : 'skill',

    },

    {
        xep : 6,
        id : 11,
        'name' : 'Hoá khỉ',
        'mota' : 'Hoá thành dạng khỉ, tăng sức mạnh, tấn công và hp cho bản thân.',
        'class' : 'saiyan',
        'desc' : 'Thời gian duy trì $ giây',
        'dx' : 400000,

        'kit' : 2,

        'time' : [0,300,300,300,300,300,300,300], // thời gian hồi
        'dame' : [0,60,70,80,90,100,120,150], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'script' : ['gong'], // script của nhân vật
        'effdelay' : [
            [],
            ['choang'],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'buff', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 718,
        'ob' : 'skill',

    },



    // namek
    
    {
        xep : 1,
        id : 16,
        'name' : 'Đấm demon',
        'class' : 'namek',
        'mota' : 'Đòn đánh cận chiến',
        'desc' : 'Gây ra $% sát thương.',
        'dx' : 70,

        'kit' : 1,
        'time' : [0,0.7,0.6,0.5,0.4,0.4,0.4,0.3], // thời gian hồi
        'dame' : [0,105,110,115,120,130,135,140], // sát thương
        'ki' : [0,1,3,5,7,12,15,20], // ki tiêu tốn
        'script' : ['attack'], // script của nhân vật
        'effdelay' : [
            [],
            [],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [[], ['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam'],['eff_skill_dam']], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'attack', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 539,
        'ob' : 'donDam',

    }, 


    {
        xep : 2,
        id : 12,
        'name' : 'Masenko',
        'mota' : 'Kĩ năng đặc biệt của tộc namek cổ đại, gồng mình để tích tụ năng lượng, sau đó giải phóng liên tục vào đối thủ.',
        'class' : 'namek',
        'desc' : 'Gây ra $% sát thương mỗi đòn.',
        'dx' : 4000,

        'kit' : 2,
        'need' : true,
        'time' : [0,3,90,80,70,60,50,40], // thời gian hồi
        'dame' : [0,100,110,120,130,140,150,160], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'solan' : [0,5,7,9,10,12,15,16],
        'effdelay' : [
            [],
            ['choang'],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'buff', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 723,
        'ob' : 'skill',

    },


    {
        xep : 3,
        id : 9,
        'name' : 'Trị thương',
        'mota' : 'Hồi phục KI và HP cho những người xung quanh',
        'class' : 'namek',
        'desc' : 'Hồi phục $% HP và KI cho những người xung quanh',
        'dx' : 400,

        'kit' : 2, // 1 là trừ bình thường, 2 là trừ % hành trang

        'time' : [0,1,18,17,16,15,14,13], // thời gian hồi
        'dame' : [0,20,30,40,50,60,70,80], // tác dụng
        'ki' : [0,5,10,15,20,25,30,35], // ki tiêu tốn
        'script' : ['gong'], // script của nhân vật
        'obb' : 'taitaonangluong',
        'to' : 'player',
        'need' : true,
        'effdelay' : [
            [],
            ['taitaonnl'],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'buff', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 724,
        'ob' : 'skill',

    }, 

   

   


    {
        xep : 999,
        id : 13,
        'name' : 'Khiêng năng lượng',
        'mota' : 'Dùng KI tạo ra một khiêng năng lượng vô hiệu hoá toàn bộ đòn đánh của đối phương.',
        'class' : 'all',
        'desc' : 'Thời gian vô hiệu $ giây.',
        'dx' : 4000000,

        'kit' : 2,
        'time' : [0,60,60,70,80,110,120,130], // thời gian hồi
        'dame' : [0,10,20,30,40,50,60,70], // sát thương
        'ki' : [0,2,5,8,11,15,21,26], // ki tiêu tốn
        'chan' : [0,100000,200000,300000,400000,500000,600000,700000],
        'effdelay' : [
            [],
            ['choang'],
            [], [], [], [], [], []
        ], // hiệu ứng đòn đánh trong thời gian chờ delay
        'eff' : [], // tên hiệu ứng
        'sound' : ['sound_attack'], // tên âm thanh
        'type' : 'buff', // loại kĩ năng: attack, buff, 
        'delay' : [0,0,0,0,0,0,0,0], // thời gian ra đòn.
        'avatar' : 3784,
        'ob' : 'skill',

    },


  


 



];




module.exports = skill_active;