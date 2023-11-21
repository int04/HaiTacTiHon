
export default (self, id,zone = null, x = null, y = null) => {
    self.send(-2,[
        1,
        id,
        zone,
        x,
        y,
    ]);
    if(x !== null && y !== null) {
        if(self.my.id >=1) {
            let sprite = self.getSprite(self.my.id);
            sprite.x = x;
            sprite.y = y;
        }
    }
}