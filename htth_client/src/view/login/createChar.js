import viewAnimation from "./viewAnimation.js";
import selectChar from "./selectChar.js";

let btn_created_click = (self, name, he) => {
    if(!name) {
        return self.notice(self._('Bạn chưa nhập tên nhân vật'));
    }
    if(name.length < 5 || name.length >= 10) return self.notice(self._('Tên nhân vật phải từ 5 đến 10 ký tự'));

    if(he < 1 || he > 5) return self.notice(self._('Hãy chọn nhân vật bạn muốn đồng hành'));

    self.wait(self._('Đang tạo nhân vật...'));
    self.send(-1,[3,name, he]);
}

let chat = (msg) => {
    let bubblePadding = 10;
    const bubble = new PIXI.Graphics();
    bubble.name = 4;
    bubble.id = 3;
    bubble.uid = 555;


    const newmessage = new PIXI.Text(msg, {
        align: "center",
        breakWords: true,
        fontSize: 14,
        whiteSpace: "normal",
        wordWrap: true,
        wordWrapWidth: 150,
        fontWeight: "bold",
    });
    // text is center
    newmessage.anchor.set(0.5);

    newmessage.wordWrapWidth = 200 - bubblePadding * 2;
    newmessage.name = 'chat'
    newmessage.id = 'chat'
    newmessage.anchor.set(0.5);
    newmessage.time = 0;
    newmessage.dem = 0;

    bubble.addChild(newmessage);
    newmessage.position.set(bubble.width / 2, bubble.height / 2 );
    newmessage.resolution = 2;
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

    // trangle chat bottom bubble
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

    bubble.alpha = 0;
    TweenMax.to(bubble, 1, {
        alpha: 1,
        ease: Power0.easeNone,

    });
    bubble.interactive = true;
    bubble.cursor = 'pointer';
    bubble.on('pointerdown', () => {
        TweenMax.to(bubble, 0.5, {
            alpha: 0,
            ease: Power0.easeNone,

        });
    });
    return bubble;
}
let change = (self,type) => {
    let checkOLD = self.findText('nhanvat');
    if(checkOLD) {
        clearInterval(checkOLD.time);
        self.deleteAllChild(checkOLD);
    }
    let nameInput = self.findText("nameInput");
    let main = self.findText("main_created");
    let my = {};
    my.skin = {};
    let base = {
        ao : ["kFFosytneB","NjeYgxYqhI","HNbjvDRvQM","QTIydsakBM","dLwtvlNxiY"],
        tay : ["axDwxOtydX","KaVgueHoaP","axDwxOtydX","TKHxwNhWSU","CMnZavSAps"],
        lung : ["axDwxOtydX","axDwxOtydX","qMXbcUQWdM","axDwxOtydX","axDwxOtydX"],
        quan : ["QSHGPlNDTK","yEIqrdJLIw","TEjmlGHLxb","sFQjWHwTeb","dvuZmZtEqC"],
        toc : ["vAiaeYISIt","vAiaeYISIt","vAiaeYISIt","vAiaeYISIt","vAiaeYISIt"],
        dau : ['iLvVMIbTpy','iLvVMIbTpy','iLvVMIbTpy','iLvVMIbTpy','iLvVMIbTpy'],
        non : ['axDwxOtydX','axDwxOtydX','axDwxOtydX','axDwxOtydX','axDwxOtydX'],
    }
    for(let ten in base) {
        let array = base[ten];
        let index = type - 1;
        my.skin[ten] = array[index];
    }
    let nhanvat = viewAnimation(self,my.skin,'dungyen');
    nhanvat.name = 'nhanvat';
    nhanvat.id = 'nhanvat';

    nhanvat.x = nameInput.x + nameInput.width/2 - nhanvat.width/2;
    nhanvat.y = nameInput.y - 100 ;


    let msg = [
        'Một người võ sĩ giỏi là người biết sử dụng nắm đấm của mình để đấm bay kẻ thù. Ta là vua võ sĩ của biển cả.',
        'Hành trình trên biển không chỉ cần người mạnh mà còn cần người đầu bếp giỏi. Ta là một đầu bếp, ta có thể quét sạch mọi đối thủ chỉ bằng đôi chân của mình.',
        'Một hoa tiêu giỏi sẽ biết vận dụng thời tiết để tấn công kẻ thù. Ta là một hoa tiêu.',
        'Sử dụng kiếm là một trong những kỹ năng quan trọng nhất của một kiếm khách. Ngoài việc chém kẻ thù bằng thanh kiếm của mình, ta còn dùng chúng để gọt táo.',
        'Ta có hơn 80 triệu thuộc hạ, vũ khí của ta là một chiếc súng. Ta là một thuyền trưởng.',
    ];
    let chatShow = chat((msg[type-1] || 'Chào mừng đến với trò chơi !'));
    chatShow.name = 'chatShow';
    chatShow.id = 'chatShow';
    chatShow.x = nhanvat.width/2 ;
    chatShow.y = 0 - chatShow.height/2 - 10;
    chatShow.visible = true;
    main.addChild(nhanvat);
    nhanvat.addChild(chatShow);

}
export default (self, callback = []) => {

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

    let icon = [
        [10000,10005],
        [10000,10287],
        [10000,10326],
        [10000,10248],
        [10000,10406],
    ];
    let y = 50;
    let k = 0;
    let dem = 0;
    icon.forEach((e,r) => {
        let cirle_w =  background.height * 0.3;
        cirle_w = cirle_w > 30 ? 30 : cirle_w;
        let cicle = new PIXI.Graphics();
        cicle.beginFill( (r+1 === he ? 0x3f2b94 : 0x533d29));
        cicle.lineStyle(3, 0xc9b057, 1);
        cicle.drawCircle(0, 0, cirle_w);
        cicle.endFill();
        cicle.x = cirle_w;
        cicle.y = y + (cirle_w * 2 + 10) * k;
        cicle.name = 'cicle_'+(r+1);
        cicle.interactive = true;
        cicle.cursor = 'pointer';
        dem++;
        cicle.on('pointerdown', () => {
            let check = self.findText('cicle_'+he);
            if(check) {
                check.clear();
                check.beginFill(0x533d29);
                check.lineStyle(3, 0xc9b057, 1);
                check.drawCircle(0, 0, cirle_w);
                check.endFill();
            }
            he = r+1;
           change(self,r+1)
            let check2 = self.findText('cicle_'+he);
            if(check2) {
                check2.clear();
                check2.beginFill(0x3f2b94);
                check2.lineStyle(3, 0xc9b057, 1);
                check2.drawCircle(0, 0, cirle_w);
                check2.endFill();
            }
        });

        k++;
        background.addChild(cicle);
        let face = new PIXI.Sprite(self.coverImg(e[0]));
        face.scale.x = -1;
        face.width = cirle_w*1.3;
        face.height = cirle_w*1.3;
        face.anchor.set(0.5);
        face.x = cicle.x;
        face.y = cicle.y;
        background.addChild(face);
        let toc = new PIXI.Sprite(self.coverImg(e[1]));
        toc.scale.x = -1;
        toc.width = cirle_w*1.5;
        toc.height = cirle_w*1.5;
        toc.anchor.set(0.5);
        toc.x = cicle.x;
        toc.y = face.y - cirle_w/2 + toc.height * 0.2;
        background.addChild(toc);

    });

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

    let input_w = background.width * 0.7;
    let input_h = background.height * 0.2;
    input_w = input_w > 200 ? 200 : input_w;
    input_h = input_h > 50 ? 50 : input_h;
    let nameInput = new PIXI.TextInput({
        input: {
            fontSize: '17px',
            padding: '10px',
            color: '#7a1125',
            width: input_w,
            height: input_h,
        },
        box: {
            default: { fill: 0xeec385, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
            focused: { fill: 0xa7f2ac, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
            disabled: { fill: 0xDBDBDB, rounded: 0 }

        }
    })
    nameInput.placeholder = 'Tên nhân vật'
    nameInput.text = '';
    nameInput.name = 'nameInput';
    main.addChild(nameInput);
    nameInput.x = main.width/2 - nameInput.width/2;
    nameInput.y = main.height*0.75 - nameInput.height/2;

    change(self,he);

    let button_w = main.width * 0.3;
    let button_h = main.height * 0.2;
    button_w = button_w > 100 ? 100 : button_w;
    button_h = button_h > 50 ? 50 : button_h;

    let created = (textx,event) => {
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

    let button_created = created('Tạo', () => {
        nameInput.blur();
        btn_created_click(self,nameInput.text,he);

    });
    button_created.x = 0;
    button_created.y = main.height - button_created.height;
    main.addChild(button_created);

    let button_back = created('Trở về', () => {
        selectChar(self, callback);

    });
    button_back.x = main.width - button_back.width;
    button_back.y = main.height - button_back.height;
    main.addChild(button_back);

}