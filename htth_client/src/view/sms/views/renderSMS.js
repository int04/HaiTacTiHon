import lightSms from "./lightSms.js";

export default (self, text, font = null) => {
    let render = self.getDiv('render_SMS_online');
    if(render) {
        let nen = self.getDiv('nen_SMS_online');
        let  i = render.children.length;
        let space_Y = 10;
        let showText = new PIXI.Text(text, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: font === null ? '#ffffff' : font,
            align: 'left',
            wordWrap: true,
            wordWrapWidth: nen.width*0.95
        });
        showText.x = 0;
        showText.y = render.height + space_Y;
        render.addChild(showText);

        let viewpoint = self.getDiv('scrollY_chat');
        if(viewpoint) {
            viewpoint.moveCenterY( render.height);
        }
        lightSms(self);
    }
}