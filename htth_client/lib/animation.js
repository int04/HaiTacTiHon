class animation {
    constructor() {
        let idGame = document.getElementById('game');
        this.gameWidth = idGame.offsetWidth;
        this.gameHeight = idGame.offsetHeight;
        this.app = new PIXI.Application({
            width: this.gameWidth ,
            height: this.gameHeight ,
            backgroundColor: 0x19b0f8,
            transparent: false,
            //forceCanvas: false,
            //forceWebGL: true,
            powerPreference: "high-performance",
            resolution: window.devicePixelRatio,
            autoDensity: true,
            sharedTicker: true,
            roundPixels: true,
            legacy: false,

            preserveDrawingBuffer: true,
            sharedTicker: true,
            antialias: true,


        });
        this.speed = 48;
        this.app.stage.name = "Dragon Boy H5 with Since04";
        globalThis.__PIXI_APP__ = this.app;
        idGame.appendChild(this.app.view);

        this.layer1 = new PIXI.Container();

        this.cache();

        this.createLeft();
        this.createBottom();

        this.createBody();
        this.app.stage.addChild(this.layer1);
        this.layer2 = new PIXI.Container();
        this.app.stage.addChild(this.layer2);
        this.form();
    }
    cache = () => {
        this.sprite = [];
    }
    createLeft = () => {
        let checkOld = this.layer1.getChildByName("left");
        if(checkOld) {
            this.layer1.removeChild(checkOld);
        }
        let background = new PIXI.Graphics();
        background.name = "left";
        background.beginFill(0x000000,1);
        background.drawRect(0,0,this.gameWidth*0.15,this.gameHeight*0.8);
        background.endFill();
        this.layer1.addChild(background);
    }
    createBody =() => {
        let checkOld = this.layer1.getChildByName("body");
        if(checkOld) {
            this.layer1.removeChild(checkOld);
        }
        let background = new PIXI.Graphics();
        background.name = "body";
        background.beginFill(0x800080,0.9);
        background.drawRect(0,0,this.gameWidth*0.85,this.gameHeight*0.8);
        background.endFill();
        this.layer1.addChild(background);
        background.x = this.gameWidth*0.15;

    }

    createBottom = () => {
        let checkOld = this.layer1.getChildByName("bottom");
        if(checkOld) {
            this.layer1.removeChild(checkOld);
        }
        let background = new PIXI.Graphics();
        background.name = "bottom";
        background.beginFill(0xFFFFFF,0.9);
        background.drawRect(0,0,this.gameWidth,this.gameHeight*0.2);
        background.endFill();
        this.layer1.addChild(background);
        background.y = this.gameHeight - background.height;
        let x = 0;
        // hold scroll background.x
        background.interactive = true;
        background.on('pointerdown', (e) => {
            background.hold = e.data.global.x - background.x;
        });
        background.on('pointermove', (e) => {
            if(background.hold) {
                background.x = e.data.global.x - background.hold;
                if(background.x > 0) background.x = 0;
                if(background.x < this.gameWidth - background.width) background.x = this.gameWidth - background.width;
            }

        });

        background.on('pointerup', (e) => {
            background.hold = false;

        });

        background.on('pointerupoutside', (e) => {
            background.hold = false;
        });
        background.on('pointerout', (e) => {
            background.hold = false;
        });
        background.on('pointerover', (e) => {
            background.hold = false;
        });

        this.sprite.forEach((e,index) => {
            let space_x = 10;
            let background2 = new PIXI.Graphics();
            background.addChild(background2);
            background2.name = "bottom"+index;
            background2.beginFill(0x000000,0.000001);
            background2.lineStyle(2, 0x000000, 1);
            background2.drawRect(0,0,background.height,background.height);
            background2.endFill();
            background2.x = x;
            x += background2.width + space_x;
            let sprite = new PIXI.Sprite(e);
            sprite.name = "bottom"+index;
            sprite.width = background2.width;
            sprite.height = background2.height;
            sprite.x = background2.x;
            sprite.y = background2.y;
            background.addChild(sprite);
            background2.interactive = true;

            // button choose or crop
            let button = [
                ['choose',this.choose],
                ['crop',this.showLayerCrop]
            ];
            button.forEach((e2,index2) => {
                let button = new PIXI.Graphics();
                button.name = e2[0];
                button.beginFill(0x000000,0.000001);
                button.lineStyle(2, 0x000000, 1);
                button.drawRect(0,0,background.height,background.height);
                button.endFill();
                sprite.addChild(button);
                button.interactive = true;
                button.on('pointerdown', () => {
                    e2[1](sprite);
                });

            });


        });
    }
    choose =(sprite) => {}
    showLayerCrop = (sprite) => {
        this.layer2.removeChildren();
    }
    form = () => {
        let handleImageUpload = (event) => {
            event.preventDefault();
            const fileInput = document.getElementById('img');
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const texture = PIXI.Texture.from(e.target.result);
                    this.sprite.push(texture);
                    const sprite = new PIXI.Sprite(texture);
                    this.createBottom();
                };
                reader.readAsDataURL(file);
            }
        }
        document.getElementById('game').style.overflow = "hidden";
        document.getElementById('imageForm').addEventListener('submit', handleImageUpload);
    }
}