import Loading_Assets from "./view/loading/assets.js";

class main extends Loading_Assets {
    constructor() {
        super();
        this.loadAssets();

    }
}

let game = new main();
window.game = game;
