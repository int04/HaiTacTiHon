import pressKeyInter from "./enter.js";
import pointer from "./pointer.js";
export default class keyPress extends pressKeyInter {
    constructor() {
        super();
        this.keypress = {};
        this.created_key();
    }

    created_key = () => {
        addEventListener('keydown', (e) => {
            this.keypress[e.keyCode] = true;
            let code = e.keyCode;
            if(code === 13) {
                this.interPress();
            }
            if(code === 115) {
                return       e.preventDefault();
            }
        });
        addEventListener('keyup', (e) => {
            let code = e.keyCode;
            if(code === 113) {
                e.preventDefault();
                this.changeClick();
            }
            if(code === 32) {
                this.testSprite();
            }
            if(code === 115) {
                this.testItem();
                return       e.preventDefault();
            }

            if(code === 82) this.inputChatZone();

            let name = e.key;
            this.pcKey = name;
            if(e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39) {
                if(this.my.id >=1) {
                    this.action(this.my.id,'dungyen');
                    let sprite = this.getSprite(this.my.id);
                    if(sprite) {
                        this.updateMoveToSocket(sprite.x,sprite.y);
                    }
                }
            }
            this.keypress[e.keyCode] = false;
            if(this.pointer !== null) {
                return pointer(this,e.keyCode);
            }
        }
        );
    }

}