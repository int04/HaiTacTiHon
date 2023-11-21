import hoaTieuViewSkill from "./hoatieu.js";

export default class daubepViewSkill extends hoaTieuViewSkill {
    constructor() {
        super();
    }
    daubep_attack_1 = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            let animation;
            let level = element.level || 1;
            if(level <=4) animation = this.animation("24068",112,512,3,0.5);
            else if(level <=9) animation = this.animation("24089",112,528,3,0.5);
            else if(level <=14) animation = this.animation("24100",60,400,5,0.5);
            else  animation = this.animation("24074",240,592,2,0.5);
            animation.loop = true;

            animation.animationSpeed = 0.3;
            if(sprite_from.width <= 0) {
                animation.scale.x =-1;
            }

            
            animation.visible = false;

            let restart = (stop) => {
                if(stop) {
                    this.success(element);
                    this.action(element.from,'dungyen')
                    element.type = 'delete';
                    animation.destroy();
                    return false;
                }
                animation.gotoAndPlay(0);

                animation.visible = true;
            }

            animation.onComplete = () => {
                animation.visible = false;
            }

            animation.width = 60;
            animation.height = 80;

            animation.x = sprite_from.x + sprite_from.pivot.x - sprite_from.width -  (animation.width * sprite_from.scale.x)/2;
            animation.y = sprite_from.y ;

            
            this.action(element.from,'a6')


            setTimeout(() => {
                this.action(element.from,'a7')
                restart();
                setTimeout(() => {
                    this.action(element.from,'a6')
                    restart();
                    setTimeout(() => {
                        this.action(element.from,'a14')
                        restart(1)
                    }, 200);
                }, 200);
            }, 100);


            

            e.addChild(animation);
        }
    }

    daubep_attack_2 = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            let animation;
            let level = element.level || 1;
            if(level <=4) animation = this.animation("24068",112,512,3,0.5);
            else if(level <=9) animation = this.animation("24089",112,528,3,0.5);
            else if(level <=14) animation = this.animation("24100",60,400,5,0.5);
            else  animation = this.animation("24074",240,592,2,0.5);
            animation.loop = true;

            animation.animationSpeed = 0.3;
            if(sprite_from.width <= 0) {
                animation.scale.x =-1;
            }

            
            animation.visible = false;

            let restart = (stop) => {
                if(stop) {
                    this.action(element.from,'dungyen')
                    animation.visible = false;
                }
                else 
                { 
                    animation.gotoAndPlay(0);
                    animation.visible = true;
                }
            }

            animation.onComplete = () => {
                animation.visible = false;
            }

            animation.width = 60;
            animation.height = 80;

            animation.x = sprite_from.x + sprite_from.pivot.x - sprite_from.width -  (animation.width * sprite_from.scale.x)/2;
            animation.y = sprite_from.y ;

            
            this.action(element.from,'a6')


            let animation2;
            if(level <=4) animation2 = this.animation("24102",140,228,3,0.5);
            else animation2 = this.animation("24103",140,228,3,0.5);
            animation2.loop = false;
            animation2.animationSpeed = 0.3;
            animation2.visible = false;
            animation2.run = 0;
            animation2.play();
            animation2.name = 'animation2';
            animation2.scale.x = sprite_from.scale.x;
            animation2.width = 50;
            animation2.height = 50;
            animation2.x = animation.x;
            animation2.y = animation.y;
            e.addChild(animation2);

            let move = () => {
                let finish = () => {
                    this.success(element);
                    animation2.visible = false;
                    element.type = 'delete';
                    animation.destroy();
                    animation2.destroy();
                }
                let onupdate =() => {
                    
                }
                animation2.visible = true;
                this.moveSpeed(1,animation2,sprite_to,TWEEN.Easing.Linear.Quintic,onupdate,finish);
                
            }

            setTimeout(() => {
                this.action(element.from,'a7')
                restart();
                setTimeout(() => {
                    this.action(element.from,'a6')
                    move();
                    setTimeout(() => {
                        this.action(element.from,'a14')
                        restart(1);
                    }, 200);
                }, 200);
            }, 100);


            e.addChild(animation);
        }
        else 
        {
            
        }
    }

    daubep_attack_3 = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            let animation;
            let level = element.level || 1;
            let animation_haoquang;
            if(level >= 5 && level <=9) 
                animation_haoquang = this.animation("24077",256,1200,4,0.5);
            else 
                animation_haoquang = this.animation("24412",192,900,4,0.5);
            animation_haoquang.loop = true;
            animation_haoquang.animationSpeed = 0.3;
            animation_haoquang.width = 120;
            animation_haoquang.height = 110;
            animation_haoquang.visible = false;

            animation_haoquang.x = sprite_from.x + sprite_from.pivot.x - animation_haoquang.width/2;
            animation_haoquang.y = sprite_from.y + sprite_from.height/2 - animation_haoquang.height/2;
            e.addChild(animation_haoquang);
            animation_haoquang.play();
            

            animation = this.animation("24031",280,1680,6,0.5);
            animation.loop = false;
            animation.animationSpeed = 0.20;
            if(sprite_from.width <= 0) {
                animation.scale.x =-1;
            }
            animation.width = 100;
            animation.height = 100;
            animation.x = sprite_from.x + sprite_from.pivot.x - sprite_from.width -  (animation.width * sprite_from.scale.x)/2;
            animation.y = sprite_from.y ;

            animation.visible = false;
            animation.value = 0;

            this.action(element.from,'a1')
            setTimeout(() => {
                animation.visible = true;
                if(level >=5) animation_haoquang.visible = true; 
                animation.play();
            }, 100);

            animation.onFrameChange = () => {
                let frame = animation.currentFrame;
                if(frame === 1) this.action(sprite_from.id,'a6');
                else if(frame === 2) this.action(sprite_from.id,'a7');
                else if(frame === 3) this.action(sprite_from.id,'a6');
                else if(frame === 4) this.action(sprite_from.id,'a14');
                else if(frame === 5) this.action(sprite_from.id,'a15');
            }

        

            animation.onComplete = () => {
                element.type = 'delete';
                this.success(element);
                animation.visible = false;
                animation.destroy();
                animation_haoquang.destroy();
                this.action(sprite_from.id,'dungyen');
            }
            


            e.addChild(animation);
        }
        else 
        {
            
        }
    }
}