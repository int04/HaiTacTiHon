import backgroundView from './background.js';

export default class animationView extends backgroundView {
    constructor() {
        super();
    }

    animation = (link,w,h,farme,speed = 0.1, loop = false) => {
        return this.createAnimation(link,w,h/farme,farme,speed,loop);
    }

    animationw = (link,w,h,num, numW,getI = 0, sort = []) => {
        let texturegoc = new PIXI.Sprite(this.coverImg(link));
        let array = [];
        const height = h/num;
        const width = w/numW;
        for (let i = 0; i < num; i++) {
            let texture = new PIXI.Texture(texturegoc.texture, new PIXI.Rectangle(width*getI, height*i, width, height));
            array.push(texture);
        }

        if(sort && sort.length > 0) {
            let array2 = [];
            sort.forEach((e) => {
                array2.push(array[e]);
            });
            array = array2;
        }

        let animatedSprite = new PIXI.AnimatedSprite(array);
        animatedSprite.animationSpeed = 0.3;
        animatedSprite.loop = false;
        return animatedSprite;
    }

    animationX = (link,w,h,farme,speed = 0.1, loop = false) => {
        w = w/farme;
        let texturegoc = new PIXI.Sprite(this.coverImg(link));
        let array = [];
        for (let i = 0; i < farme; i++) {
            let texture = new PIXI.Texture(texturegoc.texture, new PIXI.Rectangle(w*i, 0, w, h));
            array.push(texture);
        }
        let animatedSprite = new PIXI.AnimatedSprite(array);
        animatedSprite.animationSpeed = speed;
        animatedSprite.loop = loop;
        return animatedSprite;
    }

    createAnimation = (link,w,h,farme,speed = 0.1, loop = false) => {
        let texturegoc = new PIXI.Sprite(this.coverImg(link));
        let array = [];
        for (let i = 0; i < farme; i++) {
            let texture = new PIXI.Texture(texturegoc.texture, new PIXI.Rectangle(0, h*i, w, h));
            array.push(texture);
        }
        let animatedSprite = new PIXI.AnimatedSprite(array);
        animatedSprite.animationSpeed = speed;
        animatedSprite.loop = loop;
        return animatedSprite;
    }

    createAnimationArray = (list,speed = 0.1, loop = false,path = './assets/int04/') => {
        let array = [];
        list.forEach((e) => {
            let call = this.coverImg(e,path);
            let texturegoc = new PIXI.Sprite(call);
            array.push(call);
        });
        let animatedSprite = new PIXI.AnimatedSprite(array);
        animatedSprite.animationSpeed = speed;
        animatedSprite.loop = loop;
        return animatedSprite;
    }

    animationEvent = (animation, event = false) => {

        let click = 0;
        animation.interactive = true;
        animation.cursor = 'pointer';
        animation.on('pointerdown', () => {
            animation.gotoAndStop(1);
            click = Date.now();
            
        }
        );
        animation.on('pointerup', () => {
            animation.gotoAndStop(0);
            if (Date.now() - click < 200) {
                if(event) event();
            }
        }
        );
        animation.on('pointerupoutside', () => {
            animation.gotoAndStop(0);
        }
        );
        animation.on('pointerover', () => {
            animation.gotoAndStop(0);
        }
        );
        return animation;
    };

    cropImg = (url, x, y, w, h) => {
        let texturegoc = new PIXI.Sprite(this.coverImg(url));
        let texture = new PIXI.Texture(texturegoc.texture, new PIXI.Rectangle(x, y, w, h));
        return texture;
    }

    caculatorSpeed = (speed, x1, x2) => {
        let distance = Math.sqrt(Math.pow(x1 - x2, 2));
        let time = distance / speed;
        return time;
    }

    moveSpeed = (speed,children1, children2, graphic = TWEEN.Easing.Linear.None, callbackupdate = null, callbackfinsh = null) => {
        if(!graphic) graphic = TWEEN.Easing.Linear.None;
        let x1 = children1.x;
        let y1 = children1.y;
        let x2 = children2.x;
        let y2 = children2.y;
        let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        let time = distance / speed;
        let twen =  new TWEEN.Tween(children1)
        .to({x : x2, y : y2}, time)
        .easing(graphic)
        .start().
        onUpdate(() => {
            if(callbackupdate) callbackupdate();
        }
        )
        .onComplete(() => {
            if(callbackfinsh) callbackfinsh();
        }
        );
        return twen;
    }

    move = (children, to, time, graphic = TWEEN.Easing.Back.Out, callbackupdate = null, callbackfinsh = null,children_to = false) => {
        if(!graphic) graphic = TWEEN.Easing.Back.Out;
        let twen =  new TWEEN.Tween(children)
        .to(to, time)
        .easing(graphic)
        .start(). 
        onUpdate(() => {
            
            if(callbackupdate) callbackupdate();
        })
        .onComplete(() => {
            if(callbackfinsh) callbackfinsh();
        });
        return twen;
    }

}