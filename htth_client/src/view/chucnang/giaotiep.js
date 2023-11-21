import chatController from "../sms/chatController.js";


export default class giaotiepView extends chatController {
    constructor() {
        super();
        
    }

    closeGiaoTiep = () => {
        this.deleteAllChild(this.boxGiaoTiep,false);
        return false;
        let backgound = this.boxGiaoTiep.getChildByName("backgound");
        if(backgound) {
            let khung = backgound.getChildByName("khung");
            let textGiaoTiep2 = backgound.getChildByName("textGiaoTiep2");
            if(textGiaoTiep2) {
                textGiaoTiep2.destroy();
            }
            let namenpc = backgound.getChildByName("namenpc");
            if(namenpc) {
                new TWEEN.Tween(namenpc)
                .to({ x: 0 - namenpc.width }, 100)
                .easing(TWEEN.Easing.Back.InOut)
                .start().onComplete(() => {
                    namenpc.destroy();
                });
            }
            if(khung) {
                // move khung to y = 0 and remove
                new TWEEN.Tween(khung)
                    .to({ y: 0 - khung.height }, 100)
                    .easing(TWEEN.Easing.Back.InOut)
                    .start().onComplete(() => {
                        khung.destroy();
                    });
                
            }

            let button = backgound.getChildByName("button");
            if(button) {
                // move button to y = 0 and remove
                new TWEEN.Tween(button)
                    .to({ x: this.gameWidth }, 100)
                    .easing(TWEEN.Easing.Back.InOut)
                    .start().onComplete(() => {
                        button.destroy();
                        this.deleteAllChild(this.boxGiaoTiep,false);
                    });
            }
        }

    }

