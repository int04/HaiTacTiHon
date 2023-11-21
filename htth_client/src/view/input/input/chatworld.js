let chat = (self,text = '') => {
    self.closeInput();
    if(text.length <=0) return false;
    if(text.length >= 150) return false;
    let my = self.my;
    let tien = my.tien;
    if(tien.beri < 5 && tien.ruby < 50000) {
        return self.notice('Bạn cần 5 ruby hoặc 50.000 beri để chat thế giới');
    }
    self.send(-7,[
        1,2,
        text
    ]);
}
let chatworld = (self) => {
    let width = self.gameWidth * 0.8;
    let height = self.gameHeight * 0.5;

    width = width > 500 ? 500 : width;
    height = height > 300 ? 300 : height;

    let background = new PIXI.Graphics();
    background.beginFill(0x856c4e,1);
    background.lineStyle(2,0x6a4b2a,1);
    background.drawRect(0,0,width,height);
    background.endFill();
    background.x = (self.gameWidth - width) / 2;
    background.y = (self.gameHeight - height)*0.7;
    self.input.addChild(background);

    let top = self.div(background,0x856c4e,[0.99,0.3]);
    top.alpha = 1;
    let head = self.div(top,0xf2b64e,[0.8,0.5]);
    head.x = (top.width - head.width) / 2;
    head.y = (top.height - head.height) / 2;
    head.alpha = 1;
    let text = new PIXI.Text(self._('Chat thế giới'),{
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0xffffff,
        align: 'center'
    });
    text.x = (head.width - text.width) / 2;
    text.y = (head.height - text.height) / 2;
    head.addChild(text);

    let icon_close = self.animation("x2Main_Image_point_closetab",36,72,2);
    icon_close.animationSpeed = 1;
    icon_close.loop = false;
    icon_close.width = head.width > 36 ? 36 : head.width;
    icon_close.height = head.height > 36 ? 36 : head.height;
    head.addChild(icon_close);
    icon_close.x = head.width - icon_close.width/2;
    icon_close.y = head.height/2 - icon_close.height/2;
    icon_close.interactive = true;
    icon_close.cursor = 'pointer';
    let time = 0;
    icon_close.on('pointerdown',function() {
        time = Date.now();
        icon_close.gotoAndStop(1);
    });
    icon_close.on('pointerup',function() {
        icon_close.gotoAndStop(0);
        if(Date.now() - time < 200) {
            chat(self);
        }
    });

    let end = self.div(background,0x856c4e,[0.99,0.7]);
    end.alpha = 1;
    end.y = top.height;

    let container = new PIXI.Container();
    end.addChild(container);

    let text2 = new PIXI.Text(self._('Để chát thế giới sẽ cần 5 ruby hoặc 50.000 beri:'),{
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0xffffff,
        align: 'center'
    });
    container.addChild(text2);

    let input = new PIXI.TextInput({
        input: {
            fontSize: '17px',
            padding: '10px',
            color: '#7a1125',
            width: end.width * 0.8 ,
            height: self.max((end.height - text2.height) * 0.5,50),
        },
        box: {
            default: { fill: 0xeec385, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
            focused: { fill: 0xa7f2ac, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
            disabled: { fill: 0xDBDBDB, rounded: 0 }

        }
    })
    input.placeholder = 'Nội dung...';
    input.y = text2.height + 10;
    container.addChild(input);
    let send = () => {
        input.blur();
        chat(self,input.text);
        input.text = '';
    }
    setTimeout(() => {
        input.focus();
    },200);
    input.on('keyup', (e) => {
        if(e === 13) {
            send();
        }
    });


    container.x = (end.width - container.width) / 2;
    container.y = (end.height - container.height) / 2;

    let button = self.div(background,0x86715b,[0.5,0.3],[100,50]);
    button.alpha = 1;
    button.y = background.height;
    button.x =  (background.width - button.width) / 2;
    let text3 = new PIXI.Text(self._('Gửi'),{
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0xffffff,
        align: 'center'
    });
    text3.x = (button.width - text3.width) / 2;
    text3.y = (button.height - text3.height) / 2;
    button.addChild(text3);
    button.interactive = true;
    button.cursor = 'pointer';
    button.on('pointerdown',function() {
        send();
    });


}

export  default  chatworld;