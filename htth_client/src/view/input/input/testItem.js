
export  default  (self, name = null) => {
    let item = self.item;
    let I = self.my;
    let data;
    data = item.filter(e => e.type === 'trangbi' && e.class == I.info.coban.he);
    if(name) {
        data = data.filter(e => e.name === name);
    }
    data.forEach((e, i) => {
        let my = JSON.parse(JSON.stringify(I));
        if(e.script && typeof e.script === 'object') {
            for(let key in e.script) {
                my.skin[key] = e.script[key];
            }
        }
        my.id = e.id+'test';

        my.name = e.name + '_ lv.'+ e.level;

        let map = self.gameMap.setting;
        let maxX = map.maxX;
        let maxY = map.maxY;

        let xNow = my.pos.x;
        let yNow = my.pos.y;

        xNow+= self.rand(-300,300)
        yNow+= self.rand(-300,300)

        if(xNow < 0) xNow = 0;
        if(xNow > maxX) xNow = maxX;

        if(yNow < 0) yNow = 0;
        if(yNow > maxY) yNow = maxY;

        my.pos.x = xNow;
        my.pos.y = yNow;


        self.create_sprite_my(my);


    });
}