import moveUpdate from "../../update/move.js";

export default class viewPointY extends moveUpdate {
    constructor() {
        super();
    }

    boxBaseMask = (body, background) => {
        let hienthinoidung = new PIXI.Container();
        let mask = new PIXI.Graphics();
        mask.beginFill(0x000000, 0.5);
        mask.drawRect(0, 0, body.width * 0.99, background.height);
        mask.endFill();
        hienthinoidung.name = "tabname";
        hienthinoidung.mask = mask;
        return hienthinoidung;
    }

    mask = (body, background) => {
        let hienthinoidung = new PIXI.Container();
        let mask = new PIXI.Graphics();
        mask.beginFill(0x000000, 1);
        mask.drawRect(0, 0, background.width, background.height);
        mask.endFill();
        mask.y = background.y;
        hienthinoidung.mask = mask;
        body.addChild(mask);
        return hienthinoidung;

    }

    maskPointDefault = (body) => {
        let mask = new PIXI.Graphics();
        mask.beginFill(0xffffff, 0.00000001);
        mask.drawRect(0, 0, body.width, body.height);
        mask.endFill();
        body.mask = mask;
        body.addChild(mask);
    }

    viewPointDefault = (body,text, created = true) => {

        if(text.height < body.height && created) {
            let height = body.height - text.height;
            let newpxi = new PIXI.Graphics();
            newpxi.beginFill(0x000000, 0.000000000800001);
            newpxi.drawRect(0, 0, body.width, height);
            newpxi.endFill();
            newpxi.x = 0;
            newpxi.y = text.height;
            text.addChild(newpxi);

        }

        let viewport = new pixi_viewport.Viewport({
            screenWidth: body.width,
            screenHeight: body.height * 0.95,
            worldWidth: body.width,
            worldHeight: text.height ,
        });
        viewport.name = "viewport";
        viewport
            .drag({
                direction: 'y',
                pressDrag: true,
                factor: 1,

            })
            .decelerate({
                friction: 0.95,
                bounce: 0.8,
                minSpeed: 0.01,
            })
        viewport.bounce({
            top: true,
            bottom: true,
            friction: 0.5,
            time: 3.5,
            ease: 'easeInOutSine',
        });

        // set left


        viewport.addChild(text);
        body.addChild(viewport);

        return viewport;
    }

    

    getAllInteractiveChildren = (container) => {

        let interactiveChildren = [];
        if(container == undefined) return false;
        if(container.interactive) {
            interactiveChildren.push(container);
        }
        if(container.children && container.children.length > 0) {
            container.children.forEach(child => {
                if(child instanceof PIXI.Container) {
                    const childInteractiveChildren = this.getAllInteractiveChildren(child);
                    interactiveChildren = interactiveChildren.concat(childInteractiveChildren);
                }
            });
        }

        return interactiveChildren;
    }

    findInteractiveObjects = (container) => {
        if(typeof container != 'object') return false;
        let children = container;
        let interactive = [];

        let ChinhNO = (c) => {
            if(c.interactive) interactive.push(c);
        }

        let findChildren = (children) => {
            if(undefined == children) return false;
            if(typeof children != 'object') {
                if(children.interactive) return ChinhNO(children);
                return false;
            }
            for(let i = 0; i < children.length; i++) {
                if(children[i].interactive) interactive.push(children[i]);
                if(children[i].children.length > 0) findChildren(children[i].children);
            }
        }

        if(children.interactive) {
            interactive.push(children);
        }

        findChildren(children.children);
        return interactive;
    }

