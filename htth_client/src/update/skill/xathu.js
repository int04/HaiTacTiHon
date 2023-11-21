import updateEffVosi from "./vosi.js";

export default  class xathuViewClass extends  updateEffVosi {
    constructor() {
        super();
    }

    vang_mau_xa_thu = (element) => {
        element.id = element.id || this.randomAZ(10);
        let sprite_from = this.getSprite(element.from);
        if(!sprite_from) return element.type = 'delete';
        let e = this.getSkill(element.id);
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            let animation = this.animation(24006,152,608,4);
            e.addChild(animation);
            animation.animationSpeed = 0.5;
            animation.loop = false;
            animation.play();
            if(sprite_from.width <=0) animation.scale.x = -1;
            animation.width = 80;
            animation.height = 80;
            animation.x = sprite_from.x + sprite_from.pivot.x - (animation.width * animation.scale.x)/2;
            animation.y = sprite_from.y + sprite_from.height/2 - animation.height/2;
            animation.onComplete = () => {
                animation.visible = false;
                animation.destroy();
                element.type = 'delete';
            }
        }
    }

    vang_mau_xa_thu_1 = (element) => {
        element.id = element.id || this.randomAZ(10);
        let sprite_from = this.getSprite(element.from);
        if(!sprite_from) return element.type = 'delete';
        let e = this.getSkill(element.id);
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            let animation = this.animation(24019,200,1080,5);
            e.addChild(animation);
            animation.animationSpeed = 0.5;
            animation.loop = false;
            animation.play();
            if(sprite_from.width <=0) animation.scale.x = -1;
            animation.width = 80;
            animation.height = 80;
            animation.x = sprite_from.x + sprite_from.pivot.x - (animation.width * animation.scale.x)/2;
            animation.y = sprite_from.y + sprite_from.height/2 - animation.height/2;
            animation.onComplete = () => {
                animation.visible = false;
                animation.destroy();
                element.type = 'delete';
            }
        }
    }

    xa_thu_attack_1 = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to)  return element.type = 'delete';
        e.run = e.run || 0;
        let level = element.level || 1;
        if(e.run === 0) {
            this.action(sprite_from.id,'a10');
            e.run = 1;
            let animation;
            if(level <=4)  animation = this.animation(24068,112,528,3);
            else  animation = this.animation(24089,112,528,3);
            e.addChild(animation);
            animation.animationSpeed = 0.5;
            animation.loop = false;
            if(sprite_from.width <=0) animation.scale.x = -1;
            animation.play();
            animation.width = 80;
            animation.height = 80;
            animation.x = sprite_from.x + sprite_from.pivot.x - (animation.width * animation.scale.x)*1.4;
            animation.y = sprite_from.y;

            animation.ban = 1;
            animation.onComplete = () => {
                animation.visible = false;
                if(animation.ban ===1) {
                    this.action(sprite_from.id,'a11');
                    animation.x = sprite_to.x + sprite_to.pivot.x - (animation.width * animation.scale.x)*0.6;
                    animation.y = sprite_to.y;
                    animation.visible = true;
                    animation.gotoAndStop(0);
                    animation.play();
                    setTimeout(() => {
                        this.action(sprite_from.id,'dungyen');
                        this.danh = false;
                    },150);
                }
                else
                {
                    this.vang_mau_xa_thu({from : sprite_to.id});
                    element.type = 'delete';
                }
                animation.ban = 0;
            }

        }

    }

    xa_thu_attack_2 = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to)  return element.type = 'delete';
        let level = element.level || 1;
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            this.action(sprite_from.id,'a1');
            setTimeout(() => {
                this.action(sprite_from.id,'a10');
                let binhthuong = () => {
                    setTimeout(() => {
                        this.action(sprite_from.id,'dungyen');
                        this.danh = false;
                    },150);
                }

                if(level <=4) {
                    let animation1 = this.animation(24020,40,200,5);
                    e.addChild(animation1);
                    animation1.animationSpeed = 0.5;
                    animation1.loop = false;
                    animation1.play();
                    if(sprite_from.width <=0) animation1.scale.x = -1;
                    animation1.width = 30;
                    animation1.height = 30;
                    animation1.x = sprite_from.x + sprite_from.pivot.x - (animation1.width * animation1.scale.x)*3;
                    animation1.y = sprite_from.y + sprite_from.height/2 - animation1.height/2;

                    animation1.onComplete = () => {
                        animation1.visible = false;
                        this.action(sprite_from.id,'a11');
                        let animation2 = this.animation(24020,40,200,5);
                        e.addChild(animation2);
                        animation2.animationSpeed = 0.5;
                        animation2.loop = true;
                        animation2.play();
                        if(sprite_from.width <=0) animation2.scale.x = -1;
                        animation2.width = 30;
                        animation2.height = 30;
                        animation2.x = sprite_from.x + sprite_from.pivot.x - (animation2.width * animation2.scale.x)*3;
                        animation2.y = sprite_from.y + sprite_to.height/2 - animation2.height/2;

                        let finsh = () => {
                            animation2.visible = false;
                            element.type = 'delete';
                            this.success(element);
                            this.vang_mau_xa_thu_1({from : sprite_to.id});
                        }

                        this.moveSpeed(1,animation2,sprite_to, null, null, finsh);
                        binhthuong();
                    }
                }
                else if(level >=5)
                {
                    let animation1;
                    if(level <=14) animation1 = this.animation(24185,220,200,2);
                    else animation1 = this.animation(24333,220,200,2);
                    e.addChild(animation1);
                    animation1.animationSpeed = 0.5;
                    animation1.loop = false;
                    animation1.play();
                    if(sprite_from.width <=0) animation1.scale.x = -1;
                    animation1.width = 130;
                    animation1.height = 50;
                    animation1.x = sprite_from.x + sprite_from.pivot.x - (animation1.width * animation1.scale.x)*2;
                    animation1.y = sprite_from.y ;
                    animation1.lop = 1;
                    animation1.onComplete = () => {
                        if(animation1.lop ===1) {
                            animation1.visible = true;
                            animation1.gotoAndStop(0);
                            animation1.play();
                            animation1.lop = 2;
                        }
                        else
                        {
                            animation1.visible = false;
                            this.action(sprite_from.id,'a11');
                            let animation2;
                            if(level <=9) {
                                animation2= this.animation(24288,120,480,4);
                                e.addChild(animation2);
                                animation2.animationSpeed = 0.5;
                                animation2.loop = true;
                                animation2.play();
                                if(sprite_from.width <=0) animation2.scale.x = -1;
                                animation2.width = 30;
                                animation2.height = 30;
                                animation2.x = sprite_from.x + sprite_from.pivot.x - (animation2.width * animation2.scale.x)*3;
                                animation2.y = sprite_from.y + sprite_to.height/2 - animation2.height/2;
                            }
                            else
                            {
                                if(level <=14) animation2= this.animation(24285,444,1080,3);
                                else animation2= this.animation(24332,444,1080,3);
                                e.addChild(animation2);
                                animation2.animationSpeed = 0.3;
                                animation2.loop = true;
                                animation2.play();
                                if(sprite_from.width <=0) animation2.scale.x = -1;
                                animation2.width = 150;
                                animation2.height = 130;
                                animation2.x = sprite_from.x + sprite_from.pivot.x - (animation2.width * animation2.scale.x)*3;
                                animation2.y = sprite_from.y + sprite_to.height/2 - animation2.height/2;
                            }

                            let finsh = () => {
                                animation2.visible = false;
                                element.type = 'delete';
                                this.success(element);
                                this.vang_mau_xa_thu_1({from : sprite_to.id});
                            }

                            this.moveSpeed(0.6,animation2,sprite_to, null, null, finsh);
                            binhthuong();
                        }
                        animation1.lop = 0;

                    }

                }

            },100);
        }

    }

    xa_thu_attack_3 = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to)  return element.type = 'delete';
        let level = element.level || 1;
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            this.action(sprite_from.id,'a1');
            setTimeout(() => {
                this.action(sprite_from.id,'a10');

                let animation = this.animation(24188,36,192,3);
                e.addChild(animation);
                animation.animationSpeed = 0.5;
                animation.loop = true;
                animation.play();
                if(sprite_from.width <=0) animation.scale.x = -1;
                animation.width =30;
                animation.height = 30;
                animation.x = sprite_from.x + sprite_from.pivot.x - (animation.width * animation.scale.x)*3;
                animation.y = sprite_from.y + sprite_to.height/2 - animation.height/2;

                let fish = () => {
                    this.success(element);
                    animation.visible = false;
                    animation.destroy();
                    this.vang_mau_xa_thu({from : sprite_to.id});

                    for(let i = 0; i<3; i++) {
                        let animation2 = this.animation(24111,160,720,6);
                        animation2.animationSpeed = 0.5;
                        animation2.loop = false;
                        animation2.play();
                        if(sprite_from.width <=0) animation2.scale.x = -1;
                        animation2.width = 60;
                        animation2.height = 60;
                        animation2.onComplete = () => {
                            animation2.gotoAndStop(4);
                            animation2.play();
                        }
                        animation2.x = sprite_to.x + sprite_from.pivot.x - (animation2.width * animation2.scale.x)*3;
                        animation2.y = sprite_to.y + sprite_to.height/2 - animation2.height/2;

                        setTimeout(() => {
                            let xong = () => {
                                animation2.visible = false;
                                let animation3 = this.animation(24113,100,500,5);
                                animation3.animationSpeed = 0.3;
                                animation3.loop = false;
                                animation3.play();
                                if(sprite_from.width <=0) animation3.scale.x = -1;
                                animation3.width = 100;
                                animation3.height = 100;
                                animation3.x = animation2.x;
                                animation3.y = animation2.y + animation2.height/2 - animation3.height/2;
                                animation2.destroy();
                                e.addChild(animation3);
                                animation3.onComplete = () => {
                                    animation3.visible = false;
                                    animation3.destroy();
                                    if(i ===2) {
                                        element.type = 'delete';
                                    }
                                }
                            }
                            e.addChild(animation2);
                            this.moveSpeed(1,animation2, {x : sprite_to.x + this.rand(-200,200),y : sprite_to.y - sprite_to.height},null,null,xong);
                        },i*300);

                    }
                }

                this.moveSpeed(1,animation,sprite_to, null, null, fish);

                setTimeout(() => {
                    this.action(sprite_from.id,'a11');
                    setTimeout(() => {
                        this.action(sprite_from.id,'dungyen');
                        this.danh = false;
                    },150);
                },100);
            },150);
        }


    }

}