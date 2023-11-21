import mobImgScript from "./mobimg.js";


export default class mobSheet extends mobImgScript {
    constructor() {
        super();
    }

    createMobSheet = (action, my,delta) => {
        let script = my.data.script;
        let sprite = this.getSprite(my.id);
        if(sprite) {
            if(sprite.create == false) {
                let data = script.img;
                let src = data.src;

                let base_img = new PIXI.Sprite(this.coverImg(src));

                let width = base_img.width;
                let height = base_img.height;

                if(width != 1) {
                    sprite.create = true;

                    for(let nameAction in script.action) {
                        let name = nameAction;
                        let data_img = script.action[nameAction];
                        let farme = data_img.length;
                        let array = [];
                        let w = data.w;
                        let h = data.h;
                        let num = data.num;

                        let h_farme = height / num;

                        for(let i = 0; i < farme; i++) {
                            let x = 0;
                            let y = h_farme * data_img[i];
                            let img = new PIXI.Texture(base_img.texture, new PIXI.Rectangle(x, y, width, h_farme));
                            array.push(img);
                        }

                        let animation = new PIXI.AnimatedSprite(array);
                        animation.name = name;
                        animation.width = w;
                        animation.height = h;
                        if(name != 'dungyen') {
                            animation.visible = false;
                        }
                        animation.animationSpeed = 0.1;
                        if(name == 'dungyen' || name == 'move') {
                            animation.loop = true;
                            animation.play();
                        }
                        else 
                        {
                            animation.loop = false;
                        }

                        animation.onComplete = () => {
                            animation.visible = false;
                            this.action(my.id, 'dungyen')
                        }
                
                        sprite.oldAction = 'dungyen';
                        sprite.addChild(animation);
                    }

                }
            }
            else 
            {
                let action_old = sprite.oldAction || "dungyen";
                
                sprite.maxWdith = sprite.maxWdith ||  sprite.width;
                if(action != action_old) {
                    if(my.action.move == 'left') {
                        sprite.scale.x = 1;
                        sprite.pivot.x = 0;
                        sprite.huong = 'left';
                        if(action_old == 'move') {
                            // skew 
                            sprite.skew.x = 0.05;
                        }
                        else 
                        {
                            sprite.skew.x = 0;
                        }
                    }
                    else if(my.action.move == 'right') {
                        sprite.scale.x = -1;
                        if(sprite.huong != 'right') {
                            sprite.pivot.x = -sprite.width;
                        }
                        sprite.huong = 'right';
                        if(action_old == 'move') {
                            sprite.skew.x = -0.05;
                        }
                        else 
                        {
                            sprite.skew.x = 0;
                        }
                    }
    
                    if(sprite.huong == 'right') {
                        if(sprite.maxWdith >=1) sprite.maxWdith*=-1;
                    }

                    let animationOld = sprite.getChildByName(sprite.oldAction);
                    let animationNew = sprite.getChildByName(action);
                    if(animationOld) {
                        animationOld.visible = false;
                        animationOld.stop();
                    }
                    if(animationNew) {
                        animationNew.visible = true;
                        animationNew.play();
                    }
                    sprite.oldAction = action;
                }

                this.int_update_action_item(sprite, my, delta);


            }


        }
        else 
        {
            let sprite = new PIXI.Container();
            sprite.id = my.id;
            sprite.name = my.id;
            sprite.x = my.x;
            sprite.y = my.y;
            sprite.create = false;
            this.player.addChild(sprite);
        }
    }
}