    intY = (backgroundbody,hienthinoidung) => {
        let viewport = new pixi_viewport.Viewport({
            screenWidth: backgroundbody.width,
            screenHeight: backgroundbody.height,
            worldWidth: hienthinoidung.width,
            worldHeight: hienthinoidung.height ,
        });
        viewport.name = "viewport";
        viewport
            .drag({
                direction: 'y',
                pressDrag: true,
                factor: 1,

            })
            .decelerate({
                friction: 0.95,
                bounce: 0.8,
                minSpeed: 0.01,
            })
        viewport.bounce({
            top: true,
            bottom: true,
            friction: 0.5,
            time: 3.5,
            ease: 'easeInOutSine',
        });

        viewport.setZoom(1); 
        viewport.addChild(hienthinoidung);


        let pointerStartTime = 0;
        let point = -1;
        viewport.on('pointerdown', (event) => {
            pointerStartTime = Date.now();
        });

        viewport.on("pointerup", (event) => {
            if(Date.now() - pointerStartTime < 200) {
                let x = event.data.global.x;
                let y = event.data.global.y;
                let pointMenu = hienthinoidung.toLocal(new PIXI.Point(x, y));
                pointMenu.x = Math.round(pointMenu.x);
                pointMenu.y = Math.round(pointMenu.y);
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }
                for(let i = 0; i < children.length; i++) {

                    if(children[i].x <= pointMenu.x && pointMenu.x <= children[i].x + children[i].width && children[i].y <= pointMenu.y && pointMenu.y <= children[i].y + children[i].height) {
                        point = i;
                        let width = children[i].width;
                        let height = children[i].height;
                        let background = new PIXI.Graphics();
                        background.lineStyle(0, 0x000000, 1);
                        background.beginFill(0xf8fe4a, 0.5);
                        background.drawRoundedRect(0, 0, width, height, 0);
                        background.endFill();
                        background.name = "xanhle";
                        children[i].addChild(background);
                        let current = children[i];
                        let event = this.getAllInteractiveChildren(current);
                        if(event.length > 0) {
                            background.interactive = true;
                            background.cursor = 'pointer';
                            background.on('pointerdown', () => {
                                event[0].emit('pointerdown');
                            });
                            background.on('pointerup', () => {
                                event[0].emit('pointerup');
                            });
                        }
                    }
                }

            } else {
                clearInterval(this.pcSettimeEntactive);
                setTimeout(function() {
                    clearInterval(this.pcSettimeEntactive);
                    eventGame();
                }, 200);
            }
        });



        // dùng các phím mũi tên để di chuyển
        let eventGame = () => {
            if(this.pcSettimeEntactive) clearInterval(this.pcSettimeEntactive);
            this.pcSettimeEntactive = setInterval(() => {
                let event = this.pcKey;
                if(this.menu.children.length <= 0) {
                    console.log('xóa menu')
                    clearInterval(this.pcSettimeEntactive);
                    return false;
                }
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                if(event === 'ArrowUp') {
                    point -= 1;
                    if(point < 0) point = children.length - 1;

                } else if(event === 'ArrowDown') {
                    point += 1;
                    if(point >= children.length) point = 0;
                }
                if(event === 'Enter') {
                    let current = children[point];
                    let event = this.getAllInteractiveChildren(current);
                    if(event.length > 0) {
                        event[0].emit('pointerdown');
                        event[0].emit('pointerup');
                    }
                }
                if(children[point] && this.pcKey.length >= 1) {
                    for(let i = 0; i < children.length; i++) {
                        children[i].removeChild(children[i].getChildByName('xanhle'));
                    }

                    viewport.moveCenterY(children[point].y);
                    let width = children[point].width;
                    let height = children[point].height;
                    let background = new PIXI.Graphics();
                    background.lineStyle(0, 0x000000, 1);
                    background.beginFill(0xf8fe4a, 0.5);
                    background.drawRoundedRect(0, 0, width, height, 0);
                    background.endFill();
                    background.name = "xanhle";
                    children[point].addChild(background);

                    let current = children[point];
                    let eventdata = this.findInteractiveObjects(current);


                    if(eventdata.length > 0) {
                        background.interactive = true;
                        background.cursor = 'pointer';
                        background.on('pointerdown', () => {
                            eventdata[0].emit('pointerdown');
                        });
                        background.on('pointerup', () => {
                            eventdata[0].emit('pointerup');
                        });

                    }

                }
                this.pcKey = '';
            }, 50);
        };

        eventGame();



