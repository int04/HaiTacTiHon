import kiemkhachView from "./kiemkhach.js";
export default  class hoaTieuViewSkill extends  kiemkhachView {
    constructor() {
        super();
    }

    hieu_ung_hoa_tieu2 = (element, data) => {
        element.id = element.id || this.randomAZ(10);
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        if(!sprite_from) return element.type = 'delete';
        e.run = e.run || 0;
        if(e.run === 0) {
            let animation = this.animation(24098,312,1120,4);
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
                animation.destroy();
            }
            e.addChild(animation);
        }
    }

    hieu_ung_hoa_tieu = (element, data) => {
        element.id = element.id || this.randomAZ(10);
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        if(!sprite_from) return element.type = 'delete';
        e.run = e.run || 0;
        if(e.run === 0) {
            let animation = this.animation(24143,152,608,4);
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
                animation.destroy();
            }
            e.addChild(animation);
        }
    }

    hoa_tieu_attack_3 = (element, delta) => {
        const  e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to) return element.type = 'delete';
        e.run = e.run || 0;
        if(e.run === 0) {
            e.run = 1;

            let runProgram = () => {
                let animation = this.animation(24081, 96, 384, 4);
                animation.loop = true;
                animation.animationSpeed = 0.5;
                animation.visible = true;
                animation.play();
                e.addChild(animation);
                if(sprite_from.width <= 0) {
                    animation.scale.x =-1;
                }
                animation.width = 40;
                animation.height = 40;
                animation.x = sprite_from.x +  sprite_from.pivot.x - (animation.width * animation.scale.x)*3 ;
                animation.y = sprite_from.y - animation.height/2;

                let finish = () => {
                    this.action(sprite_from.id, 'dungyen');
                    animation.visible = false;
                    let animation2 = this.animation(24095, 128, 432, 4);
                    animation2.loop = true;
                    animation2.animationSpeed = 0.4;
                    animation2.visible = true;
                    animation2.play();
                    animation2.width = 70;
                    animation2.height = 70;
                    animation2.x = animation.x;
                    animation2.y = animation.y ;
                    e.addChild(animation2);
                    setTimeout(() => {
                        animation2.visible = false;
                        for(let i = 0; i < 3; i++) {
                            let j = i;
                            if(sprite_from.width <= 0) {
                                j = i*-1;
                            }
                            let animation3 = this.animationX(24407,312,597,2 );
                            animation3.animationSpeed = 0.3;
                            animation3.loop = true;
                            animation3.width = 70;
                            animation3.height = 200;
                            animation3.x = animation2.x - (j*animation3.width);
                            animation3.y = sprite_to.y - animation3.height + sprite_to.height;
                            animation3.solan = 0;
                            animation3.onLoop = () => {
                                animation3.solan++;
                                if(animation3.solan >=2) animation3.loop = false;
                            }
                            animation3.onComplete = () => {
                                animation3.visible = false;
                                animation3.destroy();
                                this.hieu_ung_hoa_tieu2({from : element.to},null);
                                if(i === 2) {
                                    element.type = 'delete';
                                    this.success(element);
                                    animation2.destroy();
                                    animation.destroy();
                                }
                            }

                            setTimeout(() => {
                                e.addChild(animation3);
                                animation3.play();

                            }, i*100);


                        }
                    },200);
                }

                this.moveSpeed(0.8,animation, {
                    x : sprite_to.x,
                    y : sprite_to.y - sprite_to.height - animation.height
                }, null, null, finish
                );
            }

            this.action(sprite_from.id, 'a12');
            setTimeout(() => {
                this.action(sprite_from.id, 'a9');
                setTimeout(() => {
                    this.action(sprite_from.id, 'a11');
                    setTimeout(() => {
                        this.action(sprite_from.id, 'a8');
                        runProgram();
                    },100);
                },100);
            },100);
        }
    }

    hoa_tieu_attack_2 = (element, delta) => {
        const e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if(!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        e.run = e.run || 0;
        if(e.run ===0) {
            e.run = 1;
            this.action(sprite_from.id, 'a9');
            setTimeout(() => {
                this.action(sprite_from.id, 'a8');

                let animation;
                let level = element.level || 1;
                let num = 1;
                level = 15;
                if(level <= 1) num = 0;
                else if(level <=9) num = 1;
                else if(num <=14) num = 2;
                else if(num <=19) num = 3;
                else  num = 4;
                animation = this.animationw("24298",480,576,6,5, num)
                animation.loop = true;
                animation.animationSpeed = 0.5;
                animation.visible = true;
                animation.play();
                if(sprite_from.width <= 0) {
                    animation.scale.x =-1;
                }
                animation.width = 40;
                animation.height = 40;
                animation.x = sprite_from.x + sprite_from.pivot.x  -  (animation.width * sprite_from.scale.x) * 1.1;
                animation.y = sprite_from.y - 25 ;

                e.addChild(animation);

                setTimeout(() => {
                    this.action(sprite_from.id, 'dungyen');

                    let finish = () => {
                        this.success(element);
                        animation.visible = false;
                        animation.destroy();
                        element.type = 'delete';
                    }

                    let left = () => {
                        this.hieu_ung_hoa_tieu({from : sprite_to.id},null);
                        this.moveSpeed(1, animation,{
                            x : sprite_to.x + sprite_to.pivot.x  +  (animation.width * sprite_from.scale.x),
                            y : sprite_to.y + sprite_to.height/2 - animation.height/2,
                        },null,null,finish);
                    }
                    let center = () => {
                        this.hieu_ung_hoa_tieu({from : sprite_to.id},null);
                        this.moveSpeed(1, animation,{
                            x : sprite_to.x + sprite_to.pivot.x  -  (animation.width * sprite_from.scale.x) ,
                            y : sprite_to.y + sprite_to.height/2 - animation.height/2,
                        },null,null,left);
                    }

                    let from_right_top_to_left_bottom = () => {
                        this.hieu_ung_hoa_tieu({from : sprite_to.id},null);
                        this.moveSpeed(1, animation,{
                            x : sprite_to.x - sprite_to.pivot.x,
                            y : sprite_to.y + sprite_to.height,
                        },null,null,center);
                    }

                    let from_left_bottom_to_right_top = () => {
                        this.hieu_ung_hoa_tieu({from : sprite_to.id},null);
                        this.moveSpeed(1, animation,{
                            x : sprite_to.x + sprite_to.pivot.x,
                            y : sprite_to.y - 40,
                        },null,null,from_right_top_to_left_bottom);
                    }
                    let move_top_right_button =() => {
                        this.hieu_ung_hoa_tieu({from : sprite_to.id},null);
                        this.moveSpeed(1, animation,{
                            x :sprite_to.x + sprite_to.pivot.x  -  (animation.width * sprite_from.scale.x) * 1.1,
                            y : sprite_to.y + sprite_to.height,
                        },null,null,from_left_bottom_to_right_top);
                    }

                    this.moveSpeed(1, animation,{
                        x : sprite_to.x + sprite_to.pivot.x,
                        y : sprite_to.y - 40,
                    },null,null,move_top_right_button);
                },100);

            }, 200);
        }
    }
    hoa_tieu_attack_1 = (element,delta) => {
        const e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        let sprite_to = this.getSprite(element.to);
        if (!sprite_from || !sprite_to) {
            return element.type = 'delete';
        }
        e.run = e.run || 0;
        if (e.run === 0) {
            this.action(element.from,'a8')
            e.run = 1;
            let animation;
            let level = element.level || 1;
            let num = 1;
            level = 15;
            if(level <= 1) num = 0;
            else if(level <=9) num = 1;
            else if(num <=14) num = 2;
            else if(num <=19) num = 3;
            else  num = 4;
            animation = this.animationw("24298",480,576,6,5, num)
            animation.loop = true;
            animation.animationSpeed = 0.5;
            animation.visible = true;
            animation.play();
            if(sprite_from.width <= 0) {
                animation.scale.x =-1;
            }
            animation.width = 40;
            animation.height = 40;
            animation.x = sprite_from.x + sprite_from.pivot.x  -  (animation.width * sprite_from.scale.x) * 1.1;
            animation.y = sprite_from.y - 25 ;

            e.addChild(animation);

            setTimeout(() => {
                this.hieu_ung_hoa_tieu({from : sprite_to.id},null);
                this.success(element);
                animation.visible = false;
                element.type = 'delete';
                animation.destroy();
                this.action(element.from,'dungyen')
            }
            , 500);



        }
    }

}