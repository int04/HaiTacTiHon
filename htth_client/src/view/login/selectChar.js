import viewAnimationSelect from "./viewAnimationSelect.js";
import createChar from "./createChar.js";

let selectChar =(self, id) => {
    self.wait('Đang tiến vào biển cả....');
    self.send(-1,[2,id]);
}
export default  async  (self,data) => {

    let he = 1;

    self.loadGame.visible = false;
    self.main.visible = false;
    self.mainLogin.visible = true;
    self.mainLogin.removeChildren();

    let background = new PIXI.Graphics();
    background.beginFill(0x19b0f8);
    background.drawRect(0, 0, self.gameWidth, self.gameHeight);
    background.endFill();
    self.mainLogin.addChild(background);

    let backgroundGame = self.createBackGroundGame();
    background.addChild(backgroundGame);



    let main = new PIXI.Graphics();
    main.beginFill(0x533d29,0.00001);
    main.lineStyle(1, 0xc9b057, 1);
    main.drawRoundedRect(0, 0, self.gameWidth, self.gameHeight, 10);
    main.endFill();
    main.x = 0;
    main.y = 0;
    background.addChild(main);
    main.name = 'main_created';

    let logo = self.CreateLogo(main.width);
    logo.x = main.width / 2 - logo.width / 2;
    logo.y = +30;
    main.addChild(logo);


    let created = (textx,event) => {
        let button_w = main.width * 0.3;
        let button_h = main.height * 0.2;
        button_w = button_w > 70 ? 70 : button_w;
        button_h = button_h > 30 ? 30 : button_h;
        let button = new PIXI.Graphics();
        button.beginFill(0x716250);
        button.lineStyle(2, 0xf9f2d3, 1);
        button.drawRoundedRect(0, 0, button_w, button_h, 10);
        button.endFill();

        let text = new PIXI.Text(textx, {
            align: "center",
            breakWords: true,
            fontSize: 14,
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

    let container_nhanvat = new PIXI.Container();
    main.addChild(container_nhanvat);

    let width_3 = 30 * 3;
    let wdith_con = main.width - width_3;
    let button_wx = wdith_con/3;
    self.wait('Đang tải hình ảnh....');


    let o = [0,1,2];
    for(let x of o) {
        let i = x;
        let caibong = new PIXI.Sprite(self.coverImg('x2Main_Image_interface_shadow'));
        caibong.x = i *  button_wx;
        caibong.y = 0;
        if(i === 1) caibong.y = -50;
        container_nhanvat.addChild(caibong);
        if(data[i]) {
            let json = data[i];
            if(json.last  && self.cache.login.select === false) {
                self.cache.login.select = true;
                selectChar(self,json.id);
            }
            let nhanVat = await viewAnimationSelect(self,json);
            nhanVat.x = caibong.x + nhanVat.width/2 - 10;
            nhanVat.y = caibong.y + caibong.height - nhanVat.height;
            container_nhanvat.addChild(nhanVat);
            let text = {align: "center",
                breakWords: true,
                fontSize: 16,
                whiteSpace: "normal",
                fontWeight: "bold",
                fill: 0xFFFFFF,};
            let name = new PIXI.Text(json.name, text);
            name.anchor.set(0.5);
            name.x = caibong.x + caibong.width/2;
            name.y = nhanVat.y - name.height;
            name.style.stroke = '#000000';
            name.style.strokeThickness = 4;
            container_nhanvat.addChild(name);
            let level = new PIXI.Text('Lv.' + json.level, text);
            level.anchor.set(0.5);
            level.x = caibong.x + caibong.width/2;
            level.y = name.y - level.height;
            level.style.stroke = '#000000';
            level.style.strokeThickness = 1;
            container_nhanvat.addChild(level);

            nhanVat.interactive = true;
            nhanVat.cursor = 'pointer';
            let timeclick = 0;
            nhanVat.on('pointerdown', () => {
                timeclick = Date.now();
            });
            nhanVat.on('pointerup', async () => {
               if(Date.now() - timeclick < 200) {

                   let setSprite = async (action = 'dungyen') => {
                       clearInterval(nhanVat.time);
                       self.deleteAllChild(nhanVat);
                       nhanVat = await viewAnimationSelect(self,json,action);
                       nhanVat.x = caibong.x + nhanVat.width/2 - 10;
                       nhanVat.y = caibong.y + caibong.height - nhanVat.height;
                       container_nhanvat.addChild(nhanVat);
                   }
                   setSprite('a1');
                   setTimeout(() => {
                       setSprite('a11');
                       nhanVat.visible = false;
                       selectChar(self,json.id);
                   },50);
               }
            });
        }
        else {
            let button = created('Tạo', () => {
                createChar(self,data);
            });
            button.x = caibong.x + caibong.width/2;
            button.y = caibong.y - caibong.height - button.height*2;
            container_nhanvat.addChild(button);

        }
    }


    container_nhanvat.x = main.width/2 - container_nhanvat.width/2;
    container_nhanvat.y = main.height*0.75 - container_nhanvat.height/2;

    self.deleteNotice();

    let button_back = created('Thoát', () => {
        self.loginPage();
    });
    button_back.x = main.width - button_back.width;
    button_back.y = main.height - button_back.height;
    main.addChild(button_back);

}