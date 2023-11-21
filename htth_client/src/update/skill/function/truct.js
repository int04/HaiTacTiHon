let animation = (link,w,h,farme,speed = 0.1, loop = false) => {
    return createAnimation(link,w,h/farme,farme,speed,loop);
}

let coverImg = (name) => {
    if(typeof name == 'number') name = name.toString();
    return PIXI.Texture.from('./assets/map/bien/' + name + '.png');
}
let createAnimation = (link,w,h,farme,speed = 0.1, loop = false) => {
    let texturegoc = new PIXI.Sprite(coverImg(link));
    let array = [];
    for (let i = 0; i < farme; i++) {
        let texture = new PIXI.Texture(texturegoc.texture, new PIXI.Rectangle(0, h*i, w, h));
        array.push(texture);
    }
    let animatedSprite = new PIXI.AnimatedSprite(array);
    animatedSprite.animationSpeed = speed;
    animatedSprite.loop = loop;
    return animatedSprite;
}

export  default  animation;