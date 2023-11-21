import renderViewChange from "./render.js";

export default class int04 extends renderViewChange {
    constructor() {
        super();
        this.runGame = false;
        this.created_Scene();
    }

    resize = (width, height) => {
        //this.app.renderer.resize(width, height);
        this.gameWidth = width;
        this.gameHeight = height;
        this.renderButton();
    }

    created_Scene = () => {
        this.gameWidth = window.innerWidth;
        this.gameHeight = window.innerHeight;
        this.app = new PIXI.Application({
            backgroundColor: 0x19b0f8,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            resizeTo : window,
            hello : true,
            powerPreference : "high-performance",
            antialias : true,
            fps : 120,
            frameRate : 120,
        });
        this.app.stage.name = "Dragon Boy H5 with int04";
        globalThis.__PIXI_APP__ = this.app;
        this.gameWidth = this.app.screen.width;
        this.gameHeight = this.app.screen.height;
        document.body.appendChild(this.app.view);
        document.body.style.overflow = "hidden";
        this.Created_Object_Scene();
        this.runGame = true;
        // window resize
        window.addEventListener('resize', () => {
            console.log('rezie','old',this.gameWidth,this.gameHeight,'new',window.innerWidth,window.innerHeight)
            this.resize(window.innerWidth,window.innerHeight);
        });
    }



    Created_Object_Scene = () => 
    {
        // IS main scene
        this.main = new PIXI.Container();
        this.main.name = "main";
            this.game = new PIXI.Container();
            this.game.name = "Ingame";
            this.main.addChild(this.game);
        // các lớp con của main
            this.container = new PIXI.Container();
            this.container.name = "lớp bản đồ, nhân vật";
            this.background = new PIXI.Container();
            this.background.name = "lớp nền";
            this.game.addChild(this.background);
            this.game.addChild(this.container);  
                // lớp bản đồ
                this.may = new PIXI.Container();
                this.may.name = "may";
                this.background.addChild(this.may);
                this.bien = new PIXI.Container();
                this.bien.name = "bien";
                this.background.addChild(this.bien);

                this.nui2 = new PIXI.Container();
                this.nui2.name = "nui2";
                this.background.addChild(this.nui2);

                this.nui1 = new PIXI.Container();
                this.nui1.name = "nui1";
                this.background.addChild(this.nui1);


                this.map = new PIXI.Container();
                this.map.name = "map";
                this.container.addChild(this.map);

                // lớp eff 2
                this.eff2 = new PIXI.Container();
                this.eff2.name = "eff2";
                this.container.addChild(this.eff2);
                // lớp nhân vật
                this.thuyenNen = new PIXI.Container();
                this.thuyenNen.name = "thuyenSau";
                this.playerItem = new PIXI.Container();
                this.playerItem.name = "playerItem";
                this.player = new PIXI.Container();
                this.player.name = "player";
                this.thuyen = new PIXI.Container();
                this.thuyen.name = "thuyenTruoc";

                this.camera = new PIXI.Graphics();
                this.camera.name = "camera";
                this.camera.beginFill(0x000000, 0.5);
                this.camera.drawRect(0, 0, 48,48);
                this.camera.endFill();
                this.camera.visible = false;
                this.container.addChild(this.camera);

                this.eff = new PIXI.Container();
                this.eff.name = "skill";

                this.Chat = new PIXI.Container();
                this.Chat.name = "chat";

                this.container.addChild(this.thuyenNen);
                this.container.addChild(this.playerItem);
                this.container.addChild(this.player);
                this.container.addChild(this.thuyen);
                this.container.addChild(this.eff);
                this.container.addChild(this.Chat);


                this.che = new PIXI.Container();
                this.che.name = "map";
                this.container.addChild(this.che);


            // các lớp như hành trang, giao tiếp, các nút,...
            this.textVitri = new PIXI.Text('Vị trí: ', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
            this.textVitri.name = "textVitri";
            this.textVitri.x = 0;
            this.textVitri.y = this.gameHeight - this.textVitri.height;
            this.main.addChild(this.textVitri);

            this.button = new PIXI.Container();
            this.button.name = "nut man hinh";
            this.main.addChild(this.button);

            this.box = new PIXI.Container();
            this.box.name = "box";
            this.main.addChild(this.box);
            
            this.boxGiaoTiep = new PIXI.Container();
            this.boxGiaoTiep.name = "boxGiaoTiep";
            this.main.addChild(this.boxGiaoTiep);


            this.menu = new PIXI.Container();
            this.menu.name = "menu";
            this.main.addChild(this.menu);

            this.menuLeft = new PIXI.Container();
            this.menuLeft.name = "menuLeft";
            this.main.addChild(this.menuLeft);

            this.input = new PIXI.Container();
            this.input.name = "input";
            this.main.addChild(this.input);
            



        // 


        this.mainLogin = new PIXI.Container();
        this.mainLogin.name = "mainLogin";

        this.loadGame = new PIXI.Container();
        this.loadGame.name = "loadgame";



        this.noticeMain = new PIXI.Container();
        this.noticeMain.name = "noticeMain";

        this.app.stage.addChild(this.main);

        this.preItem = new PIXI.Container();
        this.preItem.name = "preItem";
        this.app.stage.addChild(this.preItem);
        this.main.interactive = true;
        this.main.on('pointerdown', () => {
            this.deleteAllChild(this.preItem,false);
        });

        this.chipiBox = new PIXI.Container();
        this.chipiBox.name = "chipiBox";

        this.app.stage.addChild(this.mainLogin);
        this.app.stage.addChild(this.loadGame);

        this.menu2 = new PIXI.Container();
        this.menu2.name = "menu";
        this.app.stage.addChild(this.menu2);

        this.app.stage.addChild(this.noticeMain);
        this.app.stage.addChild(this.chipiBox);

    }

}