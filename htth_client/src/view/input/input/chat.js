let send_chat = (self,input) => {
    self.closeInput();
    if(input.length <=0) return false;
    if(input.length >= 150) return false;
    self.send(-7,[
        1,1,
        input
    ]);
}

let chat_zone = (self) => {
    let ui = {
        width : self.gameWidth*0.7,
        height : self.gameHeight*0.2,
    }
    ui.width = ui.width > 500 ? 500 : ui.width;
    ui.height = ui.height > 50 ? 50 : ui.height;

    let input = new PIXI.TextInput({
        input: {
            fontSize: '17px',
            padding: '10px',
            color: '#7a1125',
            width: ui.width ,
            height: ui.height,
        },
        box: {
            default: { fill: 0xeec385, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
            focused: { fill: 0xa7f2ac, rounded: 0, stroke: { color: 0xfff6eb, width: 1 } },
            disabled: { fill: 0xDBDBDB, rounded: 0 }

        }
    })
    input.placeholder = 'Chat...';
    self.input.addChild(input);

    input.x = (self.gameWidth - ui.width)/2;
    input.y = (self.gameHeight*0.8 - ui.height) - ui.height * 0.3;

    let send = () => {
        input.blur();
        send_chat(self,input.text);
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
}
export default chat_zone;