        return viewport;
    }



    intX = (backgroundbody,hienthinoidung) => {
        let viewport = new pixi_viewport.Viewport({
            screenWidth: backgroundbody.width,
            screenHeight: backgroundbody.height,
            worldWidth: hienthinoidung.width,
            worldHeight: hienthinoidung.height ,
        });
        viewport.name = "viewport";
        viewport
            .drag({
                direction: 'x',
                pressDrag: true,
                factor: 1,

            })
            .decelerate({
                friction: 0.95,
                bounce: 0.8,
                minSpeed: 0.01,
            })
        viewport.bounce({
            top: true,
            bottom: true,
            friction: 0.5,
            time: 3.5,
            ease: 'easeInOutSine',
        });

        viewport.setZoom(1); 
        viewport.addChild(hienthinoidung);


        let pointerStartTime = 0;
        let point = -1;
        viewport.on('pointerdown', (event) => {
            pointerStartTime = Date.now();
        });

        viewport.on("pointerup", (event) => {
            if(Date.now() - pointerStartTime < 200) {
                let x = event.data.global.x;
                let y = event.data.global.y;
                let pointMenu = hienthinoidung.toLocal(new PIXI.Point(x, y));
                pointMenu.x = Math.round(pointMenu.x);
                pointMenu.y = Math.round(pointMenu.y);
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }
                for(let i = 0; i < children.length; i++) {

                    if(children[i].x <= pointMenu.x && pointMenu.x <= children[i].x + children[i].width && children[i].y <= pointMenu.y && pointMenu.y <= children[i].y + children[i].height) {
                        point = i;
                        let width = children[i].width;
                        let height = children[i].height;
                        let background = new PIXI.Graphics();
                        background.lineStyle(0, 0x000000, 1);
                        background.beginFill(0xf8fe4a, 0.5);
                        background.drawRoundedRect(0, 0, width, height, 0);
                        background.endFill();
                        background.name = "xanhle";
                        children[i].addChild(background);
                        let current = children[i];
                        let event = this.getAllInteractiveChildren(current);
                        if(event.length > 0) {
                            background.interactive = true;
                            background.cursor = 'pointer';
                            background.on('pointerdown', () => {
                                event[0].emit('pointerdown');
                            });
                            background.on('pointerup', () => {
                                event[0].emit('pointerup');
                            });
                        }
                    }
                }

            } else {
                clearInterval(this.pcSettimeEntactive);
                setTimeout(function() {
                    clearInterval(this.pcSettimeEntactive);
                    eventGame();
                }, 200);
            }
        });



        // dùng các phím mũi tên để di chuyển
        let eventGame = () => {
            if(this.pcSettimeEntactive) clearInterval(this.pcSettimeEntactive);
            this.pcSettimeEntactive = setInterval(() => {
                let event = this.pcKey;
                if(this.boxGiaoTiep.children.length <= 0) {
                    clearInterval(this.pcSettimeEntactive);
                    return false;
                }
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                if(event === 'ArrowLeft') {
                    point -= 1;
                    if(point < 0) point = children.length - 1;

                } else if(event === 'ArrowRight') {
                    point += 1;
                    if(point >= children.length) point = 0;
                }
                if(event === 'Enter') {
                    let current = children[point];
                    let event = this.getAllInteractiveChildren(current);
                    if(event.length > 0) {
                        event[0].emit('pointerdown');
                        event[0].emit('pointerup');
                    }
                }
                if(children[point] && this.pcKey.length >= 1) {
                    for(let i = 0; i < children.length; i++) {
                        children[i].removeChild(children[i].getChildByName('xanhle'));
                    }

                    viewport.moveCenterX(children[point].x, children[point].y);
                    let width = children[point].width;
                    let height = children[point].height;
                    let background = new PIXI.Graphics();
                    background.lineStyle(0, 0x000000, 1);
                    background.beginFill(0xf8fe4a, 0.5);
                    background.drawRoundedRect(0, 0, width, height, 0);
                    background.endFill();
                    background.name = "xanhle";
                    children[point].addChild(background);

                    let current = children[point];
                    let eventdata = this.findInteractiveObjects(current);


                    if(eventdata.length > 0) {
                        background.interactive = true;
                        background.cursor = 'pointer';
                        background.on('pointerdown', () => {
                            eventdata[0].emit('pointerdown');
                        });
                        background.on('pointerup', () => {
                            eventdata[0].emit('pointerup');
                        });

                    }

                }
                this.pcKey = '';
            }, 50);
        };

        eventGame();



        return viewport;
    }


    viewPointDefaultY = (body,text) => {

        let backgroundbody = body;
        let hienthinoidung = text;
        if(text.height < body.height) {
            let height = body.height - text.height;
            let newpxi = new PIXI.Graphics();
            newpxi.beginFill(0x000000, 0.000000000800001);
            newpxi.drawRect(0, 0, body.width, height);
            newpxi.endFill();
            newpxi.x = 0;
            newpxi.y = text.height;
            text.addChild(newpxi);

        }

        let viewport = new pixi_viewport.Viewport({
            screenWidth: body.width,
            screenHeight: body.height,
            worldWidth: body.width,
            worldHeight: text.height ,
        });
        viewport.name = "viewport";
        viewport
            .drag({
                direction: 'y',
                pressDrag: true,
                factor: 1,

            })
            .decelerate({
                friction: 0.95,
                bounce: 0.8,
                minSpeed: 0.01,
            })
        viewport.bounce({
            top: true,
            bottom: true,
            friction: 0.5,
            time: 3.5,
            ease: 'easeInOutSine',
        });

        // set left

        
        viewport.addChild(text);
        body.addChild(viewport);


        let pointerStartTime = 0;
        let point = -1;
        viewport.on('pointerdown', (event) => {
            pointerStartTime = Date.now();
        });

        viewport.on("pointerup", (event) => {
            if(Date.now() - pointerStartTime < 200) {
                let x = event.data.global.x;
                let y = event.data.global.y;
                let pointMenu = hienthinoidung.toLocal(new PIXI.Point(x, y));
                pointMenu.x = Math.round(pointMenu.x);
                pointMenu.y = Math.round(pointMenu.y);
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }
                for(let i = 0; i < children.length; i++) {

                    if(children[i].x <= pointMenu.x && pointMenu.x <= children[i].x + children[i].width && children[i].y <= pointMenu.y && pointMenu.y <= children[i].y + children[i].height) {
                        point = i;
                        let width = children[i].width;
                        let height = children[i].height;
                        let background = new PIXI.Graphics();
                        background.lineStyle(2, 0xFFFFFF, 1);
                        background.beginFill(0xf8fe4a, 0.0000000000000001);
                        background.drawRoundedRect(0, 0, width, height, 0);
                        background.endFill();
                        background.name = "xanhle";
                        children[i].addChild(background);
                        let current = children[i];
                        let event = this.getAllInteractiveChildren(current);
                        if(event.length > 0) {
                            background.interactive = true;
                            background.cursor = 'pointer';
                            background.on('pointerdown', () => {
                                event[0].emit('pointerdown');
                            });
                            background.on('pointerup', () => {
                                event[0].emit('pointerup');
                            });
                        }
                    }
                }

            } else {
                clearInterval(this.pcSettimeEntactiveY);
                setTimeout(function() {
                    clearInterval(this.pcSettimeEntactiveY);
                    eventGame();
                }, 200);
            }
        });



        // dùng các phím mũi tên để di chuyển
        let eventGame = () => {
            console.log('open lại')
            if(this.pcSettimeEntactiveY) clearInterval(this.pcSettimeEntactiveY);
            this.pcSettimeEntactiveY = setInterval(() => {
                let event = this.pcKey;
                if(this.box.children.length <= 0 || this.menu.children.length >=1) {
                    console.log('xóa skill')
                    clearInterval(this.pcSettimeEntactiveY);
                    return false;
                }
                let children = hienthinoidung.children.filter(e => e.keycode == 'int04');
                if(event === 'ArrowUp') {
                    point -= 1;
                    if(point < 0) point = children.length - 1;

                } else if(event === 'ArrowDown') {
                    point += 1;
                    if(point >= children.length) point = 0;
                }
                if(event === 'Enter') {
                    let current = children[point];
                    let event = this.getAllInteractiveChildren(current);
                    if(event.length > 0) {
                        event[0].emit('pointerdown');
                        event[0].emit('pointerup');
                    }
                }
                if(children[point] && this.pcKey.length >= 1) {
                    for(let i = 0; i < children.length; i++) {
                        children[i].removeChild(children[i].getChildByName('xanhle'));
                    }

                    viewport.moveCenter(children[point].x, children[point].y);
                    let width = children[point].width;
                    let height = children[point].height;
                    let background = new PIXI.Graphics();
                    background.lineStyle(2, 0xFFFFFF, 1);
                    background.beginFill(0xf8fe4a, 0.000000000005);
                    background.drawRoundedRect(0, 0, width, height, 0);
                    background.endFill();
                    background.name = "xanhle";
                    children[point].addChild(background);

                    let current = children[point];
                    let eventdata = this.findInteractiveObjects(current);


                    if(eventdata.length > 0) {
                        background.interactive = true;
                        background.cursor = 'pointer';
                        background.on('pointerdown', () => {
                            eventdata[0].emit('pointerdown');
                        });
                        background.on('pointerup', () => {
                            eventdata[0].emit('pointerup');
                        });

                    }

                }
                this.pcKey = '';
            }, 50);
        };

        eventGame();

        
    }

    
}