let int04 = require('../../Model/init04.js');
module.exports = function(chiso1,chiso2,level =1,infoSkill) {

    level = level <=0 ? 1 : level;
    let objectx = {
        dame_giam_khang_phep : 0,
    };
    chiso1 = int04.chiso(chiso1);
    chiso2 = int04.chiso(chiso2);

    let damegiam = 0;

    let giatri =  Math.round(infoSkill.value + infoSkill.value/100*level);
    let dame_goc;
    if(infoSkill.st == 1) dame_goc = chiso1.sat_thuong_vat_ly;
    else dame_goc = chiso1.sat_thuong_phep;

    dame_goc = dame_goc + dame_goc/100*giatri;
    dame_goc = Math.round(dame_goc);

    let dame = Math.round( int04.rand(dame_goc, dame_goc * 1.3));

    // kháng phép
    if(infoSkill.st == 2) {
        let value_khang_phep = chiso2.khang_phep;
        dame-= Math.round(value_khang_phep);
        damegiam += Math.round(value_khang_phep);
        objectx.dame_giam_khang_phep = Math.round(value_khang_phep);
    }
    else 
    // kháng vật lý
    if(infoSkill.st == 1) {
        let value_khang_vat_ly = chiso2.khang_vat_ly;
        dame-= Math.round(value_khang_vat_ly);
        damegiam += Math.round(value_khang_vat_ly);
        objectx.dame_giam_khang_vat_ly = Math.round(value_khang_vat_ly);
    }

    objectx.type = infoSkill.st;

    if(chiso1._chi_mang >= int04.rand(1,100)) {
        dame += dame*0.3;
        dame += Math.round(dame/100*chiso1._sat_thuong_chi_mang);
        let giam_chi_mang = chiso2._giam_sat_thuong_chi_mang;
        let gia_tri_giam = Math.round(dame/100 * giam_chi_mang);
        dame -= gia_tri_giam;
        objectx.dame_giam_chi_mang = gia_tri_giam;
        objectx.type = 3;
    }

    // kiểm tra khắc chế các đòn đánh
    if(infoSkill.loai) {
        let nameObject= "_"+infoSkill.loai;
        let giatri = chiso2[nameObject];
        giatri = giatri || 0;
        let tru = Math.round(dame/100 * giatri);
        dame -= tru;
        damegiam += tru;
        objectx.dame_khac_Che = tru;
    }

    // kiểm tra haki, haki có thể xuyên qua kháng phép, kháng vật lý, khắc chế đòn đánh
    let haki_con = chiso1._haki - chiso2._haki;
    if(haki_con >=1) {
        haki_con = haki_con > 100 ? 100 : haki_con;
        let nhanlai = Math.round(damegiam/100 * haki_con);
        dame += nhanlai;
        objectx.dame_nhan_lai_haki = nhanlai;
    }

    dame = dame <=0 ? 0 : dame;
    objectx.dame = Math.round(dame);
    return objectx;



}