
export default (self) => {
    self.ws.on(-5, (data) => {
        for(let i = 0; i < data.length; i++) {
            let element = data[i];
            let id = element[0];
            let x = element[1];
            let y = element[2];
            let getMy = self.getMy(id);
            if(getMy) {
                getMy.pos.x = x;
                getMy.pos.y = y;
            }
            else
            {
                self.getObjectMap();
                break;
            }
        }
    });

    self.ws.on(-6, (data) => {
        let id = data[0];
        let x = data[1];
        let y = data[2];
        let getMy = self.getMy(id);
        if(getMy) {
            getMy.pos.x = x;
            getMy.pos.y = y;
        }
        else
        {
            self.getObjectMap();
        }
    });

    // khi vào map
    self.ws.on(-4, (data) => {
        self.cache_player = [];
        self.cache_action = [];
        self.resetNone();
        let map = data[0];
        self.base_map = map;
        self.insertMap();
        let npc = data[1];
        self.create_sprite_my(self.my);
        npc.forEach(element => {
            let check = self.getMy(element.id);
            if(!check) {
                element.action = {};
                element.type = 'npc';
                element.info = element.info || {};
                element.info.coban = element.info.coban || {};
                element.info.coban.speed = 1;
                self.cache_player.push(element);
                self.action(element.id,'dungyen');
            }
        });
        let mob = data[2];
        mob.forEach(element => {
            self.create_cache_mob(element);
        });

        let player = data[3];
        player.forEach(element => {
            self.create_cache_player(element);
        });
        let zone = data[4];
        if(typeof  zone === 'object') {
            zone.forEach(element => {
                self.create_cache_zone(element)
            });
        }

    });

    // khi không có data
    self.ws.on(-7, (data) => {
        let npc = data[0];
        npc.forEach(element => {
            let check = self.getMy(element.id);
            if(!check) {
                element.action = {};
                element.type = 'npc';
                element.info = element.info || {};
                element.info.coban = element.info.coban || {};
                element.info.coban.speed = 1;
                self.cache_player.push(element);
                self.action(element.id,'dungyen');
            }
        });
        let mob = data[1];
        mob.forEach(element => {
            let check = self.getMy(element.id);
            if(!check)
                self.create_cache_mob(element);
        });

        let player = data[2];
        player.forEach(element => {
            self.create_cache_player(element);
        });

        let zone = data[3];
        if(typeof  zone === 'object') {
            zone.forEach(element => {
                self.create_cache_zone(element)
            });
        }

    });
}