import moveUpdateEFF from "./skill/move.js";

import boat from "./skill/boat.js";
import vangmau from "./skill/vangmau.js";
import caibong from "./skill/caibong.js";
export default class updateSkill extends moveUpdateEFF {
    constructor() {
        super();
    }

    updateSkill = (delta) => {
        this.cache_skill.forEach(element => {
            if(element.type === 'delete') {
                this.deleteSkill(element.id);
            }

            if(element.type === 'congexp')          this.congexp(element,delta);
            if(element.type === 'mob_att_1')        this.mob_att_1(element,delta);

            if(element.type === 'conghp')           this.conghp(element,delta);
            if(element.type === 'hp')               this.tru_hp(element,delta);
            if(element.type === 'move')             this.updateBuocChay(element, delta);

            if(element.type === 'vs1')              this.dam_1_vo_si(element, delta);
            if(element.type === 'vs2')              this.dam_2_vo_si(element, delta);
            if(element.type === 'vs3')              this.dam_3_vo_si(element, delta);

            if(element.type === 'db1')              this.daubep_attack_1(element, delta);
            if(element.type === 'db2')              this.daubep_attack_2(element, delta);
            if(element.type === 'db3')              this.daubep_attack_3(element, delta);

            if(element.type === 'ht1')              this.hoa_tieu_attack_1(element, delta);
            if(element.type === 'ht2')              this.hoa_tieu_attack_2(element, delta);
            if(element.type === 'ht3')              this.hoa_tieu_attack_3(element, delta);

            if(element.type === 'kk1')              this.kiem_khach_attack_1(element, delta);
            if(element.type === 'kk2')              this.kiem_khach_attack_2(element, delta);
            if(element.type === 'kk3')              this.kiem_khach_attack_3(element, delta);

            if(element.type === 'xt1')              this.xa_thu_attack_1(element, delta);
            if(element.type === 'xt2')              this.xa_thu_attack_2(element, delta);
            if(element.type === 'xt3')              this.xa_thu_attack_3(element, delta);

            if(element.type === 'sea')              boat(this,element,delta);
            if(element.type === 'vangmau')          vangmau(this,element);
            if(element.type === 'caibong')          caibong(this,element,delta);

        });
    }

    getSkill = (id,type  = 0) => {
        //let skill = this.cache_skill;
        let eff;
        if(type === 0) eff = this.eff.getChildByName("eff_"+id);
        if(type === 1) eff = this.eff2.getChildByName("eff_"+id);
        if(eff) {
            return eff;
        }
        else 
        {
            eff = new PIXI.Container();
            eff.name = "eff_"+id;
            if(type === 0 ) this.eff.addChild(eff);
            if(type === 1 ) this.eff2.addChild(eff);
        }
        return eff;
    }

    setSkill = (data) => {
        if(!data.id) {
            data.id =  this.randomAZ(10);
        }
        if(this.cache_skill.find(e => e.id === data.id)) return false;
        this.cache_skill.push(data);
    }


    deleteSkill = (id) => {
        let eff  = this.eff.getChildByName("eff_"+id);
        if(eff) {
            this.deleteAllChild(eff);
        }
        let eff2 = this.eff2.getChildByName("eff_"+id);
        if(eff2) {
            this.deleteAllChild(eff2);
        }
        this.cache_skill = this.cache_skill.filter(e => e.id != id);
    }

    test = (type,to = -1) => {
        if(to == -1) {
            this.changeClick();
            to = this.click;
        }

        if(to != -1) {
            this.setSkill({
                from : this.my.id,
                to : to,
                type : type,
                key : this.randomAZ(10),
                value : this.rand(1000,2000)
            })
        }
    }

    sprite = (ob) => {
        let re = {
            x : 0,
            y : 0
        }

        re.y = ob.y;
        re.x = ob.x;
        if(ob.width < 0) {
            re.x = ob.x + ob.pivot.x
        }
        return re;
    }



    success = (data) => {
        let my = this.my;
        if(my.id <=0) return false;
        if(my.id == data.from && data.keycode) {
            this.to(-6,[3,data.keycode]);
        }
    }

}

