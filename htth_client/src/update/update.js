import updateMap from "./map.js";
import taosong from "./skill/function/taosong.js";


export default class update extends updateMap {
    constructor() {
        super();
        this.timeDelta = 0;
        /*
        this.app.ticker.add((delta) => {
            this.app.ticker.minFPS = 120;

        }
        );
         */

        let ticker = new  PIXI.Ticker();
        ticker.minFPS = 120;
        ticker.update(1000/120);
        ticker.add((delta) => {
            this.update(delta);
        });
        ticker.start();











    }

    update = (delta) => {
        this.timeDelta = delta;
        this.updateAction(delta);
        this.updatePos(delta);
        this.moveSprite(delta);
        this.keomap(delta);
        this.updateChatMap(delta);
        this.updateClick(delta);
        this.updateMove(delta);
        this.updateRenderSkill(delta);
        this.updateSkill(delta);
        TWEEN.update();
        if(this.config.map === 1)
        {
            taosong(this,delta);
        }
        this.chipiView(delta);


    }

    updatePos = (delta) => {
        let sprite = this.getSprite(this.my.id);
        let fps = this.app.ticker.FPS;
        this.textVitri.text = Math.round(sprite.x) + ' - ' + Math.round(sprite.y)+' ('+Math.round(sprite.y + sprite.height)+') - '+Math.round(fps)+' FPS - '+Math.fround(delta).toFixed(2)+' ms '+this.number_format(this.countAllChild(this.main))+' - '+this.memoryUsed()+'mb ';
    }
}

