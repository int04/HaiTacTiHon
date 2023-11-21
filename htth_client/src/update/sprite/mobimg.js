import npcImg from "./npcImg.js";

export default class mobImgScript extends npcImg {
    constructor() {
        super();
    }

    createMobFromAsset = (my,delta) => {
        let id = my.id;
        let sprite = this.getSprite(id);
        let script = my.data.script;
        if(!sprite) {
            if(script.img) {
                let idSheet = script.img;
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
                
                this.create_sprite_my(my);
            }
        }
    }
}