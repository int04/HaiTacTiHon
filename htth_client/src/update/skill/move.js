import updateTextView from "./text.js";


export default class moveUpdateEFF extends updateTextView {
    constructor() {
        super();
    }

    updateBuocChay = (element,delta) => {
        let e = this.getSkill(element.id,1);
        let sprite = this.getSprite(element.from);
        if(!sprite) return element.type = 'delete';

        e.run = e.run || 0;
        if(e.run == 0) {
            let animation = this.createAnimation("x2Main_Image_interface_eff_inmap0",24,48,3,0.05);
            animation.x = sprite.x;
            animation.y = sprite.y + sprite.height - animation.height/2;
            if(sprite.huong == 'right') {
                animation.scale.x = -1;
            }
            e.run = 1;
            animation.play();
            animation.onComplete = () => {
                TweenMax.to(animation,0.5,{alpha:0,onComplete:()=>{
                    animation.destroy();
                    element.type = 'delete';
                }});
            }
            
            e.addChild(animation);
            
        }
    }
}