    giaoTiep = (data) => {
        if(!data) return false;
        if(this.boxGiaoTiep.children.length > 0) return false;
        this.boxGiaoTiep.removeChildren();
        let backgound = new PIXI.Graphics();
        backgound.beginFill(0x000000, 0.000001);
        backgound.drawRect(0, 0, this.gameWidth, this.gameHeight);
        backgound.endFill();
        this.boxGiaoTiep.addChild(backgound);
        backgound.interactive = true;
        backgound.name = "backgound";
        let height = this.gameHeight * 0.3;
        let width = this.gameWidth * 0.9;

        height = height > 150 ? 150 : height;
        width = width > 500 ? 500 : width;

        let khung = new PIXI.Graphics();
        khung.beginFill(0x856c4e, 1);
        khung.lineStyle(2.5, 0x6a4b2a, 1);
        khung.drawRect(0, 0, width, height);
        khung.endFill();
        khung.x = (this.gameWidth - width) / 2;
        khung.y = (this.gameHeight *  0.8 - height);
        backgound.addChild(khung);
        khung.interactive = true;
        khung.name = "khung";
        khung.alpha = 0;

        let nameNPCTest = new PIXI.Text(data.name, {
            fontFamily: "Arial",
            fontSize: 16,
            fill: "white",
            align: "left",
        });

        let border = new PIXI.Graphics();
        let wb = nameNPCTest.width + 30;
        let hb = nameNPCTest.height + 10;
        border.beginFill(0x856c4e, 1);
        border.lineStyle(1, 0x6a4b2a, 1);
        border.drawRect(0, 0, wb, hb);
        border.endFill();
        border.name ="namenpc";
        border.x = this.gameWidth;
        border.y = khung.y - border.height - 3;
        let txt = new PIXI.Text(data.name, {
            fontFamily: "Arial",
            fontSize: 16,
            fill: 0xfbfd3b,
            align: "left",
        });
        txt.x = border.width / 2 - txt.width / 2;
        txt.y = border.height / 2 - txt.height / 2;
        border.addChild(txt);
        backgound.addChild(border);

        // tween border
        new TWEEN.Tween(border)
            .to({ x: khung.x }, 200)
            .easing(TWEEN.Easing.Back.InOut)
            .start()
            .onComplete((res =>  {
                let create_button = () => {
                    let list = [

                    ];

                    if(data.event) {
                        data.event.forEach(element => {
                            list.push(element)
                        });
                    }

                    list.push(['Đóng','close']);
                    let w = this.gameWidth * 0.2;
                    let h = this.gameHeight * 0.2;
                    w = w > 100 ? 100 : w;
                    h = h > 60 ? 60 : h;

                    let button = new PIXI.Graphics();
                    button.beginFill(0x000000, 0.0000001);
                    button.name = "button";
                    button.drawRect(0, 0, khung.width, h);
                    button.endFill();
                    backgound.addChild(button);

                    let hienthinoidung = this.mask(button,button);

                    list.forEach((element,i) => {

                        let space = 10;
                        let newbutton = new PIXI.Graphics();
                        newbutton.beginFill(0x856c4e, 1);
                        newbutton.lineStyle(2.5, 0x6a4b2a, 1);
                        newbutton.drawRect(0, 0, w, h);
                        newbutton.endFill();
                        newbutton.x = i * (w + space);
                        hienthinoidung.addChild(newbutton);
                        newbutton.keycode = 'int04';

                        let text = new PIXI.Text(element[0], {
                                fontFamily: "Arial",
                                fontSize: 16,
                                fill: "white",
                                align: "center",
                                wordWrap: true,
                                wordWrapWidth: w - 10
                            }
                        );
                        text.x = newbutton.width / 2 - text.width / 2;
                        text.y =newbutton.height / 2 - text.height / 2;
                        newbutton.addChild(text);

                        newbutton.interactive = true;
                        newbutton.cursor = "pointer";
                        let time = 0;
                        newbutton.on("pointerdown", () => {
                            time = Date.now();
                        });
                        newbutton.on("pointerup", () => {
                            if(Date.now() - time < 200) {
                                if(element[1] === 'close') {
                                    this.closeGiaoTiep();
                                }
                                else
                                if(element[1] === 'element') {
                                    this.openShowMenu(element[0],element[2]);
                                }
                                else {
                                    this[element[1]]((element[2] !== undefined ? element[2] : []));
                                }
                            }
                        });

                    });




                    button.addChild(this.intX(button,hienthinoidung));

                    button.x =0 - this.gameWidth;
                    button.y = khung.y + khung.height + 5;

                    if(button.y + button.height > this.gameHeight) {
                        button.y -=  button.y + khung.height  - this.gameHeight;
                    }



                    new TWEEN.Tween(button)
                        .to({ x: khung.x + khung.width / 2 - button.width / 2 }, 500)
                        .easing(TWEEN.Easing.Back.InOut)
                        .start().onComplete(() => {

                    });





                }




                let text = "";
                let int = data.giaotiep;
                let num = this.rand(0,int.length-1);

                text = int[num];
                // tween
                new TWEEN.Tween(khung)
                    .to({ alpha: 1 }, 500)
                    .start().onComplete(() => {

                    // create and typeing text
                    let textGiaoTiep = new PIXI.Text(text, {
                            fontFamily: "Arial",
                            fontSize: 16,
                            fill: "white",
                            align: "left",
                            wordWrap: true,
                            wordWrapWidth: width - 20
                        }
                    );
                    textGiaoTiep.x = khung.x + khung.width / 2 - textGiaoTiep.width / 2;
                    textGiaoTiep.y = khung.y + 10;

                    // create a running text effect
                    let textGiaoTiep2 = new PIXI.Text("", {
                            fontFamily: "Arial",
                            fontSize: 16,
                            fill: "white",
                            align: "left",
                            wordWrap: true,
                            wordWrapWidth: width - 20
                        }
                    );
                    textGiaoTiep2.x = khung.x + khung.width / 2 - textGiaoTiep.width / 2;
                    textGiaoTiep2.y = khung.y + 10;
                    backgound.addChild(textGiaoTiep2);
                    textGiaoTiep2.name = "textGiaoTiep2";


                    let index = 0;
                    let text2 = "";
                    let fps = this.app.ticker.FPS;
                    let length = text.length;
                    let time = length / fps * 1000;
                    let done = 0;
                    let interval = setInterval(() => {
                            if(this.boxGiaoTiep.children.length == 0){
                                clearInterval(interval);
                            }
                            if (index < text.length) {
                                text2 += text[index];
                                textGiaoTiep2.text = text2;
                                index++;
                            } else {
                                clearInterval(interval);
                                done = 1;
                            }
                        }
                        , 25);

                    khung.on("pointerdown", () => {
                        if(done !=1) {
                            clearInterval(interval);
                            textGiaoTiep2.text = text;
                            done = 1;
                        }
                    });
                });


                create_button();
            }));







    }
}