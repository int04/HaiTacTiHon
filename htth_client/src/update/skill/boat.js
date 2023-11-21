
import animation from "./function/truct.js";
// tạo hiệu ứng sóng biển

let getNen = (self,id) => {
    let data = self.thuyenNen.getChildByName("thuyen_"+id);
    if(!data) {
        console.log(id)
        data = new PIXI.Container();
        data.name = "thuyen_"+id;
        self.thuyenNen.addChild(data);

        let body_thuyen = new PIXI.Sprite(self.coverImg('8000'));
        body_thuyen.name = "body_thuyen";
        body_thuyen.x = 0;
        body_thuyen.y = 0;
        body_thuyen.height = 80;
        body_thuyen.width = 230;
        data.addChild(body_thuyen);

        let cotbuon = new PIXI.Sprite(self.coverImg('8001'));
        cotbuon.name = "cotbuon";
        cotbuon.height = 220;
        cotbuon.width = 24;
        cotbuon.x = body_thuyen.width - cotbuon.width;
        cotbuon.y = body_thuyen.height/2 - cotbuon.height/2;

        body_thuyen.addChild(cotbuon);

        let canhbuon = self.animation('8002',152,296,2,0.5,true);
        canhbuon.name = "canhbuon";
        canhbuon.animationSpeed = 0.15;
        canhbuon.x = cotbuon.x - canhbuon.width/2;
        canhbuon.y = cotbuon.y;
        canhbuon.height = 150;
        canhbuon.width = 130;
        canhbuon.play();
        body_thuyen.addChild(canhbuon);

    }
    return data;
}

let getChe = (self,id) => {
    let data = self.thuyen.getChildByName("thuyen_"+id);
     if(!data) {
         let che = new PIXI.Container();
         che.name = "thuyen_"+id;
         self.thuyen.addChild(che);

         let body_che = new PIXI.Sprite(self.coverImg('8003'));
         body_che.name = "body_che";
         //body_che.anchor.set(0.5);
         body_che.x = 0;
         body_che.y = 0;
         body_che.height = 50;
         body_che.width = 185;
         che.addChild(body_che);
         data = che;
         // tạo hiệu ứng sóng biển dưới mũi thuyền
         let num = Math.ceil(body_che.width/100);
         let animationSea = animation("x2Main_Image_bg_boateff",156,48,2,0.1,true);
         animationSea.name = "animationSea";
         animationSea.x = 0;
         animationSea.y = body_che.height - animationSea.height/2;
         animationSea.play();
         animationSea.width = body_che.width - 0;
         animationSea.height = 48;
         che.addChild(animationSea);
     }
    return data;
}

let createSeaWhenMove = (self,sprite) => {
    // tạo hiệu ứng sóng khi con thuyền di chuyển...
    let e = self.getSkill(self.randomAZ(10),1);
    let createAnimation = animation("eff1",144,166,2,0.05,false);
    createAnimation.x = sprite.x;
    createAnimation.y = sprite.y + sprite.height - createAnimation.height/2;
    createAnimation.play();
    if(sprite.huong === 'right') {
        createAnimation.scale.x = -1;
    }
    createAnimation.onComplete = () => {
        TweenMax.to(createAnimation,0.5,{alpha:0,onComplete:()=>{
                createAnimation.destroy();
            }});
    }
    e.addChild(createAnimation);
}
export default (self,element,delta) => {

    let my = self.getMy(element.from);
    let sprite = self.getSprite(element.from);
    if(!my || !sprite) return false;
    let nen = getNen(self,element.from);
    let che = getChe(self,element.from);

    if(nen.scale.x !== -1 && sprite.width < 0) {
        nen.scale.x = -1;
        che.scale.x = -1;
    }
    if(sprite.width > 0 && nen.scale.x !== 1) {
        nen.scale.x = 1;
        che.scale.x = 1;
    }
    nen.x = sprite.x + sprite.pivot.x - sprite.width/2 - nen.width/2;
    nen.y = sprite.y + sprite.height*0.8 - 40;

    che.x = nen.x + ( 45)*nen.scale.x -  sprite.width/2  ;
    che.y =  nen.y + 30;
    if(sprite.sea === true) {
        sprite.sea = false;
        createSeaWhenMove(self,sprite);
    }

}