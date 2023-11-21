import baseViewItem from "./viewItem.js";


export default class baseShowInfoItem extends baseViewItem
{
    constructor() 
    {
        super();
    }

    showItem = (o,data) => {
        o.name = "item_"+data.id;
        let item = this.item.find(e => e.id == data.item);
        if(!item) {
            this.notice('Có lỗi xẩy ra');
            return o;
        }
        let o_w = o.width;
        let o_h = o.height;

        let phamchat = 1;
        phamchat = data.phamchat || 0;
        let _back = [0,0,0x20B2AA,0x8B658B,0xFF7F24];
        if(item.type =='item') phamchat = item.phamchat;
        let color_background = _back[phamchat];

        let background = new PIXI.Graphics();
        background.beginFill(color_background);
        background.drawRect(0, 0, o_w, o_h);
        background.endFill();
        o.addChild(background);
        if(phamchat <=1) background.visible = false;

        let img = item.img;
        let src = img.src;
        let num_farme = img.num;
        let sprite;
        if(num_farme >1) {
            let array = [];
            let width = 80;
            let height = 80;
            let texture_goc = new PIXI.Sprite(this.coverImg(src));
            for(let i = 0; i < num_farme; i++) {
                let texture = new PIXI.Texture(texture_goc.texture, new PIXI.Rectangle(0, i*height, width, height));
                array.push(texture);
            }
            sprite = new PIXI.AnimatedSprite(array);
            sprite.animationSpeed = 0.15;
            sprite.play();
        }
        else 
        {
            sprite = new PIXI.Sprite(this.coverImg(src));
        }
        
        sprite.width = o_w * 0.8;
        sprite.height = o_h * 0.8;
        sprite.x = (o_w - sprite.width)/2;
        sprite.y = (o_h - sprite.height)/2;
        o.addChild(sprite);

        if(item.type === 'trangbi') {
            // hiển thị các lỗ khảm
            if(data.lo && typeof  data.lo === 'object') {
                for(let j = 0; j <data.lo.length; j++) {
                    let k = j;
                     let getID = data.lo[j];
                     if(getID === 0 || getID === -1) continue;
                     let getIndex = 0;
                     let checked = this.item.find(e => e.id === getID);
                     if(checked && checked.type === 'item' && checked.type2 === 'dakham' && checked.sheet) {
                            getIndex = checked.sheet;
                     }
                     let animation = this.animationw('24220',324,144,4,9,getIndex);
                    animation.loop = true;
                    animation.speed = 0.5;
                    animation.play();
                    animation.width = sprite.width * 0.4;
                    animation.height = sprite.height * 0.4;
                    if(j < 2) {
                        animation.x = (k * animation.width);
                        animation.y = 0;
                    }
                    else {
                        k -=2;
                        animation.x = o_w - (k * animation.width) - animation.width;
                        animation.y = o_h - animation.height
                    }
                    o.addChild(animation);
                }
            }
        }

        if(item.type == 'item') {
            let background_soluong = new PIXI.Graphics();
            background_soluong.beginFill(0x000000,0.5);
            let w = o_w * 0.5;
            let h = o_h * 0.3;
            background_soluong.drawRoundedRect(0, 0, w, h, 10);
            background_soluong.endFill();
            background_soluong.x = (o_w - w)/2;
            background_soluong.y = o_h - h;
            o.addChild(background_soluong);
            let soluong_txt = new PIXI.Text(data.soluong, {fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'right', fontWeight: 'bold'});
            soluong_txt.style.stroke = '#564d00';
            soluong_txt.style.strokeThickness = 4;

            soluong_txt = this.fontSize(soluong_txt,background_soluong);
            soluong_txt.name = "quantity_"+data.id;
            soluong_txt.x = (background_soluong.width )/2 - soluong_txt.width*0.2;
            soluong_txt.y = (background_soluong.height - soluong_txt.height)/2;
            background_soluong.addChild(soluong_txt);
        }

        let level = 0;
        if(data.level <=0) level = 0;
        if(data.level >=1 && data.level <=3) level = 1;
        if(data.level >3 && data.level <=5) level = 2;
        if(data.level >5 && data.level <=8) level = 3;
        if(data.level >= 9) level = 4;

        let o_level = [0,0x9AC0CD,0x54FF9F,0xFF1493,0xCD0000];
        let o_level_run = [0,0x68838B,0x2E8B57,0x8B0A50,0x8B0000];

        if(level >=1) {
            let border = new PIXI.Graphics();
            border.lineStyle(1, o_level[level], 1); // Định nghĩa linestyle (độ rộng, màu, alpha)
            border.drawRect(0, 0, o_w, o_h);
            border.endFill();
            o.addChild(border);
    
            let point1 = new PIXI.Graphics();
            point1.beginFill(o_level_run[level]);
            point1.drawCircle(0, 0, 2);
            point1.endFill();
            point1.x = 0;
            point1.y = 0;
            border.addChild(point1);
    
            let point2 = new PIXI.Graphics();
            point2.beginFill(o_level_run[level]);
            point2.drawCircle(0, 0, 2);
            point2.endFill();
            point2.x = 0;
            point2.y = 0;
            border.addChild(point2);
            
            let movePoint1_Y = () => {
                TweenMax.to(point1, 1, {
                    y: o_h,
                    onComplete: movePoint1_X,
                    onUpdate : () => {
                      // stop tween
                    },
                    ease: Linear.easeNone,
                });
            }
    
            let movePoint1_X = () => {
                point1.x = 0;
                point1.y = 0;
                TweenMax.to(point1, 1, {
                    x: o_w,
                    onComplete: movePoint1_Y,
                    ease: Linear.easeNone,
                });
            }
    
            let movePoint2_X = () => {
                TweenMax.to(point2, 1, {
                    x : o_w,
                    onComplete: movePoint2_Y,
                    ease: Linear.easeNone,
                });
            }
    
            let movePoint2_Y = () => {
                point2.x = 0;
                point2.y = 0;
                TweenMax.to(point2, 1, {
                    y : o_h,
                    onComplete: movePoint2_X,
                    ease: Linear.easeNone,
                });
            }
    
        
            movePoint1_X();
            movePoint2_Y();
        }
        
        return o;
    }
}