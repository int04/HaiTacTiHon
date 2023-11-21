import mobSheet from "./mobsheet.js";

export default class updateNPC extends mobSheet {
    constructor() {
        super();
    }

    npcIsChat(Player, mmo) {
        Player.npcChat = Player.npcChat || 0;

        
        if(Player.npcChat < Date.now()  && this.Chat.children.findIndex(e => e.uid == Player.id) == -1 ) {
            if(mmo.chat.length >= 1) {
                let listnoidung = mmo.chat;

                let lay;
                if(Player.lamtho >=0) 
                {
                    lay = listnoidung[Player.lamthoID];
                    lay = lay[Player.lamtho];
                    Player.lamtho += 1;
                    Player.npcChat = Date.now() + 1000;


                    if(lay == undefined) 
                    {
                        Player.lamtho = -1;
                        Player.lamthoID = -1;
                        Player.npcChat = Date.now() + (mmo.delaychat * 1);
                        return false;
                    }
                }
                else 
                {
                    let i = this.rand(0, listnoidung.length - 1);
                    lay = listnoidung[i];
                    if(typeof lay == 'object') {
                        lay = lay[0];
                        Player.lamtho = 1;
                        Player.lamthoID = i;
                    }
                    Player.npcChat = Date.now() + (mmo.delaychat * 1);

                }


                
                this.ioInsertChat({
                    _1: mmo.id,
                    _2: lay
                })
            }
        } else {}

        


    }



    isNpcSheet = (my, delta) => {
        let id = my.id; 
        let sprite = this.getSprite(id);
        if(sprite) {
            if(sprite.create == false) {
                let getImg = new PIXI.Sprite(this.coverImg(my.script.src));
                let width = getImg.width;
                let height = getImg.height;
                if(width !=1) {
                    sprite.create = true;
                    let x = my.pos[0];
                    let y = my.pos[1];
                    let num_sprite = my.script.set[0];
                    let w = my.script.set[1];
                    let h = my.script.set[2];

                    let w_farme = width;
                    let h_farme = height / num_sprite;
                    let array = [];

                    for(let i = 0; i < num_sprite; i++) {
                        let texture = new PIXI.Texture(getImg.texture, new PIXI.Rectangle(0, i * h_farme, w_farme, h_farme));
                        array.push(texture);
                    }

                    let animation = new PIXI.AnimatedSprite(array);
                    animation.animationSpeed = 0.1;
                    animation.play();
                    animation.width = w;
                    animation.height = h;

                    sprite.x = x;
                    sprite.y = y - h;
                    
                    sprite.maxWdith = w;

                    let caibong = new PIXI.Sprite(this.coverImg('x2Main_Image_interface_shadow'));
                    caibong.name = "caibong";
                    caibong.width = 52;
                    caibong.height = 20;
                    sprite.addChild(caibong);
                    caibong.x = Math.abs(w/2) - caibong.width/2;
                    caibong.y = h - caibong.height/2;

            
                    sprite.addChild(animation);

                }
            }
            this.int_update_action_item(sprite,my, delta);

        }
        else 
        {
            let newsprite = new PIXI.Container();
            newsprite.id = id;
            newsprite.type = "npc";
            newsprite.name = my.id;
            newsprite.create = false;
            this.player.addChild(newsprite);
        }
    }
}