import keoMapUpdate from "./keoMap.js";

export default class updateMap extends keoMapUpdate {
    constructor() {
        super();
    }

    keomap = (delta) => {
        let map = this.gameMap.setting;
        let minX = map.minX;
        let maxX = map.maxX;
        let minY = map.minY;
        let maxY = map.maxY;
        let my = this.my;
        let b = 1;
        if(my.id >=1) {
            let NhanVat;
            if(this.hold) {
                NhanVat = this.camera;
            }
            else 
            {
                NhanVat = this.getSprite(my.id);
            }
            
            let container = this.container;

            let screenCenterX = this.gameWidth / 2;
            let screenCenterY = this.gameHeight / 2;



            let nhanVatX_set = NhanVat.x * (container.scale.x);
            let nhanVatY_set = NhanVat.y * (container.scale.y);
            // nhanVatY_set += -this.setKeoSpeed;
            let gameMap = this.gameMap;
    
    
    
            let speedContainer = 0.95;

    
    


            let newX = 0;
    
            if(NhanVat.x + screenCenterX >= gameMap.setting.maxX) {
                newX = -(gameMap.setting.maxX - screenCenterX * 2);
            } else if(NhanVat.x - screenCenterX <= gameMap.setting.minX) {
                newX = 0;

            } else {
                newX = (this.gameWidth / 2 - nhanVatX_set);
            }

            container.oldX = container.oldX || container.x; 
            container.Run = container.Run || 0;

            let createTweenX = () => {
                let time = 1.5;
                container.Tween = TweenMax.to(container, time, {
                    x: newX,
                    ease: Power4.easeOut,
                    onComplete: () => {
                        container.Run = 0;
                    }
                });
            }
            if(container.oldX != newX) {
                if(container.Run == 0) {
                    createTweenX();
                    container.oldX = newX;
                    container.Run = 1;
                }
                else {
                    container.Tween.kill();
                    
                    container.oldX = newX;
                    container.Run = 1;
                    createTweenX();
                }
            }
    
    
            let newY = 0;
            container.oldY = container.oldY || container.y;
            container.RunY = container.RunY || 0;

            let createTweenY = () => {
                container.TweenY = TweenMax.to(container, 1, {
                    y: newY,
                    ease: Power4.easeOut,
                    onComplete: () => {
                        container.RunY = 0;
                    }
                });
            }

    
            
            if(NhanVat.y - (this.gameHeight / 2) < gameMap.setting.minY) {
                this.setKeoSpeed = 0.5;
                newY = this.gameHeight * this.setKeoSpeed - nhanVatY_set;
                newY = 0 + this.may.height + this.nui1.height + this.nui2.height + this.bien.height;
    
            } else if(NhanVat.y + (this.gameHeight / 2) > gameMap.setting.maxY) {
                this.setKeoSpeed = 0.5;
                //newY = this.gameHeight * this.setKeoSpeed - nhanVatY_set;
                newY =    -(gameMap.setting.maxY - screenCenterY * 2);
            } else {
                newY = this.gameHeight * this.setKeoSpeed - nhanVatY_set;
            }

            if(container.oldY != newY) {
                if(container.RunY == 0) {
                    createTweenY();
                    container.oldY = newY;
                    container.RunY = 1;
                }
                else {
                    container.TweenY.kill();
                    container.oldY = newY;
                    container.RunY = 1;
                    createTweenY();
                }
            }


            if(this.vaomap === 1) {
                //container.y = 0;
                this.vaomap = 0;
                container.x = newX;
                container.y = newY;
                container.oldX = newX;
                container.oldY = newY;
            }


            this.background.y = container.y;

            let nui1Speed = 0.30;
            let backgroundContainer = this.nui1;

            let nhanVatX_setx = NhanVat.x * (backgroundContainer.scale.x);

            if (NhanVat.x + screenCenterX >= gameMap.setting.maxX) {
                backgroundContainer.x = -(gameMap.setting.maxX - screenCenterX * 2) * nui1Speed;
            } else if (NhanVat.x - screenCenterX <= gameMap.setting.minX) {
                backgroundContainer.x = 0;
            } else {
                backgroundContainer.x = (this.gameWidth / 2 - nhanVatX_set) * nui1Speed;
            }

            let nui2Speed = 0.20;
            let backgroundContainer2 = this.nui2;

            let nhanVatX_setx2 = NhanVat.x * (backgroundContainer2.scale.x);

            if (NhanVat.x + screenCenterX >= gameMap.setting.maxX) {
                backgroundContainer2.x = -(gameMap.setting.maxX - screenCenterX * 2) * nui2Speed;
            }
            else if (NhanVat.x - screenCenterX <= gameMap.setting.minX) {
                backgroundContainer2.x = 0;
            }
            else {
                backgroundContainer2.x = (this.gameWidth / 2 - nhanVatX_set) * nui2Speed;
            }

            let bienspeed = 0.15;
            let backgroundContainer3 = this.bien;

            let nhanVatX_setx3 = NhanVat.x * (backgroundContainer3.scale.x);

            if (NhanVat.x + screenCenterX >= gameMap.setting.maxX) {
                backgroundContainer3.x = -(gameMap.setting.maxX - screenCenterX * 2) * bienspeed;
            }

            else if (NhanVat.x - screenCenterX <= gameMap.setting.minX) {
                backgroundContainer3.x = 0;
            }

            else {
                backgroundContainer3.x = (this.gameWidth / 2 - nhanVatX_set) * bienspeed;
            }

            let mayspeed = 0.10;
            let backgroundContainer4 = this.may;

            let nhanVatX_setx4 = NhanVat.x * (backgroundContainer4.scale.x);

            if (NhanVat.x + screenCenterX >= gameMap.setting.maxX) {

                backgroundContainer4.x = -(gameMap.setting.maxX - screenCenterX * 2) * mayspeed;
            }

            else if (NhanVat.x - screenCenterX <= gameMap.setting.minX) {
                backgroundContainer4.x = 0;
            }

            else {
                backgroundContainer4.x = (this.gameWidth / 2 - nhanVatX_set) * mayspeed;
            }






        }
    }
}