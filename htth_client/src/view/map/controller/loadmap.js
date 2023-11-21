let loadMap = (self) => {
    self.resetMap();
    let data_map = self.base_map;
    let coverMap = data_map.split("!");

    let gameMap = self.gameMap;


    let listAsset = [];
    let background = [];

    for(let i = 0; i < coverMap.length; i++) {
        let e = coverMap[i];
        if(e.length >= 1) {

            let element = {};
            let tach = e.split("^");
            element.name = tach[0];
            element.type = tach[1];
            let tach2 = tach[2].split(",");
            element.x = +tach2[0];
            element.y = +tach2[1];
            element.width = +tach2[2];
            element.height = +tach2[3];

            let name = element.name;
            let url;
            if(1+1===2) {
                let sprite;
                let checked = name.split(",");
                if(checked.length <=1) {
                    let find = self.assets.find(e => e.name == element.name);

                    url = './assets/map/'+find.src+'/'+find.name+'.png';
                    let texture = PIXI.Texture.from(url);
                    sprite = new PIXI.Sprite(texture);
                    sprite.name = element.name;
                }
                else
                {
                    const textures = checked.map(e => PIXI.Texture.from('./assets/map/dat/'+e+'.png'));
                    sprite = new PIXI.AnimatedSprite(textures);
                    sprite.animationSpeed = 0.1;
                    sprite.play();
                    sprite.name = name;
                }
                sprite.x = element.x;
                sprite.y = element.y;
                sprite.width = element.width;
                sprite.height = element.height;
                sprite.type = element.type;
                sprite.visible = true;


                if(sprite.type == 'may') {
                    if(background.find(e => e.name == 'may') == undefined) {
                        background.push({
                            name : 'may',
                            type : 'may',
                            src : url,
                            x : element.x,
                            y : element.y,
                            width : element.width,
                            height : element.height,
                        });
                    }
                }
                else
                if(sprite.type == 'bien') {
                    if(background.find(e => e.name == 'bien') == undefined)
                        background.push({
                            name : 'bien',
                            type : 'bien',
                            x : element.x,
                            y : element.y,
                            src : url,

                            width : element.width,
                            height : element.height,
                        });

                } else
                if(sprite.type == 'nui2') {
                    if(background.find(e => e.name == 'nui2') == undefined)

                        background.push({
                            name : 'nui2',
                            type : 'nui2',
                            x : element.x,
                            src : url,

                            y : element.y,
                            width : element.width,
                            height : element.height,
                        });

                }else
                if(sprite.type == 'nui1') {
                    if(background.find(e => e.name == 'nui1') == undefined)

                        background.push({
                            name : 'nui1',
                            type : 'nui1',
                            src : url,
                            x : element.x,
                            y : element.y,
                            width : element.width,
                            height : element.height,
                        });

                }else

                if(sprite.type == 'che') {

                    self.che.addChild(sprite);

                }
                else
                {
                    self.map.addChild(sprite);
                    if(sprite.type === 'dat') {

                    }

                    if(gameMap.setting.maxY < element.y) {
                        gameMap.setting.maxY = element.y;
                        gameMap.size.idMaxY = element.height;
                    }
                    if(gameMap.setting.minY > element.y) {
                        gameMap.setting.minY = element.y - element.height;
                        gameMap.size.idMinY = element.height;
                    }
                    if(gameMap.setting.maxX < element.x) {
                        gameMap.setting.maxX = element.x;
                        gameMap.size.idMaxX = element.width;
                    }
                    if(gameMap.setting.minX > element.x) {
                        gameMap.setting.minX = element.x;
                        gameMap.size.idMinX = element.width;
                    }
                }
            }

        }
    }

    background.forEach(element => {
        let xMIN = gameMap.setting.minX;
        let xMAX = gameMap.setting.maxX;

        let soluong = Math.ceil((xMAX - xMIN) / element.width);

        for(let i = 0; i < soluong; i++) {
            let texture = PIXI.Texture.from(element.src);
            let sprite = new PIXI.Sprite(texture);
            sprite.x = xMIN + element.width * i;
            sprite.y = element.y;
            sprite.width = element.width;
            sprite.height = element.height;
            sprite.name = element.name;
            sprite.type = element.type;
            sprite.visible = true;
            if(element.type == 'may') self.may.addChild(sprite);
            else if(element.type == 'bien') self.bien.addChild(sprite);
            else if(element.type == 'nui2') self.nui2.addChild(sprite);
            else if(element.type == 'nui1') self.nui1.addChild(sprite);
        }
    });

    self.loadGame.visible = false;
    self.configMap();
}

export default loadMap;