
let npc =[
    {
        id : 'a1',
        name : 'Ông goHan',
        script: {
            theobo : "LlmlN",
            ao : "",
            quan : "",
            dau : "",
            avatar : "349",
        },
        giaotiep : "Học võ để trở thành người có ích, đừng dùng võ vào những việc sai trái.",
        chat : [
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
        map : {
            x : 394,
            y : -41,
            map : 1,
        },
        action : [
           
        ],
    },

    // XBCwI
    {
        id : 'a2',
        name : 'Bulma',
        script: {
            theobo : "XBCwI",
            ao : "",
            quan : "",
            dau : "",
            avatar : "562",
        },
        giaotiep : "Chào cưng ! Chị có một vài món đồ cho hành trình của cậu này..",
        chat : [
            "Ngọc Rồng H5 đã chính thức mở cửa với lối chơi hoàn toàn mới, hoàn toàn miễn phí.",
        ],
        delaychat : 5000,
        map : {
            x : 345,
            y : -41,
            map : 0,
        },
        action : [{_1 : 'Cửa hàng', _2 : 'shop_buma'}],
    },


    {
        id : 'a2a',
        name : 'Uron',
        script: {
            theobo : "zBCWw",
            ao : "",
            quan : "",
            dau : "",
            avatar : "728",
        },
        giaotiep : "Uron ta không có gì là không có, chỉ e rằng mi không có tiền thôi. Hahaaaa !",
        chat : [
            "Cửa hàng mới về một số vật phẩm đây.",
            "Đồ của ta luôn là xịn nhất trên đời này"
        ],
        delaychat : 5000,
        map : {
            x : 1246,
            y : -232,
            map : 5,
        },
        action : [{_1 : 'Cửa hàng', _2 : 'shop_buma_vo'}],
    },


    {
        id : 'a2',
        name : 'Quy Lão Kame',
        script: {
            theobo : "LoDRZ",
            ao : "",
            quan : "",
            dau : "",
            avatar : "564",
        },
        giaotiep : "Con muốn hỏi gì nào?",
        chat : [
            "Ngọc Rồng H5 đã chính thức mở cửa với lối chơi hoàn toàn mới, hoàn toàn miễn phí.",
        ],
        delaychat : 5000,
        map : {
            x : 2317,
            y : 200,
            map : 10,
        },
        action : [],
    },

    {
        id : 'ba',
        name : 'Bà hạt mít',
        script: {
            theobo : "FqidE",
            ao : "",
            quan : "",
            dau : "",
            avatar : "1410",
        },
        giaotiep : "Ngươi tìm ta có việc gì ?",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 2094,
            y : 248,
            map : 2,
        },
        action : [
            {_1 : 'Nâng cấp', _2 : 'nangcap'},
        ],
    },

    {
        id : 'ba',
        name : 'Bà hạt mít',
        script: {
            theobo : "FqidE",
            ao : "",
            quan : "",
            dau : "",
            avatar : "1410",
        },
        giaotiep : "Mọi loại trang bị đều luôn chứa những sức mạnh tiềm ẩn. Nếu ngươi muốn biết chúng thì hãy tìm ta !",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 3044,
            y : 200,
            map : 10,
        },
        action : [
            {_1 : 'Đục lỗ', _2 : 'duclo'},
            {_1 : 'Ép sao', _2 : 'epsao'},
        ],
    },

    {
        id : 'zec',
        name : 'Rương đồ',
        script: {
            theobo : "XhFMT",
            ao : "",
            quan : "",
            dau : "",
            avatar : "1410",
        },
        giaotiep : "Tôi chỉ là một cái rương đồ bình thường thôi.",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 589,
            y : -70,
            map : 1,
        },
        onclick : 'ruongdo',
        action : [
            {_1 : 'Đục lỗ', _2 : 'duclo'},
            {_1 : 'Ép sao', _2 : 'epsao'},
        ],
    },


    {
        id : 'xzder',
        name : 'Cây thần',
        script: {
            theobo : "BwsEX",
            ao : "",
            quan : "",
            dau : "",
            avatar : "1410",
        },
        giaotiep : "Tôi chỉ là một cái rương đồ bình thường thôi.",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 1258,
            y : -70,
            map : 1,
        },
        onclick : 'caythan',
        action : [
            {_1 : 'Đục lỗ', _2 : 'duclo'},
            {_1 : 'Ép sao', _2 : 'epsao'},
        ],
    },


    {
        id : 'ghyu',
        name : 'Son Goku',
        script: {
            theobo : "LRovb",
            ao : "",
            quan : "",
            dau : "",
            avatar : "8785",
        },
        giaotiep : "Ngươi là ai ?",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 1910,
            y : -40,
            map : 0,
        },
        action : [
        ],
    },

    {
        id : 'fghty',
        name : 'Dr. Brief',
        script: {
            theobo : "Spwmk",
            ao : "",
            quan : "",
            dau : "",
            avatar : "640",
        },
        giaotiep : "Tàu vũ trụ của ta có thể đưa cậu đến mọi nơi trong 3 giây. Cậu muốn đi đâu ?",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 883,
            y : -42,
            map : 5,
        },
        action : [
            {_1 : 'Đến Trái Đất', _2 : 'goto', x : [304,900,5], y : -42},
            {_1 : 'Đến Saiyan', _2 : 'goto', x : [200,1584,43], y : -42},
        ],
    },

    {
        id : 'vn666',
        name : 'Cui',
        script: {
            theobo : "JSBAI",
            ao : "",
            quan : "",
            dau : "",
            avatar : "639",
        },
        giaotiep : "Tàu vũ trụ saiyan có thể đưa ngươi tới đến bất kì đâu. Miễn ngươi để lại hết đồ trên người trước khi lên tàu.",
        chat : [
            ["Chiều thu mưa vàng trong nắng nhẹ","Mưa vàng rơi nhẹ mái tóc em","Tiếng mưa rơi dài như tiếng thở...","Buồn lòng anh nhớ ngày nào còn em..."],
            "Trò chơi dành cho người trên 12 tuổi. Chơi quá 180 phút có hại cho sức khoẻ",
            "Trò chơi là dự án của sinh viên, không phải để kinh doanh"
        ], 
        delaychat : 5000,
        map : {
            x : 692,
            y : -42,
            map : 43,
        },
        action : [
            {_1 : 'Đến Trái Đất', _2 : 'goto', x : [304,900,5], y : -42},
            {_1 : 'Đến Saiyan', _2 : 'goto', x : [200,1584,43], y : -42},
        ],
    },


    {
        id : 'zcvc',
        name : 'Yajirobe',
        script: {
            theobo : "FRrJi",
            ao : "",
            quan : "",
            dau : "",
            avatar : "2119",
        },
        giaotiep : "Không có việc gì làm thì ra chỗ khác chơi đi.",
        chat :[], 
        delaychat : 5000,
        map : {
            x : 1094,
            y : -42,
            map : 23,
        },
        action :[],
    },

    {
        id : 'fdgty',
        name : 'Thần mèo Karin',
        script: {
            avatar: "1209",
            theobo : "Qrzmt",
        },
        giaotiep : "Mèo méo meo mèo meo, con mèo ngu ngốk đáng iu !!!!",
        chat :[], 
        move : "left",
        delaychat : 5000,
        map : {
            x : 1391,
            y : -42,
            map : 23,
        },
        action :[],
    },

    {
        id : 'awrtyf',
        name : 'Mr Popo',
        script: {
            ao: "FgCbppOIkr",
            quan: "oKkNGInpnm",
            dau: "ZGZYPbPZAy",
            avatar: "2132",
        },
        giaotiep : "Popo có rất nhiều đồ, cậu muốn xem thử không ?",
        chat :[], 
        delaychat : 5000,
        map : {
            x : 1059,
            y : -42,
            map : 24,
        },
        action : [{_1 : 'Cửa hàng', _2 : 'shop_popo'}],

    },

    {
        id : 'fgr',
        name : 'Thượng đế',
        script: {
            avatar: "1356",
            theobo : "fiRbs",
        },
        giaotiep : "Dòng tộc namek đã có 1 thời gian rất thịnh vượng, nó nằm ở rất xa với trái đất.",
        chat :[
            ["Gió cuấn mây trôi dòng nước chảy", "Cá bơi vội vã đến đâu lại về","Đời người như giấc mộng mênh mông","Một ngày thôi cũng là qua đi"],
        ], 
        move : "left",
        delaychat : 5000,
        map : {
            x : 1385,
            y : -42,
            map : 24,
        },
        action :[],
    },


    {
        id : 'bnvhh',
        name : 'Cây thần',
        script: {
            theobo : "BwsEX",
            ao : "",
            quan : "",
            dau : "",
            avatar : "1410",
        },
        giaotiep : "Tôi chỉ là một cái rương đồ bình thường thôi.",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 1235,
            y : -70,
            map : 23,
        },
        onclick : 'caythan',
        action : [
            {_1 : 'Đục lỗ', _2 : 'duclo'},
            {_1 : 'Ép sao', _2 : 'epsao'},
        ],
    },

    {
        id : 'gghh',
        name : 'Rương đồ',
        script: {
            theobo : "XhFMT",
            ao : "",
            quan : "",
            dau : "",
            avatar : "1410",
        },
        giaotiep : "Tôi chỉ là một cái rương đồ bình thường thôi.",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 1182,
            y : -70,
            map : 24,
        },
        onclick : 'ruongdo',
        action : [
            {_1 : 'Đục lỗ', _2 : 'duclo'},
            {_1 : 'Ép sao', _2 : 'epsao'},
        ],
    },


    {
        id : 'cvbf',
        name : 'Paragus',
        script: {
            avatar: "348",
            theobo : "nUQlQ",
        },
        giaotiep : "Xâm chiếm các hành tinh khác chính là một trong những cách làm cho bản thân của người saiyan trở nên mạnh mẽ hơn.",
        chat :[
            ["Gió cuấn mây trôi dòng nước chảy", "Cá bơi vội vã đến đâu lại về","Đời người như giấc mộng mênh mông","Một ngày thôi cũng là qua đi"],
        ], 
        delaychat : 5000,
        map : {
            x : 596,
            y : -42,
            map : 52,
        },
        action :[],
    },


    {
        id : 'gghh',
        name : 'Rương đồ',
        script: {
            theobo : "XhFMT",
            ao : "",
            quan : "",
            dau : "",
            avatar : "1410",
        },
        giaotiep : "Tôi chỉ là một cái rương đồ bình thường thôi.",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 1093,
            y : -70,
            map : 52,
        },
        onclick : 'ruongdo',
        action : [
            {_1 : 'Đục lỗ', _2 : 'duclo'},
            {_1 : 'Ép sao', _2 : 'epsao'},
        ],
    },

    {
        id : 'cvbb',
        name : 'Cây thần',
        script: {
            theobo : "BwsEX",
            ao : "",
            quan : "",
            dau : "",
            avatar : "1410",
        },
        giaotiep : "Tôi chỉ là một cái rương đồ bình thường thôi.",
        chat : [
        ],
        delaychat : 5000,
        map : {
            x : 2386,
            y : -70,
            map : 52,
        },
        onclick : 'caythan',
        action : [
            {_1 : 'Đục lỗ', _2 : 'duclo'},
            {_1 : 'Ép sao', _2 : 'epsao'},
        ],
    },


    {
        id : 'cvb',
        name : 'Valet',
        script: {
            avatar: "565",
            theobo : "IZQOL",
        },
        giaotiep : "Người saiyan đã mạnh mẽ, nhưng với trang phục của ta sẽ khiến ngươi mạnh nhất vũ trụ này.",
        chat :[], 
        delaychat : 5000,
        map : {
            x : 1059,
            y : -42,
            map : 46,
        },
        action : [{_1 : 'Cửa hàng', _2 : 'shop_saiyan'}],
    },


    {
        id : 'zc',
        name : 'Bò mộng',
        script: {
            avatar: "1142",
            theobo : "gQspg",
        },
        giaotiep : "Ngươi muốn có thêm ngọc ? Nạp thẻ cào là cách nhanh nhất, ngoài ra ngươi có thể làm nhiệm vụ để kiểm chúng.",
        chat :["Nạp thẻ cào để nhận ngọc và nhiều phần quà hấp dẫn khác."], 
        delaychat : 5000,
        map : {
            x : 1434,
            y : -42,
            map : 21,
        },
        action : [],
    },

];

module.exports = npc; 