let data = [
    {
        id : 1,
        name : "Tỉnh giấc",
        class: "traidat",
        desc : "Tới gặp ông Gohan tại nhà Gohan để nói chuyện",
        list : [
            {
                name : "Nói chuyện với ông Gohan",
                data : ["Con tỉnh rồi à $","Thấy trong người đã khỏe hơn chưa ?","Con đã bất tỉnh suốt 1 tuần nay làm ta lo lắng quá.","Có vẻ như con vẫn chưa khỏe lắm."], 
                type : "talk", 
                id : "a1", 
                value : 0, 
                thuong : { exp : 1000, vang : 0, item: [] }
            },
        ]
    }, 

    {
        id : 2,
        name : "Rèn luyện cơ bản",
        class: "traidat",
        desc : "Vào hành trang sử dụng trang bị, sau đó hãy tới làng Aru, từ làng Aru đi về hướng đông sẽ tới Đồi Hoa Cúc. Tại đây có một loại vật tên là Khủng Long, thịt của chúng rất ngon. Bạn hãy thu thập đùi của chúng và mang về đưa ông Gohan nhé.",
        list : [
            {
                name : "Nói chuyện với ông Gohan",
                data : ["Trước khi con lên đường ta muốn  hướng dẫn con một vài thông tin.","Để mở hành trang, con hãy click vào biểu tượng thanh thông tin chỉ số HP, KI trên màn hình góc trái của con.","Tại mục nhiệm vụ con có thể xem chi tiết được nhiệm vụ và tiến trình nhiệm vụ của con","Sau đó hãy vào hành trang để sử dụng trang bị ta vừa làm cho con.","Để tấn công được mục tiêu con cần trang  bị kĩ năng ra màn hình.","Hãy vào kĩ năng sau đó chọn kĩ năng và dán vào các ô trên màn hình nhé.","Giờ thì lên đường thu thập đùi gà cho ta."], 
                type : "talk", 
                id : "a1", 
                value : 0, 
                thuong : { exp : 0, vang : 0, item: [
                    { id : 1, soluong : 1},
                    {id : 13, soluong :1},
                ] }
            },

            {
                name : "Thu thập đùi gà",
                data : [], 
                type : "get", 
                id : 2, 
                value : 10,
                item : {'tyy' : 100}, // { id : tỉ lệ rớt} 
                thuong : { exp : 0, vang : 0, item: [] }
            },

            {
                name : "Đưa thịt cho ông gohan",
                data : ["Con về rồi à","Á chà loại thịt này chắc quá.","Nhìn con khỏe hơn rồi đấy $","Đây là phần thưởng ta dành cho con $"], 
                type : "talk", 
                id : "a1", 
                value : 0, 
                need : {'tyy' : 10},
                thuong : { exp : 2500, vang : 0, item: [] }
            },
        ]
    }, 

    {
        id : 3,
        name : "Sự trả thù của khủng long",
        class: "traidat",
        desc : "Sau khi đánh bại tụi khủng long con, bọn khủng long mẹ đã nghe tin con mình bị sát hại nên đã lên kế hoạch tàn phá mùa màng của dân làng. Bạn hãy tới thung lũng tre để tiêu diệt chúng",
        list : [
            {
                name : "Nói chuyện với ông Gohan",
                data : ["$ nghe ta nói này !","Ta vừa nghe tin dân làng tại thung lũng tre nói rằng có loại khủng long đang tiến tới làng","Ta nghĩ đó là mẹ của khủng long mà con đã tiêu diệt từ trước để trả thù cho con mình.","Vậy nên để tránh tai họa thì con hãy tới kiểm tra và tiêu diệt chúng nhé.","lên đường cẩn thân."],
                type : 'talk',
                id : 'a1',
                value : 0,
            },
            {
                name : "Tiêu diệt Khủng long mẹ",
                type : 'kill',
                id : 4,
                value : 20,
            },

            {
                name : "Nói chuyện với ông Gohan",
                data : ["Làm tốt lắm, từ giờ chúng ta không phải lo lắng về loại khủng long này nữa rồi.","Đây là phần thưởng ta dành cho con $"],
                type : 'talk',
                id : 'a1',
                value : 0,
                thuong : { exp : 2500, vang : 0, item: [] }
            },
        ]
    },

    {
        id : 4,
        name : "Giúp đỡ bulma",
        class: "traidat",
        desc : "Trong lúc bạn đi tiêu diệt lũ khủng long mẹ, bulma ở Làng Aru đã bị bọn thằn lằn cướp hết đồ. Hãy tới rừng nấm để tiêu diệt chúng.",
        list : [
            {
                name : "Nói chuyện với ông Gohan",
                data : ["Này con !","Trong lúc con đi tiêu diệt lũ khủng long mẹ, cô bé tên là Bulma ở làng Aru tìm ta cần giúp","Con hãy tới nói chuyện với cô bé ý nhé."],
                type : 'talk',
                id : 'a1',
                value : 0,
            },

            {
                name : "Nói chuyện với Bulma",
                data : ["Cậu là $ phải không ?","Tôi đang trên đường thu thập các viên ngọc rồng","Có lũ chim từ trên trời xuống cướp hết đồ của tôi.","Chúng đã bay về phía khu rừng nấm cậu có thể giúp tôi tiêu diệt chúng được không ?"],
                type : 'talk',
                id : 'a2',
                value : 0,
            },

            {
                name : "Đạt 16.000 sức mạnh",
                type : 'up',
                value : 16000,
            },

            {
                name : "Tiêu diệt thằn lằn bay",
                type : 'kill',
                id : 5,
                value : 20,
            },

            {
                name : "Nói chuyện với Bulma",
                data : ["Cám ơn cậu nhiều lắm"],
                type : 'talk',
                id : 'a2',
                value : 0,
                thuong : { exp : 2500, vang : 0, item: [] }
            },
        ]
    }

    ,

    {
        id : 5,
        name : "Tìm kiếm Ngọc Rồng",
        class: "traidat",
        desc : "Bọn thằn lằn mẹ đã cướp viên Ngọc Rồng 7 sao. Hãy mau tới rừng xương để tìm lại ngọc rồng",
        list : [
            {
                name : "Nói chuyện với ông Gohan",
                data : ["Trong lúc con đi tiêu diệt lũ thằn lằn bay, bọn phi long mẹ đã cướp mất viên Ngọc Rồng 7 sao","Con hãy lên đường đánh bại chúng và nhặt viên 7 sao về cho ta nhé."],
                type : 'talk',
                id : 'a1',
                value : 0,
            },


            {
                name : "Đạt 50.000 sức mạnh",
                type : 'up',
                value : 50000,
            },

            {
                name : "Tìm kiếm Ngọc Rồng",
                type : 'get',
                id : 6,
                value : 1,
                item : {'s7' : 10}, // { id : tỉ lệ rớt} 
            },

            {
                name : "Nói chuyện với ông Gohan",
                data : ["Chà ! Tốt lắm."],
                type : 'talk',
                id : 'a1',
                value : 0,
                thuong : { exp : 3000, vang : 0, item: [] }
            },
        ]
    }, 

    {
        id : 6,
        name : "Truyền thuyết về Ngọc Rồng",
        class: "traidat",
        desc : "Bọn thằn lằn mẹ đã cướp viên Ngọc Rồng 7 sao. Hãy mau tới rừng xương để tìm lại ngọc rồng",
        list : [
            {
                name : "Nói chuyện với ông Gohan",
                data : ["Từ xa xưa, người đời đã đồn về những viên Ngọc Rồng mang những điều ước thần bí", "Mọi điều ước đều có thể thực hiện bởi vậy mà nó luôn được những kẻ xấu tìm kiếm", "Ta nghe kể rằng một người tên là Bò Mộng tại Rừng karin đang giữ viên 6 sao.","Con hãy đến tìm thử xem."],
                type : 'talk',
                id : 'a1',
                value : 0, 
            },
            {
                "name" : "Nói chuyện với Bò Mộng",
                "data" : [
                    "Người từ đâu tới ?",
                    "Sao muốn lấy viên ngọc này trên cổ ta sao ?",
                    "Nếu muốn lấy thì hãy giúp ta đánh bại tên tàu Bảy Bảy đi, vì hắn cũng muốn chiếm lấy viên ngọc này.",
                ],
                type : 'talk',
                id : 'zc',
                value : 0,
            },

    
            {
                name : "Nói chuyện với ông Gohan",
                data : ["Chà ! Tốt lắm."],
                type : 'talk',
                id : 'a1',
                value : 0,
                thuong : { exp : 3000, vang : 0, item: [] }
            },
        ]
    }
];

/**
 * thích thuật ngữ: @type 
 * @get : nhặt vật phẩm từ đất
 * @kill : giết @id 
 * @talk : nói chuyện với @id
 * @talk and @need : đưa cho @id vật phẩm @need
 */
module.exports = data;