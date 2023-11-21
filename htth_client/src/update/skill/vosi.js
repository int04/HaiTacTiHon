import actionUpdate from "../action.js";

export default class updateEffVosi extends actionUpdate {
    constructor() {
        super();
    }

    

    vong_skill = (e,sprite,level) => {

        let chinhxac = this.sprite(sprite);
        let skillSize = 30;
        const skillSpacing = 60;
        const centerX = chinhxac.x +  sprite.width / 2;
        const centerY = sprite.y + sprite.height / 2;
    
        const numSkills = 20;

        for (let i = 0; i < numSkills - 1; i++) {
            let skillButton = new PIXI.Graphics();
            skillButton.beginFill(0x000000);
            const angle = (i / (numSkills - 1)) * Math.PI * 2;
            skillButton.drawCircle(
            centerX + (skillSize + skillSpacing) * Math.cos(angle),
            centerY + (skillSize + skillSpacing) * Math.sin(angle),
            skillSize
            );
            skillButton.endFill();
            e.addChild(skillButton);
            skillButton.visible = false;

            let real = skillButton.getBounds();
            let animation;
            if(level <= 14) animation = this.animation("24027",96,384,4,0.5);
            else if(level <= 20) animation = this.animation("24225",96,384,4,0.6);
            animation.loop = false;
            animation.play();
            animation.width = real.width;
            animation.height = real.height;
            animation.xx = centerX + (skillSize + skillSpacing) * Math.cos(angle);
            animation.yy = centerY + (skillSize + skillSpacing) * Math.sin(angle);
            animation.x = centerX;
            animation.y = centerY;

            let finsh = () => {
            }

            let move = this.move(animation, {
                x: animation.xx,
                y: animation.yy
            }, 400, TWEEN.Easing.Back.InOut,0,finsh
            );
            

            e.addChild(animation);
            animation.run = 0;
            animation.onComplete = () => {
                // get count loop
                animation.run++;
                animation.visible = false;
                if(animation.run < 10) {
                    animation.gotoAndPlay(0);
                    animation.visible = true;
                }

            }


        }


    }

    dam_2_vo_si = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        e.run = e.run || 0;

