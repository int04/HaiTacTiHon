import NoticeView from '../notice/notice.js';
import reg from "./reg.js";
export default class loginView extends NoticeView {
    constructor() {
        super();
        this.username = this.getCookie('int04_username');
        this.password = this.getCookie('int04_password');
        this.cache.login = {
            login : false,
            select : false,
        };

    }


    connectGame = () => {
        if(!this.isConnect) {
            this.isConnectFail++;
            this.notice('Chưa thể kết nối đến máy chủ, đang thử kết nối lại...#'+this.isConnectFail,false);
            if(this.isConnectFail >= 20) {
                this.isConnectFail = 0;
                this.notice((this._('Máy chủ đang bảo trì, vui lòng đăng nhập lại sau.')),true);
                return false;
            }
            setTimeout(() => {
                this.connectGame();
            }, 1000);
            return false;
        }
        if(this.username.length <= 0) return this.notice('Vui lòng nhập tài khoản');
        if(this.password.length <= 0) return this.notice('Vui lòng nhập mật khẩu');
        this.notice('Đang tiến vào biển cả, xin chờ...',false);
        this.setCookie('int04_username',this.username,30);
        this.setCookie('int04_password',this.password,30);

        this.send(-1,[1,this.username,this.password]);
    }

    createUI = (width,height,img) => {
        let ui = new PIXI.Container();

        let centerCenter_data = img.centerCenter.split(',');
        let src_centerCenter = centerCenter_data[0];
        let width_centerCenter = centerCenter_data[1];
        let height_centerCenter = centerCenter_data[2];


        let background = new PIXI.Graphics(); 
        background.beginFill(0xf7e7bf);
        background.drawRect(0, 0, width, height);
        background.endFill();
        ui.addChild(background);

        let centerTop_data = img.centerTop.split(',');
        let src_centerTop = centerTop_data[0];
        let width_centerTop = centerTop_data[1]*1;
        let height_centerTop = centerTop_data[2]*1;

        let num_centerTop = Math.ceil(width / width_centerTop);

        for(let i = 0; i < num_centerTop; i++) {
            let centerTop =  new PIXI.Sprite(PIXI.Texture.from("./assets/ui/"+src_centerTop+".png"));

            centerTop.x = i * width_centerTop;

            if(centerTop.x + width_centerTop > width) {
                centerTop.x -= centerTop.x + width_centerTop - width;
            }

            ui.addChild(centerTop);
        }

        let centerBottom_data = img.centerBottom.split(',');
        let src_centerBottom = centerBottom_data[0];
        let width_centerBottom = centerBottom_data[1]*1;
        let height_centerBottom = centerBottom_data[2]*1;

        let num_centerBottom = Math.ceil(width / width_centerBottom);

        for(let i = 0; i < num_centerBottom; i++) {
            let centerBottom =  new PIXI.Sprite(PIXI.Texture.from("./assets/ui/"+src_centerBottom+".png"));

            centerBottom.x = i * width_centerBottom;
            centerBottom.y = height - height_centerBottom;

            if(centerBottom.x + width_centerBottom > width) {
                centerBottom.x -= centerBottom.x + width_centerBottom - width;
            }

            ui.addChild(centerBottom);
        }

        let leftCenter_data = img.leftCenter.split(',');
        let src_leftCenter = leftCenter_data[0];
        let width_leftCenter = leftCenter_data[1]*1;
        let height_leftCenter = leftCenter_data[2]*1;

        let num_leftCenter = Math.ceil(height / height_leftCenter);

        let leftPre = img.leftPre.split(',');
        let src_leftPre = leftPre[0];
        let width_leftPre = leftPre[1]*1;
        let height_leftPre = leftPre[2]*1;

        let num_leftPre = Math.ceil(height / height_leftPre);

        


        for(let i = 0; i < num_leftCenter; i++) {

            
            let leftCenter =  new PIXI.Sprite(PIXI.Texture.from("./assets/ui/"+src_leftCenter+".png"));
            leftCenter.y = i * height_leftCenter;

            if(leftCenter.y + height_leftCenter > height) {
                leftCenter.y -= leftCenter.y + height_leftCenter - height;
            }

            ui.addChild(leftCenter);
        }

        let rightCenter_data = img.rightCenter.split(',');
        let src_rightCenter = rightCenter_data[0];
        let width_rightCenter = rightCenter_data[1]*1;
        let height_rightCenter = rightCenter_data[2]*1;

        let num_rightCenter = Math.ceil(height / height_rightCenter);

        for(let i = 0; i < num_rightCenter; i++) {
            let rightCenter =  new PIXI.Sprite(PIXI.Texture.from("./assets/ui/"+src_rightCenter+".png"));

            rightCenter.x = width - width_rightCenter;
            rightCenter.y = i * height_rightCenter;

            if(rightCenter.y + height_rightCenter > height) {
                rightCenter.y -= rightCenter.y + height_rightCenter - height;
            }

            ui.addChild(rightCenter);
        }

        let leftTop_data = img.leftTop.split(',');
        let src_leftTop = leftTop_data[0];
        let width_leftTop = leftTop_data[1]*1;
        let height_leftTop = leftTop_data[2]*1;

        let leftTop =  new PIXI.Sprite(PIXI.Texture.from("./assets/ui/"+src_leftTop+".png"));
        leftTop.x = -2.3;
        leftTop.y = -10;
        ui.addChild(leftTop);

        let rightTop_data = img.rightTop.split(',');
        let src_rightTop = rightTop_data[0];
        let width_rightTop = rightTop_data[1]*1;
        let height_rightTop = rightTop_data[2]*1;

        let rightTop =  new PIXI.Sprite(PIXI.Texture.from("./assets/ui/"+src_rightTop+".png"));
        rightTop.x = width - width_rightTop + 2.3;
        rightTop.y = -10;
        ui.addChild(rightTop);

        let leftBottom_data = img.leftBottom.split(',');
        let src_leftBottom = leftBottom_data[0];
        let width_leftBottom = leftBottom_data[1]*1;
        let height_leftBottom = leftBottom_data[2]*1;

        let leftBottom =  new PIXI.Sprite(PIXI.Texture.from("./assets/ui/"+src_leftBottom+".png"));
        leftBottom.y = height - height_leftBottom;
        leftBottom.x = -2.3;
        ui.addChild(leftBottom);

        let rightBottom_data = img.rightBottom.split(',');
        let src_rightBottom = rightBottom_data[0];
        let width_rightBottom = rightBottom_data[1]*1;
        let height_rightBottom = rightBottom_data[2]*1;

        let rightBottom =  new PIXI.Sprite(PIXI.Texture.from("./assets/ui/"+src_rightBottom+".png"));
        rightBottom.x = width - width_rightBottom + 2.3;
        rightBottom.y = height - height_rightBottom;
        
        ui.addChild(rightBottom);





        return ui;
    }

