import viewMessages from "./viewMessages.js";

export default (self, data) => {
    let id = data[0];
    let name = data[1];
    let text = data[2];

    let main = self.main;

    let width = self.gameWidth * 0.8;
    let height = self.gameHeight * 0.3;

    width = width > 200 ? 200 : width;
    height = height > 80 ? 80 : height;

    let box = new PIXI.Graphics();
    box.beginFill(0xa28e78, 1);
    box.lineStyle(3, 0x7b634a, 1);
    box.drawRect(0, 0, width, height);
    box.endFill();
    main.addChild(box);

    box.x = self.gameWidth / 2 - box.width / 2;
    self.maskPointDefault(box);


    let lopchua = new PIXI.Container();
    box.addChild(lopchua);


    let textName = new PIXI.Text(self._('Tin nhắn từ ')+name+':', {
    fontFamily: 'Arial',
    fontSize: 16,
    fill: 0xffffff,
    align: 'center',
    })
    textName.x = 5;
    textName.y = 5;
    lopchua.addChild(textName);

    let textSMS = new PIXI.Text(text, {
        fontFamily: 'Arial',
        fontSize: 15,
        fill: 0xffffff,
        align: 'center',
        wordWrap: true,
        wordWrapWidth:width*0.95,
    })

    textSMS.x = 5;
    textSMS.y = textName.y + textName.height + 5;
    lopchua.addChild(textSMS);

    box.interactive = true;
    box.cursor = 'pointer';
    box.on('pointerdown', () => {
        box.visible = false;
        return viewMessages(self, id);
    });

    box.y = -box.height;

    self.move(box, {
        y : 0
    },1000,TWEEN.Easing.Back.Out,null, () => {
        setTimeout(() => {
            self.move(box, {
                y : -box.height
            },1000,TWEEN.Easing.Back.Out,null, () => {
                self.deleteAllChild(box);
            });
        }, 1500);
    });
}