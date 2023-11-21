let quai = [
  {

    id: 1, // lấy id từ quái
    name: "Phi long",
    speed : 1,
    trangbi: {
      ao: "WxnIKrlfFP",
      quan: "tWNvFxfloN",
      dau: "GaMtSOeboy",
    },
    exp: 1000000, // kinh nghiệm
    money: [0, 10000], // tiền rớt từ 0 đến 10000
    item: [{ id: 1, rate: 100 }], // item rớt
    time: 5, // thời gian hồi sau khi bị giết
    chiso: {
      hp: 1000000,
      hpFull: 1000000,
      sucdanh: 5000,
      giap: 10,
      ki: 100,
      kiFull: 100,
    },
  },

  {

    id: 2, // lấy id từ quái
    name: "Boss test",
    speed : 1,
    trangbi: {
      ao: "mzGWdWipJs",
      quan: "tWNvFxfloN",
      dau: "GaMtSOeboy",
    },
    exp: 1000000, // kinh nghiệm
    money: [0, 10000], // tiền rớt từ 0 đến 10000
    item: [{ id: 1, rate: 100 }], // item rớt
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hp: 10000000,
      hpFull: 10000000,
      sucdanh: 30,
      giap: 10,
      ki: 100,
      kiFull: 100,
    },
  },


  {

    id: 3, // lấy id từ quái
    name: "Khủng long con",
    speed : 1,
    trangbi: {
      ao: "njMBdteVPo",
      quan: "tWNvFxfloN",
      dau: "GaMtSOeboy",
    },
    exp: 20, // kinh nghiệm
    money: [0, 20], // tiền rớt từ 0 đến 10000
    item: [], // item rớt
    time: 5, // thời gian hồi sau khi bị giết
    
    namdat : true,
    chiso: {
      hp: 200,
      hpFull: 200,
      sucdanh: 5,
      giap: 5,
      ki: 100,
      kiFull: 100,
    },
  },


  {

    id: 4, // lấy id từ quái
    name: "Khủng mẹ",
    speed : 1,
    trangbi: {
      ao: "HMssRHNuKF",
      quan: "tWNvFxfloN",
      dau: "GaMtSOeboy",
    },
    exp: 50, // kinh nghiệm
    money: [0, 50], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hp: 200,
      hpFull: 500,
      sucdanh: 10,
      giap: 5,
      ki: 100,
      kiFull: 100,
    },
  },


  {

    id: 5, // lấy id từ quái
    name: "Thằn lằn bay",
    speed : 3,
    trangbi: {
      ao: "uKqGKfBGWk",
      quan: "tWNvFxfloN",
      dau: "GaMtSOeboy",
    },
    exp: 100, // kinh nghiệm
    money: [0, 100], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    chiso: {
      hpFull: 600,
      sucdanh: 15,
      giap: 5,
      kiFull: 100,
    },
  },


  {

    id: 6, // lấy id từ quái
    name: "Thằn lằn mẹ",
    speed : 3,
    trangbi: {
      ao: "AKnfySKTUK",
    },
    exp: 200, // kinh nghiệm
    money: [0, 100], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    chiso: {
      hpFull: 1000,
      sucdanh: 18,
      giap: 6,
      kiFull: 100,
    },
  },


  {

    id: 7, // lấy id từ quái
    name: "Lợn lòi",
    speed : 1,
    trangbi: {
      ao: "RhpxTDXsLW",
    },
    exp: 300, // kinh nghiệm
    money: [0, 300], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 1500,
      sucdanh: 20,
      giap: 10,
      kiFull: 100,
    },
  },


  {

    id: 8, // lấy id từ quái
    name: "Ốc mượn hồn",
    speed : 1,
    trangbi: {
      ao: "rDdMZniaVi",
    },
    exp: 500, // kinh nghiệm
    money: [0, 1000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 3000,
      sucdanh: 30,
      giap: 20,
      kiFull: 100,
    },
  },


  {

    id: 9, // lấy id từ quái
    name: "Lợn cướp rừng",
    speed : 1,
    trangbi: {
      ao: "rbADjmOmoG",
    },
    exp: 1500, // kinh nghiệm
    money: [0, 2000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 6000,
      sucdanh: 40,
      giap: 30,
      kiFull: 100,
    },
  },

  {

    id: 10, // lấy id từ quái
    name: "Lợn rừng mẹ",
    speed : 1,
    trangbi: {
      ao: "xJlFmLYecB",
    },
    exp: 3500, // kinh nghiệm
    money: [0, 3000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 12000,
      sucdanh: 100,
      giap: 40,
      kiFull: 100,
    },
  },

  {

    id: 11, // lấy id từ quái
    name: "Alien",
    speed : 3,
    trangbi: {
      ao: "IDQJLxfwkX",
    },
    exp: 4500, // kinh nghiệm
    money: [0, 5000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : false,
    chiso: {
      hpFull: 20000,
      sucdanh: 150,
      giap: 100,
      kiFull: 100,
    },
  },

  {

    id: 12, // lấy id từ quái
    name: "Bulon",
    speed : 1,
    trangbi: {
      ao: "yDFyHhvHgu",
    },
    exp: 9500, // kinh nghiệm
    money: [0, 7000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 30000,
      sucdanh: 200,
      giap: 100,
      kiFull: 100,
    },
  },

  {

    id: 13, // lấy id từ quái
    name: "Bulon ura",
    speed : 1,
    trangbi: {
      ao: "eHCNbKgWoi",
    },
    exp: 15500, // kinh nghiệm
    money: [0, 8000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 45000,
      sucdanh: 250,
      giap: 100,
      kiFull: 100,
    },
  },

  {

    id: 14, // lấy id từ quái
    name: "Temorial",
    speed : 3,
    trangbi: {
      ao: "OmqUNEylNi",
    },
    exp: 25500, // kinh nghiệm
    money: [0, 12000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : false,
    chiso: {
      hpFull: 55000,
      sucdanh: 300,
      giap: 200,
      kiFull: 100,
    },
  },

  {

    id: 15, // lấy id từ quái
    name: "Teri Da Xanh",
    speed : 1,
    trangbi: {
      ao: "vLTSisSETw",
    },
    exp: 30000, // kinh nghiệm
    money: [0, 12000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 75000,
      sucdanh: 350,
      giap: 300,
      kiFull: 100,
    },
  },

  {

    id: 16, // lấy id từ quái
    name: "Quỷ mập",
    speed : 1,
    trangbi: {
      ao: "qNNmXAixiy",
    },
    exp: 40000, // kinh nghiệm
    money: [0, 12000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 100000,
      sucdanh: 450,
      giap: 500,
      kiFull: 100,
    },
  },


  {

    id: 17, // lấy id từ quái
    name: "Gấu tướng cướp",
    speed : 1,
    trangbi: {
      ao: "vRVsTnOygk",
    },
    exp: 50000, // kinh nghiệm
    money: [0, 15000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 130000,
      sucdanh: 550,
      giap: 700,
      kiFull: 100,
    },
  },

  {

    id: 18, // lấy id từ quái
    name: "Napa",
    speed : 1,
    trangbi: {
      ao: "jbivTsALmB",
    },
    exp: 70000, // kinh nghiệm
    money: [0, 25000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 150000,
      sucdanh: 650,
      giap: 800,
      kiFull: 100,
    },
  },

  {

    id: 19, // lấy id từ quái
    name: "Sodier",
    speed : 1,
    trangbi: {
      ao: "MFCnyNLfMs",
    },
    exp: 80000, // kinh nghiệm
    money: [0, 25000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 200000,
      sucdanh: 750,
      giap: 900,
      kiFull: 100,
    },
  },

  {

    id: 20, // lấy id từ quái
    name: "Apple",
    speed : 1,
    trangbi: {
      ao: "xpOhLLTMLI",
    },
    exp: 90000, // kinh nghiệm
    money: [0, 29000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 250000,
      sucdanh: 850,
      giap: 1000,
      kiFull: 100,
    },
  },


  {

    id: 21, // lấy id từ quái
    name: "Quỷ chim",
    speed : 2,
    trangbi: {
      ao: "sfBbfDBEHU",
    },
    exp: 95000, // kinh nghiệm
    money: [0, 29000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : false,
    chiso: {
      hpFull: 260000,
      sucdanh: 870,
      giap: 1000,
      kiFull: 100,
    },
  },

  {

    id: 22, // lấy id từ quái
    name: "Solder Bạc",
    speed : 2,
    trangbi: {
      ao: "dEuDzSMImG",
    },
    exp: 105000, // kinh nghiệm
    money: [0, 29000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 280000,
      sucdanh: 970,
      giap: 1200,
      kiFull: 100,
    },
  },


  {

    id: 23, // lấy id từ quái
    name: "Quỷ da xanh",
    speed : 2,
    trangbi: {
      ao: "dLjlzCdYdw",
    },
    exp: 115000, // kinh nghiệm
    money: [0, 29000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 300000,
      sucdanh: 1070,
      giap: 1300,
      kiFull: 100,
    },
  },

  {

    id: 24, // lấy id từ quái
    name: "Quỷ đầu vàng",
    speed : 2,
    trangbi: {
      ao: "GNVDPMvzmA",
    },
    exp: 125000, // kinh nghiệm
    money: [0, 29000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 350000,
      sucdanh: 1170,
      giap: 1500,
      kiFull: 100,
    },
  },

  {

    id: 25, // lấy id từ quái
    name: "Quỷ Đầu Tím",
    speed : 2,
    trangbi: {
      ao: "tevGzjmOpb",
    },
    exp: 135000, // kinh nghiệm
    money: [0, 29000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 380000,
      sucdanh: 1270,
      giap: 1800,
      kiFull: 100,
    },
  },

  {

    id: 26, // lấy id từ quái
    name: "Cá sấu",
    speed : 2,
    trangbi: {
      ao: "cwaYcddYvY",
    },
    exp: 155000, // kinh nghiệm
    money: [0, 35000], // tiền rớt từ 0 đến 10000
    time: 5, // thời gian hồi sau khi bị giết
    namdat : true,
    chiso: {
      hpFull: 400000,
      sucdanh: 2570,
      giap: 3800,
      kiFull: 100,
    },
  },

];

module.exports = quai;
