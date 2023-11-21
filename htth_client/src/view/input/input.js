import int04 from "../../main/int04.js";

import chat_zone from "./input/chat.js";
import chatworld from "./input/chatworld.js";
import testItem from "./input/testItem.js";
export  default  class inputMain extends  int04 {
    constructor() {
        super();
    }

    testItem = (name = null) => {
        return testItem(this,name);
    }
    closeInput = () => {
        this.deleteAllChild(this.input,false);
    }
    createInputBackground = () => {
        this.closeInput();
        let background = new PIXI.Graphics();
        background.beginFill(0x000000,0.00000001);
        background.drawRect(0,0,this.gameWidth,this.gameHeight);
        background.endFill();
        this.input.addChild(background);
    }

    inputChatZone = () => {
        if(this.box.children.length > 0) return false;
        if(this.input.children.length >=1) return false;
        this.createInputBackground();
        return chat_zone(this);
    }
    inputChatWorld = () => {
        if(this.input.children.length >=1) return false;
        this.createInputBackground();
        return chatworld(this);
    }

    div = (body,color = null,size = [1,1],maxsize = [null,null]) => {
        let width = size[0];
        let height = size[1];
        let maxW = maxsize[0];
        let maxH = maxsize[1];
        let sizeW = body.width * width;
        let sizeH = body.height * height;
        if(maxW) sizeW = sizeW > maxW ? maxW : sizeW;
        if(maxH) sizeH = sizeH > maxH ? maxH : sizeH;
        let intcolor = this.randomColor();
        if(color) intcolor = color;
        let background = new PIXI.Graphics();
        background.beginFill(intcolor,1);
        background.drawRect(0,0,sizeW,sizeH);
        background.endFill();
        body.addChild(background);
        return background;
    }

    max = (value,inMax) => {
        if(value > inMax) return inMax;
        return value;
    }

    randomColor = () => {
        let color = Math.floor(Math.random()*16777215).toString(16);
        color = '0x' + ('000000' + color).slice(-6);
        // to int
        color = parseInt(color);
        return color;
    }
}