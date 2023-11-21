function calculateDistanceXandWidth(sprite1, sprite2) {

    let x1 = sprite1.x;
    let x2 = sprite2.x;
    let width1 = sprite1.width;
    let width2 = sprite2.width;


}

function areObjectsStacked(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.contains(bounds2.x + object1.pivot.x, bounds2.y) || bounds2.contains(bounds1.x, bounds1.y);
}

import pushSpriteWhenCollection from "./more/pushSpriteWhenCollection.js";

export default (self,my) => {
    let sprite = self.getSprite(my.id);
    if(!sprite) {
        sprite = new PIXI.Container();
        sprite.name = my.id;
        sprite.x = my.position.x;
        sprite.y = my.position.y;
        self.player.addChild(sprite);
        let width = my.position.width;
        let height = my.position.height;
        let move = my.position.move;
        let map = self.gameMap.setting;
        let maxW = map.maxX;
        let maxH = map.maxY;

        if((move === 'left' || move === 'right')) {
            width = 50;
            if(!height || height <=0) height = 300;
        }
        else if(move === 'top' || move === 'bottom') {
            height = 50;
            if(!width || width <=0) width = 300;
        }

        if(maxH === height) {
            sprite.y = 0 + self.may.height + self.bien.height + self.nui1.height;
        }

        let background = new PIXI.Graphics();
        background.beginFill(0x000000, 0.5);
        background.drawRect(0, 0, width,height);
        background.endFill();
        sprite.addChild(background);
        background.name = "background";
        background.widthm = width;
        background.heightm = height;

        let background2 = new PIXI.Graphics();
        background2.beginFill(0xFFFFFF, 0.5);
        background2.drawRect(0, 0, width,height);
        background2.endFill();
        sprite.addChild(background2);
        background2.name = "background2";


        let icon = new PIXI.Sprite(self.coverImg("x2Main_Image_interface_selected_hand"));
        icon.width = 20;
        icon.height = 25;
        background.addChild(icon);
        icon.name = "icon";
        if(move === 'top' || move === 'bottom') {
            icon.x = background.width/2 - icon.width/2;
            if(move === 'top') {
                icon.y = background.height + icon.height;
            }
            else {
                icon.y = 0 - icon.height;
            }
        }
        if(move === 'left' || move === 'right') {
            icon.y = background.height/2 - icon.height/2;
            if(move === 'left') icon.x = background.width + icon.width;
            else icon.x = 0 - icon.width;
        }

        if(move === 'top') icon.rotation = 180 * Math.PI / 180;
        if(move === 'left') icon.rotation = 90 * Math.PI / 180;
        if(move === 'right') {
            icon.rotation = -90 * Math.PI / 180;
            icon.y += icon.height/2;
        }

        let value = "Chưa xác định"+my.id;
        let id = my.nextMap.id;
        let checked = self.listMap.findIndex(e => e.id === id);
        if(checked !== -1) {
            value = self.listMap[checked].name;
        }
        let name = new PIXI.Text(value, { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
        name.name = "name";
        background.addChild(name);
        if(move === 'bottom') {
            name.x = icon.x + icon.width/2 - name.width/2;
            name.y = icon.y - name.height;
            // tween name.y +=1 => name.y -=1 loop = true
            new TWEEN.Tween(icon).to({y : icon.y + 5}, 200).easing(TWEEN.Easing.Linear.None).repeat(Infinity).yoyo(true).start();


        }

        if(move === 'top') {
            name.x = icon.x + icon.width/2 - name.width/2;
            name.y = icon.y;
            new TWEEN.Tween(icon).to({y : icon.y - 5}, 200).easing(TWEEN.Easing.Linear.None).repeat(Infinity).yoyo(true).start();
        }
        if(move === 'left') {
            name.x = icon.x + icon.width;
            name.y = icon.y + icon.height/2 - name.height/2;
            new TWEEN.Tween(icon).to({x : icon.x - 5}, 200).easing(TWEEN.Easing.Linear.None).repeat(Infinity).yoyo(true).start();
        }

        if(move === 'right') {
            name.x = icon.x - name.width;
            name.y = icon.y- name.height;
            new TWEEN.Tween(icon).to({x : icon.x + 5}, 200).easing(TWEEN.Easing.Linear.None).repeat(Infinity).yoyo(true).start();
        }

        my.nextMap.move = move;
    }
    else
    {
        let mySprite = self.getSprite(self.my.id);
        if(mySprite) {
            let background = sprite.getChildByName("background2");
            if(background) {
                let areStacked = areObjectsStacked(mySprite, background);
                if(areStacked) {
                    if(!self.isGoToZone) {
                        self.isGoToZone = true;
                        let data = my.nextMap;
                        let to = data.id;
                        let x = data.x;
                        let y = data.y;
                        self.goto(to,null,x,y);
                        pushSpriteWhenCollection(self,my.nextMap.move);
                    }
                }

            }
        }
    }



}