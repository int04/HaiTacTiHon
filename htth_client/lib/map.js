class devGame {
    constructor() {
        let idGame = document.getElementById('game');
        this.gameWidth = idGame.offsetWidth;
        this.gameHeight = idGame.offsetHeight;
        this.app = new PIXI.Application({
            width: this.gameWidth - 0,
            height: this.gameHeight - 0,
            backgroundColor: 0x19b0f8,
            transparent: false,
            //forceCanvas: false,
            //forceWebGL: true,
            powerPreference: "high-performance",
            resolution: window.devicePixelRatio,
            autoDensity: true,
            sharedTicker: true,
            roundPixels: true,
            legacy: false,

            preserveDrawingBuffer: true,
            sharedTicker: true,
            antialias: true,


        });
        this.speed = 48;
        this.app.stage.name = "Dragon Boy H5 with Since04";
        globalThis.__PIXI_APP__ = this.app;

        this.app.renderer.plugins.accessibility.destroy();
        idGame.appendChild(this.app.view);

        this.sprite = {
            dau : "iLvVMIbTpy",
            ao : "HNbjvDRvQM",
            quan : "TEjmlGHLxb",
            toc : "vAiaeYISIt",
            non : "hVSoEgQJAc",
            lung : "qQBOBBhpXC",
            tay : "KaVgueHoaP",
        }

        this.images = [];
        this.assets = [];

        // get file


        let objectx = [];
        let t = (url) => {
            return new Promise((res,fai) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', './assets/'+url+'.json?ducx='+this.az(10));
                xhr.onload = () => {
                    if (xhr.status < 400) {
                        try {
                            let data = JSON.parse(xhr.responseText);
                            if(data) {
                                // append to images concat
                                let img = data;
                                let id = '';
                                data.forEach(element => {
                                    this.assets.push(element);
                                    if(!objectx.find(e => e == element.src)) {
                                        objectx.push(element.src);
                                        $("#listTab").append('<li><a onclick="game.clickobject(\''+element.src+'\')" data-toggle="tab" href="#'+element.src+'">'+element.src+'</a></li>');
                                        $("#listContent").append('<div id="x_'+element.src+'" class="tab-pane gallery"></div>');
                                        id = element.src;
                                    }
                                });

                                
                                
                            }
                        }
                            catch(e) {
                            }
                        
                        res('true');
                    }
                }
                xhr.send();
            });
        }

        let c = ['map'];

        Promise.all(c.map(e => t(e))).then((e) => {
            this.app.ticker.add( (delta) => {
                this.update(delta);
            }
            );
            this.draw();

            this.assets.forEach(element => {
                let name = element.src;

                $("#x_"+name).append('<img onclick="game.coppyImg(\''+element.name+'\')" src="./assets/map/'+name+'/'+element.name+'.png" style="max-width:'+(name === 'chantroi' ? 200 : 48)+'px" alt="...">');
            });
        });


        this.container = new PIXI.Container();
        this.container.name = "container";
        this.app.stage.addChild(this.container);

        this.bando = new PIXI.Container();
        this.bando.name = "bando";

        this.phukien = new PIXI.Container();
        this.phukien.name = "phukien";
        this.nhanvat = new PIXI.Container();
        this.nhanvat.name = "nhanvat";
        this.container.addChild(this.phukien);
        this.container.addChild(this.nhanvat);
        this.list = [];
        this.move = null;

        this.me = new PIXI.Graphics();
        this.me.lineStyle(2, 0x33FF66, 1);
        this.me.drawRect(0, 0, 48, 48);
        this.me.endFill();
        this.me.x = 0;
        this.me.y = 0;
        this.me.name = 'chưa';
        this.container.addChild(this.bando);

        
        this.container.addChild(this.me);


        this.text = new PIXI.Text('Hello Pixi!');
        this.text.y = this.gameHeight - 30;
        this.app.stage.addChild(this.text);

        this.container.interactive = true;
        
        this.Ismain = false;

        this.camkeo = false;

        this.app.stage.interactive = true;

        this.app.stage.on('pointermove', (e) => {
            this.Ismain = true;
            // get the mouse position
            const pos = e.data.global;

            // if pos x or y >= max width or height
            if(pos.x >= this.gameWidth) this.Ismain = false;
            if(pos.y >= this.gameHeight) this.Ismain = false;
        });

        // out
        


        


        // scrol the mouse wheel zooms the container

        addEventListener('wheel', (e) => {
            if(this.Ismain == false) return;
            this.Ismain = false;
            e.preventDefault();
            if (e.deltaY < 0) {
                this.container.scale.x *= 1.1;
                this.container.scale.y *= 1.1;
            } else {
                this.container.scale.x /= 1.1;
                this.container.scale.y /= 1.1;
            }
        }
        , { passive: false });

        // click and drag moves the container

        let isDragging = false;
        let prevX = 0;
        let prevY = 0;
        addEventListener('pointerdown', (e) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
        }
        );
        addEventListener('pointermove', (e) => {
            if (isDragging && this.camkeo == false) {
                this.container.x += e.clientX - prevX;
                this.container.y += e.clientY - prevY;
                prevX = e.clientX;
                prevY = e.clientY;
            }
        }
        );
        addEventListener('pointerup', () => {
            isDragging = false;
        }
        );
        addEventListener('pointerout', () => {
            isDragging = false;
        }
        );
        addEventListener('pointerleave', () => {
            isDragging = false;
        }
        );



        this.input();

        this.add = false;

        // create a squre 48x48 arround the mouse
        this.app.stage.on('pointermove', (e) => {
            // get the mouse position
            const pos = e.data.global;
            // get the mouse position
            const pos2 = e.data.getLocalPosition(this.container);
            // set the position of the square to that of the mouse
            this.me.x = pos2.x - (pos2.x % 48);
            this.me.y = pos2.y - (pos2.y % 48);
            if(this.add == true) {
                this.addSprite();
            }
        }
        );

        this.me.interactive = true;

        




    }

    clickobject = (name) => {
        this.old = this.old || '';

        if(this.old != '') {
            $("#x_"+this.old).removeClass('active');
        }

        $("#x_"+name).addClass('active');
        this.old = name;

    }

    az = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        return result;
    }
    input = () => {
        this.delete = false;
        addEventListener('keydown', (e) => {
            let code = e.keyCode;
            let array = [37,38,39,40];
            if(array.find(e => e == code) != undefined) e.preventDefault();
            if(code == 13) {
                this.move = null;
                this.text.text = 'since04'
            }

            if(this.move != null) {
                
                if(code == 37) {
                    this.move.x -= this.speed;
                }
                if(code == 38) {
                    this.move.y -= this.speed;
                }
                if(code == 39) {
                    this.move.x += this.speed;
                }
                if(code == 40) {
                    this.move.y += this.speed;
                }


            }

            if(code == 17) {
                this.camkeo = true;
            }
            if(code == 18) {
                this.add = true;
                e.preventDefault();
            }
            if(code ==32) {
                e.preventDefault();
                this.delete = true;
            }
            
        });

        addEventListener('keyup', (e) => {
            let code = e.keyCode;
            if(code == 110) {
                this.addSprite();
            }
            if(code == 16) {
                if(this.move.type) {
                    // delete
                    this.bando.removeChild(this.move);
                    this.move = null;
                }
            }

            if(code == 17) {
                this.camkeo = false;
            }
            if(code == 18) {
                this.add = false;

            }

            if(code == 32) {
                this.delete =false;
            }

            if(code == 192) {
                e.preventDefault();
                this.CoppyX();
            }

        });
    }
    coppyImg = (name) => {
        let old_name = $("#new_name").val();
        if(old_name != name) {
            $("#new_row").val('1')
            $("#new_col").val('1')
        }
        $("#new_name").val(name);
        let databien = $("#new_bien").val();
        let check1 =  databien.split(',');
        if(check1.find(e => e == name) == undefined) {
            if(databien.split(",").length <= 0) $("#new_bien").val(name);
            else $("#new_bien").val(databien + ',' + name);
        }
        let check3 = $("#new_bien").val();
        if(check3[0] == ',') $("#new_bien").val(check3.slice(1));
    }
    
    sortMap = () => {
        let bando = this.bando;
        const customSort = (a, b) => {
            const order = ['block','may', 'bien', 'nui2', 'nui1'];
            const indexA = order.indexOf(a.type);
            const indexB = order.indexOf(b.type);
    
            if (indexA === -1 && indexB === -1) {
                return 0;
            }
    
            if (indexA === -1) {
                return 1;
            }

            if (indexB === -1) {
                return -1;
            }
    
            return indexA - indexB;
        };
        bando.children.sort(customSort);
    }

    CoppyX = () => {
        if(this.move != null && this.move.type) {
            let newSprite = new PIXI.Sprite(this.move.texture);
            newSprite.type = this.move.type;
            newSprite.width = this.move.width;
            newSprite.height = this.move.height;
            this.move.coppy++;
            newSprite.coppy = 0;
            newSprite.x = this.move.x + this.move.width * this.move.coppy;
            newSprite.y = this.move.y;
            newSprite = this.eventSprite(newSprite);
            newSprite.name = this.move.name;
            this.bando.addChild(newSprite);
        }
    }

    updateForm = () => {
        let id = $("#edit_i").val();
        let name = $("#edit_name").val();
        let type = $("#edit_type").val();
        let width = $("#edit_width").val()*1;
        let height = $("#edit_height").val()*1;

        let sprite = this.bando.children[id];
        if(sprite) {
            sprite.type = type;
            if(width != 0) sprite.width = width;
            if(height != 0) sprite.height = height;
        }
    }

    changeIndex = () => {
        let id = $("#edit_i").val();
        let idnew = $("#edit_ii").val();

        let sprite = this.bando.children[id];

        if(idnew < 0) idnew = 0;
        if(idnew >= this.bando.children.length) idnew = this.bando.children.length - 1;
        this.bando.children.splice(id, 1);
        this.bando.children.splice(idnew, 0, sprite);




    }

    xuatMap = () => {
        let data = "";
        let bando = this.bando;
        // id#name#type#x#y#width#height
        for (let i = 0; i < bando.children.length; i++) {
            let element = bando.children[i];
            // type: IMG^id^x,y,width,height!
            if(element.type == 'block') continue;
            data+=`${(element.name)}^${element.type}^${element.x},${element.y},${element.width},${element.height}!`;
        }
        // remove last !
        data = data.slice(0, -1);
    
        $("#code").val(data);
        return data;
    }

    eventSprite = (sprite) => {
        sprite.interactive = true;

        sprite.cursor = 'pointer';
        // click
        let time = 0;
        let isDragging = false;
        let prevX = 0;
        let prevY = 0;
        sprite.on('pointerdown', (e) => {
            time = Date.now();
            console.log('clickkkk')
            isDragging = true;
            prevX = e.data.global.x;
            prevY = e.data.global.y;
            this.camkeo = true;

        });

        sprite.on('pointerup', (e) => {
            console.log('Click')

            if(Date.now() - time <= 300) {
                this.move = sprite;
            }

            isDragging = false;
            this.camkeo = false;

        });

        sprite.on('pointermove', (e) => {
            if (isDragging) {
                if(sprite.type == 'dat') {
                    isDragging = false;
                    this.camkeo = false;
                    return;
                }
                sprite.x += e.data.global.x - prevX;
                sprite.y += e.data.global.y - prevY;
                prevX = e.data.global.x;
                prevY = e.data.global.y;
            }
            if(this.delete == true) {
                this.bando.removeChild(sprite);
            }
        });

        sprite.on('pointerout', (e) => {
            isDragging = false;
            this.camkeo = false;
        });

        sprite.on('pointerleave', (e) => {
            isDragging = false;
            this.camkeo = false;
        });
        return sprite;
    }

    addSprite = () => {
        let name = $("#new_name").val();
        let type = $("#new_type").val();
        let x = $("#new_x").val() * 1;
        let y = $("#new_y").val() * 1;
        let row = $("#new_row").val()*1;
        let col = $("#new_col").val()*1;
        let width = $("#new_width").val()*1;
        let height = $("#new_height").val()*1;

        let bien = $("#new_bien").val();
        let asset = this.assets.find(e => e.name == name);
        if(asset) {

            let checked = this.bando.children.find(e => e.x == x && e.y == y && e.type == type && e.name == name);
            if(checked) {
                console.log('trùng')
                return false;
            }

            console.log('add')
            for(let i = 0; i < row; i++) {
                for(let j = 0; j < col; j++) {
                    let sprite;



                    if(type === 'animation')  {
                        let list = bien.split(',');

                        const textures = list.map(e => PIXI.Texture.from('./assets/map/dat/'+e+'.png'));
                        sprite = new PIXI.AnimatedSprite(textures);
                        sprite.animationSpeed = 0.1;
                        sprite.play();
                        sprite.name = bien;

                    }
                    else
                    {
                        let src = './assets/map/'+name+'/'+name+'.png';
                        let texture = PIXI.Texture.from('./assets/map/'+asset.src+'/' + name + '.png');
                        sprite = new PIXI.Sprite(texture);
                        sprite.name = name;

                    }



                    sprite.type = type;
                    sprite.x = x + (j*48);
                    sprite.y = y + (i*48);
                    sprite.coppy = 0;
                    // set scale 0.5
                    if(asset.block) {

                    }
                    else 
                    {
                        sprite.scale.set(0.5);
                    }
                    console.log(sprite);
        
                    if(width != 0) sprite.width = width;
                    if(height != 0) sprite.height = height;





                    sprite = this.eventSprite(sprite);

                    // square on the sprite
                

                    

                    



                    this.bando.addChild(sprite);


                }
            }
        }
        
    }

    update = () => {
        if(this.move == null) this.move = this.me;

        if(this.move.type) {
            $("#editItem").show();
            $("#newItem").hide();

            let oldID = $("#edit_ii").val();
            if(oldID != this.bando.children.indexOf(this.move)) {
                $("#edit_ii").val(this.bando.children.indexOf(this.move));
                $("#edit_i").val(this.bando.children.indexOf(this.move));
                $("#edit_name").val(this.move.name);
                $("#edit_type").val(this.move.type);
                $("#edit_width").val(this.move.width);
                $("#edit_height").val(this.move.height);
            }
        }
        else 
        {
            $("#editItem").hide();
            $("#newItem").show();
        }

        $("#new_x").val(this.move.x);
        $("#new_y").val(this.move.y);

        this.sortMap();

        this.text.text = this.move.x + ' - ' + this.move.y + ' - ' + this.move.name + ' - ' + this.move.type;

    }

    load = () => {
        this.draw();
        // IMG^id^x,y,width,height!
        let data = $("#code").val();
        let list = data.split('!');
        list.forEach(element => {
            let phantu = element.split('^');
            let name = phantu[0];
            let type = phantu[1];
            let toado = phantu[2].split(',');
            let x = toado[0]*1;
            let y = toado[1]*1;
            let width = toado[2]*1;
            let height = toado[3]*1;

            let asset = this.assets.find(e => e.name == name);

            let checked = name.split(',');
            let sprite;
            if(checked.length <=1) {
                let src = './assets/map/'+name+'/'+name+'.png';
                let texture = PIXI.Texture.from('./assets/map/'+asset.src+'/' + name + '.png');
                sprite = new PIXI.Sprite(texture);
                sprite.name = name;

            }
            else
            {
                const textures = checked.map(e => PIXI.Texture.from('./assets/map/dat/'+e+'.png'));
                sprite = new PIXI.AnimatedSprite(textures);
                sprite.animationSpeed = 0.1;
                sprite.play();
                sprite.name = name;
            }

            sprite.type = type;
            sprite.x = x ;
            sprite.y = y;
            sprite.coppy = 0;
            // set scale 0.5

            if(width != 0) sprite.width = width;
            if(height != 0) sprite.height = height;

            sprite = this.eventSprite(sprite);
            this.bando.addChild(sprite);


            // square on the sprite
        

        });
    }

    draw = () => {
        
        let im = 100;
        let jm = 50;
        this.bando.removeChildren();

        // create a square 48x48

        for(let i = 0; i < im; i++) {
            for(let j = 0; j < jm; j++) {
                let square = new PIXI.Graphics();
                square.lineStyle(1, 0x000000, 1);
                square.beginFill(0x000000,0.001);
                square.drawRect(0, 0, 48, 48);
                square.endFill();
                square.x = i*48;
                square.y = j*48;
                square.interactive = true;
                square.name = 'block';
                square.type = 'block';
                this.bando.addChild(square);

                square.interactive = true;
                // mouse move point

                square.on('mouseover', (e) => {
                    //console.log('mouseover')
                });

                square.on('mouseout', (e) => {
                    //console.log('pointerdown')
                });
                
            }
        }
        
    }

    getSprite = name => {
        let re = this.images.find(e => e.name == name);
        if (re) return re['list'];
        else return {
            
        };
    }

    


    coverImg(name) {
        if(typeof name == 'number') name = name.toString();
        return PIXI.Texture.from('./assets/int04/' + name + '.png');
    }
}