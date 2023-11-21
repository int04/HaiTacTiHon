import updateClick from "./click.js";



export default class update_action_item extends updateClick {
    constructor() {
        super();
    }

    int_update_action_item = (sprite,getmy, delta) => {
        if(getmy.type === 'npc') {
            this.npcIsChat(sprite, getmy)
        }


        sprite.createEvent = sprite.createEvent || false;
        if(!sprite.createEvent) {
            sprite.createEvent = true;
            sprite.interactive = true;
            sprite.cursor = 'pointer';
        }
        sprite.dadi = sprite.dadi || 0;
        sprite.dadiy = sprite.dadiy || 0;
        sprite.sea = sprite.sea || false;

        let khoangcach = 50;

        if(getmy.action && getmy.action.action === 'move' && getmy.type === 'player' && this.config.map === 0) {

            if(Math.abs(sprite.x - sprite.dadi) >= khoangcach || Math.abs(sprite.y - sprite.dadiy) >= khoangcach ) {
                sprite.dadi = sprite.x;
                sprite.dadiy = sprite.y;
                this.setSkill({
                    from : sprite.id,
                    type : 'move'
                })
            }
        }
        if(getmy.action && getmy.type === 'player' && this.config.map === 1) {
            // cấu hình map biển
            this.action(getmy.id,'dungyen');
            this.setSkill({
                from : sprite.id,
                type : 'sea',
                id : 'sea_'+sprite.id,
            })
            if(Math.abs(sprite.x - sprite.dadi) >= khoangcach || Math.abs(sprite.y - sprite.dadiy) >= khoangcach ) {
                sprite.dadi = sprite.x;
                sprite.dadiy = sprite.y;
                sprite.sea = true;
            }
        }
    
        let item = this.playerItem.getChildByName(sprite.name);
        if(!item) {
            item = new PIXI.Container();
            item.name = sprite.name;
            this.playerItem.addChild(item);
        }
        item.x = sprite.x;
        item.y = sprite.y;
        item.visible = sprite.visible;


        

        let caibong  = item.getChildByName("caibong");
        if(!caibong) {
            let animation = new PIXI.Sprite(this.coverImg('x2Main_Image_interface_shadow'));
            animation.name = "caibong";
            item.addChild(animation);
        }
        else {
            sprite.maxWdith = sprite.maxWdith || sprite.width;
            sprite.maxHeight = sprite.maxHeight || sprite.height;
            caibong.width = 52;
            caibong.height = 20;
            caibong.x = Math.abs(sprite.maxWdith/2) - caibong.width/2;
            caibong.y = 0 + sprite.maxHeight - caibong.height/2;
            caibong.visible = false;
        }

    
        let showName = item.getChildByName("showName");
        if(!showName) {

            let color = 0xFFFFFF;
            if(getmy.type === 'npc') color = 0xfbfd3b;
            if(getmy.type === 'mob' && getmy.data && getmy.data.type === 'boss') color = 0xff0000;

            showName = new PIXI.Text(getmy.name,{fontFamily : 'Arial', fontSize: 15, fill : color, align : 'left', fontWeight : 'bold'});
            showName.name = "showName";
            item.addChild(showName);
            showName.resolution = 2;
            showName.style.stroke = '#000000';
            showName.style.strokeThickness = 4;

        }
        else 
        {
        
            showName.x = Math.abs(sprite.maxWdith/2) - showName.width/2;
            showName.y = 0 - 50;
            sprite.loadname = 0;
            if(getmy.type === 'mob') showName.visible = false;
            if(getmy.type === 'mob' && getmy.data && getmy.data.type === 'boss') showName.visible = true;
        }

        if(getmy.type !== 'npc' && getmy.id !== this.my.id) {
            let bar_hp = item.getChildByName("bar_hp");
            if(!bar_hp) {
                let width = 50;
                let height = 10;
                bar_hp = new PIXI.Graphics();
                bar_hp.name = "bar_hp";
                bar_hp.beginFill(0x000000);
                bar_hp.drawRect(0, 0, width, height);
                bar_hp.endFill();
                bar_hp.x = 0;
                bar_hp.y = showName.y + showName.height + 5;
                item.addChild(bar_hp);
    
                let bar_full = new PIXI.Graphics();
                bar_full.name = "bar_full";
                bar_full.beginFill(0xCC3300);
                bar_full.drawRect(0, 0, width, height);
                bar_full.endFill();
                bar_full.x = 0;
                bar_full.y = 0;
                bar_hp.addChild(bar_full);
            }
            else 
            {
                let info = getmy.info;
                if(info) {
                    let chiso = info.chiso;
                    if(chiso) {
                        let hp = chiso.hp;
                        let hpmax = chiso.hpmax;
                        hp = hp > hpmax ? hpmax : hp;
                        hp = hp < 0 ? 0 : hp;
                        let percent = hp/hpmax;
                        let bar_full = bar_hp.getChildByName("bar_full");
                        bar_full.width = bar_hp.width * percent;
                        bar_hp.y = showName.y + showName.height + 5;
                        bar_hp.x = Math.abs(sprite.maxWdith/2) - bar_hp.width/2;
                    }
                }
            }

            if(this.click == getmy.id) {
                bar_hp.visible = true;
            }
            else 
            {
                bar_hp.visible = false;
            }
        }


        let preclick = item.getChildByName("preclick");
        if(!preclick) {
            let base_sprite = new PIXI.Sprite(this.coverImg("x2Main_Image_interface_iconfocus"));
            let array = [];
            let num = 7;
            let width = 28;
            let height = 196/num;
            for(let i = 0; i < num; i++) {
                let texture = new PIXI.Texture(base_sprite.texture, new PIXI.Rectangle(0, i*height, width, height));
                array.push(texture);
            }

            // animation
            let animation = new PIXI.AnimatedSprite(array);
            animation.name = "preclick";
            animation.animationSpeed = 0.3;
            animation.play();
            item.addChild(animation);
        }
        else 
        {
            preclick.x = showName.x + showName.width/2 - preclick.width/2;
            preclick.y = showName.y - preclick.height;
            if(this.click === getmy.id) {
                preclick.visible = true;
            }
            else 
            {
                preclick.visible = false;
            }
        }

    }

}