    closeLogin = () => {
        this.mainLogin.visible = false;
        this.main.visible = true;
        this.mainLogin.removeChildren();
    }

    loginPage = () => {
        this.loadGame.visible = false;
        this.main.visible = false;
        this.mainLogin.visible = true;
        this.mainLogin.removeChildren();


        let background = new PIXI.Graphics();
        background.beginFill(0x19b0f8);
        background.drawRect(0, 0, this.gameWidth, this.gameHeight);
        background.endFill();
        this.mainLogin.addChild(background);

        let backgroundGame = this.createBackGroundGame();
        background.addChild(backgroundGame);

        let containerLogo = new PIXI.Container();
        containerLogo.name = "containerLogo";
        containerLogo.y = 0;

        background.addChild(containerLogo);

        let ynew = this.gameHeight *0.3; // 70%
        let hegit = this.gameHeight * 0.7; // 70%

        let containerBox = new PIXI.Container();
        containerBox.name = "containerBox";
        containerBox.y = ynew;
        background.addChild(containerBox);



        let width = this.gameWidth * 0.9;
        width = width > 500 ? 500 : width;

        let background2 = new PIXI.Graphics();
        background2.beginFill(0xFFFFFF,0.0000001);
        background2.drawRect(0, 0, width, hegit);
        background2.endFill();
        containerBox.addChild(background2);

        let mh = hegit*0.7;
        mh = mh > 310 ? 310 : mh;

        let ui = this.createUI(width,mh, {
            leftTop : 'x2Main_Image_interface_paper0,28,38',
            centerTop : 'x2Main_Image_interface_paper5,60,16',
            rightTop : 'x2Main_Image_interface_paper450,28,38',
            leftCenter : 'x2Main_Image_interface_paper100,28,20',
            centerCenter : 'x2Main_Image_interface_paper_7,20,16',
            rightCenter : 'x2Main_Image_interface_paper1,28,20',
            leftBottom : 'x2Main_Image_interface_paper2,28,38',
            centerBottom : 'x2Main_Image_interface_paper6,60,16',
            rightBottom : 'x2Main_Image_interface_paper244,28,38',

            leftPre : 'x2Main_Image_interface_paper_4,34,16',
            rightPre : 'x2Main_Image_interface_paper_3,32,16',
        });
        background2.addChild(ui);

        let logo = this.CreateLogo(background2.width);
        logo.x = background2.width / 2 - logo.width / 2;
        logo.y = 0 + logo.height;
        background2.addChild(logo);

        // tween
        new TWEEN.Tween(logo)
            .to({ y: 0 - logo.height / 2 }, 1000)
            .easing(TWEEN.Easing.Back.Out)
            .start();


        let inputContainer = new PIXI.Container();
        ui.addChild(inputContainer);

        let usernameInput = new PIXI.TextInput({
            input: {
                fontSize: '17px',
                padding: '10px',
                color: '#7a1125',
                width: ui.width * 0.7,
                height: ui.height * 0.2,
            },
            box: {
                default: { fill: 0xeec385, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
                focused: { fill: 0xa7f2ac, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
                disabled: { fill: 0xDBDBDB, rounded: 0 }

            }
        })
        usernameInput.placeholder = 'Tên tài khoản'
        usernameInput.text = this.username;
        inputContainer.addChild(usernameInput);


        let passwordInput = new PIXI.TextInput({
            input: {
                fontSize: '17px',
                padding: '10px',
                color: '#7a1125',
                width: ui.width * 0.7,
                height: ui.height * 0.2,
            },
            box: {
                default: { fill: 0xeec385, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
                focused: { fill: 0xa7f2ac, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
                disabled: { fill: 0xDBDBDB, rounded: 0 }

            }
        })
        passwordInput.placeholder = 'mật khẩu'
        passwordInput.htmlInput.setAttribute('type', 'password')
        passwordInput.y = usernameInput.height + 10;
        passwordInput.text = this.password;

        inputContainer.addChild(passwordInput);
        
        inputContainer.x = 0;
        inputContainer.y = (ui.height - inputContainer.height) / 2;

        new TWEEN.Tween(inputContainer)
        .to({ x: (ui.width - inputContainer.width) / 2 }, 500)
        .easing(TWEEN.Easing.Bounce.Out)
        .start();


        let coverButton = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/22359.png"));
        // 38x144 => num = 3, 38x48

        let array = [];
        for(let i = 0; i < 3; i++) {
            let texture = new PIXI.Texture(coverButton.texture, new PIXI.Rectangle(0, 80 * i, 80, 80));
            array.push(texture);
        }

        let button = new PIXI.AnimatedSprite(array);
        button.animationSpeed = 0.15;
        button.loop = true;
        button.play();

        button.width = ui.width * 0.2;
        button.height = ui.height * 0.3;
        button.x = (ui.width - button.width) / 2;
        button.y = 0;
        containerBox.addChild(button);

        button.interactive = true;
        button.cursor = 'pointer';
        button.on('pointerdown', () => {
            this.username = usernameInput.text;
            this.password = passwordInput.text;

            this.connectGame();
        })

        new TWEEN.Tween(button)
        .to({ y:  ui.x + ui.height - button.height/2 }, 1000)
        .easing(TWEEN.Easing.Bounce.Out)
        .start();



        containerBox.x = (this.gameWidth - containerBox.width) / 2;
        containerBox.alpha = 0;
        new TWEEN.Tween(containerBox)
        .to({ alpha: 1 }, 500)
        .easing(TWEEN.Easing.Bounce.Out)
        .start();


        

        containerLogo.x = (this.gameWidth - containerLogo.width) / 2;

        
        setTimeout(() => {
            if(this.gameInfo.login && !this.cache.login.login) {
                this.cache.login.login = true;
                this.connectGame();
            }
        }, 30);

        let created = (textx,event) => {
            let button_w = background.width * 0.3;
            let button_h = background.height * 0.2;
            button_w = button_w > 100 ? 100 : button_w;
            button_h = button_h > 50 ? 50 : button_h;
            let button = new PIXI.Graphics();
            button.beginFill(0x716250);
            button.lineStyle(2, 0xf9f2d3, 1);
            button.drawRoundedRect(0, 0, button_w, button_h, 10);
            button.endFill();

            let text = new PIXI.Text(textx, {
                align: "center",
                breakWords: true,
                fontSize: 15,
                whiteSpace: "normal",
                wordWrap: true,
                wordWrapWidth: button_w,
                fontWeight: "bold",
                fill: 0xFFFFFF,
            });

            text.anchor.set(0.5);
            text.x = button.width/2;
            text.y = button.height/2;
            button.addChild(text);
            let time = 0;
            button.interactive = true;
            button.cursor = 'pointer';
            button.on('pointerdown', () => {
                time = Date.now();
            });
            button.on('pointerup', () => {
                if(Date.now() - time < 200) {
                    event();
                }
            });
            return button;
        }

        let dang_click = false;
        let btn_reg = () => {
            if(dang_click) return;
            dang_click = true;
            let orlder_bck = background;
            let background23 = new PIXI.Graphics();
            background23.beginFill(0x000000,0.5);
            background23.drawRect(0, 0, this.gameWidth, this.gameHeight);
            background23.endFill();
            background23.name = "menu_reg_single";
            orlder_bck.addChild(background23);
            background23.interactive = true;
            background23.cursor = 'pointer';

            let ynew = this.gameHeight *0.3; // 70%
            let hegit = this.gameHeight * 0.7; // 70%

            let containerBox = new PIXI.Container();
            containerBox.name = "containerBox";
            containerBox.y = ynew;
            background23.addChild(containerBox);



            let width = this.gameWidth * 0.9;
            width = width > 500 ? 500 : width;

            let background2 = new PIXI.Graphics();
            background2.beginFill(0xFFFFFF,0.0000001);
            background2.drawRect(0, 0, width, hegit);
            background2.endFill();
            containerBox.addChild(background2);

            let mh = hegit*0.7;
            mh = mh > 310 ? 310 : mh;

            let ui = this.createUI(width,mh, {
                leftTop : 'x2Main_Image_interface_paper0,28,38',
                centerTop : 'x2Main_Image_interface_paper5,60,16',
                rightTop : 'x2Main_Image_interface_paper450,28,38',
                leftCenter : 'x2Main_Image_interface_paper100,28,20',
                centerCenter : 'x2Main_Image_interface_paper_7,20,16',
                rightCenter : 'x2Main_Image_interface_paper1,28,20',
                leftBottom : 'x2Main_Image_interface_paper2,28,38',
                centerBottom : 'x2Main_Image_interface_paper6,60,16',
                rightBottom : 'x2Main_Image_interface_paper244,28,38',

                leftPre : 'x2Main_Image_interface_paper_4,34,16',
                rightPre : 'x2Main_Image_interface_paper_3,32,16',
            });
            background2.addChild(ui);
            let inputContainer = new PIXI.Container();
            ui.addChild(inputContainer);
            ui.x = (this.gameWidth - ui.width) / 2;

            let usernameInput = new PIXI.TextInput({
                input: {
                    fontSize: '17px',
                    padding: '10px',
                    color: '#7a1125',
                    width: ui.width * 0.7,
                    height: ui.height * 0.2,
                },
                box: {
                    default: { fill: 0xeec385, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
                    focused: { fill: 0xa7f2ac, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
                    disabled: { fill: 0xDBDBDB, rounded: 0 }

                }
            })
            usernameInput.placeholder = 'Tên tài khoản'
            usernameInput.text = '';
            inputContainer.addChild(usernameInput);





            let passwordInput = new PIXI.TextInput({
                input: {
                    fontSize: '17px',
                    padding: '10px',
                    color: '#7a1125',
                    width: ui.width * 0.7,
                    height: ui.height * 0.2,
                },
                box: {
                    default: { fill: 0xeec385, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
                    focused: { fill: 0xa7f2ac, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
                    disabled: { fill: 0xDBDBDB, rounded: 0 }

                }
            })
            passwordInput.placeholder = 'mật khẩu'
            passwordInput.y = usernameInput.height + 10;
            passwordInput.text = '';

            inputContainer.addChild(passwordInput);

            inputContainer.x = 0;
            inputContainer.y = (ui.height - inputContainer.height) / 2;

            let text = new PIXI.Text('Để đăng ký tài khoản, vui lòng nhập tài khoản và mật khẩu.', {
                align: "center",
                breakWords: true,
                fontSize: 15,
                whiteSpace: "normal",
                wordWrap: true,
                wordWrapWidth: ui.width,
                fill: 0xFFFFFF,
            });
            text.style.stroke= 0x000000;
            text.style.strokeThickness = 4;
            text.anchor.set(0.5);
            text.x = ui.width/2;
            text.y = inputContainer.y - text.height;
            ui.addChild(text);

            new TWEEN.Tween(inputContainer)
                .to({ x: (ui.width - inputContainer.width) / 2 }, 500)
                .easing(TWEEN.Easing.Bounce.Out)
                .start();

            let container_button = new PIXI.Container();
            let space = 10;
            for(let i = 0; i<2; i++) {
                let button = created(i === 0 ? 'Đăng ký' : 'Đóng',() => {
                    if(i === 1) {
                        dang_click = false;
                        this.deleteAllChild(background23);
                    }
                    else {
                        usernameInput.blur();
                        passwordInput.blur();
                        reg(this,usernameInput.text,passwordInput.text);
                    }
                });
                button.x = i === 0 ? 0 : button.width + space;
                container_button.addChild(button);
            }
            container_button.x = (ui.width - container_button.width) / 2;
            container_button.y = ui.height - container_button.height;
            ui.addChild(container_button);
        }

        let click_button = () => {
            this.openShowMenu2('Chức năng',[
                ['Đăng ký','event',btn_reg],
                ['Đóng','deleteMenu','1']
            ]);
        }


        let menu_1 = created('Chức năng',click_button);
        menu_1.x = 0;
        menu_1.y = background.height*0.98 - menu_1.height;
        background.addChild(menu_1);
    }

    test_event_login = () => {
        setTimeout(() => {
        },300);
    }

    logOut =() => {
        this.send(-1,[5,'int04']);
        this.loginPage();
    }
}