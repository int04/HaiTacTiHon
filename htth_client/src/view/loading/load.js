import introGame from "./trial.js";
export default class loadingScient extends introGame {
    constructor() {
        super();
        this.gameInfo = {};
    }

    createGameConfig = () => {
        this.loadGame.removeChildren();
        let background = new PIXI.Graphics();
        this.loadGame.addChild(background);
        background.beginFill(0x000000, 1);
        background.lineStyle(0, 0x570b21, 1);
        background.drawRoundedRect(0, 0, this.gameWidth, this.gameHeight, 0);
        background.endFill();
        background.interactive = true;

        let txt = new PIXI.Text('Đang tải cấu hình cơ bản...', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        txt.x = this.gameWidth / 2 - txt.width / 2;
        txt.y = this.gameHeight / 2 - txt.height / 2;

        let txt2 = new PIXI.Text('.', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        txt2.x = this.gameWidth / 2 - txt2.width / 2;
        txt2.y = txt.y + txt.height;
        txt2.name = 'txt2';
        this.loadGame.addChild(txt, txt2);

        let i = 0;

        let time = setInterval(() => {
            if(i == 0) txt2.text = '.';
            if(i == 1) txt2.text = '..';
            if(i == 2) txt2.text = '...';
            i++;
            if(i == 3) i = 0;
        }
        , 300);

        // get data from file ./config.txt 
        let fetch = new XMLHttpRequest();
        fetch.open('GET', './config.json?date='+Date.now(), true);
        fetch.send();
        fetch.onreadystatechange = () => {
            if(fetch.readyState == 4 && fetch.status == 200) {
                let json = JSON.parse(fetch.response);
                for(let i in json) {
                    if(typeof json === 'object') {
                    }
                    else
                    {
                        console.log(i + ' : ' + json[i]);
                    }
                }

                this.gameInfo.version = json.version;
                this.gameInfo.timeloadWelcome = json.time;
                this.gameInfo.server = json.server;
                this.gameInfo.gameName = json.name;
                this.gameInfo.name = json.nameDEV;
                this.gameInfo.debug = json.debug;
                this.gameInfo.login = json.login;

                if(this.gameInfo.debug == true) {
                    //this.postionChar.visible = true;
                }
                else 
                {
                    //this.postionChar.visible = false;
                }

                // run server 

                this.ConnectToServer();

                

                /* Tải trước các font */
                let data = [];
                this.gameInfo.font = [];
                for(let font in json.font) {
                    let url = "./assets/font/"+(json.font[font].length >=1 ? json.font[font] : font )+".ttf";
                    this.gameInfo.font.push(font);
                    data.push({
                        name : font,
                        url : url,
                    })
                }

                let j = 0; 
                let express = () => {
                    /*
                    let font = new FontFace(data[j].name, 'url('+data[j].url+')');
                    txt.text = 'Đang tải font:' + data[j].name;
                    txt.x = this.gameWidth / 2 - txt.width / 2;
                    font.load().then((loaded_face) => {
                        document.fonts.add(loaded_face);
                        j++;
                        if(j < data.length) {
                            setTimeout(express, 1);
                        } else {
                            this.packageCombo(txt,time);
                        }
                    });
                    */
                    // dùng promise all cho nhanh

                    let runPromise = (name,url) => {
                        return new Promise((resolve,reject) => {
                            let font = new FontFace(name, 'url('+url+')');
                            font.load().then((loaded_face) => {
                                document.fonts.add(loaded_face);
                                resolve();
                            });
                        });
                    }

                    let array = [];
                    let time = Date.now();
                    for(let i in data) {
                        array.push(runPromise(data[i].name,data[i].url));
                    }
                    Promise.all(array).then((loaded_face) => {
                        this.packageCombo(txt,time);
                        console.log('LoadFont ('+data.length+') packge : ' + (Date.now() - time) + 'ms');
                    });

                }
                express();
            }

            if(fetch.readyState == 4 && fetch.status != 200) {
                clearInterval(time);
                alert('Không thể đọc file dữ liệu của trò chơi');
            }

        };




            
    }


    packageCombo = (txt,time) => {
        let src = ['ao','camtay','face','lung','non','quan','toc','sprite','base','map', 'npc','quai', 'skin'];

        let i = 0;

        // Promiseall sẽ nhanh hơn =]

        let PromisePackage = (url) => {
            return new Promise((resolve, reject) => {
                let name = url;
                url = './assets/json/' + url + '.json?v='+this.gameInfo.version;
                // xhr 
                txt.text = 'Đang tải gói cơ bản: '+name;
                txt.x = this.gameWidth/2 - txt.width/2;
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = () => {
    
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        let data = JSON.parse(xhr.responseText);
                        if(name == 'combo') this.spriteComBo = data;
                        else if(name == 'map') {
                            this.assets = data;
                        }
                        
                        else 
                        {
                            this.images = this.images.concat(data);
                        }
                        resolve();
                    }
                    else {
                        reject();
                        alert('Can not load package:'+src[i]+'. Please reload page or contact admin in forum.');
                    }
                    
    
                };
                xhr.send();
            });
        }

        let array = [];
        for(let i = 0; i < src.length; i++) {
            array.push(PromisePackage(src[i]));
        }
        let timeLoad = Date.now();
        Promise.all(array).then(() => {
            console.log('loading package ('+src.length+') time: '+(Date.now() - timeLoad)+'ms');
            this.CreateFontLogin();
            clearInterval(time);
        });
    }

    fontSize = (logoAuth,maxW) => {
        let fontSize = 0;
        let fontWidth = logoAuth.width;
        let fontHeight = logoAuth.height;
        let fontRatio = fontWidth / fontHeight;
        let fontNewWidth = maxW;
        let fontNewHeight = fontNewWidth / fontRatio;
        fontSize = fontNewHeight;
        logoAuth.style.fontSize = fontSize;
        return logoAuth;
    }


    CreateFontLogin = () => {
        this.loadGame.removeChildren();
        let background = new PIXI.Graphics();
        this.loadGame.addChild(background);
        background.beginFill(0x000000, 1);
        background.lineStyle(0, 0x570b21, 1);
        background.drawRoundedRect(0, 0, this.gameWidth, this.gameHeight, 0);
        background.endFill();
        background.interactive = true;

        let listLoad = new PIXI.Container();
        this.loadGame.addChild(listLoad);
        let listfont = this.gameInfo.font;
        
        listLoad.visible = false;


        let logoAuth = new PIXI.Text(this.gameInfo.name, {
            fontFamily: 'Itim-Regular',
            fontSize: 50,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        
    
        let maxW = this.gameWidth * 0.7;
        maxW = maxW > 350 ? 350 : maxW;

        // cover width to font size
        
        logoAuth = this.fontSize(logoAuth,maxW);
        

        logoAuth.x = 0;
        logoAuth.y = this.gameHeight / 2 - logoAuth.height ;
        this.loadGame.addChild(logoAuth);

        let self = this;
        if(this.gameInfo.debug == true) 
        {
            self.ObjectCreatePageLoading();
            return false;
        }
        else 
        {
        
            new TWEEN.Tween(logoAuth)
            .to({ x:this.gameWidth / 2 - logoAuth.width / 2 }, 1000)
            .easing(TWEEN.Easing.Bounce.Out)
            .onComplete(()=> {
                let txt = "For everyone, for all platforms";
                let slotgan = new PIXI.Text(txt, {
                    fontFamily: 'Itim-Regular',
                    fontSize: 15,
                    fill: 0xFFFFFF,
                    fontWeight: 'bold',
                    align: 'center'
                });
                slotgan.x = logoAuth.x;
                slotgan.y = logoAuth.y + logoAuth.height;
                slotgan = this.fontSize(slotgan,logoAuth.width*0.5);
                this.loadGame.addChild(slotgan);
                slotgan.visible = false;


                let txt2 = "Fast, lightweight, smooth, and exciting ^_^";
                let slotgan2 = new PIXI.Text(txt2, {
                    fontFamily: 'Itim-Regular',
                    fontSize: 15,
                    fill: 0xFFFFFF,
                    fontWeight: 'bold',
                    align: 'center'
                });
                slotgan2.x = logoAuth.x;
                slotgan2.y = logoAuth.y + logoAuth.height;
                slotgan2 = this.fontSize(slotgan2,logoAuth.width*0.5);
                this.loadGame.addChild(slotgan2);
                slotgan2.visible = false;

                // typing text
                let i = 0;
                let slotganOffcial = new PIXI.Text('', {
                    fontFamily: 'Itim-Regular',
                    fontSize: 15,
                    fill: 0xFFFFFF,
                    fontWeight: 'bold',
                    align: 'center'
                });
                slotganOffcial.x = slotgan.x;
                slotganOffcial.y = slotgan.y;
                slotganOffcial.style.fontSize = slotgan.style.fontSize;
                this.loadGame.addChild(slotganOffcial);

                let run3 = () => {
                    i = 0;
                    slotganOffcial.x = slotgan2.x;
                    slotganOffcial.y = slotgan2.y;
                    slotganOffcial.style.fontSize = slotgan2.style.fontSize;
                    let time = setInterval(() => {
                        if(i < txt2.length) {
                            slotganOffcial.text += txt2[i];
                            i++;
                        }
                        else {
                            clearInterval(time);
                            setTimeout(() => {
                                self.WarningViewController();
                            }, 300);
                        }
                    }
                    , this.gameInfo.timeloadWelcome);
                }

                let run2 = () => {
                    let time = setInterval(() => {
                        let dai = slotganOffcial.text;
                        if(dai.length >=1) {
                            slotganOffcial.text = dai.substring(0, dai.length - 1);
                        }
                        else {
                            clearInterval(time);
                            run3();
                        }
                    }, this.gameInfo.timeloadWelcome);
                }

                let run1 = () => {
                    let time = setInterval(() => {
                        if(i < txt.length) {
                            slotganOffcial.text += txt[i];
                            i++;
                        }
                        else {
                            clearInterval(time);
                            setTimeout(() => {
                                run2();
                            }, 300);
                        }
                    }, this.gameInfo.timeloadWelcome);
                }

                run1();




                let madeWith = new PIXI.HTMLText('<font color="white">Made with</font> <a href="https://pixijs.com/"><font color="e72264"><b>PixiJS</b></font></a> ', {
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontWeight: 'bold',
                    align: 'center'
                });
                madeWith.y = logoAuth.height + logoAuth.y;
                madeWith.x = logoAuth.width + logoAuth.x - madeWith.width + 10 ;
                this.loadGame.addChild(madeWith);
                madeWith.alpha = 0;
                TweenMax.to(madeWith, 1, { alpha: 1, onComplete: () => {
                    //self.WarningViewController();
                    //self.ObjectCreatePageLoading();
                    
                }});
            })
            .start();
            
        }
        







        let version = new PIXI.Text('Client v. ' + this.gameInfo.version, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        version.y = this.gameHeight - version.height - 10;
        version.x = 10;
        this.loadGame.addChild(version);


        let PixiVersion = new PIXI.Text('Since04', {
            fontFamily: 'Arial',
            fontSize: 9,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        PixiVersion.y = this.gameHeight - PixiVersion.height - 5;
        PixiVersion.x = this.gameWidth - PixiVersion.width - 30;
        this.loadGame.addChild(PixiVersion);


        let PixijsHtml = new PIXI.Text('PixiJS v. ' + PIXI.VERSION, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        PixijsHtml.y = version.y - PixijsHtml.height;
        PixijsHtml.x = 10;
        this.loadGame.addChild(PixijsHtml);

        

        //setTimeout(callback, this.gameInfo.timeloadWelcome);


    }


    


    ObjectCreatePageLoading = () => {
        
        this.loadGame.removeChildren();
        let bg_loadGame = new PIXI.Graphics();
        bg_loadGame.beginFill(0x19b0f8);
        bg_loadGame.drawRect(0, 0, this.gameWidth, this.gameHeight);
        bg_loadGame.endFill();
        bg_loadGame.x = 0;
        bg_loadGame.y = 0;
        bg_loadGame.alpha = 1;
        bg_loadGame.visible = true;

        





        
        let logo = this.CreateLogo(bg_loadGame.width);
        logo.x = bg_loadGame.width / 2 - logo.width / 2;
        logo.y = bg_loadGame.height*0.5 - logo.height - 10;
        bg_loadGame.addChild(logo);


        let bgLoadText = new PIXI.Text('Đang tiến vào biển cả...', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x000000,
            fontWeight: 'bold',
        });

        bgLoadText.x = this.gameWidth / 100 * 50 - bgLoadText.width / 100 * 50;
        bgLoadText.y = this.gameHeight / 100 * 50 - bgLoadText.height / 100 * 50 + logo.height / 100 * 50 + 20;

        



        let textTip = ["Cấp kĩ năng càng cao, càng mạnh"];

        let bgLoadTip = new PIXI.Text(textTip[Math.floor(Math.random() * textTip.length)], {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x9d3130,
            fontWeight: 'bold',
        });
        bgLoadTip.name = "bgLoadTip";

        bgLoadTip.x = this.gameWidth / 100 * 50 - bgLoadTip.width / 100 * 50;
        bgLoadTip.y = this.gameHeight / 100 * 50 - bgLoadTip.height / 100 * 50 + logo.height / 100 * 50 + 20 + bgLoadText.height / 100 * 50 + 20;



        let newbackground = this.createBackGroundGame();

        this.loadGame.addChild(bg_loadGame,newbackground, bgLoadText, bgLoadTip);
        this.loadGame.visible = true;


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

        let w = this.gameWidth * 0.2;
        let h = this.gameHeight * 0.2;

        w = w > 80 ? 80 : w;
        h = h > 80 ? 80 : h;

        button.width = w;
        button.height = h;
        button.x = this.gameWidth - button.width - button.width;
        button.y = this.gameHeight - button.height - button.height;

        this.loadGame.addChild(button);


        let txtLoad = new PIXI.Text('Đang tải 0%', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xff0000,
            fontWeight: 'bold',
        });
        txtLoad.x = this.gameWidth / 2 - txtLoad.width / 2;
        txtLoad.y = bgLoadTip.y + bgLoadTip.height + 20;
        txtLoad.name = 'txtLoadgame';
        this.loadGame.addChild(txtLoad);

        txtLoad.visible = false;
        
        if(this.my.id == 0) {
            this.loginPage();
        }

    }


    






}