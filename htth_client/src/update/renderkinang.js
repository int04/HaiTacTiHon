import renderEffProfile from "./update_eff.js";
export default class renderKinangUpdate extends renderEffProfile {
    constructor() {
        super();
        this.deltatime = 0;
        this.timeOld = 0;
    }


    updateRenderInfoPlayer = (delta) => {
        let my = this.my;
        if(my.id <=0) return false;

        let khung_top = this.button;
        if(khung_top) {

            let khung_nhan_vat_chinh = khung_top.getChildByName("khung_nhan_vat_chinh");
            if(khung_nhan_vat_chinh) {
                let main = khung_nhan_vat_chinh.getChildByName("main");
                if(main) {
                    let borderHP = main.getChildByName("borderHP");
                    if(borderHP) {
                        let hpinfo = borderHP.getChildByName("hpinfo");
                        if(hpinfo) {
                            let hpfull = hpinfo.getChildByName("background_hp");
                            if(hpfull) {
                                let hp_percent_full = hpfull.getChildByName("hpget");
                                let txt = hpfull.getChildByName("txt");
                                let hp = my.info.chiso.hp;
                                let hpmax = my.info.chiso.hpmax;
                                if(hp > hpmax) hp = hpmax;
                                if(hp < 0) hp = 0;
                                let hp_percent = hp / hpmax * 100;
                                let maxW = hpfull.width;
                                let w = maxW * hp_percent / 100;
                                // update width hp_percent_full
                                if(hp_percent_full) {
                                    hp_percent_full.width =w;
                                }
                                if(txt) {
                                    txt.text = hp + "/" + hpmax;
                                    txt.x = hpfull.width/2 - txt.width/2;
                                    txt.y = hpfull.height/2 - txt.height/2;
                                }

                            }
                        }
                        let mpinfo = borderHP.getChildByName("mpinfo");
                        if(mpinfo) {
                            let mpfull = mpinfo.getChildByName("background_mp");
                            if(mpfull) {
                                let mp_percent_full = mpfull.getChildByName("mpget");
                                let txt = mpfull.getChildByName("txt");
                                let mp = my.info.chiso.mp;
                                let mpmax = my.info.chiso.mpmax;
                                if(mp > mpmax) mp = mpmax;
                                if(mp < 0) mp = 0;
                                let mp_percent = mp / mpmax * 100;
                                let maxW = mpfull.width;
                                let w = maxW * mp_percent / 100;
                                // update width mp_percent_full
                                if(mp_percent_full) {
                                    mp_percent_full.width =w;
                                }
                                if(txt) {
                                    txt.text = mp + "/" + mpmax;
                                    txt.x = mpfull.width/2 - txt.width/2;
                                    txt.y = mpfull.height/2 - txt.height/2;
                                }

                            }
                        }
                    }

                    let borderLevel = main.getChildByName("BorderLevel");
                    if(borderLevel) {
                        let txtlevel = borderLevel.getChildByName("txtlevel");
                        if(txtlevel) {
                            let txt = "";
                            let level = my.info.coban.level;
                            let exp = my.info.coban.exp;
                            let expneed = this.explevel[level];
                            expneed = !expneed || expneed == undefined ? 0 : expneed;
                            exp = exp > expneed ? expneed : exp;

                            let tile = Math.fround(exp / expneed * 100).toFixed(2);
                            txt = level + " + " + tile + "%";
                            txtlevel.text = txt;
                        }
                    }
                }
            }
        }
    }

