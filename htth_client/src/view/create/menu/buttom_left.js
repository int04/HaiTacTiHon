import menuleftView from "./menuleft.js";

export default class createViewButton_Left extends  menuleftView {
    constructor() {
        super();
    }

    createButtonOnBottomLeft = (width,height) => {
        let background_left = {
            width : width,
            height : height,
        }
        let my = this.my;
        let containerDirection = new PIXI.Container();
        containerDirection.y = this.gameHeight*0.5;
        this.button.addChild(containerDirection);

        let icon_chat = this.createAnimation("x2Main_Image_point_other_1",50,50,2);
        icon_chat.x = 0;
        icon_chat.y = this.gameHeight*0.5;
        this.animationEvent(icon_chat,() => {
            this.inputChatZone();
        });
        this.button.addChild(icon_chat);

        let icon_menu_w = width * 0.3;
        icon_menu_w = icon_menu_w > 32 ? 32 : icon_menu_w;
        let icon_menu = this.animation("x2Main_Image_point_other_4",32,160,2);
        icon_menu.x = 0;
        icon_menu.y = icon_chat.y - icon_menu.height - 10;
        icon_menu.name = "icon_menu";
        this.button.addChild(icon_menu);
        this.animationEvent(icon_menu,() => {
            if(this.menuLeft.children.length === 0)
                this.openMenuLeftView();
            else
                this.closeMenuLeftView();
        });


        let src_up = "x2Main_Image_point_move_0";
        let src_down = "x2Main_Image_point_move_1";

        let asset_up = new PIXI.Sprite(this.coverImg(src_up));
        let asset_down = new PIXI.Sprite(this.coverImg(src_down));

        let w_max_Direction = background_left.width;
        const numSkills_Direction = 5;
        let skillSize_Direction = width/7;
        skillSize_Direction = skillSize_Direction > 30 ? 30 : skillSize_Direction;
        console.log(skillSize_Direction);
        const skillSpacing_Direction = skillSize_Direction + 2 ;
        const centerX_d = background_left.width / 2;
        const centerY_d = background_left.height / 2;
        const cnter_direction = new PIXI.Graphics();
        cnter_direction.beginFill(0xFF0000);
        cnter_direction.drawCircle(0, 0, 10);
        cnter_direction.endFill();
        cnter_direction.x = centerX_d;
        cnter_direction.y = centerY_d;
        containerDirection.addChild(cnter_direction);
        cnter_direction.visible = false;

        let create_direct = (x1,y1,w1,h1,x2,y2,w2,h2,direction = 'up') => {
            let reset = () => {
                this.keypress[37] = null;
                this.keypress[38] = null;
                this.keypress[39] = null;
                this.keypress[40] = null;
                this.action(this.my.id,'dungyen');
            }
            let array = [];
            let texture_up = new PIXI.Texture(asset_up.texture, new PIXI.Rectangle(x1,y1,w1,h1));
            let texture_down = new PIXI.Texture(asset_down.texture, new PIXI.Rectangle(x2,y2,w2,h2));
            array.push(texture_up);
            array.push(texture_down);
            let animation = new PIXI.AnimatedSprite(array);
            animation.animationSpeed = 0.1;
            animation.loop = false;

            animation.interactive = true;
            animation.cursor = 'pointer';
            animation.on('pointerdown', () => {
                    animation.gotoAndStop(1);
                    this.keypress[37] = null;
                    this.keypress[38] = null;
                    this.keypress[39] = null;
                    this.keypress[40] = null;
                    this.keypress[direction] = true;
                }
            );
            animation.on('pointerup', () => {
                    animation.gotoAndStop(0);
                    reset();
                }
            );


            return animation;
        }

        // Tạo ô kỹ năng xung quanh
        for (let i = 0; i < numSkills_Direction - 1; i++) {
            const angle = (i / (numSkills_Direction - 1)) * Math.PI * 2;
            let skillButton = new PIXI.Graphics();
            skillButton.beginFill(0x00FF00,0.5);
            skillButton.lineStyle(1, 0x000000, 1);
            skillButton.drawCircle(
                centerX_d + (skillSize_Direction + skillSpacing_Direction) * Math.cos(angle),
                centerY_d + (skillSize_Direction + skillSpacing_Direction) * Math.sin(angle),
                skillSize_Direction
            );
            skillButton.endFill();
            skillButton.visible = false;

            let array = [
                [39, 126,70,72,59, 129, 70, 72, 59 ],
                [40,69, 130,64,68,70,132,64,68],
                [37,5, 72, 66, 57,3,72,66,57],
                [38, 70,4,61,68,70,2,61,68]
            ]
            containerDirection.addChild(skillButton);

            array.forEach((element,j) => {
                if(i === j) {
                    let animation = create_direct(element[1],element[2],element[3],element[4], element[5],element[6],element[7],element[8],element[0]);
                    animation.x = centerX_d + (skillSize_Direction + skillSpacing_Direction) * Math.cos(angle);
                    animation.y = centerY_d + (skillSize_Direction + skillSpacing_Direction) * Math.sin(angle);
                    animation.anchor.set(0.5);
                    containerDirection.addChild(animation);
                }
            });

        }

        // containerDirection is left of background_left
        containerDirection.x = -(w_max_Direction - containerDirection.width) / 2;

        if(containerDirection.x + containerDirection.width + background_left.width * 0.1 < background_left.width) {
            containerDirection.x += background_left.width * 0.1;
        }
    }
}
