export default (self,move) => {

    let my = self.my;
    if(my.id <=0) return false;
    let sprite = self.getSprite(my.id);
    if(sprite) {
        let value = 2;
        if(move === 'left') {
            sprite.x+=Math.abs(sprite.width) * value;
        }
        else if(move === 'right') {
            sprite.x-=Math.abs(sprite.width) * value;
        }
        else if(move === 'top') {
            sprite.y+=Math.abs(sprite.height);
        }
        else if(move === 'bottom') {
            sprite.y-=Math.abs(sprite.height) ;
        }
    }

}