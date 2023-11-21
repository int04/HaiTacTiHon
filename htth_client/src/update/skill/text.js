import mobUpdateViewAttack from "./mob.js";


export default class updateTextView extends mobUpdateViewAttack {
    constructor(){
        super();
    }

    congexp = (element, delta ) => {
        let e = this.getSkill(element.id);
        let sprite = this.getSprite(element.from);
        if(!sprite) return;
        e.run = e.run || 0;
        if(e.run === 0) {
            e.run = 1;
            let value = element.value;
            let color = 0x339900;
            let text = new PIXI.Text("+"+value +" xp", {fontFamily : 'CherryBombOne-Regular', fontSize: 16, fill : color, align : 'center'});
            let x = sprite.x + sprite.pivot.x;
            let y = sprite.y + this.rand(0, sprite.height);

            text.x = x;
            text.y = y;
            text.style.stroke = "#000000";
            text.style.strokeThickness = 4;
            let update = () => {
                setTimeout(() => {
                    element.type = 'delete';
                    text.visible = false;
                }, 50);
            }

            this.move(text,
                    {
                        y: text.y - this.rand(90,150) - text.height,
                    },
                    500,
                    0,
                    0,
                    update
                )

            e.addChild(text);
        }
    }

    conghp = (element, delta ) => {
        let e = this.getSkill(element.id);
        let sprite = this.getSprite(element.from);
        if(!sprite) return;
        e.run = e.run || 0;
        if(e.run === 0) {
            e.run = 1;
            let value = element.value;
            let color = 0xCC0000;
            let type = element.who;
            if(type === 2) color = 0x0066FF;
            let bien = 'HP';
            if(type === 2) bien = 'MP';
            let text = new PIXI.Text("+"+value +" "+ bien, {fontFamily : 'CherryBombOne-Regular', fontSize: 20, fill : color, align : 'center'});
            let x = sprite.x + sprite.pivot.x;
            let y = sprite.y + this.rand(0, sprite.height);

            text.x = x;
            text.y = y;
            text.style.stroke = "#000000";
            text.style.strokeThickness = 4;
            let update = () => {
                setTimeout(() => {
                    element.type = 'delete';
                    text.visible = false;
                }, 50);
            }

            this.move(text,
                    {
                        y: text.y - this.rand(90,150) - text.height,
                    },
                    500,
                    0,
                    0,
                    update
                )

            e.addChild(text);
        }
    }

    tru_hp = (element, delta) => {
        let e = this.getSkill(element.id);
        let sprite = this.getSprite(element.from);
        if(!sprite) return;
        e.run = e.run || 0;
        if(e.run === 0) {
            this.setSkill({
                from : element.from,
                type : 'vangmau',
                key : this.randomAZ(10),
            })
            e.run = 1;
            let value = element.value;
            let color = 0xFFFFFF;
            let type = element.st;
            if(type === 2) color = 0x800080;
            if(type ===3) color = 0xFFFF00;
            let text = new PIXI.Text(value, {fontFamily : 'CherryBombOne-Regular', fontSize: 20, fill : color, align : 'center'});
            let x = sprite.x + sprite.pivot.x;
            let y = sprite.y + this.rand(0, sprite.height);

            text.x = x;
            text.y = y;
            text.style.stroke = "#000000";
            text.style.strokeThickness = 4;
            let update = () => {
                setTimeout(() => {
                    element.type = 'delete';
                    text.visible = false;
                    text.destroy();
                }, 100);
            }

            this.move(text,
                    {
                        y: text.y - this.rand(90,150) - text.height,
                    },
                    500,
                    0,
                    0,
                    update
                )

            e.addChild(text);
        }
    }
}