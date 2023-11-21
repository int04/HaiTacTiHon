import zoneOnMap from "./sprite/zone.js";
import chipiUpdate from "./chipi.js";

export default class moveUpdate extends chipiUpdate {
    constructor() {
        super();
    }

    updateMove = (delta) => {
        if(this.loadGame.visible === true) return;
        this.cache_player.forEach(my => {
            let xNew = my.pos.x;
            let yNew = my.pos.y;
            if(my.type === 'zone') return zoneOnMap(this,my);
            let sprite = this.getSprite(my.id);
            if(!sprite) return;

            if(my.type == 'mob') {
                if(my.info && my.info.chiso && my.info.chiso.hp <=0) {
                    sprite.visible = false;
                }
                else 
                {
                    if(sprite.visible == false) {
                        sprite.visible = true;
                    }
                }
            }

            let x = sprite.x;
            let y = sprite.y;

            let speed = my.info.coban.speed * delta;

            if((xNew != x || yNew != y) && (my.action.action == 'dungyen' || my.action.action == 'move')) {

                // sang phải
                if(xNew > x) {
                    my.action.move = 'right';
                    sprite.x += speed;
                    if(sprite.x > xNew) sprite.x = xNew;
                }else

                // sang trái
                if(xNew < x) {
                    my.action.move = 'left';
                    sprite.x -= speed;
                    if(sprite.x < xNew) sprite.x = xNew;
                }else

                // xuống dưới
                if(yNew > y) {
                    sprite.y += speed;
                    if(sprite.y > yNew) sprite.y = yNew;
                }
                else
                // lên trên
                if(yNew < y) {
                    sprite.y -= speed;
                    if(sprite.y < yNew) sprite.y = yNew;
                }
                this.action(my.id,'move');
            }
            else 
            {
                if(my.action.action == 'move') {
                    this.action(my.id,'dungyen');
                }
            }

        });
    }
}