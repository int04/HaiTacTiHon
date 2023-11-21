import update_action_item from "../action_item.js";

export default class npcImg extends update_action_item {
    constructor() {
        super();
    }

    getidSprite = (id) => {
        let images = this.images.filter(e => e.id == id);
        if(images.length <=0) return false;
        return images; 
    }

    isNpcImg = (my,delta) => {
        let id = my.id;
        let sprite = this.getSprite(id);
        let script = my.script;
        if(!sprite) {
            if(script.id) {
                let idSheet = script.id;
                my.skin = {
                    dau : "iLvVMIbTpy",
                    ao : "kFFosytneB",
                    quan : "QSHGPlNDTK",
                    toc : "axDwxOtydX",
                    non : "axDwxOtydX",
                    lung : "axDwxOtydX",
                    tay : "axDwxOtydX",
                };
                let list = this.getidSprite(idSheet);
                list.forEach(element => {
                    if(my.skin[element.type]) {
                        my.skin[element.type] = element.name;
                    }
                });
                let x = my.pos[0];
                let y = my.pos[1];
                my.pos = {
                    x : x,
                    y : y
                }
                this.create_sprite_my(my);
            }
        }
    }
}