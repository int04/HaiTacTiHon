import updateNPC from "./sprite/npc.js";


export default class actionUpdate extends updateNPC {
    constructor() {
        super();
    }

    updateAction = (delta) => {

        // tạo hiệu ứng khi nhân vật đứng sau.
        this.player.children.sort((a, b) => {
            return a.y - b.y;
        });
        

        this.cache_action.forEach(element => {
            let action_old = element.action;
            let action = element.action;
            let id = element.id;
            let my = this.getMy(id);
            if(my && my.type === 'mob' && my.data && my.data.script && my.data.script.type && my.data.script.type === 'sheet') {
                this.createMobSheet(action,my,delta);
            }
            else
            if(my && my.type === 'npc' && my.script && my.script.type && my.script.type === 'sheet') {
                this.isNpcSheet(my, delta);
            }
            else
            
            if(my && (my.type === 'player' || (my.type === 'npc' && my.script && my.script.type && my.script.type === 'img') || (my.type === 'mob' && my.data && my.data.script && my.data.script.type && my.data.script.type === 'img')  )) {
                let sprite = this.getSprite(id);
                if(sprite) {
                    this.int_update_action_item(sprite, my, delta);
                    sprite.f5 = sprite.f5 || 0;
                    sprite.old = sprite.old || 'dungyen';
                    if(sprite.old !== action) {
                        sprite.f5 = 1;
                        sprite.old = action;
                    }

                    
                    // check delta 
                    
                    let dau = sprite.getChildByName('dau');
                    let ao = sprite.getChildByName('ao');
                    let quan = sprite.getChildByName('quan');
                    let toc = sprite.getChildByName('toc');
                    let non = sprite.getChildByName('non');
                    let lung = sprite.getChildByName('lung');
                    let tay = sprite.getChildByName('tay');
                    let caibong = sprite.getChildByName('caibong');
                    let skin = my.skin;
                    if(skin === undefined) return;

                    let quan_data = this.getImg(skin.quan);
                    let ao_data = this.getImg(skin.ao);
                    let toc_data = this.getImg(skin.toc);
                    let non_data = this.getImg(skin.non);
                    let lung_data = this.getImg(skin.lung);
                    let tay_data = this.getImg(skin.tay);
                    let dau_data = this.getImg(skin.dau);

                    // tạo cái bóng
                    if(caibong) {
                        caibong.x = Math.abs(quan.width/2) - caibong.width/2;
                        caibong.y = quan.y + quan.height - caibong.height/2;
                    }
                    // endcode


                    sprite.move = sprite.move || 1;
                    

                    if(action_old === 'move') {
                        action = action + sprite.move;
                        ao.first = 4;
                        if(this.config.map === 1) {
                            action = 'dungyen';
                        }
                    }

                    let thoigian = 22/ 4; // time và frame
                    sprite.elapsedTime = sprite.elapsedTime || 0;

                    sprite.elapsedTime += delta;
                    if(sprite.elapsedTime >= thoigian) {
                        sprite.elapsedTime = 0;
                        sprite.move+=1;
                        if(sprite.move >=5) sprite.move = 1;

                        
                    }


                    if(sprite.f5 === 1) {
                        ao.first = 2;
                        sprite.f5 = 0;
                    }


                    dau.xy = dau.xy || 0;
                    quan.time = quan.time || 0;
                    quan.num = quan.num || 0;

                    if(quan.num >= quan_data[action].src.length) quan.num = 0;
                    quan.texture = this.coverImg(quan_data[action].src[quan.num]);
                    
                    ao.num = ao.num || 0;
                    if(ao.num >= ao_data[action].src.length) ao.num = 0;
                    ao.texture = this.coverImg(ao_data[action].src[ao.num]);
                    ao.first = ao.first || 0;
                    tay.num = tay.num || 0;
                    if(tay.num >= tay_data[action].src.length) tay.num = 0;
                    tay.texture = this.coverImg(tay_data[action].src[tay.num]);
                    toc.num = toc.num || 0;
                    if(toc.num >= toc_data[action].src.length) toc.num = 0;
                    toc.texture = this.coverImg(toc_data[action].src[toc.num]);
                    non.num = non.num || 0;
                    if(non.num >= non_data[action].src.length) non.num = 0;
                    non.texture = this.coverImg(non_data[action].src[non.num]);
                    lung.num = lung.num || 0;
                    if(lung.num >= lung_data[action].src.length) lung.num = 0;
                    lung.texture = this.coverImg(lung_data[action].src[lung.num]);
                    dau.num = dau.num || 0;
                    if(dau.num >= dau_data[action].src.length) dau.num = 0;
                    dau.texture = this.coverImg(dau_data[action].src[dau.num]);


                    if(ao.first != 1)
                    {
                        dau.x = dau_data[action].x;
                        dau.y = dau_data[action].y;
                        ao.x = ao_data[action].x;
                        ao.y = ao_data[action].y;
                        quan.x = quan_data[action].x; 
                        quan.y = quan_data[action].y;
        
                        tay.x = tay_data[action].x;
                        tay.y = tay_data[action].y;
        
                        toc.x = toc_data[action].x;
                        toc.y = toc_data[action].y;
        
                        non.x = non_data[action].x;
                        non.y = non_data[action].y;
        
                        lung.x = lung_data[action].x;
                        lung.y = lung_data[action].y;
                        ao.first = 1;
                    }

                    if(action_old !== 'move' && action_old !== 'dungyen') {

                        toc.x = toc_data[action].x-2;
                        toc.y = toc_data[action].y;


                    }



                    quan.estime = quan.estime || 0;
                    let farme = 30/4;
                    quan.estime += delta;
                    if(quan.estime >= farme) {
                        quan.num++;
                        ao.num++;
                        tay.num++;
                        toc.num++;
                        non.num++;
                        lung.num++;
                        dau.num++;
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
                        quan.estime = 0;
                    }

                    my.action.move = my.action.move || 'left';


                    if(my.action.move === 'left') {
                        sprite.scale.x = 1;
                        sprite.pivot.x = 0;
                        sprite.huong = 'left';
                        if(action_old === 'move') {
                            // skew 
                            sprite.skew.x = 0.05;
                        }
                        else 
                        {
                            sprite.skew.x = 0;
                        }
                    }
                    else if(my.action.move === 'right') {
                        sprite.scale.x = -1;
                        if(sprite.huong !== 'right') {
                            sprite.pivot.x = -sprite.width/2;
                        }
                        sprite.huong = 'right';
                        if(action_old === 'move') {
                            sprite.skew.x = -0.05;
                        }
                        else 
                        {
                            sprite.skew.x = 0;
                        }
                    }
    
                    if(action_old === 'dungyen' ) {
                        sprite.maxWdith = sprite.width;
                        sprite.maxHeight = sprite.height;
    
                        if(sprite.huong === 'right') {
                            if(sprite.maxWdith >=1) sprite.maxWdith*=-1;
                        }
                    }

                }
                else 
                {
                    if(my.type === 'npc' && my.script && my.script.type && my.script.type === 'img') {
                        this.isNpcImg(my, delta);
                    }
                    if(my.type === 'mob' && my.data && my.data.script && my.data.script.type && my.data.script.type === 'img') {
                        this.createMobFromAsset(my, delta);
                    }
                }

                

                

                
            }


        });
    }
}