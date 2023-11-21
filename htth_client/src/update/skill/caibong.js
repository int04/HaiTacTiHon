
export  default (self,element,delta) => {

    let e = self.getSkill(element.id,1);
    let sprite = self.getSprite(element.from);
    if(!sprite) return element.type = 'delete';

    e.run = e.run || 0;
    if(e.run == 0) {
        let animation = new PIXI.Sprite(self.coverImg('x2Main_Image_interface_shadow'));
        animation.name = "animation";
        animation.x = sprite.x + sprite.width/2 - animation.width/2;
        animation.y = sprite.y + sprite.height - animation.height/2;

        e.run = 1;
        e.addChild(animation);

    }
    else {
        let animation = e.getChildByName("animation");
        if(animation) {
            if(sprite.width <= 0) {
                animation.scale.x =-1;
            }
            animation.width = 52;
            animation.height = 20;

            animation.x = sprite.x + sprite.pivot.x - sprite.width +  (animation.width * sprite.scale.x)/2;
            animation.y = sprite.y + sprite.height - animation.height/2
        }
    }

}