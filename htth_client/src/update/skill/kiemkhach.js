import xathuViewClass from "./xathu.js";

export default  class kiemkhachView extends  xathuViewClass {
    constructor() {
        super();
    }

    hieu_ung_kiem_khach = (element) => {
        element.id = element.id || this.randomAZ(10);
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        if(!sprite_from) return element.type = 'delete';
        e.run = e.run || 0;
        if(e.run === 0) {
            let animation = this.animation(24015,220,660,3);
            animation.loop = false;
            animation.animationSpeed = 1.0;
            animation.visible = true;
            animation.play();
            if(sprite_from.width <= 0) {
                animation.scale.x =-1;
            }
            animation.width = 100;
            animation.height = 100;
            animation.x = sprite_from.x +  sprite_from.pivot.x - (animation.width/2 * animation.scale.x);
            animation.y = sprite_from.y + sprite_from.height/2 - animation.height/2;

            animation.onComplete = () => {
                element.type = 'delete';
                animation.visible = false;
            }
            e.addChild(animation);
        }
    }

    kiem_khach_attack_3 =(element,delta) => {
        const e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if (!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        let level = element.level || 1;
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            this.action(element.from,'a1');
            setTimeout(() => {
                this.action(element.from,'a5');
                let animation1 = this.animation(24167,312,352,4);
                e.addChild(animation1);
                animation1.animationSpeed = 0.3;
                animation1.loop = true;
                animation1.play();
                if(sprite_from.width <=0) animation1.scale.x = -1;
                animation1.width = 100;
                animation1.height = 50;
                animation1.x = sprite_from.x +sprite_from.pivot.x - (animation1.width * animation1.scale.x) + sprite_from.width;
                animation1.y = sprite_from.y + sprite_from.height - animation1.height;

                let animation2 = this.animation(24165,108,600,3);
                e.addChild(animation2);
                animation2.animationSpeed = 0.3;
                animation2.loop = true;
                animation2.play();
                if(sprite_from.width <=0) animation2.scale.x = -1;
                animation2.width = 70;
                animation2.height = 70;
                animation2.x = sprite_from.x +sprite_from.pivot.x - (animation2.width * animation2.scale.x);
                animation2.y = sprite_from.y + sprite_from.height/2 - animation2.height/2;

                for(let i = 0; i < 3; i++) {
                    let animation3 = this.animation(24028,184,800,4);
                    animation3.animationSpeed = 0.5;
                    animation3.loop = true;
                    animation3.play();
                    animation3.width = 80;
                    animation3.height = 80;
                    animation3.x = sprite_from.x;
                    animation3.y = sprite_from.y + sprite_from.height/2 - animation3.height/2;
                    setTimeout(() => {
                        let finish = () => {
                            animation3.destroy();
                            this.hieu_ung_kiem_khach({from : element.to});
                            if(i === 2) {
                                animation2.destroy();
                                animation1.destroy();
                                this.action(element.from,'dungyen');
                                element.type = 'delete';
                                this.success(element);
                            }

                        }
                        e.addChild(animation3);
                        this.moveSpeed(0.8,animation3,sprite_to,null,null,finish);
                    },100 * i);
                }

            },200);
        }
    }

