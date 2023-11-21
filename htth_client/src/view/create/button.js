import createInfoView from "./menu/info.js";

export default class buttonView extends createInfoView {
    constructor() {
        super();
    }

    renderButton = () => {
        let my = this.my;
        this.deleteAllChild(this.button,false);

        let width = this.gameWidth * 0.5;
        let height = this.gameHeight * 0.5;

        this.renderInfoPlayer(width,height);


        this.created_top_right_view_info_player(width,height);


        let background_left = new PIXI.Graphics();
        background_left.beginFill(0x000000,0.0);
        background_left.drawRect(0, 0, width, height);
        background_left.endFill();
        background_left.x = 0;
        background_left.y = this.gameHeight - height;
        this.button.addChild(background_left);

        this.createButtonOnBottomLeft(width,height);


        let background_right = new PIXI.Graphics();
        background_right.name ="button_right";
        background_right.beginFill(0xFFFFFF,0.0);
        background_right.drawRect(0, 0, width, height);
        background_right.endFill();
        background_right.x = width;
        background_right.y = this.gameHeight - height;
        this.button.addChild(background_right);

        this.createButtonright(width, height);


        this.updateRenderSkill(0.5555,true);


    }
}