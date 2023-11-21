import buttonView from "./button.js";

export default class insertCacheMob extends buttonView {
    constructor() {
        super();
    }

    create_cache_player = (element) => {
        let my =element.my;
        let getMy = this.getMy(my.id);
        if(!getMy) {
            this.cache_player.push(my);
            this.create_sprite_my(my);
        }
        else 
        {
            getMy = my;
        }
    }
    create_cache_mob = (element) => {
        this.deleteSprite(element.id);
        element.type = 'mob';
        element.action = {
            'move' : 'left',
        };
        element.pos = {
            x : element.x,
            y : element.y
        }
        element.info = element.info || {};
        element.info.coban = element.info.coban || {};
        element.info.coban.speed = element.data.speed;
        let data_base = element.data;
        element.name =data_base.name;
        this.cache_player.push(element);
        this.action(element.id,'dungyen')
    }

    create_cache_zone = (element) => {
        let int04 = {};
        int04.type = 'zone';
        int04.pos = {};
        int04.id = "int04"+this.randomAZ(3);
        let position = element[1];
        let direction = ['left','top','right','bottom'];
        int04.position = {
            x : position[0],
            y : position[1],
            width : position[2],
            height : position[3],
            move : direction[position[4]],
        }
        let nexMap = element[2];
        int04.nextMap = {
            id : nexMap[0],
            x : nexMap[1],
            y : nexMap[2],
        }
        
        let checked = this.cache_player.findIndex(e => e.position && e.position.x === int04.position.x && e.position.y === int04.position.y && e.position.width === int04.position.width && e.position.height === int04.position.height);
        if(checked === -1) {
            this.cache_player.push(int04);
        }


    }
}