        if(e.run == 0) {
            let level = element.level;
            level = level || 1;
            e.run = 1;
            this.action(sprite_from.id,'a1');
            
            setTimeout(() => {
                let x_cu = sprite_to.x;
                let x_new = 0;
                let gian = 200;
                if(sprite_to.x > sprite_from.x) {
                    x_new = sprite_from.x - gian;
                }
                else
                {
                    x_new = sprite_from.x + gian;
                }
                sprite_from.x = x_new;
                sprite_from.y = sprite_to.y;
    
                let animation0;
                if(level <=14) animation0 = this.animation("24008",160,564,3,0.3);
                else animation0 = this.animation("24316",176,752,4,0.3);
                animation0.loop = true;
                animation0.play();
                if(sprite_from.width <= 0) {
                    animation0.scale.x = -1;
                }
                animation0.width = 80;
                animation0.height = 80;
                animation0.y = sprite_from.y;
                animation0.x = sprite_from.x;
                e.addChild(animation0);
    
                this.action(sprite_from.id,'a4');

                let aoanh = () => {
                    animation0.visible = false;
                }

                this.move(animation0,
                    {x : x_cu},
                    500,TWEEN.Easing.Back.InOut,0,aoanh
                    );

                let xonggoi = () => {
                    this.action(sprite_from.id,'a5');
                    let animation1;
                    if(level <= 1) {
                        animation1 =  this.animation("24068",112,528,3,0.3);
                    }
                    else 
                    if(level <=9 ) {
                        animation1 =  this.animation("24089",112,528,3,0.3);
                    }
                    else 
                    if(level <=14 ) {
                        animation1 =  this.animation("24281",116,600,3,0.3);
                    }
                    else  animation1 =  this.animation("24274",276,888,3,0.3);
                    animation1.loop = false;
                    animation1.play();
                    animation1.scale.x = sprite_from.scale.x;
        
                    animation1.width = 80;
                    animation1.height = 80;
                    animation1.y = sprite_from.y;
                    if(sprite_from.width <= 0) {
                        animation1.x = sprite_from.x + Math.abs(animation1.width)/2 + Math.abs(sprite_from.width) + sprite_from.pivot.x;
                    }
                    else 
                    {
                        animation1.x = sprite_from.x - Math.abs(animation1.width)/2 - Math.abs(sprite_from.width);
                    }
                    animation1.name = "animation1";
                    animation1.updateAnchor = true;
                    e.addChild(animation1);
                    animation1.onComplete = () => {
                        this.success(element);

                        animation1.visible = false;
                        this.action(sprite_from.id,'dungyen');

                        setTimeout(() => {
                            element.type = 'delete';
                            animation1.destroy();
                            animation0.destroy();
                        }, 200);
                    }
                }

                this.move(sprite_from,
                    {x : x_cu},
                    400, TWEEN.Easing.Back.InOut, 0, xonggoi
                    );
            }, 100);

        }
    }

    dam_1_vo_si = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        e.run = e.run || 0;

        if(e.run == 0) {
            let level = element.level;
            level = level || 1;
            this.action(sprite_from.id,'dungyen')
            e.run = 1;
            let animation1;
            if(level <= 1) {
                animation1 =  this.animation("24068",112,528,3,0.3);
            }
            else 
            if(level <=20 ) {
                animation1 =  this.animation("24089",112,528,3,0.3);
            }
            animation1.loop = false;
            animation1.play();
            animation1.scale.x = sprite_from.scale.x;

            animation1.width = 80;
            animation1.height = 80;
            animation1.y = sprite_from.y;
            if(sprite_from.width <= 0) {
                animation1.x = sprite_from.x + Math.abs(animation1.width)/2 + Math.abs(sprite_from.width) + sprite_from.pivot.x;
            }
            else 
            {
                animation1.x = sprite_from.x - Math.abs(animation1.width)/2 - Math.abs(sprite_from.width);
            }
            animation1.name = "animation1";
            animation1.updateAnchor = true;
            e.addChild(animation1);
            this.action(sprite_from.id,'a1')
            animation1.onComplete = () => {
                animation1.visible = false;
            }

            let restart = () => {
                animation1.visible = true;
                animation1.gotoAndPlay(0);
            }
            animation1.visible = false;

            let animation2;
            if(level <=1) animation2 = this.animation("24121",128,768,6,0.5);
            else if(level <=20) animation2 = this.animation("24027",96,384,4,0.5);
            animation2.loop = false;
            animation2.play();
            animation2.width = 30;
            animation2.height = 30;

            animation2.y = sprite_from.y + animation2.height/2;

            if(sprite_from.width <= 0)
            {
                animation2.x = sprite_from.x + sprite_from.width/2 + (animation2.width/2 * sprite_from.scale.x) + 5;
            }
            else 
            {
                animation2.x = sprite_from.x + sprite_from.width/2 + (animation2.width/2 * sprite_from.scale.x) - 10;

            }
            animation2.name = "animation2";

            animation2.onComplete = () => {
                animation2.visible = false;
                animation1.visible = true;
                if(level >=9) 
                {
                    this.vong_skill(e,sprite_to,level);
                }

                this.action(sprite_from.id,'a11');
                setTimeout(() => {
                    this.action(sprite_from.id,'a8');

                    restart();
                    setTimeout(() => {
                        this.success(element);
                        this.action(sprite_from.id,'a10');
                        setTimeout(() => {
                            this.action(sprite_from.id,'dungyen');
                            element.type = 'delete';
                            animation1.destroy();
                            animation2.destroy();
                        }, 100);
                    }, 100);
                }, 100);
            };

            e.addChild(animation2);
        }

    }


    dam_3_vo_si = (element,delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        let getMy = this.getMy(sprite_from.id);
        if(!sprite_from || !sprite_to || !getMy) {
            return element.type = 'delete';
        }
        let level = element.level;
        level = level || 1;
        e.run = e.run || 0;
        if(e.run == 0) {
            e.run = 1;

            this.action(sprite_from.id,'a1')

            let create_bouns = (animationgoc) => {
                let animation = this.animation("24027",96,384,4,0.5);
                animation.loop = true;
                animation.play();
                animation.width = 150;
                animation.height = 150;
                animation.x = 0;
                animation.y = 0;
                animation.name = "animation";
                animationgoc.addChild(animation);
            }
            
            setTimeout(() => {
                let animation1;
                if(level <= 14) animation1 = this.animation("24001",320,800,5,0.3);
                else if(level >=15) animation1 = this.animation("24317",360,1000,5,0.3);
                animation1.loop = false;
                animation1.play();
                animation1.y = sprite_from.y;
                
                this.action(sprite_from.id,'a5')
                
    
                if(sprite_from.width <= 0) {
                    animation1.scale.x =-1;
                }
    
    
                animation1.width = 100;
                animation1.height = 80;
    
                animation1.x = sprite_from.x + sprite_from.pivot.x - (sprite_from.width)*0.4 - (animation1.width * sprite_from.scale.x)/2;
                if(level >=5 && level <=9) create_bouns(animation1);
                animation1.name = "animation1";
                animation1.solan = 0;
                animation1.delete = 0;
                animation1.onComplete = () => {
                    animation1.solan+=0;
                    animation1.visible = false;
                    if(animation1.solan <= 1) {
                        animation1.visible = true;
                        animation1.gotoAndPlay(0);
                    }
                    if(animation1.delete == 0) {
                        animation1.delete = 1;
                        this.success(element);
                        setTimeout(() => {
                            this.action(sprite_from.id,'dungyen');
                            element.type = 'delete';
                            animation1.destroy();
                        }, 100);
                    }
                }
                e.addChild(animation1);

                

                let create_animaion = (sprite) => {

                    let animation1;
                    if(level <= 14) animation1 = this.animation("24001",320,800,5,0.3);
                    else if(level >=15) animation1 = this.animation("24317",360,1000,5,0.3);
                    animation1.loop = true;
                    animation1.play();
                    animation1.y = sprite.y;
                    
                    if(sprite.width <= 0) {
                        animation1.scale.x =-1;
                    }
        
        
                    animation1.width = 100;
                    animation1.height = 80;
        
                    animation1.x = sprite.x + sprite.pivot.x - (sprite.width)*0.4 - (animation1.width * sprite.scale.x)/2;
                    animation1.name = "animation1";

                    return animation1;
                }

                // clone bảo sao
                if(level >= 10) {
                    let sprite_sao_1 = this.created_sprite_skin_hi(getMy, 'a5');

                    sprite_sao_1.y = sprite_from.y - sprite_from.height;
                    sprite_sao_1.alpha = 0.5;
                    if(sprite_from.width <= 0) {
                        sprite_sao_1.scale.x = -1;
                        sprite_sao_1.pivot.x = -sprite_sao_1.width/2;
                        sprite_sao_1.x = sprite_from.x + sprite_from.width/2;
                    }
                    else 
                    {
                        sprite_sao_1.pivot.x = 0;
                        sprite_sao_1.x = sprite_from.x + sprite_from.width/2 + sprite_from.pivot.x;
                    }
    
                    let animation_sao_1 = create_animaion(sprite_sao_1);
                    e.addChild(animation_sao_1);
                    e.addChild(sprite_sao_1);
    
                    let sprite_sao_2 = this.created_sprite_skin_hi(getMy, 'a5');
                    sprite_sao_2.y = sprite_from.y + sprite_from.height;
                    sprite_sao_2.alpha = 0.5;
                    if(sprite_from.width <= 0) {
                        sprite_sao_2.scale.x = -1;
                        sprite_sao_2.pivot.x = -sprite_sao_2.width/2;
                        sprite_sao_2.x = sprite_from.x + sprite_from.width;
                    }
                    else
                    {
                        sprite_sao_2.pivot.x = 0;
                        sprite_sao_2.x = sprite_from.x + sprite_from.width 
                    }
                    let animation_sao_2 = create_animaion(sprite_sao_2);
                    e.addChild(animation_sao_2);
                    e.addChild(sprite_sao_2);
                }

            }, 200);


        }
    }
}