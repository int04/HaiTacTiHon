let npc = [
    {
        id : 'ac',
        map : 1,
        pos : [675,240],
        name : 'Garp',
        script: {
            "type" : "sheet",
            "src" : "5004",
            "set" : [2,52,90],
            "id" : "",
        },
        giaotiep : ["Trách nhiệm của ta là bảo vệ ngôi làng này, ta đố tên hải tặc nào dám động vào cái làng này đấy !","Ta huấn luyện mi để trở thành người hải quân mạnh mẽ, hải tặc chỉ là một lũ côn đồ thôi !"],
        chat : [
            "Hải tặc H5 chính thức khai mở, tham gia ngay",
            ["Gió thổi hoa rơi buồn điệp điệp",
            "Mưa buốt lạnh lẽo nhớ thương ai",
            "Đường vắng xa xôi người vẫn bước",
            "Đời người như giấc mộng mênh mông",],
            [
                "Chiều chiều chông ngóng mây trôi",
                "Mây yên, gió lặng, nắng tàn tình ta",
                "Tình ta có mấy keo sơn",
                "Giang sơn còn đổi, khó lòng nàng thương"
            ], 
            [   "Phải chăng nuối tiếc một người",
                "Phải chăng thương nhớ một người chẳng thương",
                "Thương nàng nhưng nàng chẳng thương",
                "Thôi thì ta bỏ cho vuông đôi đường"
            ]
        ],
        delaychat : 5000,
    }, 

    {
        id : 'ac2',
        map : 1,
        pos : [915,336],
        name : 'Test',
        script: {
            "type" : "img",
            "id" : "CAwMyHuAOR",
        },
        giaotiep : ["Trách nhiệm của ta là bảo vệ ngôi làng này, ta đố tên hải tặc nào dám động vào cái làng này đấy !"],

        chat : [
            "Hải tặc H5 chính thức khai mở, tham gia ngay",
            ["Gió thổi hoa rơi buồn điệp điệp",
            "Mưa buốt lạnh lẽo nhớ thương ai",
            "Đường vắng xa xôi người vẫn bước",
            "Đời người như giấc mộng mênh mông",],
            [
                "Chiều chiều chông ngóng mây trôi",
                "Mây yên, gió lặng, nắng tàn tình ta",
                "Tình ta có mấy keo sơn",
                "Giang sơn còn đổi, khó lòng nàng thương"
            ], 
            [   "Phải chăng nuối tiếc một người",
                "Phải chăng thương nhớ một người chẳng thương",
                "Thương nàng nhưng nàng chẳng thương",
                "Thôi thì ta bỏ cho vuông đôi đường"
            ]
        ],
        delaychat : 5000,
    },

    {
        id : 'cv4',
        map : 1,
        pos : [1561,237],
        name : 'Deta',
        script: {
            "type" : "sheet",
            "src" : "5003",
            "set" : [2,52,90],
            "id" : "",
        },
        giaotiep : [
            "Ta là một người thợ rèn, ta có thể rèn cho ngươi những vũ khí mạnh mẽ nhất !",
            "Trên người mi đồ hơi cũ, cần thay hay không ?"
        ],
        chat : [
        ],
        delaychat : 5000,
        event : [
            ['Cửa hàng','element',[
                ['Quần áo','boxshop','a1']
            ]],
            ['Hiển thị','ditme','hihi']
        ]
    },

    {
        id : 'yuty',
        map : 1,
        pos : [1968,237],
        name : 'Johny',
        script: {
            "type" : "sheet",
            "src" : "5023",
            "set" : [2,52,90],
            "id" : "",
        },
        giaotiep : [
            "Một món đồ sẽ được mạnh hơn nếu mang chúng qua ta !",
            "Ngươi có những món đồ mạnh mẽ, chúng sẽ mạnh hơn gấp 10 lần nếu gặp ta."
        ],
        chat : [
            "Muốn cường hóa đồ thì đến gặp ta !",
            "Ghé ngang qua cửa hàng của ta nào !"
        ],
        delaychat : 5000,
        event : [
            ['Cường hóa','element',[
                ['Nâng cấp','menu', [
                    ['Nâng cấp','nangcap','a'],
                    ['Ghép nguyên liệu','ghep','a'],
                ]],
                ['Khảm đá','menu', [
                    ['Đục lỗ','duclo','a'],
                    ['Khảm đá','khamda','a'],
                    ['Ghép Đá','ghep','a'],
                ]],
                ['Cửa hàng','boxshop','a1'],
            ]],

            ['Hiển thị','ditme','hihi']
        ]
    },
];
module.exports = npc;