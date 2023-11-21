import insertCacheMob from "./mob.js";

export default class spriteViewCreate extends insertCacheMob {
    constructor() {
        super();
    }

    created_sprite_skin_hi = (my = null,action = 'dungyen') => {
        if(!my) my = this.my;
        let nhanvat = new PIXI.Container();
        nhanvat.name = my.id;
        nhanvat.id = my.id;

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


        let lung = new PIXI.Sprite(this.coverImg(src_lung[action].src[0]));
        lung.name = 'lung';
        lung.scale.set(0.5);
        lung.x = 

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

        nhanvat.addChild(tay);


        ao.x = src_ao[action].x;
        ao.y = src_ao[action].y;
        quan.x = src_quan[action].x; 
        quan.y = src_quan[action].y;

        tay.x = src_tay[action].x;
        tay.y = src_tay[action].y;

        toc.x = src_toc[action].x;
        toc.y = src_toc[action].y;

        non.x = src_non[action].x;
        non.y = src_non[action].y;

        lung.x = src_lung[action].x;
        lung.y = src_lung[action].y;

        dau.xy = 0;

        let time = setInterval(() => {
            if(this.box.children.length <= 0) {
                clearInterval(time);
            }
            else 
            {
                if(dau.xy ==0) {
                    dau.y+=1;
                    ao.y+=1;
                    lung.y+=1;
                    tay.y+=1;
                    toc.y+=1;
                    non.y+=1;
                    dau.xy = 1;
                }
                else 
                {
                    dau.y -=1;
                    ao.y -=1;
                    ao.first = 0;
                    dau.xy = 0;
                    lung.y -=1;
                    tay.y -=1;
                    toc.y -=1;
                    non.y -=1;

                }
            }
        }, 200);

        return nhanvat;
    }


    create_sprite_ctg = (my = null,action = 'dungyen') => {
        if(!my) my = this.my;
        let nhanvat = new PIXI.Container();
        nhanvat.name = my.id;
        nhanvat.id = my.id;

        let skin = my;


        let idSheet = my.id;

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


        let lung = new PIXI.Sprite(this.coverImg(src_lung[action].src[0]));
        lung.name = 'lung';
        lung.scale.set(0.5);
        lung.x =

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

        nhanvat.addChild(tay);


        ao.x = src_ao[action].x;
        ao.y = src_ao[action].y;
        quan.x = src_quan[action].x;
        quan.y = src_quan[action].y;

        tay.x = src_tay[action].x;
        tay.y = src_tay[action].y;

        toc.x = src_toc[action].x;
        toc.y = src_toc[action].y;

        non.x = src_non[action].x;
        non.y = src_non[action].y;

        lung.x = src_lung[action].x;
        lung.y = src_lung[action].y;

        dau.xy = 0;

        let time = setInterval(() => {
            let chat_the_gioi = this.button.getChildByName("chat_the_gioi");
            if(!chat_the_gioi || chat_the_gioi.children.length <=0 || chat_the_gioi.visible == false) {
                clearInterval(time);
            }
            else
            {
                if(dau.xy ==0) {
                    dau.y+=1;
                    ao.y+=1;
                    lung.y+=1;
                    tay.y+=1;
                    toc.y+=1;
                    non.y+=1;
                    dau.xy = 1;
                }
                else
                {
                    dau.y -=1;
                    ao.y -=1;
                    ao.first = 0;
                    dau.xy = 0;
                    lung.y -=1;
                    tay.y -=1;
                    toc.y -=1;
                    non.y -=1;

                }
            }
        }, 200);
        this.cache_event.push([
            'chatthegioi',
            time
        ]);

        return nhanvat;
    }
}