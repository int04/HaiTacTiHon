let data = [
  {
    id: 0,
    avatar: "",
    name: "",
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "",
    motadai: "",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki
      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,
      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "",
      dau: "",
      avatar: "",
    },
  },
  {
    id: 1,
    avatar: "390",
    name: "Áo 3 lỗ",
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Sử dụng giúp tăng giáp.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    sucmanh: 1000,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 2, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki
      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,
      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "STHDKHJcHw",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 2,
    avatar: "390",
    name: "Áo thun",
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Loại áo được làm từ vải chất lượng.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    sucmanh: 10000,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 4, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "STHDKHJcHw",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 3,
    avatar: "389",
    name: "Áo thun mỏng",
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Loại áo được làm từ vải chất lượng.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    sucmanh: 23000,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 9, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "atVGRKpeAf",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 4,
    avatar: "389",
    name: "Áo thun dày",
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Loại áo được làm từ vải chất lượng.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    sucmanh: 58000,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 17, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "atVGRKpeAf",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 5,
    avatar: "938",
    name: "Áo võ Goku",
    sucmanh: 220000,
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Giúp giảm sát thương.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 30, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "YMiGsNFPgS",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 6,
    avatar: "938",
    name: "Áo võ Kame",
    sucmanh: 580000,
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Giúp giảm sát thương.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 50, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "YMiGsNFPgS",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 7,
    avatar: "949",
    name: "Áo giáp bạc",
    sucmanh: 1300000,
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Giúp giảm sát thương.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 130, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "CIKMUwNHps",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 8,
    avatar: "949",
    name: "Áo giáp vàng",
    sucmanh: 4800000,
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Giúp giảm sát thương.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 220, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "CIKMUwNHps",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 9,
    avatar: "1689",
    name: "Áo siêu nhân",
    sucmanh: 9200000,
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Giúp giảm sát thương.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 330, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "sAdacIfCFZ",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 10,
    avatar: "1689",
    name: "Áo vàng siêu nhân",
    sucmanh: 15000000,
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Giúp giảm sát thương.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 450, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "sAdacIfCFZ",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 11,
    avatar: "1688",
    name: "Áo da calic",
    sucmanh: 36000000,
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Giúp giảm sát thương.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 550, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "wuOFMKwhFR",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 12,
    avatar: "1688",
    name: "Áo Jean calic",
    sucmanh: 52000000,
    type: "trangbi",
    type2: "ao",
    class: "traidat",
    mota: "Trang bị giúp tăng giáp.",
    motadai: "Giúp giảm sát thương.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 0, // tăng hp: vd 50
      giap: 678, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 0, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "wuOFMKwhFR",
      quan: "",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 13,
    avatar: "396",
    name: "Quần vải đen",
    sucmanh: 1200,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 20, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 3, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "IRWlmRfcXx",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 14,
    avatar: "396",
    name: "Quần đen dày",
    sucmanh: 6000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 120, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 10, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "IRWlmRfcXx",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 15,
    avatar: "395",
    name: "Quần thun vải",
    sucmanh: 15000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 330, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 20, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "OjXcgiisYH",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 16,
    avatar: "395",
    name: "Quần thun dày",
    sucmanh: 45000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 450, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 30, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "OjXcgiisYH",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 17,
    avatar: "939",
    name: "Quần võ goku",
    sucmanh: 175000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 780, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 120, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "ysGYTJEHob",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 18,
    avatar: "939",
    name: "Quần võ Kame",
    sucmanh: 470000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 1200, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 200, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "ysGYTJEHob",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 19,
    avatar: "950",
    name: "Quần giáp bạc",
    sucmanh: 1100000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 5000, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 500, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "SYpfQwnUWq",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 20,
    avatar: "950",
    name: "Quần giáp vàng",
    sucmanh: 4500000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 15000, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 1200, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "SYpfQwnUWq",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 21,
    avatar: "1695",
    name: "Quần siêu nhân",
    sucmanh: 8500000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 26000, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 2000, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "tZMOAdgdmp",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 22,
    avatar: "1695",
    name: "Quần siêu nhân II",
    sucmanh: 14500000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 37000, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 2300, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "tZMOAdgdmp",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 23,
    avatar: "1694",
    name: "Quần da calic",
    sucmanh: 32300000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 52000, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 3500, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "uMsIRgmRqa",
      dau: "",
      avatar: "",
    },
  },

  {
    id: 24,
    avatar: "1694",
    name: "Quần Jean calic",
    sucmanh: 49000000,
    type: "trangbi",
    type2: "quan",
    class: "traidat",
    mota: "Trang bị giúp máu.",
    motadai: "Tăng thêm lượng máu cho bản thân.",
    level: 0,
    sao: 0,
    saotrong: 0,
    khoa: 0,
    info: {
      hp: 52000, // tăng hp: vd 50
      giap: 0, // tăng giáp: vd 50 giáp
      chimang: 0, // tăng chí mạng: vd: 10
      sucdanh: 0, // tăng sức đánh
      ki: 0, // tăng ki

      hutmau: 0, // tăng % hút máu
      hoimau: 0, // tăng % hồi máu sau 30s
      hoiki30s: 0, // hổi ki sau 30s
      hoihp30s: 4500, // hồi hp sau 30s,
      hoiki: 0, // tăng % hồi ki sau 30s
      hutki: 0, // tăng % hút ki khi đánh
      phandon: 0, // tắng % phản lại đòn đánh
      hoichieu: 0, // giảm % thời gian hồi chiêu,

      gocgiap: 0, // tăng % giáp lấy từ gốc
      gochp: 0, // tăng % lượng hp gốc
      gocki: 0, // tăng % lượng ki gốc
      gocsucdanh: 0, // tăng % lượng sức đánh gốc
    },
    script: {
      // nếu là trangbi thì liên kết với script để thay ảnh nhân vật
      ao: "",
      quan: "uMsIRgmRqa",
      dau: "",
      avatar: "",
    },
  },

  {
    id: "36",
    avatar: "1706",
    name: "Găng võ calic",
    type: "trangbi",
    sucmanh: "60000000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 1200,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "35",
    avatar: "1706",
    name: "Găng da calic",
    type: "trangbi",
    sucmanh: "49000000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 899,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: 34,
    avatar: "1707",
    name: "Găng võ Kame",
    type: "trangbi",
    sucmanh: "32000000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 750,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "33",
    avatar: "1707",
    name: "Găng võ Goku",
    type: "trangbi",
    sucmanh: "19000000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 405,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "32",
    avatar: "953",
    name: "Găng giáp vàng",
    type: "trangbi",
    sucmanh: "9300000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 299,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "31",
    avatar: "953",
    name: "Găng giáp bạc",
    type: "trangbi",
    sucmanh: "630000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 190,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "30",
    avatar: "947",
    name: "Găng vải kame",
    type: "trangbi",
    sucmanh: "350000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 82,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "29",
    avatar: "947",
    name: "Găng thun kame",
    type: "trangbi",
    sucmanh: "120000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 40,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "28",
    avatar: "407",
    name: "Găng vải đen",
    type: "trangbi",
    sucmanh: "48000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 15,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "27",
    avatar: "407",
    name: "Găng vải dày",
    type: "trangbi",
    sucmanh: "12000",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 10,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "26",
    avatar: "408",
    name: "Găng thun đen",
    type: "trangbi",
    sucmanh: "3200",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 5,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "25",
    avatar: "408",
    name: "Găng vải đen",
    type: "trangbi",
    sucmanh: "1600",
    type2: "gang",
    class: "traidat",
    mota: "Trang tăng tấn công",
    motadai: "Giúp nhân vật tăng tấn công.",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 2,
      ki: 0,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 0,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },

  {
    id: "57",
    avatar: "1700",
    name: "Giày Jean calic",
    type: "trangbi",
    sucmanh: "42000000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 62000,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 22000,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "56",
    avatar: "1700",
    name: "Giày calic",
    type: "trangbi",
    sucmanh: "25600000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 52000,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 17000,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "55",
    avatar: "1701",
    name: "Giày vàng goku",
    type: "trangbi",
    sucmanh: "12000000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 39000,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 8000,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "54",
    avatar: "1701",
    name: "Giày bạc goku",
    type: "trangbi",
    sucmanh: "5600000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 25000,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 4000,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "53",
    avatar: "952",
    name: "Giày siêu nhân 2",
    type: "trangbi",
    sucmanh: "1200000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 15000,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 2000,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "52",
    avatar: "952",
    name: "Giày siêu nhân",
    type: "trangbi",
    sucmanh: "457000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 4300,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 500,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "51",
    avatar: "940",
    name: "Giày võ goku",
    type: "trangbi",
    sucmanh: "220000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 3900,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 250,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "50",
    avatar: "940",
    name: "Giày vải goku",
    type: "trangbi",
    sucmanh: "70000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 920,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 100,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "49",
    avatar: "402",
    name: "Giày vải đen",
    type: "trangbi",
    sucmanh: "32000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 320,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 30,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "48",
    avatar: "402",
    name: "Giày đen",
    type: "trangbi",
    sucmanh: "12000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 100,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 10,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "47",
    avatar: "401",
    name: "Giày vải dày",
    type: "trangbi",
    sucmanh: "3200",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 41,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 4,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },
  {
    id: "46",
    avatar: "401",
    name: "Giày vải",
    type: "trangbi",
    sucmanh: "1000",
    type2: "giay",
    class: "traidat",
    mota: "Tăng KI cho bản thân",
    motadai: "Khi sử dụng giúp tăng KI",
    khoa: "0",
    info: {
      hp: 0,
      giap: 0,
      chimang: 0,
      sucdanh: 0,
      ki: 20,
      hutmau: 0,
      hoimau: 0,
      hoiki30s: 2,
      hoihp30s: 0,
      hoiki: 0,
      hutki: 0,
      phandon: 0,
      hoichieu: 0,
      gocgiap: 0,
      gochp: 0,
      gocki: 0,
      gocsucdanh: 0,
    },
    script: { ao: "", quan: "", dau: "", avatar: "" },
  },

];

module.exports = data;