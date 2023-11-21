import renderKinangUpdate from "./renderkinang.js";

export  default class chipiUpdate extends  renderKinangUpdate {
    constructor() {
        super();
        this.logChipi = [];
    }

    chipi = (txt) => {
        if(this.logChipi.find(x => x == txt)) return;
        if(this.chipiBox.children.length >=1) {
            let container = this.chipiBox.getChildByName("chipi");
            let chipiMsg = container.getChildByName("chipi_msg");
            let mess = chipiMsg.getChildByName("chipi_txt");
            if(mess.text == txt) return;

        }
        this.logChipi.push(txt);
    }

    chipiView = (delta = 0) => {
        if(this.my.id <=0) return false;
        if(this.logChipi.length >=1 && this.chipiBox.children.length <=0) {
            let txt = this.logChipi[0];
            this.logChipi.shift();
            let container = new PIXI.Container();
            container.name = "chipi";
            this.chipiBox.addChild(container);

            let chipiSrc = this.animation('7320',100,500,5,0.3,true);
            chipiSrc.play();
            chipiSrc.name = "chipi_img";
            container.addChild(chipiSrc);
            chipiSrc.width = 70;
            chipiSrc.height = 70;
            chipiSrc.x = this.gameWidth /2;
            const bubblePadding = 10;
            const bubble = new PIXI.Graphics();
            bubble.name = "chipi_msg";

            const textStyle = new PIXI.TextStyle({
                align: "center",
                breakWords: true,
                fontSize: 14,
                whiteSpace: "normal",
                wordWrap: true,
                wordWrapWidth: 150,
                fontWeight: "bold",
            });
            // caculator text width and break line


            const newmessage = new PIXI.Text(txt, textStyle);


            newmessage.wordWrapWidth = 200 - bubblePadding * 2;
            newmessage.resolution = 2;
            newmessage.anchor.set(0.5);
            bubble.addChild(newmessage);
            newmessage.name = "chipi_txt";
            newmessage.position.set(bubble.width / 2, bubble.height / 2 );

            bubble.lineStyle(1, 0x000000, 3)
            bubble.beginFill(0xfebd6c);

            bubble.drawRoundedRect(
                -bubblePadding,
                -bubblePadding,
                newmessage.width + bubblePadding * 2 < 150 ?
                    150 :
                    newmessage.width + bubblePadding * 2,
                newmessage.height + bubblePadding * 2 < 50 ?
                    50 :
                    newmessage.height + bubblePadding * 2,
                10
            );
            bubble.endFill();

            bubble.pivot.set(bubble.width / 2, bubble.height / 2);
            bubble.visible = false;

            const trangle = new PIXI.Graphics();
            trangle.beginFill(0xfebd6c);
            trangle.lineStyle(1, 0x000000, 3)
            trangle.moveTo(0, 0);
            trangle.lineTo(10, 10);
            trangle.lineTo(20, 0);
            trangle.endFill();
            trangle.pivot.set(trangle.width / 2, trangle.height / 2);
            trangle.position.set(bubble.width / 2 - trangle.width/2, bubble.height - trangle.height + 4  );
            bubble.addChild(trangle);



            container.addChild(bubble);
        }

        if(this.chipiBox.children.length >=1) {
            let nhanVat = this.getSprite(this.my.id);
            if(!nhanVat) return;
            (nhanVat.huong = nhanVat.huong || 'left');

            let container = this.chipiBox.getChildByName("chipi");
            let chipiSrc = container.getChildByName("chipi_img");
            let chipiMsg = container.getChildByName("chipi_msg");
            let mess = chipiMsg.getChildByName("chipi_txt");
            container.time = container.time || 0;
            container.time += delta;
            container.chipi = container.chipi || 1;

            if(this.chipiBox.have === 1)
            {
                this.chipiBox.have = 0;
                container.chipi = 2;
                chipiMsg.visible = true;

            }
            let charPos = nhanVat.getGlobalPosition();


            chipiSrc.stop = chipiSrc.stop || 1;
            if(nhanVat.huong === 'right')
            {
                chipiSrc.scale.x = 1;
                chipiSrc.width = 70;
            }
            else
            if(nhanVat.huong === 'left')
            {
                chipiSrc.scale.x = -1;
                chipiSrc.width = 70;
            }

            let newX = nhanVat.huong === 'right' ? charPos.x - Math.abs(nhanVat.width) - chipiSrc.width + nhanVat.pivot.x : charPos.x + nhanVat.width + chipiSrc.width;



            if(container.chipi === 1)
            {
                chipiSrc.y = 0;
                let yto = charPos.y - chipiSrc.height;
                chipiSrc.x = newX;
                new TWEEN.Tween(chipiSrc).to({y: yto}, 300,createjs.Ease.easeOutQuad).start().onComplete(() => {
                    chipiMsg.visible = true;
                    container.chipi = 2;
                });
                container.chipi = 999;

            }


            if(container.chipi === 2)
            {
                chipiSrc.huong = chipiSrc.huong || nhanVat.huong;


                if(chipiSrc.huong !== nhanVat.huong) {
                    chipiSrc.stop = 5;
                    chipiSrc.huong = nhanVat.huong;
                    new TWEEN.Tween(chipiSrc).to({x: newX}, 300,createjs.Ease.easeOutQuad).start().onComplete(() => {
                        chipiSrc.stop = 1;
                    });
                }

                if(chipiSrc.stop === 5) {
                    chipiMsg.visible = false;
                }
                else {
                    chipiMsg.visible = true;
                    chipiSrc.x = charPos.x;
                    if(nhanVat.huong === 'right')
                    {
                        chipiSrc.x = charPos.x - Math.abs(nhanVat.width) - chipiSrc.width + nhanVat.pivot.x;
                        chipiSrc.scale.x = 1;
                        chipiSrc.width = 70;
                    }
                    else
                    if(nhanVat.huong === 'left')
                    {
                        chipiSrc.scale.x = -1;
                        chipiSrc.width = 70;
                        chipiSrc.x = charPos.x + nhanVat.width + chipiSrc.width;
                    }
                }

                let yto = charPos.y - chipiSrc.height;

                let ytiep = yto - mess.height;
                if(ytiep < 0) yto = 0 + mess.height + chipiSrc.height;

                chipiSrc.y = yto;
                chipiMsg.position.y = chipiSrc.y - (mess.height + 10 * 2) / 2 - 1;

                if(nhanVat.huong === 'right')
                {
                    chipiMsg.x = chipiSrc.x - Math.abs(chipiSrc.width)/2 + mess.width / 2 + Math.abs(chipiSrc.width/2);
                }
                else
                {
                    chipiMsg.x = chipiSrc.x + Math.abs(chipiSrc.width)/2 - mess.width / 2 - Math.abs(chipiSrc.width/2) + + Math.abs(chipiSrc.width/2);
                }




            }

            if(container.time >= 200 )
            {
                let txt2 = this.logChipi[0];
                if(txt2)
                {
                    this.chipiBox.removeChild(container);
                    this.chipiBox.have = 1;
                }
                else
                {
                    chipiMsg.visible = false;
                    if(container.chipi == 2)
                    {
                        container.chipi = 3;
                        TweenMax.to(chipiSrc, 0.5, {y: -1, onComplete: () => {
                                this.chipiBox.removeChild(container);
                            }
                        });

                    }
                }


            }


        }
    }


}