export default (self,text, callOK, callCancel) => {

    self.noticeMain.removeChildren();
    self.noticeMain.visible = true;

    let background = new PIXI.Graphics();
    background.beginFill(0xFFFFFF,0.0000001);
    background.drawRect(0, 0, self.gameWidth, self.gameHeight);
    background.endFill();
    background.name = "background";
    self.noticeMain.addChild(background);
    background.interactive = true;

    let width = self.gameWidth * 0.7;
    width = width > 400 ? 400 : width;

    let hegit = self.gameHeight * 0.3;

    hegit = hegit > 100 ? 100 : hegit;


    let txt = new PIXI.Text(text, {
        align: "center",
        breakWords: true,
        fontSize: 15,
        whiteSpace: "normal",
        wordWrap: true,
        wordWrapWidth: width*0.8,
        fill: 0x000000,
        fontWeight: "bold",
    });
    txt.name = "notice";

    hegit+=txt.height;

    let ui = self.createUI(width,hegit, {
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

    ui.addChild(txt);
    txt.x = (ui.width - txt.width) / 2;
    txt.y = (ui.height - txt.height) / 2 - 20;

    let maxbutton = ui.width * 0.3;
    maxbutton = maxbutton > 100 ? 100 : maxbutton;
    let containerButton = new PIXI.Container();
    let space_x = 10;
    if(callOK) {
        let buttonOK = new PIXI.Graphics();
        buttonOK.beginFill(0x978165,1);
        buttonOK.lineStyle(3, 0x9c744b, 1);
        buttonOK.drawRoundedRect(0, 0, maxbutton, 30, 10);
        buttonOK.endFill();
        buttonOK.name = "buttonOK";
        space_x+=maxbutton;
        buttonOK.interactive = true;
        buttonOK.cursor = 'pointer';
        let textButton = new PIXI.Text('Đồng ý', {
            align: "center",
            breakWords: true,
            fontSize: 15,
            whiteSpace: "normal",
            wordWrap: true,
            wordWrapWidth: maxbutton,
            fill: 0xFFFFFF,
            fontWeight: "bold",
        });
        textButton.name = "textButton";
        textButton.x = (buttonOK.width - textButton.width) / 2;
        textButton.y = (buttonOK.height - textButton.height) / 2;
        buttonOK.addChild(textButton);

        let time = 0;
        buttonOK.on('pointerdown', () => {
            time = Date.now();
        });

        buttonOK.on('pointerup', () => {
            if(Date.now() - time < 200) {
                self.deleteNotice();
                if(callOK) callOK();
            }
        });

        containerButton.addChild(buttonOK);
    }

    let buttonClose = new PIXI.Graphics();
    buttonClose.beginFill(0x978165,1);
    buttonClose.lineStyle(3, 0x9c744b, 1);
    buttonClose.drawRoundedRect(0, 0, maxbutton, 30, 10);
    buttonClose.endFill();
    buttonClose.name = "buttonClose";
    buttonClose.x = space_x;
    buttonClose.interactive = true;
    buttonClose.cursor = 'pointer';
    let textButton = new PIXI.Text('Đóng', {
        align: "center",
        breakWords: true,
        fontSize: 15,
        whiteSpace: "normal",
        wordWrap: true,
        wordWrapWidth: maxbutton,
        fill: 0xFFFFFF,
        fontWeight: "bold",
    });
    textButton.name = "textButton";
    textButton.x = (buttonClose.width - textButton.width) / 2;
    textButton.y = (buttonClose.height - textButton.height) / 2;
    buttonClose.addChild(textButton);

    let time = 0;
    buttonClose.on('pointerdown', () => {
        time = Date.now();
    });

    buttonClose.on('pointerup', () => {
        if(Date.now() - time < 200) {
            self.deleteNotice();
            if(callCancel) callCancel();
        }
    });


    containerButton.addChild(buttonClose);
    containerButton.x = (ui.width - containerButton.width) / 2;
    containerButton.y = txt.y + 20 +  txt.height;
    containerButton.visible = true;

    ui.addChild(containerButton);

    ui.x = (self.gameWidth - ui.width) / 2;
    ui.y = (self.gameHeight*0.8 - ui.height);
    background.addChild(ui);

    background.visible = true;
    background.alpha = 0;
    // fade use tween
    TweenMax.to(background, 0.2, {
        alpha: 1,
        onComplete: () => {
            background.visible = true;
        }
    });
}