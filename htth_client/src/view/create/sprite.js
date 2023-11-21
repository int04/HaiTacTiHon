import spriteViewCreate from "./spriteView.js";


export default class SpriteCreate extends spriteViewCreate {
    constructor() {
        super();
    }

    create_sprite_my = (my = null) => {
        if(!my) my = this.my;
        this.deleteSprite(my.id);
        let cache_player =  this.getMy(my.id);
        if(!cache_player) {
            console.log('đẩy r')
            this.cache_player.push(my);
        }
        let nhanvat = new PIXI.Container();
        nhanvat.name = my.id;
        nhanvat.id = my.id;
        this.player.addChild(nhanvat);

        let skin = my.skin;


        let idSheet = my.skin.id;
        
        if(idSheet && idSheet.length >=1) {
            let list = this.getidSprite(idSheet);
            list.forEach(element => {
                if(my.skin[element.type]) {
                    my.skin[element.type] = element.name;
                }
            });
        }

        let src_lung = this.getImg(skin.lung); 
        let src_quan = this.getImg(skin.quan);
        let src_ao = this.getImg(skin.ao);
        let src_tay = this.getImg(skin.tay);
        let src_dau = this.getImg(skin.dau);
        let src_toc = this.getImg(skin.toc);
        let src_non = this.getImg(skin.non);

        let action = 'dungyen';

        let caibong = new PIXI.Sprite(this.coverImg('x2Main_Image_interface_shadow'));
        caibong.name = "caibong";
        caibong.width = 52;
        caibong.height = 20;
        nhanvat.addChild(caibong);

        let lung = new PIXI.Sprite(this.coverImg(src_lung[action].src[0]));
        lung.name = 'lung';
        lung.scale.set(0.5);

        nhanvat.addChild(lung);

        let quan = new PIXI.Sprite(this.coverImg(src_quan[action].src[0]));
        quan.name = 'quan';
        quan.scale.set(0.4);
        nhanvat.addChild(quan);

        let ao = new PIXI.Sprite(this.coverImg(src_ao[action].src[0]));
        ao.name = 'ao';
        nhanvat.addChild(ao);
        ao.scale.set(0.5);

        let tay = new PIXI.Sprite(this.coverImg(src_tay[action].src[0]));
        tay.name = 'tay';
        tay.scale.set(0.5);

        let dau = new PIXI.Sprite(this.coverImg(src_dau[action].src[0]));
        dau.name = 'dau';
        nhanvat.addChild(dau);
        dau.scale.set(0.5);

        let toc = new PIXI.Sprite(this.coverImg(src_toc[action].src[0]));
        toc.name = 'toc';
        nhanvat.addChild(toc);
        toc.scale.set(0.5);

        let non = new PIXI.Sprite(this.coverImg(src_non[action].src[0]));
        non.name = 'non';
        nhanvat.addChild(non);
        non.scale.set(0.5);

        let pos = my.pos;
        nhanvat.x = pos.x;
        nhanvat.y = pos.y;
        nhanvat.addChild(tay);


        this.action(my.id,'dungyen');

    }
}