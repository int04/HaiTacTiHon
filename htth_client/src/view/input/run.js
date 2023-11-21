import  inputMain from "./input.js";
export default class inputRun extends inputMain {
    constructor() {
        super();
        this.timeMove = 0;
    }
    updateMoveToSocket = (x,y) => {
        x = Math.round(x);
        y = Math.round(y);
        return this.send(-3,[x,y]);
    }

    getBlock = (sprite,key,speed) => {
        let list = this.map.children.filter(e => e.type == 'camdi');
        let block = null;

        
        let list2 = [];
        for(let i = 0; i < list.length; i++) {
            let e = list[i];
            let my = sprite.getBounds();
            let ob = e.getBounds();

            
            if(this.collideMove(sprite,e,key,speed)) {
                list2.push(e);
            }
        }

        let doituong = [];

        if(list2.length > 0) {
            let me = sprite.getBounds();
            
            for(let i = 0; i < list2.length; i++) {
                let e = list2[i];
                let ob = e.getBounds();
                
                if(key  == 'down') {
                    if(me.y + me.height < ob.y + ob.height/2) {
                        doituong.push(e);
                    }
                }

                if(key  == 'up') {
                    if(me.y + me.height > ob.y + ob.height/2) {
                        doituong.push(e);
                    }
                }

                if(key == 'right') {
                    if(me.x + me.width < ob.x + ob.width/2) {
                        if(me.y + me.height  < ob.y ) {
                        }
            
                        
                        else
                        {
                            doituong.push(e);

                        }                        
                    }
                }

                if(key == 'left'){
                    if(me.x - me.width < ob.x + ob.width) {
                        if(me.y + me.height  < ob.y ) {
                        }
                        else 
                        if(me.x + me.width/2 < ob.x + ob.width/2) {
                        }
                        
                        
                        else
                        {
                            doituong.push(e);

                        }                        
                    }
                }

            }
        }

        if(doituong.length >=1) return true;

        return block;
    }

    
    
    moveSprite =(delta) => {
        if(this.my.id <=0) return;
        let key = this.keypress;
        /* 
            38 => up
            40 => down
            37 => left
            39 => right
        */

        let sprite, spriteItem, my, speed;

        if(key[38] || key[40] || key[37] || key[39]) {
            if(this.isDi() === false) return false;
            sprite = this.getSprite(this.my.id);
            spriteItem = this.getSpriteItem(this.my.id);
            my = this.getMy(this.my.id);
            speed = my.info.coban.speed;
        }

        if(key[38]) {

            let block = this.getBlock(sprite,'up',speed * delta);
            if(block == null) {
                // use TWEEN.Easing for move

                sprite.y -= speed * delta;
                spriteItem.y -= speed * delta;
                
                



            }
            else 
            {
                
            }

        }
        if(key[40]) {
            let block = this.getBlock(sprite,'down',speed * delta);
            if(block == null) {
                sprite.y += speed * delta;
                spriteItem.y += speed * delta;
            }
            
        }
        if(key[37]) {
            let block = this.getBlock(sprite,'left',speed * delta);
            if(block == null) {
                sprite.x -= speed * delta;
                spriteItem.x -= speed * delta;
                my.action.move = 'left';
            }
        }
        if(key[39]) {
            let block = this.getBlock(sprite,'right',speed * delta);
            if(block == null) {
                sprite.x += speed * delta;
                spriteItem.x += speed * delta;
                my.action.move = 'right';
            }
        }

        if(key[38] || key[40] || key[37] || key[39]) {
            this.action(this.my.id,'move');
            if(this.timeMove < Date.now()) {
                this.timeMove = Date.now() + 500;
                this.updateMoveToSocket(sprite.x,sprite.y);
            }
        }


    }
}