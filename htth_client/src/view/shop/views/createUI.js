
export default (self,tab,onclickChoose) => {
    let box = self.box;
    let w = box.w;
    let h = box.h;

    let h_max = h * 0.9;

    let _30 = w * 0.2;
    _30 = _30 > 50 ? 50 : _30;

    let background = new PIXI.Graphics();
    background.beginFill(0x000000, 0.0000000001);
    background.drawRect(0, 0, _30, h_max);
    background.endFill();
    background.interactive = true;
    background.x = (self.gameWidth - w) / 2;
    background.y = (self.gameHeight - h) / 2 + h * 0.1;
    box.addChild(background);
    background.alpha = 0;
    new TWEEN.Tween(background)
        .to({alpha: 1}, 500)
        .start();


    let space = 5;
    let TableName = '';
    tab.forEach((element,i) => {
        let img = element[0];
        let onclick = element[1];
        let name = element[2];
        let parma = element[3];
        let click = element[4];

        let height = background.height * 0.2;
        height = height > 48 ? 48 : height;
        let sprite = new PIXI.Sprite(self.coverImg(img));
        sprite.x = 0;
        sprite.y = 0 +  i * (height + space);
        sprite.width = height;
        sprite.height = height;
        sprite.interactive = true;
        sprite.cursor = 'help';
        background.addChild(sprite);
        if(onclick == onclickChoose) {
            TableName = name;
            // create circle alpha 0.5
            let circle = new PIXI.Graphics();
            circle.beginFill(0xffaa00, 0.8);
            circle.drawCircle(0, 0, height/2);
            circle.endFill();
            circle.x = sprite.x + height/2;
            circle.y = sprite.y + height/2;
            background.addChild(circle);
        }
        let time = 0;
        sprite.on('pointerdown', () => {
            time = Date.now();
        });
        sprite.on('pointerup', () => {
                if(Date.now() - time < 200) {
                    if(parma && parma !== undefined)
                        click(self,parma)
                    else
                        click(self,parma)
                }
            }
        );

    });

    let _70 = w - _30;

    let body = new PIXI.Graphics();
    body.beginFill(0xf8e4ad, 1);
    body.drawRect(0, 0, _70, h_max);
    body.endFill();
    body.interactive = true;
    body.x = (self.gameWidth - w) / 2 + _30;
    body.y = (self.gameHeight - h) / 2 + h * 0.1;
    box.addChild(body);
    body.name = 'body';

    let graphic_name = new PIXI.Graphics();
    graphic_name.beginFill(0xf2b64e, 1);
    graphic_name.drawRect(0, 0, _70, h*0.1);
    graphic_name.endFill();
    graphic_name.interactive = true;
    box.addChild(graphic_name);
    graphic_name.x = (self.gameWidth - w) / 2 + w - _70;
    graphic_name.y = 0;

    new TWEEN.Tween(graphic_name)
        .to({y: (self.gameHeight - h) / 2}, 500)
        .easing(TWEEN.Easing.Back.Out)
        .start();


    let graphic_name_text = new PIXI.Text(TableName, {fontFamily : 'Arial', fontSize: 15, fill : 0xffffff, align : 'center'});
    graphic_name_text.x = graphic_name.width / 2 - graphic_name_text.width / 2;
    graphic_name_text.y = graphic_name.height / 2 - graphic_name_text.height / 2;
    graphic_name.addChild(graphic_name_text);

    let buttonclose = new PIXI.Sprite(PIXI.Texture.from("./assets/ui/x2Main_Image_point_closetab.png"));
    let array = [];
    for(let i = 0; i < 2; i++){
        // animation
        let texture = new PIXI.Texture(buttonclose.texture, new PIXI.Rectangle(0, i * 36, 36, 36));
        array.push(texture);
    }

    let close = new PIXI.AnimatedSprite(array);
    close.anchor.set(0.5);
    close.name ="buttonclose";
    close.x = 0;
    close.y = graphic_name.height/2;
    close.animationSpeed = 0.1;
    close.loop = false;
    close.interactive = true;
    close.cursor = 'pointer';

    let time = 0;
    close.on('pointerdown', () => {
        time = Date.now();
    });
    close.on('pointerup', () => {
        if(Date.now() - time < 200){
            close.play();
            self.closeBox();
        }
    });

    graphic_name.addChild(close);

    new TWEEN.Tween(close)
        .to({x: graphic_name.width - close.width / 2}, 1000)
        .easing(TWEEN.Easing.Back.Out)
        .start();



}