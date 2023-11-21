import animation from "./truct.js";

let time = 0;
let createSongBien = (self,delta = 0) => {
    time += delta;
    if(time < 20) return false;
    time = 0;
    // Tạo ngẫu nhiên hiệu ứng sóng biển
    let list = self.map.children.filter(e => e.type === 'animation');
    for(let i = 0; i < list.length; i++) {
        let item = list[i];
        item.run = item.run ? item.run : 0;
        if(item.run === 0 && self.rand(1,100) <= 10) {
            // tạo hiệu ứng sóng biển
            item.run = 1;
            let animatedSprite = animation('x2Main_Image_bg_redline1',48,336,7,0.2,false);
            animatedSprite.play();
            animatedSprite.x = item.x;
            animatedSprite.y = item.y;
            if(self.rand(1,100) <=10) {
                animatedSprite.scale.x = -1;
            }
            animatedSprite.width = item.width;
            animatedSprite.height = item.height;
            animatedSprite.onComplete = () => {
                animatedSprite.destroy();
                item.run = 0;
            };
            self.map.addChild(animatedSprite);
        }
    }
}

export  default  createSongBien;