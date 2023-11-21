import inputRun from "../view/input/run.js";

export default class keoMapUpdate extends inputRun {
    constructor() {
        super();
        this.holdCrcollXY();
        this.hold = false;
    }

    holdCrcollXY = () => {
        let preX = 0;
        let preY = 0;

        

        let data = this.game;
        data.interactive = true;
        let time = 0;

        data.on('pointerdown', (e) => {
            if(this.my.id >=1) {
                this.hold = true;
                preX = e.data.global.x;
                preY = e.data.global.y;
                let sprite = this.getSprite(this.my.id);
                this.camera.x = sprite.x;
                this.camera.y = sprite.y;

                // get position sprite on screen
                /*
                let position = sprite.toGlobal(new PIXI.Point(0, 0));
                let x = position.x;
                let y = position.y;
                this.camera.x += preX - x;
                this.camera.y += preY - y;
                */

            }
        }
        );

        data.on('pointermove', (e) => {

            if (this.hold) {
                let x = e.data.global.x;
                let y = e.data.global.y;
                this.camera.x += preX - x;
                this.camera.y += preY - y;
                preX = x;
                preY = y;
            }
        }
        );

        data.on('pointerup', (e) => {
            this.hold = false;
        }
        );

        data.on('pointerout', (e) => {
            this.hold = false;
        });

        data.on('pointerleave', (e) => {
            this.hold = false;
        });



    }
}