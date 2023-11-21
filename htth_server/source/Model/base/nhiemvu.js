let nhiemvu0 = [
    {
        id : 1,
        name : "Tìm Son Goku",
        class : "all",
        desc : "Goku đi xuống núi đã nửa ngày chưa về, hãy đến làng Aru để tìm xem có cậu ta không nhé.",
        list: [
            {name : "Nói chuyện với ông Gohan",data : [
                "Chào con !", "Ta có việc quan trọng muốn nhờ con đây !", "Son goku đã xuống núi một lúc rồi mà chưa về, ta lo lắng quá !", "Con hãy đi tìm cậu ta giúp ta được không ?", "Đi đường cẩn thận nhé !"
            ], type : "talk", id : "a1", value : 0, thuong : {exp : 1000, vang : 0, item: []}},

            {name : "Nói chuyện với Goku",data : [
                "Mi định cướp thức ăn của ta ngày hôm nay à ?", "À thì ra là mi !", "Ta vừa hạ gục một con quái vật biết nói, nó định cướp thức ăn của ta.", "Ông gohan gọi ta sao ?", "Mi về trước đi."
            ], type : "talk", id : "ghyu", value : 0, thuong : {exp : 0, vang : 0, item: []}},
            {
                name : "Báo cáo cho ông Gohan",data : [
                    "Thì ra goku đang ở làng Aru", "Nó làm ta lo lắng quá", "Cảm ơn con đã gọi nó giúp ta"
                ], type : "talk", id : "a1", value : 0, thuong : {exp : 1000, vang : 0, item: []}
            }
        ],
    }, 

    {
        id : 2,
        name : "Cô bạn mới",
        class : "all",
        desc : "Con quái vật mà goku đánh bại là một cô gái xinh đẹp đến từ một thành phố xa xôi. Nhưng có vẻ cô bị thương bởi goku rồi.",
        list: [
            {name : "Người bạn mới",data : [
                "Lúc sáng ở dưới núi Aru, goku đã làm bị thương một cô gái", "Con hãy tới gặp và hỏi thăm cô bé đó xem có làm sao không nhé", "Con bé đó vẫn đang ở làng Aru đó."
            ], type : "talk", id : "a1", value : 0, thuong : {exp : 0, vang : 0, item: []}},

            {name : "Nói chuyện với Bulma",data : [
                "Tránh ra đồ quái vật", "Đừng lại gần tôi", "À thì ra là một đứa trẻ", "Tôi tên là Bulma, tôi đến từ thành phố phía tây", "Tôi đang trên đường tìm kiếm viên những viên Ngọc Rồng", "Ra-da của tôi phát hiện có 1 viên ngọc Rồng gần đây", "Đang trên đường đi thì tôi bị một con quái vật làm hỏng xe của tôi rồi"
            ], type : "talk", id : "a2", value : 0, thuong : {exp : 0, vang : 0, item: []}},
            {
                name : "Báo cáo cho ông Gohan",data : [
                    "Con bé đó không sao là tốt rồi", "Nhưng có vẻ cô bé đó đã bị thương",  "Tại vách núi Aru có một loại dược thảo từ lũ khủng long có thể chữa lành vết thương của cô bé", "Goku vừa đi qua vách úi Aru để đi tìm loại dược đó", "Bây giờ con hãy giúp ta qua Đồi Hoa Cúc để tìm kiếm chút thức ăn nhé"
                ], type : "talk", id : "a1", value : 0, thuong : {exp : 1000, vang : 0, item: []}
            }
        ],
    }
];

let nhiemvu = [];

let saiyan = require('./nhiemvu/saiyan.js');
let namek = require('./nhiemvu/namek.js');
let traidat = require('./nhiemvu/traidat.js');
let all = require('./nhiemvu/all.js');

nhiemvu = nhiemvu.concat(saiyan,namek,traidat,all);

module.exports = nhiemvu;