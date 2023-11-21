import loginView from "../login/login.js";

export default class introGame extends loginView {
    constructor() {
        super();
    }
    CreateLogo = (width) => {
        let txt = "Thời đại";
        let logoc = new PIXI.Container();
        let logo = new PIXI.Text(txt, new PIXI.TextStyle({
            fontFamily: 'Itim-Regular',

            fontSize: 40,
            fill: 0xfb9d63,
            fontWeight: 'bold',

        }));

        logo.resolution = 2;
        logo.style.stroke = '#591327';
        logo.style.strokeThickness = 10;
       
        let set = {
            x: 300,
            y: 200
        };
        logo.width = this.gameWidth * 1;
        logo.width = logo.width > set.x ? set.x : logo.width;
        logo.width = logo.width > this.gameWidth * 0.5 ? this.gameWidth * 0.5 : logo.width;

        let txt2 = 'Hải Tặc';
        let logo2 = new PIXI.Text(txt2, new PIXI.TextStyle({
            fontFamily: 'PottaOne-Regular',
            fontSize: 20,

            fill: 0x59c269,
            fontWeight: 'bold',

        }));
        logo2.resolution = 2;
        logo2.style.stroke = '#3c4b24';
        logo2.style.strokeThickness = 6;
        logo2.style.dropShadow = true;
        logo2.style.dropShadowColor = '#3c4b24';
        logo2.style.dropShadowBlur = 2;
        logo2.style.dropShadowAngle = Math.PI / 10;
        logo2.style.dropShadowDistance = 3;
        logo2.y = logo.height;
        logo2.x = logo.width / 2 - logo2.width / 2;

        let set2 = {
            x: 100,
            y: 200
        };
        logo2.width = this.gameWidth * 1;
        logo2.width = logo2.width > set2.x ? set2.x : logo2.width;
        logo2.width = logo2.width > this.gameWidth * 0.5 ? this.gameWidth * 0.5 : logo2.width;

        logoc.addChild(logo2);



        logoc.addChild(logo);
        return logoc;
    }
    WarningViewController = () => {
        this.loadGame.visible = true;
        this.loadGame.removeChildren();
        let background = new PIXI.Graphics();
        this.loadGame.addChild(background);
        background.beginFill(0x19b0f8, 1);
        background.lineStyle(0, 0x570b21, 1);
        background.drawRoundedRect(0, 0, this.gameWidth, this.gameHeight, 0);
        background.endFill();
        background.interactive = true;

        let canhnen = this.createBackGroundGame();
        background.addChild(canhnen);

        let logo = this.CreateLogo(this.gameWidth);
        logo.x = this.gameWidth / 2 - logo.width / 2;
        logo.y = 0 + logo.height * 0.1;


        let width = this.gameWidth * 0.7;
        let height = this.gameHeight * 0.6;

        width = width > 300 ? 300 : width;
        height = height > 400 ? 400 : height;

        let menu = new PIXI.Graphics();
        menu.name = "menu";
        menu.beginFill(0xf7e7bf, 1);
        menu.drawRect(0, 0, width, height);
        menu.endFill();
        menu.x = (this.gameWidth - width) / 2;
        menu.y = logo.y + logo.height + 10;
        background.addChild(menu);

        menu.alpha = 0;

        TweenMax.to(menu, 1, {alpha: 1});

        background.addChild(logo);


        logo.y = this.gameHeight;
        new TWEEN.Tween(logo)
        .to({ y: 0 + logo.height * 0.1 }, 1000)
        .easing(TWEEN.Easing.Bounce.Out)
        .start();

        let left_down_farme = Math.ceil(height/ 20);

        for(let i = 0; i < left_down_farme; i++){
            let left_down = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_6.png"));
            left_down.x = menu.x;
            left_down.y = menu.y + (i * 20);
            if(left_down.y+60 > menu.y + height) {
                left_down.y = menu.y + height - 60;
            }
            background.addChild(left_down);
        }

        let right_down_farme = Math.ceil(height/ 20);

        for(let i = 0; i < right_down_farme; i++){
            let right_down = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_6.png"));
            right_down.x = menu.x + width;
            right_down.y = menu.y + (i * 20);
            right_down.scale.x = -1;
            if(right_down.y+60 > menu.y + height) {
                right_down.y = menu.y + height - 60;
            }
            background.addChild(right_down);
        }



        let center_top_farme = Math.ceil(width/ 20);

        for(let i = 0; i < center_top_farme; i++){
            let center_top = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_1.png"));
            center_top.anchor.set(0.5);
            center_top.x = menu.x + (i * 20) + 10;
            center_top.y = menu.y;
            background.addChild(center_top);
        }

        let leftTop = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));

        leftTop.anchor.set(0.5);
        leftTop.x = menu.x;
        leftTop.y = menu.y;
        background.addChild(leftTop);

        let rightTop = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        rightTop.anchor.set(0.5);
        rightTop.x = menu.x + width;
        rightTop.y = menu.y;
        rightTop.scale.x = -1;
        background.addChild(rightTop);

        let center_bottom_farme = Math.ceil(width/ 20);

        for(let i = 0; i < center_bottom_farme; i++){
            let center_bottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_1.png"));
            center_bottom.anchor.set(0.5);
            center_bottom.x = menu.x + (i * 20) + 10;
            center_bottom.y = menu.y + height;
            center_bottom.scale.y = -1;
            background.addChild(center_bottom);
        }

        let leftBottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        leftBottom.anchor.set(0.5);
        leftBottom.x = menu.x;
        leftBottom.y = menu.y + height;
        leftBottom.scale.y = -1;
        background.addChild(leftBottom);

        let rightBottom = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_interface_paper_2.png"));
        rightBottom.anchor.set(0.5);
        rightBottom.x = menu.x + width;
        rightBottom.y = menu.y + height;
        rightBottom.scale.x = -1;
        rightBottom.scale.y = -1;
        background.addChild(rightBottom);


        let w2 = width * 0.9;
        let h2 = height * 0.9;

        let body = new PIXI.Graphics();
        body.name = "body";
        body.beginFill(0xffffff, 0.0000001);
        body.drawRect(0, 0, w2, h2);
        body.endFill();
        body.x = menu.x + (width - w2) / 2;
        body.y = menu.y + (height - h2) / 2;
        background.addChild(body);

        // mask
        let mask = new PIXI.Graphics();
        mask.beginFill(0xffffff, 1);
        mask.drawRect(0, 0, w2, h2);
        mask.endFill();
        mask.x = menu.x + (width - w2) / 2;
        mask.y = menu.y + (height - h2) / 2;
        body.mask = mask;
        background.addChild(mask);

        let txt = " \"Của cải, danh tiếng, quyền lực\" ! \n";
        txt+= "Người có tất cả mọi thứ trên đời là Vua hải tặc God D. Roger.\n \n";
        txt+= "\"Logue Town\" 20 năm về trước, trên đường God D. Roger tới pháp trường, mặc dù hai tay ông ta bị trói chặt, nhưng ông ta vẫn mang trong mình vẻ kiêu hãnh. \n \n";
        txt+= "\"Như một sự kế thừa, vận mệnh của mỗi thời đại là do con người quyết định, điều này sẽ không bao giờ kết thúc cho đến khi nào loài người vẫn muốn tìm đến tự do\" - Gol D. Roger.\n \n";
        txt+= "Trước khi chết, Roger đã để lại một câu nói khiến cho cả thế giới phải chấn động: \n \n - \"Các ngươi muốn lấy kho báu của ta à ? Có giỏi thì tự đi lấy đi ? Hãy ra biển mà tìm. Ta để kho báu ở ngoài biển hết rồi !\". \n \n";
        txt+= "Và như vậy, một thời đại mới đã bắt đầu, \"Thời đại hải tặc\" ! \n \n";

        let text = new PIXI.Text(txt, {
            fontFamily: 'Itim-Regular',
            fontSize: 17,
            fill: 0x000000,
            fontWeight: 'bold',
            align: 'left',
            wordWrap: true,
            wordWrapWidth: w2 - 20

            });
        text.y = 0;

        let textOffcial = new PIXI.Text("", {
            fontFamily: 'Itim-Regular',
            fontSize: 17,
            fill: 0x000000,
            fontWeight: 'bold',
            align: 'left',
            wordWrap: true,
            wordWrapWidth: w2 - 20
        });
        textOffcial.x = 5;
        textOffcial.y = 0;
        let i = 0;

       



        let viewport = new pixi_viewport.Viewport({
            screenWidth: body.width,
            screenHeight: body.height,
            worldWidth: text.width,
            worldHeight: text.height ,
        });
        viewport.name = "viewport";
        viewport
            .drag({
                direction: 'y',
                pressDrag: true,
                factor: 1,

            })
            .decelerate({
                friction: 0.95,
                bounce: 0.8,
                minSpeed: 0.01,
            })
            .clamp({
                direction: 'y',

            });

        viewport.bounce({
            top: true,
            bottom: true,
            friction: 0.5,
            time: 0.1,
            ease: 'easeInOutSine',
        });



        viewport.addChild(textOffcial);
        body.addChild(viewport);


        let time = setInterval(() => {
            if(i < txt.length){
                textOffcial.text += txt[i];
                i++;
                viewport.moveCenterY(textOffcial.height);
            }else{
                clearInterval(time);
            }
        }, 30);

        


        let PressToContinue = new PIXI.Text(this._('Click to continue'), {
            fontSize: 30,
            fill: 0xFFFFFF,
            fontFamily: 'Arial',
            wordWrap: true,
            wordWrapWidth: this.gameWidth - 20,
            fontWeight: 'bold',
            align: 'center'
            });
        PressToContinue.x = this.gameWidth * 0.9 - PressToContinue.width;
        PressToContinue.y = this.gameHeight*0.9 - PressToContinue.height;
        background.addChild(PressToContinue);

        PressToContinue.style.stroke = '#3c4b24';
        PressToContinue.style.strokeThickness = 3;
        PressToContinue.style.dropShadow = true;
        PressToContinue.style.dropShadowColor = '#3c4b24';
        PressToContinue.style.dropShadowBlur = 2;
        PressToContinue.style.dropShadowAngle = Math.PI / 10;
        PressToContinue.style.dropShadowDistance = 3;

        // tạo hiệu ứng cho chữ PressToContinue
        TweenMax.to(PressToContinue, 0.5, {
            alpha: 0,
            repeat: -1,
            yoyo: true,
            ease: Power0.easeNone,
            speed: 10,
            delay: 0.1,
        });

        PressToContinue.interactive = true;
        let data = 0;
        PressToContinue.on('pointerdown', () => {
            data = Date.now();
        });
        PressToContinue.on('pointerup', () => {
            if(Date.now() - data < 200){
                clearInterval(time);
                this.ObjectCreatePageLoading();
            }
        });
        PressToContinue.cursor = 'pointer';



    }
}