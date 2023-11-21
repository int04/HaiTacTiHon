import giaotiepView from "../chucnang/giaotiep.js";

export default class pressKeyInter extends giaotiepView {
    constructor() {
        super();
    }

    testSprite = () => {
        this.test('xt3',this.click);
    }

    interPress = (i = 0) => {
        let click = this.click;
        if(this.my.id <=0) return false;
        if(this.isAttack(this.my.eff) === false)  return false;
        let my = this.my;
        if(this.click != null) {
            let getMy = this.getMy(click);
            if(getMy.type == 'npc') return this.giaoTiep(getMy);
        }
        let name_object = "";
        let victim = this.getMy(click);
        if(victim) {
            name_object = victim.type;
        }
        //this.test('vs1',this.click);

        let oskill = my.oskill[i];
        if(oskill && oskill != -1) {
            let id = oskill;
            let mySkill = my.skill.find(e => e[0] == id);
            if(mySkill) {
                let time = mySkill[2];
                let level = mySkill[1];
                if(time >= Date.now()) {
                    return false;
                }
                let infoSkill = this.skill.find(e => e.id == id);
                if(!infoSkill) return false;
                let type = infoSkill.type;

                if(type == 'bidong') return false;
                let mpNeed =  Math.round(infoSkill.mp + infoSkill.mp/100 * mySkill[1]);
                if(mpNeed > my.info.chiso.mp) return false;
                if(type == 'tancong' && ( !this.click || !victim || victim.info.chiso.hp <=0)) {
                    return false;
                }
                // rule khác
                this.send(-6,[
                    2,
                    infoSkill.id,
                    this.click, 
                    name_object,
                ])
            }
            else {
                this.use_item(id);
            }
        }

    }
}