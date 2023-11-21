class devGame {
    constructor() {
        let idGame = document.getElementById('game');
        this.gameWidth = idGame.offsetWidth;
        this.gameHeight = idGame.offsetHeight;
        this.app = new PIXI.Application({
            width: this.gameWidth - 0,
            height: this.gameHeight - 0,
            backgroundColor: 0x19b0f8,
            //forceWebGL: true,
            powerPreference: "high-performance",
            resolution: window.devicePixelRatio,
            autoDensity: true,
            sharedTicker: true,
            roundPixels: true,
            legacy: false,
            preserveDrawingBuffer: true,
            antialias: true,


        });
        this.app.stage.name = "Dragon Boy H5 with Since04";
        globalThis.__PIXI_APP__ = this.app;

        this.app.renderer.plugins.accessibility.destroy();
        idGame.appendChild(this.app.view);

       /*

         // luffy:
          this.sprite = {
            "dau":"iLvVMIbTpy",
            "ao":"kFFosytneB",
            "quan":"QSHGPlNDTK",
            "toc":"vAiaeYISIt",
            "non":"vqFwgeDhai",
            "lung":"axDwxOtydX",
            "tay":"axDwxOtydX","id":null};

            // daubep:
             this.sprite = {
            "dau":"iLvVMIbTpy",
            "ao":"NjeYgxYqhI",
            "quan":"yEIqrdJLIw",
            "toc":"vAiaeYISIt",
            "non":"axDwxOtydX",
            "lung":"axDwxOtydX",
            "tay":"KaVgueHoaP","id":null};

            // nami:
            this.sprite = {
            "dau":"iLvVMIbTpy",
            "ao":"HNbjvDRvQM",
            "quan":"TEjmlGHLxb",
            "toc":"gJhSCfBzai",
            "non":"axDwxOtydX",
            "lung":"qMXbcUQWdM",
            "tay":"axDwxOtydX","id":null};

            // kiếm khách
            this.sprite = {
            "dau":"iLvVMIbTpy",
            "ao":"QTIydsakBM",
            "quan":"sFQjWHwTeb",
            "toc":"vAiaeYISIt",
            "non":"axDwxOtydX",
            "lung":"axDwxOtydX",
            "tay":"TKHxwNhWSU","id":null};

        */

        this.sprite = {
            "dau":"iLvVMIbTpy",
            "ao":"dLwtvlNxiY",
            "quan":"dvuZmZtEqC",
            "toc":"vAiaeYISIt",
            "non":"axDwxOtydX",
            "lung":"axDwxOtydX",
            "tay":"CMnZavSAps","id":null};

        this.images = [];

        // get file


        let t = (url) => {
            return new Promise((res,fai) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', './assets/json/'+url+'.json?ducx='+this.az(10));
                xhr.onload = () => {
                    if (xhr.status < 400) {
                        try {
                            let data = JSON.parse(xhr.responseText);
                            if(data) {
                                // append to images concat
                                let img = data;
                                data.forEach(element => {
                                    this.images.push(element);
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

        let c = ['ao','camtay','face','lung','non','quan','toc','sprite','base', 'npc','quai', 'skin'];

        Promise.all(c.map(e => t(e))).then((e) => {
            this.app.ticker.add( (delta) => {
                this.update(delta);
            }
            );
            this.draw();
        });


        this.container = new PIXI.Container();
        this.container.name = "container";
        this.app.stage.addChild(this.container);


        this.phukien = new PIXI.Container();
        this.phukien.name = "phukien";
        this.nhanvat = new PIXI.Container();
        this.nhanvat.name = "nhanvat";
        this.container.addChild(this.phukien);
        this.container.addChild(this.nhanvat);
        this.list = [];
        this.move = null;

        this.text = new PIXI.Text('Hello Pixi!');
        this.text.y = this.gameHeight - 30;
        this.app.stage.addChild(this.text);

        this.container.interactive = true;
        
        

        // scrol the mouse wheel zooms the container

        addEventListener('wheel', (e) => {
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
            if (isDragging) {
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

    }

    az = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        return result;
    }
    input = () => {
        addEventListener('keyup', (e) => {
            let code = e.keyCode;
            if(code === 192) return this.nextObject();
        });
        addEventListener('keydown', (e) => {
            let code = e.keyCode;
            let array = [37,38,39,40];
            if(array.find(e => e == code) != undefined) e.preventDefault();
            if(code == 13) {
                this.move = null;
                this.text.text = 'since04'
            }

            if(this.move != null) {
                let dataselect = this.move.name;
                let data = this.getSprite(this.sprite[dataselect]);
                let action = this.move.parent.name;
                console.log('d',dataselect)
                let json = data[action];
                if(code == 39) {
                    json.x += 1;
                }
                if(code == 37) {
                    json.x -= 1;
                }
                if(code == 38) {
                    json.y -= 1;
                }
                if(code == 40) {
                    json.y += 1;
                }
                if(code == 39 || code == 37 || code == 38 || code == 40) {
                    let name = $("#name").val();
                    let loai = $("#loai").val();
                    if(name == 'toc' && loai == 'dungyen') {
                        for(let act in data) {
                            data[act].x = json.x;
                            data[act].y = json.y;
                        }
                    }

                    if(name == 'non' && loai == 'dungyen') {
                        for(let act in data) {
                            data[act].x = json.x;
                            data[act].y = json.y;
                        }
                    }
                    this.draw();
                }

            }
            
        });
    }
    updateFomr = () => {
        if(this.move) {
            let dataselect = this.move.name;
            let data = this.getSprite(this.sprite[dataselect]);
            let action = this.move.parent.name;
            let json = data[action];
            
            let src = [];
            if($("#src").val() != '') {
                src = $("#src").val().split(",");
                json.src = src;
            }

            let name = $("#name").val();
            let loai = $("#loai").val();
            if(name == 'toc' && loai == 'dungyen') {
                for(let act in data) {
                    data[act].src = json.src;
                }
            }

            if(name == 'non' && loai == 'dungyen') {
                for(let act in data) {
                    data[act].src = json.src;
                }
            }

            let mota = $("#mota").val();
            if(mota != '') {
                json.mota = mota;
            }
            this.updateJSON();
        };
    }

    hide = (name) => {
        // get all nhanvat
        this.setting = this.setting || {};
        this.setting[name] = this.setting[name] || false;
        this.setting[name] = !this.setting[name];
    }

    clone = (old) => {
        let name = $("#newname").val();
        if(name == '') return;
        console.log(old);
        for(let i in this.sprite) {
            let data = this.getSprite(this.sprite[i]);
            let action = old;
            let json = data[action];
            let newjson = JSON.parse(JSON.stringify(json));
            data[name] = newjson;
        }
        this.draw();

    }

    getIMG =() => {
        $.ajax({
            url: 'http://htth.test/assets/getimg.php',
            type: 'POST',

        }).done((data) => {
            $("#img").html(data)
        });
    }

    clickb = () => {
        this.click = this.click || false;
        this.click = !this.click;
    }

    atisen = (name) => {
        console.log('Hv')
        if(this.click && this.move) {
            let dataselect = this.move.name;
            let data = this.getSprite(this.sprite[dataselect]);
            let action = this.move.parent.name;
            let json = data[action];
            json.src = [];

            json.src.push(name);
            this.updateJSON();

        }
    }

    update = () => {
        if(this.move) {
            this.text.text = this.move.parent.name + " " + this.move.name + " " + this.move.x + " / " + this.move.y;
            if($("#loai").val() == '' || $("#name").val() != this.move.name) {
                $("#loai").val(this.move.parent.name);
                $("#name").val(this.move.name);
                $("#x").val(this.move.x);
                $("#y").val(this.move.y);

                let dataselect = this.move.name;
                let data = this.getSprite(this.sprite[dataselect]);
                let action = this.move.parent.name;
                let json = data[action];

                // cover array to string ","
                let src = json.src.join(",");
                $("#src").val(src);

                console.log(this.move)
                let html = `Ẩn:`;

                for(let i in this.sprite) {
                    html += `<label><input onclick="game.hide('`+i+`')" type="checkbox" name="`+i+`" value="`+i+`">`+i+`</label>`;
                }

                html+=`<hr>Chọn thuộc tính:`;

                // click is set this.move
                let nhanvat = this.nhanvat.getChildByName(this.move.parent.name);
                let dau = nhanvat.getChildByName("dau");
                let ao = nhanvat.getChildByName("ao");
                let quan = nhanvat.getChildByName("quan");
                let toc = nhanvat.getChildByName("toc");
                let non = nhanvat.getChildByName("non");
                let lung = nhanvat.getChildByName("lung");
                let tay = nhanvat.getChildByName("tay");


                // set this.move = element when click button
                if(dau) html += `<button onclick="game.move = game.nhanvat.getChildByName('`+this.move.parent.name+`').getChildByName('dau')">Đầu</button>`;
                if(ao) html += `<button onclick="game.move = game.nhanvat.getChildByName('`+this.move.parent.name+`').getChildByName('ao')">Áo</button>`;
                if(quan) html += `<button onclick="game.move = game.nhanvat.getChildByName('`+this.move.parent.name+`').getChildByName('quan')">Quần</button>`;
                if(toc) html += `<button onclick="game.move = game.nhanvat.getChildByName('`+this.move.parent.name+`').getChildByName('toc')">Tóc</button>`;
                if(non) html += `<button onclick="game.move = game.nhanvat.getChildByName('`+this.move.parent.name+`').getChildByName('non')">Nón</button>`;
                if(lung) html += `<button onclick="game.move = game.nhanvat.getChildByName('`+this.move.parent.name+`').getChildByName('lung')">Lưng</button>`;
                if(tay) html += `<button onclick="game.move = game.nhanvat.getChildByName('`+this.move.parent.name+`').getChildByName('tay')">Tay</button>`;
                html += ` Clone:`;


                html+= `<input type="text" id="newname" value="">`;
                html += `<button onclick="game.clone('`+this.move.parent.name+`')">Clone</button>`;
                html += `<button onclick="game.getIMG()">getIMG</button>`;
                html += `<label><input onclick="game.clickb()" type="checkbox" >CLICK</label>`;
                html += `<label><button onclick="game.nextObject()"  >Chuyển object </button></label>`;


                html += `<button onclick="game.coppyFast()">Coppy object nhanh</button>`;



                



                $("#tool").html(html);

            }
        }
        else 
        {
            $("#loai").val('');
        }
        // check phukien
        this.list.forEach((element) => {
            let nhanvat = this.nhanvat.getChildByName(element);

            let phukien = this.phukien.getChildByName(element);
            if(!phukien) { 
                phukien = new PIXI.Container();
                phukien.name = element;
                this.phukien.addChild(phukien);
                

                phukien.x = nhanvat.x;
                phukien.y = nhanvat.y;

                let text = new PIXI.Text(element);
                text.name = "Text";
                text.x = nhanvat.width / 2;
                text.y = nhanvat.height;
                text.style = new PIXI.TextStyle({
                    fill: 0xffffff,
                    fontSize: 12,
                    fontWeight: 'bold',
                });
                phukien.addChild(text);
            }
            else 
            {
                
                let text = phukien.getChildByName("Text");
                if(text) {
                    text.x = nhanvat.width / 2 - text.width / 2;
                    text.y = nhanvat.height;
                }


            }
            let dau = nhanvat.getChildByName("dau");

            let ao = nhanvat.getChildByName("ao");

            let quan = nhanvat.getChildByName("quan");

            let toc = nhanvat.getChildByName("toc");

            let non = nhanvat.getChildByName("non");


            let lung = nhanvat.getChildByName("lung");


            let tay = nhanvat.getChildByName("tay");

            if(this.setting && this.setting['dau'] == true) dau.visible = false;
            else dau.visible = true;
            if(this.setting && this.setting['ao'] == true) ao.visible = false;
            else ao.visible = true;
            if(this.setting && this.setting['quan'] == true) quan.visible = false;
            else quan.visible = true;
            if(this.setting && this.setting['non'] == true) non.visible = false;
            else non.visible = true;
            if(this.setting && this.setting['lung'] == true) lung.visible = false;
            else lung.visible = true;

            if(this.setting && this.setting['tay'] == true) tay.visible = false;
            else tay.visible = true;

            if(this.setting && this.setting['toc'] == true) toc.visible = false;
            else toc.visible = true;


            let quan_data = this.getSprite(this.sprite.quan);
            let ao_data = this.getSprite(this.sprite.ao);
            let dau_data = this.getSprite(this.sprite.dau);
            let tay_data = this.getSprite(this.sprite.tay);
            let toc_data = this.getSprite(this.sprite.toc);
            let non_data = this.getSprite(this.sprite.non);
            let lung_data = this.getSprite(this.sprite.lung);

            let action = element;

            dau.xy = dau.xy || 0;
            // quần  
            quan.time = quan.time || 0;
            quan.num = quan.num || 0;
            if(quan.num >= quan_data[action].src.length) quan.num = 0;
            quan.texture = this.coverImg(quan_data[action].src[quan.num]);
            

            ao.num = ao.num || 0;
            if(ao.num >= ao_data[action].src.length) ao.num = 0;
            ao.texture = this.coverImg(ao_data[action].src[ao.num]);

            ao.first = ao.first || 0;

            tay.num = tay.num || 0;
            if(tay.num >= tay_data[action].src.length) tay.num = 0;
            tay.texture = this.coverImg(tay_data[action].src[tay.num]);

            toc.num = toc.num || 0;
            if(toc.num >= toc_data[action].src.length) toc.num = 0;
            toc.texture = this.coverImg(toc_data[action].src[toc.num]);

            non.num = non.num || 0;
            if(non.num >= non_data[action].src.length) non.num = 0;
            non.texture = this.coverImg(non_data[action].src[non.num]);

            lung.num = lung.num || 0;
            if(lung.num >= lung_data[action].src.length) lung.num = 0;
            lung.texture = this.coverImg(lung_data[action].src[lung.num]);


            dau.num = dau.num || 0;
            if(dau.num >= dau_data[action].src.length) dau.num = 0;
            dau.texture = this.coverImg(dau_data[action].src[dau.num]);

            
            if(ao.first !=1)
            {
                ao.x = ao_data[action].x;
                ao.y = ao_data[action].y;
                quan.x = quan_data[action].x; 
                quan.y = quan_data[action].y;

                tay.x = tay_data[action].x;
                tay.y = tay_data[action].y;

                toc.x = toc_data[action].x;
                toc.y = toc_data[action].y;

                non.x = non_data[action].x;
                non.y = non_data[action].y;

                lung.x = lung_data[action].x;
                lung.y = lung_data[action].y;




                ao.first = 1;
            }
            
            if(quan.time < Date.now()) {
                quan.num++;
                ao.num++;
                tay.num++;
                toc.num++;
                non.num++;
                lung.num++;
                dau.num++;
                quan.time= Date.now() + 110;
                if(dau.xy ==0) {
                    dau.y+=1;
                    ao.y+=1;
                    toc.y+=1;
                    non.y+=1;
                    lung.y+=1;
                    tay.y+=1;
                    dau.xy = 1;
                }
                else 
                
                {
                    dau.y -=1;
                    ao.y -=1;
                    toc.y -=1;
                    non.y -=1;
                    lung.y -=1;
                    tay.y -=1;

                    dau.xy = 0;
                }
            }

            
        });
    }

    draw = () => {
        this.list = [];
        this.nhanvat.removeChildren();
        this.phukien.removeChildren();
        let count = 0;
        let dau = this.getSprite(this.sprite.dau);
        for(let i in dau) {
            let nhanvat = new PIXI.Container();
            nhanvat.name = i;
            if(this.list.find(e => e == i) == undefined) {
                this.list.push(i);
            }
            let sprite = new PIXI.Sprite(this.coverImg(dau[i].src[0]));
            sprite.name = "dau";
            sprite.x = 0;
            sprite.y = 0;
            sprite.scale.set(0.5);

            nhanvat.x =0 + count * 100;
            nhanvat.y = 0;
            count++;

            
            let lung =this.getSprite(this.sprite.lung);
            let sprite_lung = new PIXI.Sprite(this.coverImg(lung[i].src[0]));
            sprite_lung.name = "lung";
            sprite_lung.x = 0;
            sprite_lung.y = 0;
            sprite_lung.scale.set(0.5);
            nhanvat.addChild(sprite_lung);



            let quan =this.getSprite(this.sprite.quan);
            let sprite_quan = new PIXI.Sprite(this.coverImg(quan[i].src[0]));
            sprite_quan.name = "quan";
            sprite_quan.x = 0;
            sprite_quan.y = 0;
            sprite_quan.scale.set(0.4);
            nhanvat.addChild(sprite_quan);

            let ao =this.getSprite(this.sprite.ao);
            let sprite_ao = new PIXI.Sprite(this.coverImg(ao[i].src[0]));
            sprite_ao.name = "ao";
            sprite_ao.x = 0;
            sprite_ao.y = 0;
            sprite_ao.scale.set(0.5);

            nhanvat.addChild(sprite_ao);

            let tay =this.getSprite(this.sprite.tay);
            let sprite_tay = new PIXI.Sprite(this.coverImg(tay[i].src[0]));
            sprite_tay.name = "tay";
            sprite_tay.x = 0;
            sprite_tay.y = 0;
            sprite_tay.scale.set(0.5);


            nhanvat.addChild(sprite);

            let toc =this.getSprite(this.sprite.toc);
            let sprite_toc = new PIXI.Sprite(this.coverImg(toc[i].src[0]));
            sprite_toc.name = "toc";
            sprite_toc.x = 0;
            sprite_toc.y = 0;
            sprite_toc.scale.set(0.5);
            nhanvat.addChild(sprite_toc);

            let non =this.getSprite(this.sprite.non);
            let sprite_non = new PIXI.Sprite(this.coverImg(non[i].src[0]));
            sprite_non.name = "non";
            sprite_non.x = 0;
            sprite_non.y = 0;
            sprite_non.scale.set(0.5);
            nhanvat.addChild(sprite_non);

            nhanvat.addChild(sprite_tay);




            sprite_quan.interactive = true;
            sprite_quan.cursor = 'pointer';
            sprite_quan.on('pointerdown', (e) => {
                this.move = sprite_quan;
            });
            sprite_ao.interactive = true;
            sprite_ao.cursor = 'pointer';
            sprite_ao.on('pointerdown', (e) => {
                this.move = sprite_ao;
            });


            sprite.interactive = true;
            sprite.cursor = 'pointer';
            sprite.on('pointerdown', (e) => {
                this.move = sprite;
            });

            sprite_toc.interactive = true;
            sprite_toc.cursor = 'pointer';
            sprite_toc.on('pointerdown', (e) => {
                this.move = sprite_toc;
            });

            sprite_non.interactive = true;
            sprite_non.cursor = 'pointer';
            sprite_non.on('pointerdown', (e) => {
                this.move = sprite_non;
            });

            sprite_lung.interactive = true;
            sprite_lung.cursor = 'pointer';
            sprite_lung.on('pointerdown', (e) => {
                this.move = sprite_lung;
            });

            sprite_tay.interactive = true;
            sprite_tay.cursor = 'pointer';
            sprite_tay.on('pointerdown', (e) => {
                this.move = sprite_tay;
            });



            
            this.nhanvat.addChild(nhanvat);

            this.updateJSON();
        }
    }

    getSprite = name => {
        let re = this.images.find(e => e.name == name);
        if (re) return re['list'];
        else return {
            
        };
    }

    updateJSON = () => {
        let txt = '';
        let id = this.az(10);
        for(let i in this.sprite) {
            let data = this.getSprite(this.sprite[i]);
            let newjson = JSON.stringify(data);
            let json = JSON.parse(newjson);
            let obb = {};
            obb.list = json;
            obb.type = i;
            obb.name = this.az(10);
            obb.id = id;
            txt += JSON.stringify(obb) + ",";
            $("#"+i+"").val(JSON.stringify(obb));
        }
        $("#text").val(txt);
    }

    coppyFast = () => {
        if(!this.move) return false;
        let name = this.move;
        let parten = this.move.parent.name;
        let action = this.move.name;
        let data = this.getSprite(this.sprite[action]);
        let objectOld = data[parten];
        for(let i in data) {
            if(i != parten) {
                data[i].src = objectOld.src;
                data[i].x = objectOld.x;
                data[i].y = objectOld.y;
            }
        }
        this.updateJSON();
    }
    nextObject = () => {
        if(!this.move) return false;
        let name = this.move;
        let parten = this.move.parent.name;
        let action = this.move.name;
        let data = this.getSprite(this.sprite[action]);
        // get name action next
        let stringNext = "";
        let have = false;
        for(let t in data) {
            if(t === parten) {
                have = true;
                continue;
            }

            if(have === true) {
                stringNext = t;
                break;
            }
        }

        let newAction = stringNext;
        if(newAction.length >=1) {
            let newChar = this.nhanvat.getChildByName(newAction).getChildByName(action);
            if(newChar) {
                this.move = newChar;
            }
        }
        this.updateJSON();

    }


    coverImg(name) {
        if(typeof name == 'number') name = name.toString();
        return PIXI.Texture.from('./assets/int04/' + name + '.png');
    }
}