    updateRenderSkill = (delta, wait = false) => {
        this.updateProfileEffect(delta);
        if(this.runGame) {

        }
        this.updateRenderInfoPlayer(delta);
        this.deltatime+= delta;
        if(!wait) {
            if(this.deltatime <= 10) return false;
        }
        this.deltatime = 0;
        let my = this.my;
        if(my.id <=0) return false;
        let right = this.button;
        let oskill1 = right.getChildByName("oskill1");
        let oskill2 = right.getChildByName("oskill2");
        let iStart = 0;
        let iStop = 0;

        /* 
            @iStart: 0 -> 4
            @iStop: 5 -> 9
            @why ?
            @iStart: 0 -> 4: skill 1
            @iStop: 5 -> 9: skill 2

            Tác dụng là gì ? 
            Chỉ hiển thị màn hình có ô skill hiển thị, như vậy vòng lặp sẽ ít hơn => tăng tốc độ xử lý
            @Note:
        */
        
        if(right) {
            if(oskill1 && oskill2) {
                if(oskill1.visible == true) {
                    iStart = 0;
                    iStop = 4;
                }
                else 
                {
                    iStart = 5;
                    iStop = 9;
                }
            }

            for(let i = iStart; i <= iStop; i++) {
                let id = my.oskill[i];
                let text;
                let img;
                if(i <=4) {
                    text = oskill1.getChildByName("txt_"+i);
                    img = oskill1.getChildByName("skill_"+i);
                }
                else 
                {
                    text = oskill2.getChildByName("txt_"+i);
                    img = oskill2.getChildByName("skill_"+i);
                }

                if(id != -1 && text && img ) {
                    let myskill = my.skill.find(e => e[0] == id);
                    if(myskill) {
                        let infoSkill = this.skill.find(e => e.id == id);
                        if(infoSkill) {
                            img.visible = true;
                            img.icon = img.icon || null;
                            if(img.icon == null || img.icon != infoSkill.avatar) {
                                img.texture = this.coverImg(infoSkill.avatar);
                                img.icon = infoSkill.avatar;
                            }
                            let time_await = myskill[2];
                            let time_last_use = myskill[4];
                            time_await = !time_await ? 0 : time_await;
                            time_last_use = !time_last_use ? 0 : time_last_use;
                            if(time_await > Date.now()) {
                                let time = time_await - Date.now();
                                let txt = Math.fround(time / 1000);
                                txt = txt.toFixed(2);
                                text.text = txt;
                                text.style.fontSize = 14;
                                text.x = img.x + img.width/2 - text.width/2;
                                text.y = img.y + img.height/2 - text.height/2;
    
    
                                let time_await_con = Date.now() - myskill[4] 
                                let time_await_sudung =  myskill[2] - myskill[4];
                                
                                let tinhtoan = time_await_con/ time_await_sudung * 100;
                                let cover = tinhtoan/100;
                                cover = cover <= 0.2 ? 0.2 : cover;
                                img.alpha = cover;
                                text.visible = true;
                            }
                            else 
                            {
                                img.alpha = 1;
                                text.visible = false;
                            }
                        }
                    }
                    else 
                    {
                        let hide = () => {
                            img.visible = false;
                            img.text = false;
                            my.oskill[i] = -1;
                        }
                        let myruong = my.ruong.data.find(e => e.id === id && e.active === 'hanhtrang');
                        if(myruong) {
                            let item2 = this.item.find(e => e.id === myruong.item);
                            if(item2) {
                                img.visible = true;
                                img.icon = img.icon || null;
                                let img_goc = item2.img;
                                let src = img_goc.src;
                                let num_farme = img_goc.num;
                                if(img.icon == null || img.icon != src) {
                                    img.icon = src;
                                    if(num_farme <=1) {
                                        img.texture = this.coverImg(src);
                                    }
                                    else 
                                    {
                                        let width = 80;
                                        let height = 80;
                                        let texture_goc = new PIXI.Sprite(this.coverImg(src));
                                        let texture = new PIXI.Texture(texture_goc.texture, new PIXI.Rectangle(0, 0*height, width, height));
                                        img.texture = texture;
                                    }
                                }
                                text.text = myruong.soluong;
                                text.style.fontSize = 14;
                                text.x = img.x + img.width/2 - text.width/2;
                                text.y = img.y + img.height/2 - text.height/2;
                                text.visible = true;
                            }
                            else 
                            {
                                hide();
                            }
                        }
                        else 
                        {
                            hide();
                        }
                        
                    }
                }
                else 
                {
                    if(text) {
                        text.visible = false;
                    }
                    if(img) {
                        img.visible = false;
                    }
                }
            }

            /*
            my.oskill.forEach((id,i) => {
            });
            */
        }
    }
}