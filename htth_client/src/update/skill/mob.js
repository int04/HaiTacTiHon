import daubepViewSkill from "./daubep.js";

export default class mobUpdateViewAttack extends daubepViewSkill {
    constructor() {
        super();
    }
    
    mob_att_1 = (element, delta) => {
        let e = this.getSkill(element.id);
        let sprite_from = this.getSprite(element.from);
        if(!sprite_from) return;
        let sprite_to = this.getSprite(element.to);
        if(!sprite_to) return;

        e.run = e.run || 0;
        if(e.run ==0) {
            let animation = this.animation(24000,56,224,4);
            e.addChild(animation);
            animation.play();
            animation.loop = true;
            animation.animationSpeed = 0.3;
            animation.x = sprite_from.x;
            animation.y = sprite_from.y;

            animation.width = 40;
            animation.height = 40;

            let done = () => {
                animation.visible = false;
                element.type = 'delete';
            }
            this.move(
                animation,
                {x : sprite_to.x, y : sprite_to.y},
                500,
                TWEEN.Easing.Circular.Out,
                0,
                done,
                sprite_to
            )
            e.run = 1;
        }
    }
}