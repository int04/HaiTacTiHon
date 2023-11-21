/*
* @since04
* @package
* @module skill
* @action vangmau
* */
export  default  (self, element) => {
    let e = self.getSkill(element.id);
    let sprite_from = self.getSprite(element.from);
    e.run = e.run || 1;
    if(!sprite_from) return element.type = 'delete';
    if(e.run === 1) {
        e.run = 5;
        let animation = self.createAnimationArray(['vang_1','vang_2','vang_3'],0.4,false);
        animation.height = 32;
        if(sprite_from.width <= 0) {
            animation.scale.x =-1;
        }
        animation.x = sprite_from.x + sprite_from.pivot.x;
        animation.y = sprite_from.y + animation.height/2;


        animation.play();
        animation.onComplete = () => {
            element.type = 'delete';
        }
        e.addChild(animation);
    }
}