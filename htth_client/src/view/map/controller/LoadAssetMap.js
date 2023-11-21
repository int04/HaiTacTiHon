
let loadAssetMap = (self) => {
    self.loadGame.visible = true;
    self.gameMap = {
        setting: {
            maxY: 0,
            minY: 0,
            maxX: 0,
            minX: 0,
        },
        size: {
            idMaxX: 0,
            idMaxY: 0,
            idMinX: 0,
            idMinY: 0,

        }
    };

    let data_map = self.base_map;
    let coverMap = data_map.split("!");

    let listAsset = [];

    for(let i = 0; i < coverMap.length; i++) {
        let e = coverMap[i];
        if(e.length >= 1) {

            let element = {};
            let tach = e.split("^");
            let images = tach[0];
            if(images.split(",").length >=2) {
                for(let j = 0; j < images.split(",").length; j++) {
                    let src = images.split(",")[j];
                    let find = self.assets.find(e => e.name === src);
                    if(!find) return false;

                    if(listAsset.find(e => e === src)) continue;

                    let loadchua = self.srcDaLoad.find(e => e === src);
                    if(loadchua) continue;
                    self.srcDaLoad.push(src);
                    listAsset.push(src)

                }
            }
            else
            {

                let find = self.assets.find(e => e.name === images);
                if(!find) return false;

                let loadchua = self.srcDaLoad.find(e => e === images);
                if(loadchua) continue;
                self.srcDaLoad.push(images);
                listAsset.push(images)
            }


        }
    }

    let i = 0;
    let txtLoad = self.loadGame.getChildByName('txtLoadgame');
    let tip = self.loadGame.getChildByName('bgLoadTip');
    let listTxt = ["Tham gia các hoạt động để trở nên mạnh mẽ","Bạn có thể kiếm beri từ việc buôn","Mỗi trái ác quỷ đều mang một sức mạnh đáng sợ..."];

    let randomText = () => {
        let random = Math.floor(Math.random() * listTxt.length);
        if(tip) {
            tip.text = listTxt[random];
            tip.x = self.gameWidth / 2 - tip.width / 2;

        }
    }

    let TimeLoadTip = setInterval(() => {
        randomText();
    }, 2000);

    randomText();


    let runPromise = (URL_) => {
        return new Promise((resolve, reject) => {
            if(PIXI.utils.TextureCache[URL_]) {
                i+=1;
                return resolve(true);
            }
            self.loadGame.visible = true;
            txtLoad.visible = true;
            let load = PIXI.Assets.load(URL_);
            load.then(e => {
                i+=1;
                txtLoad.text = 'Đã tải '+i+'/'+(listAsset.length-1)+' gói tài nguyên bản đồ... ';
                txtLoad.x = self.gameWidth / 2 - txtLoad.width / 2;
                resolve(true);
            });
        });
    }

    let array = [];
    console.log(listAsset)
    for(let i = 0; i < listAsset.length; i++) {
        let find = self.assets.find(e => e.name === listAsset[i]);
        let URL_ = './assets/map/'+find.src+'/'+find.name+'.png';
        array.push(runPromise(URL_));
    }
    let timeLoad = Date.now();
    Promise.all(array).then(e => {
        console.log('loadMap ('+listAsset.length+') packages: '+(Date.now() - timeLoad)+'ms');
        txtLoad.visible = false;
        clearInterval(TimeLoadTip);
        self.loadMap();
    });
}

export  default  loadAssetMap;