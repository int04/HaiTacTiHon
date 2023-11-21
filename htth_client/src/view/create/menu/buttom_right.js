import topRightViewInfo from "./top_right.js";

export  default  class createButtonRight extends  topRightViewInfo {
    constructor() {
        super();
    }
    createButtonright = (width,height) => {
        let background_right = {
            width : width,
            height : height,
            x : width,
            y : this.gameHeight - height,
        }
        let container_skill_1_5 = new PIXI.Container();
        container_skill_1_5.name = "oskill1";
        let container_skill_6_10 = new PIXI.Container();
        container_skill_6_10.name = "oskill2";

        this.button.addChild(container_skill_1_5);
        this.button.addChild(container_skill_6_10);

        let w_max = background_right.width;

        let skillSize = width/7;
        skillSize = skillSize >= 30 ? 30 : skillSize;

        const skillSpacing = skillSize + 2;
        const centerX = background_right.width / 2;
        const centerY = background_right.height / 2;

        // Tạo ô kỹ năng xung quanh
        const numSkills = 5;

        let event = (skill) => {
            let o = skill;
            skill.interactive = true;
            skill.cursor = 'grab';
            let time = 0;
            skill.on('pointerdown', (e) => {
                time = new Date().getTime();
                skill.cursor = 'grabbing';
                // tween sake

            });
            skill.on('pointerup', (e) => {
                if(new Date().getTime() - time < 200) {
                    this.interPress(o.o);

                }
                skill.cursor = 'grab';
            });
        }

        for (let i = -1; i < numSkills - 1; i++) {
            let skillButton = new PIXI.Graphics();
            skillButton.name = "id_"+(i+1);
            skillButton.beginFill(0x101010,0.000001);
            skillButton.lineStyle(3, 0xa15d16, 1);
            if(i == -1) {

                skillButton.drawCircle(0, 0, skillSize);
                skillButton.endFill();
                skillButton.x = centerX;
                skillButton.y = centerY;
            }
            else {
                const angle = (i / (numSkills - 1)) * Math.PI * 2;
                skillButton.drawCircle(
                    centerX + (skillSize + skillSpacing) * Math.cos(angle),
                    centerY + (skillSize + skillSpacing) * Math.sin(angle),
                    skillSize
                );
                skillButton.endFill();
            }

            let getbound = skillButton.getBounds();
            let skill = new PIXI.Sprite(this.coverImg("4000"));
            // skill on skillButton, w = 90%, h = 90%
            skill.width = getbound.width * 0.85;
            skill.height = getbound.height * 0.85;
            skill.x = getbound.x + (getbound.width - skill.width) / 2;
            skill.y = getbound.y + (getbound.height - skill.height) / 2;
            skill.visible = true;
            skill.name = "skill_"+(i+1);
            skill.o = i+1;
            event(skill)

            container_skill_1_5.addChild(skillButton);
            container_skill_1_5.addChild(skill);


            let txt = new PIXI.Text("Q", {fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});

            txt.x = getbound.x - txt.width / 2 + getbound.width / 2;
            txt.y = getbound.y - txt.height / 2 + getbound.height / 2;
            txt.visible = true;
            txt.name = "txt_"+(i+1);
            txt.style.stroke = "#000000";
            txt.style.strokeThickness = 4;
            txt.o = i+1;
            event(txt);
            container_skill_1_5.addChild(txt);





        }

        const numskills2 = 5;
        for (let i = -1; i < numskills2 - 1; i++) {
            let cover = {
                '-1' : 5,
                0 : 6,
                1 : 7,
                2 : 8,
                3 : 9,
            }
            let skillButton = new PIXI.Graphics();
            skillButton.name = "id_"+(i+1);
            skillButton.beginFill(0x101010,0.000001);
            skillButton.lineStyle(3, 0xa15d16, 1);
            if(i == -1) {

                skillButton.drawCircle(0, 0, skillSize);
                skillButton.endFill();
                skillButton.x = centerX;
                skillButton.y = centerY;
            }
            else {
                const angle = (i / (numskills2 - 1)) * Math.PI * 2;
                skillButton.drawCircle(
                    centerX + (skillSize + skillSpacing) * Math.cos(angle),
                    centerY + (skillSize + skillSpacing) * Math.sin(angle),
                    skillSize
                );
                skillButton.endFill();
            }

            let getbound = skillButton.getBounds();
            let skill = new PIXI.Sprite(this.coverImg("4000"));
            // skill on skillButton, w = 90%, h = 90%
            skill.width = getbound.width * 0.85;
            skill.height = getbound.height * 0.85;
            skill.x = getbound.x + (getbound.width - skill.width) / 2;
            skill.y = getbound.y + (getbound.height - skill.height) / 2;
            skill.visible = true;
            skill.name = "skill_"+(cover[i]);
            skill.o = cover[i];
            event(skill);

            container_skill_6_10.addChild(skillButton);
            container_skill_6_10.addChild(skill);


            let txt = new PIXI.Text("int04", {fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});

            txt.x = getbound.x - txt.width / 2 + getbound.width / 2;
            txt.y = getbound.y - txt.height / 2 + getbound.height / 2;
            txt.visible = true;
            txt.name = "txt_"+(cover[i]);
            txt.style.stroke = "#000000";
            txt.style.strokeThickness = 4;
            txt.o = cover[i];
            event(txt);
            container_skill_6_10.addChild(txt);


        }

        container_skill_1_5.x = background_right.x +   (w_max - container_skill_1_5.width) / 2;
        container_skill_1_5.visible = true;

        container_skill_1_5.y = background_right.y;

        container_skill_6_10.x = background_right.x + (w_max - container_skill_6_10.width) / 2;
        container_skill_6_10.visible = false;
        container_skill_6_10.y = background_right.y;

        // Cấu hình các nút
        let w_button = width * 0.3;
        w_button = w_button > 50 ? 50 : w_button;

        let button_change_victim = this.createAnimation("x2Main_Image_point_other_3",50,50,2);
        button_change_victim.width = w_button;
        button_change_victim.height = w_button;
        this.button.addChild(button_change_victim);
        button_change_victim.x = background_right.x + background_right.width - button_change_victim.width;
        button_change_victim.y = container_skill_1_5.y;
        this.animationEvent(button_change_victim, () => {
            this.changeClick();
        })

        let w_button2 = width * 0.2;
        w_button2 = w_button2 > 36 ? 36 : w_button2;
        let button_auto_attack = this.animation("x2Main_Image_point_other_10",36,108,3);
        button_auto_attack.width = w_button2;
        button_auto_attack.height = w_button2;
        this.button.addChild(button_auto_attack);
        button_auto_attack.x = background_right.x + background_right.width - button_auto_attack.width;
        button_auto_attack.y = container_skill_1_5.y - button_change_victim.height;
        button_auto_attack.interactive = true;
        button_auto_attack.cursor = 'pointer';
        let button_attack_time = 0;
        button_auto_attack.on('pointerdown', () => {
            button_attack_time = new Date().getTime();
        });
        button_auto_attack.loop =  false;
        button_auto_attack.animationSpeed = 0.15;
        button_auto_attack.onComplete = () => {
            if(this.auto === true) button_auto_attack.gotoAndPlay(1);
            else button_auto_attack.gotoAndStop(0);
        }
        button_auto_attack.on('pointerup', () => {
            if(new Date().getTime() - button_attack_time < 200) {
                this.auto = !this.auto;
                button_auto_attack.gotoAndPlay(1);
            }
        });

        let button_change_skill = this.createAnimation("x2Main_Image_point_other_2",50,50,2);
        button_change_skill.width = w_button;
        button_change_skill.height = w_button;
        this.button.addChild(button_change_skill);
        this.animationEvent(button_change_skill, () => {
            if(container_skill_1_5.visible) {
                TweenMax.to(container_skill_1_5, 0.5, {alpha : 0, ease: Power1.easeInOut}).eventCallback('onComplete', () => {
                    container_skill_1_5.visible = false;
                });
                TweenMax.to(container_skill_6_10, 0.5, {alpha : 1, ease: Power1.easeInOut}).eventCallback('onStart', () => {
                    container_skill_6_10.visible = true;
                });
            } else {
                TweenMax.to(container_skill_1_5, 0.5, {alpha : 1, ease: Power1.easeInOut}).eventCallback('onStart', () => {
                    container_skill_1_5.visible = true;
                });
                TweenMax.to(container_skill_6_10, 0.5, {alpha : 0, ease: Power1.easeInOut}).eventCallback('onComplete', () => {
                        container_skill_6_10.visible = false;
                    }
                );
            }
        });
        button_change_skill.y = background_right.y + background_right.height - button_change_skill.height;
        button_change_skill.x = background_right.x + background_right.width - button_change_skill.width;

    }
}