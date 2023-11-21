import cache from './cache.js';

export default class backgroundView extends cache {
    constructor() {
        super();
    }

    createBackGroundGame = () => {
        let background = new PIXI.Container();
        let width = this.gameWidth;
        let height = this.gameHeight;


        let chantroi=  new PIXI.Container();
        background.addChild(chantroi);

        let chantroi_w = 418;
        let chantroi_h = 80;

        let chan_troi_need = Math.ceil(width/chantroi_w) * 2;
        for(let i = 0; i < chan_troi_need; i++){
            let chan_troi = new PIXI.Sprite(PIXI.Texture.from("./assets/map/chantroi/x2Main_Image_bg_b21.png"))
            chan_troi.x = i * chantroi_w;
            chantroi.addChild(chan_troi);
        }

        chantroi.y = height * 0.1;

        TweenMax.to(chantroi, 50, {x: -chantroi_w, repeat: -1, ease: Linear.easeNone})

        let bien = new PIXI.Container();
        background.addChild(bien);

        let bien_w = 96;
        let bien_h = 96;
        let bien_need = Math.ceil(width/bien_w);
        for(let i = 0; i < bien_need; i++){
            let bien1 = new PIXI.Sprite(PIXI.Texture.from("./assets/map/dat/23020_0_8.png"));
            let bien2 = new PIXI.Sprite(PIXI.Texture.from("./assets/map/dat/23020_0_9.png"));
            let bien3 = new PIXI.Sprite(PIXI.Texture.from("./assets/map/dat/23023_3_6.png"));
            let bien_troi = new PIXI.AnimatedSprite([bien1.texture, bien2.texture, bien3.texture]);
            bien_troi.animationSpeed = 0.1;
            bien_troi.play();
            bien_troi.x = i * bien_w;
            bien.addChild(bien_troi);
        }
        bien.y = height * 0.1 + chantroi_h;

        let bobien = new PIXI.Container();
        background.addChild(bobien);
        let bobien_w = 48;
        let bobien_h = 48;
        let bobien_need = Math.ceil(width/bobien_w) ;
        for(let i = 0; i < bobien_need; i++){
            let bobien0 = new PIXI.Sprite(PIXI.Texture.from("./assets/map/dat/23020_0_7.png"));
            let bobien1 = new PIXI.Sprite(PIXI.Texture.from("./assets/map/dat/23070_0_0.png"));
            let bobien2 = new PIXI.Sprite(PIXI.Texture.from("./assets/map/dat/23070_0_3.png"));
            let bobienx = new PIXI.AnimatedSprite([bobien1.texture, bobien2.texture]);
            bobienx.animationSpeed = 0.05;
            bobienx.play();
            bobienx.width = bobien_w;
            bobienx.height = bobien_h;
            bobienx.x = i * bobien_w;
            bobien.addChild(bobienx);
        }
        bobien.y = height * 0.1 + chantroi_h + bien_h;


        let heightCon = height * 0.1 + chantroi_h + bien_h + bobien_h;
        let dat_w = 48;
        let dat_h = 48;
        let dat_need_x = Math.ceil(width/dat_w);
        let dat_need_y = Math.ceil((height - heightCon)/dat_h);
        let dat = new PIXI.Container();
        background.addChild(dat);
        for(let i = 0; i < dat_need_x; i++){
            for(let j = 0; j < dat_need_y; j++){
                let dat1 = new PIXI.Sprite(PIXI.Texture.from("./assets/map/dat/23020_0_"+this.rand(5,6)+".png"));
                dat1.width = dat_w;
                dat1.height = dat_h;
                dat1.x = i * dat_w;
                dat1.y = j * dat_h + heightCon;
                dat.addChild(dat1);
            }
        }


        let caydua = new PIXI.Sprite(PIXI.Texture.from("./assets/map/caycoi/5.png"));
        caydua.x = 0;
        caydua.name = "caydua"
        caydua.scale.set(0.5);
        caydua.y = heightCon - 200;
        background.addChild(caydua);

        let caydua2 = new PIXI.Sprite(PIXI.Texture.from("./assets/map/caycoi/5.png"));
        caydua2.x = width ;
        caydua2.name = "caydua2"
        caydua2.scale.set(0.5);
        caydua2.scale.x = -0.5;
        caydua2.y = heightCon - 200;
        background.addChild(caydua2);






        return background;
    }
}