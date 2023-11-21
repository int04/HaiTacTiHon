let skill = [
    {
        id : 'mob_1',
        class : 999,
        avatar : '4000',
        name : 'Đấm mob',
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'dam',
        value : 105,
        time : 500,
        st : 2, //1 => vật lý, 2 phép
        script: 'mob_att_1',
    },

    { 
        id : 1,
        class : 1,
        avatar : '4000',
        name : 'Quả đấm tốc độ',
        mota : "Một cú đấm với sát thương cực mạnh tác dụng lên kẻ thù",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'dam',
        value : 105,
        mp : 5,
        time : 500,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'vs1',
        buff : [
            ['_hpmax',10,10,100,2,null,[0,0]], // tên thuộc tính, giá trị, thời gian tác dụng, tỉ lệ, đối tượng (1 bản thân, 2 địch, 3 nhóm), liên kết với sheet, cấm đi, cấm đánh
            ['sat_thuong_phep',10,20,100,2,null,[1,1]],
            ['_chi_mang',50,20,100,2,null,[0,0]],
            ['_hpmax',50,10,100,1,null,[0,0]],
        ]
    },
    {
        id : 2,
        class : 1,
        avatar : '4001',
        name : 'Bazokaaaa',
        mota : "Một cú đấm với sát thương cực đại, nã thẳng vào đầu kẻ thù",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'dam',
        value : 200,
        mp : 5,
        time : 1500,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'vs2',
    },
    {
        id : 3,
        class : 1,
        avatar : '4002',
        name : 'Liên hoàn bazoka',
        mota : "Tạo ra liên hoàn cú đấm gây bất ngờ cho đối phương",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'dam',
        value : 189,
        mp : 5,
        time : 2000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'vs3',
    },


    {
        id : 4,
        class : 2,
        avatar : '4006',
        name : 'Hắc cước',
        mota : "Một đôi chân nhanh nhẹn với những cú đá vào kẻ thù.",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'chan',
        value : 103,
        mp : 2,
        time : 1000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'db1',
    },

    {
        id : 5,
        class : 2,
        avatar : '4007',
        name : 'Phi cước',
        mota : "Bùng lửa ! Ngọn lửa tạo ra từ ma sát khiến đòn đánh trở nên bùng lửa.",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'chan',
        value : 150,
        mp : 2,
        time : 2000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'db2',
    },

    {
        id : 6,
        class : 2,
        avatar : '4008',
        name : 'Liên hoàn cước',
        mota : "Liên tiếp những cú cước vào kẻ thù.",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'chan',
        value : 200,
        mp : 2,
        time : 8000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'db3',
    },

    {
        id : 7,
        class : 3,
        avatar : '4009',
        name : 'Tatakai',
        mota : "Đòn đánh khéo léo của một hoa tiêu",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'hoatieu',
        value : 100,
        mp : 2,
        time : 1000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'ht1',
    },

    {
        id : 8,
        class : 3,
        avatar : '4010',
        name : 'Nageru',
        mota : "Tạo một vòng xoáy ném vào kẻ thù",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'hoatieu',
        value : 110,
        mp : 2,
        time : 2000,
        st : 2, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'ht2',
    },

    {
        id : 10,
        class : 3,
        avatar : '4011',
        name : 'Bong bóng thời tiết',
        mota : "Tạo ra những bong bóng chứa sức mạnh sét tiến tới và nổ tung khi chạm vào kẻ thù",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'hoatieu',
        value : 130,
        mp : 2,
        time : 8000,
        st : 2, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'ht3',
    },

    {
        id : 11,
        class : 4,
        avatar : '4003',
        name : 'Nhất kiếm',
        mota : "Đòn đánh cơ bản nhưng lại rất nguy hiểm của kiếm khách",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'kiemkhach',
        value : 105,
        mp : 2,
        time : 1000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'kk1',
    },

    {
        id : 12,
        class : 4,
        avatar : '4004',
        name : 'Song kiếm',
        mota : "Sự kết hợp hoàn hảo của tay kiếm sử dụng thuần thục 2 loại vũ khí cùng một lúc.",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'kiemkhach',
        value : 145,
        mp : 2,
        time : 2000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'kk2',
    },

    {
        id : 13,
        class : 4,
        avatar : '4005',
        name : 'Tam kiếm',
        mota : "Kĩ thuật tam kiếm của những kiếm khách vĩ đại, tạo ra những cơn lốc sát thương từ vòng xoay của thanh kiếm.",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'kiemkhach',
        value : 200,
        mp : 2,
        time : 8000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'kk3',
    },


    {
        id : 14,
        class : 5,
        avatar : '4012',
        name : 'One Short',
        mota : "Một trong những kĩ năng bắn súng của xạ thủ chuyên nghiệp, hạ gục nhanh đối thủ chỉ với một phát súng.",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'xathu',
        value : 110,
        mp : 2,
        time : 1000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'xt1',
    },

    {
        id : 15,
        class : 5,
        avatar : '4013',
        name : 'Đạn lửa',
        mota : "Vận dụng sức mạnh của Haki vào viên đạn khiến chúng xuyên qua mọi lớp giáp của kẻ thù.",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'xathu',
        value : 150,
        mp : 5,
        time : 2000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'xt2',
    },

    {
        id : 16,
        class : 5,
        avatar : '4014',
        name : 'Pháo hoa',
        mota : "Bầu trời đêm nay sẽ tràn ngập ánh sáng và máu của kẻ thù sẽ được thành cơn mưa.",
        type : 'tancong', // tấn công, chủ động, bị động
        loai : 'xathu',
        value : 250,
        mp : 5,
        time : 8000,
        st : 1, //1 => vật lý, 2 phép
        auto : 1, // tự động insert
        script: 'xt3',
    },

    {
        id : 200,
        class : 1,
        avatar : '4041',
        name : 'Sức mạnh của lửa',

        mota : "Ngọn lửa là bất tận, thiêu đốt mọi thứ để biến chúng thành năng lượng cho bản thân trong một thời gian",
        type : 'hotro', // tấn công, chủ động, bị động
        loai : 'dam',
        value : 10,
        mp : 30,
        time : 500,
        buff : [
            ['_hpmax',10,10,100,1],
        ],
        auto : 1, // tự động insert
    }, 
    {
        id : 300,
        class : 1,
        avatar : '4018',
        name : 'Ý chí của D',

        mota : "Rèn luyện bản thân tới cảnh giới cao nhất để đạt được những hiệu ứng cơ bản.",
        type : 'bidong', // tấn công, chủ động, bị động
        loai : 'danhthuong',
        buff : {
            _hpmax : 10,
            _mpmax : 10,
        },
        auto : 1, // tự động insert
    }
];

module.exports = skill;