    kiem_khach_attack_2 = (element, delta) => {
        const e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if (!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        let level = element.level || 1;
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            let animation = this.animation(24413,273,657,3);
            animation.animationSpeed = 0.5;
            animation.loop = true;
            animation.play();
            if(sprite_from.width <=0) animation.scale.x = -1;
            animation.width = 150;
            animation.height = 150;
            animation.x = sprite_from.x +sprite_from.pivot.x - (animation.width * animation.scale.x)/2;
            animation.y = sprite_from.y;
            e.addChild(animation);

            let p1 = () => {
                animation.visible = true;
                sprite_from.visible = false;
            }
            let p2 = () => {
                animation.visible = false;
                sprite_from.visible = true;
            }
            p1();

            setTimeout(() => {
                p2();
                if(sprite_from.x < sprite_to.x) {
                    sprite_from.x = sprite_to.x - 50;
                }
                else
                {
                    sprite_from.x = sprite_to.x + 50;
                }
                sprite_from.y = sprite_to.y-30;


                for(let i = 0; i < 2; i++) {
                    let animation2;
                    if(level <=9) animation2 = this.animation(24076,128,840,4);
                    else if(level <=14) animation2 = this.animation(24319,128,840,4);
                    else  animation2 = this.animation(24422,96,630,4);
                    animation2.q = sprite_to.x;
                    animation2.w = sprite_to.y;
                    e.addChild(animation2);
                    animation2.animationSpeed = 0.5;
                    animation2.loop = true;
                    animation2.play();
                    if(sprite_to.width <=0) animation2.scale.x = -1;
                    animation2.width = 50;
                    animation2.height = 100;
                    animation2.x = sprite_to.x + sprite_to.pivot.x - (animation2.width * animation2.scale.x)/2;
                    animation2.y = sprite_to.y + animation2.height*i - 20 - sprite_to.height/2;

                    animation2.onLoop =() => {
                        sprite_to.x = animation2.q;
                        sprite_to.y = animation2.w;
                    }
                    this.action(sprite_from.id,'a2');
                    setTimeout(() => {
                        animation2.visible = false;
                        animation2.destroy();
                    },300);
                }

                let chem;
                if(level <=9) chem = this.animation(24070,208,960,4);
                else if(level <=14) chem = this.animation(24279,280,1120,4);
                else chem = this.animation(24420,210,840,4);
                chem.animationSpeed = 0.3;
                chem.loop = false;
                chem.scale.x = 1;
                chem.width = 100;
                chem.height = 100;
                chem.play();
                chem.x = sprite_to.x + sprite_to.pivot.x - (chem.width * chem.scale.x)/2;
                chem.y = sprite_to.y + sprite_to.height/2 - chem.height/2;
                e.addChild(chem);
                chem.suc = 0;
                this.hieu_ung_kiem_khach({from : sprite_to.id});
                chem.onComplete = () => {
                    if(chem.suc ===0) {
                        chem.scale.x = -1;
                        chem.width = 100;
                        chem.height = 100;
                        chem.gotoAndPlay(0);
                        chem.x = sprite_to.x + sprite_to.pivot.x - (chem.width * chem.scale.x)/2;
                        chem.y = sprite_to.y + sprite_to.height/2 - chem.height/2;
                        chem.suc = 1;
                        this.action(sprite_from.id,'a5');
                        this.hieu_ung_kiem_khach({from : sprite_to.id});
                    }
                    else
                    {
                        this.action(sprite_from.id,'dungyen');
                        chem.visible = false;
                        chem.destroy();
                        animation.destroy();
                        element.type = 'delete';
                        sprite_from.y+=30;
                        this.hieu_ung_kiem_khach({from : sprite_to.id});
                        this.success(element);
                    }
                }





            },100);
        }
    }
    kiem_khach_attack_1 = (element, delta) => {
        const e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if (!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            let level = element.level || 1;
            let num = 0;
            if(level <=4) num = 1;
            else if(level <=9) num = 0;
            else if(level <=14) num = 2;
            this.action(sprite_from.id,'a2');
            let animation = this.animationw(24301,960,384,3,3,num,[1,2,1,2,1]);
            animation.animationSpeed = 0.2;
            animation.loop = false;
            animation.play();
            if(sprite_from.width <=0) animation.scale.x = -1;
            e.addChild(animation);
            animation.width = 130;
            animation.height = 70;
            animation.x = sprite_from.x +  sprite_from.pivot.x - (animation.width * animation.scale.x)*2;
            animation.y = sprite_from.y;
            animation.onFrameChange = () => {
                let num = animation.currentFrame;
            }
            animation.onComplete = () => {
                this.hieu_ung_kiem_khach({from : sprite_to.id});
                animation.visible = false;
            }
            animation.solan = 0;

            setTimeout(() => {
                this.action(sprite_from.id,'a3');
                animation.visible = true;
                setTimeout(() => {
                    this.action(sprite_from.id,'a2');
                    animation.visible = true;

                    setTimeout(() => {
                        animation.destroy();
                        element.type = 'delete';
                        this.success(element);
                        this.action(sprite_from.id,'dungyen');
                    },100);
                },100);
            }, 200);

        }

    }

}