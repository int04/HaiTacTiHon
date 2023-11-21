import renderSMS from "./renderSMS.js";

/*
* @by : int04
* */

let send_Chat = (self, id,text) => {
    if(text.length <=0 || text.length >= 150) return false;
    if(id === -999) {
        self.send(-7,[
            1,1,
            text
        ]);
    }
    else {
        self.send(-7,[
            1,3,
            id,
            text
        ]);
    }
}

let view = (self, id) => {
    /*
   * id = -999 : notice system
   * id = -998 : notice world with play
   * id = -995 : message map with play
   * */
    let name_SMS = 'Tin đến';
    let my = self.my;
    let getObject = null;
    if(id >=1) {
        getObject = self.chat.sms.find(e => e.id === id);
        if(getObject) name_SMS = getObject.name;
        else name_SMS = 'Tin nhắn mới';
    }

    let backgroud =  self.backGroundBox();
    let ui1 = self.created_ui_1([],'int04',name_SMS);

    let body = self.box.getChildByName('body');

    body.div = 'body_SMS_'+id;


    let nen = new PIXI.Graphics();
    nen.beginFill(0x856c4e,1.5);
    nen.lineStyle(2,0x6a4b2a,1);
    nen.drawRect(0,0,body.width*0.95,body.height*0.95);
    nen.endFill();
    nen.div = 'nen_SMS_online';
    body.addChild(nen);
    nen.x = (body.width - nen.width) / 2;
    nen.y = (body.height - nen.height) / 2;

    self.maskPointDefault(nen);

    let render = new PIXI.Container();
    render.div = 'render_SMS_online';
    let re = self.viewPointDefault(nen,render,false);
    render.x = 15;
    re.div = 'scrollY_chat';

    if(id < 0) {
        let list = self.chat.all;
        list.forEach((e, i) => {
            let uid = e[0];
            let text = e[1];
            renderSMS(self, text);
        });
    }
    else if(getObject) {
        let list = getObject.data;
        list.forEach((e, i) => {
            list[i][2] = 0;
            let uid = e[0];
            let name = getObject.name;
            let font = null;
            if(uid === my.id) {
                name = my.name;
                font = '0x00ff00';
            }
            let text = name+': '+e[1];
            renderSMS(self, text,font);
        });
    }

    let max_height = nen.height * 0.4;
    max_height = max_height > 50 ? 50 : max_height;
    let input = new PIXI.TextInput({
        input: {
            fontSize: '17px',
            padding: '10px',
            color: '#7a1125',
            width: body.width * 0.99,
            height: max_height ,
        },
        box: {
            default: { fill: 0xeec385, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
            focused: { fill: 0xa7f2ac, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
            disabled: { fill: 0xDBDBDB, rounded: 0 }

        }
    })
    input.placeholder = 'Press enter to send...';

    input.y = body.height;
    input.x = (body.width - input.width) / 2;
    body.addChild(input);

    let send = () => {
        send_Chat(self,id,input.text);
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


    let created = (textx,event) => {
        let button_w = nen.width * 0.2;
        let button_h = input.height ;
        button_w = button_w > 70 ? 70 : button_w;
        button_h = button_h > 50 ? 50 : button_h;
        let button = new PIXI.Graphics();
        button.beginFill(0x716250);
        button.lineStyle(2, 0xf9f2d3, 1);
        button.drawRoundedRect(0, 0, button_w, button_h, 10);
        button.endFill();

        let text = new PIXI.Text(self._(textx), {
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



    let button2 = created('Xóa',() => {
        if(id === -999) {
            self.chipi('Xóa tin nhắn thành công');
            self.chat.all = [];
            view(self,id);
        }
        else {
            self.chipi('Xóa tin nhắn thành công');
            self.chat.sms = self.chat.sms.filter(e => e.id !== id);
            view(self,-999);
        }
    });
    button2.x = input.x - button2.width ;
    button2.y = input.y + input.height - button2.height;
    body.addChild(button2);
}
export default (self,id = -999) => {
    return view(self,id)
}