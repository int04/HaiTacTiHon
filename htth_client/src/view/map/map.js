import SpriteCreate from "../create/sprite.js";
import  {resetNone, resetMap} from "./controller/reset.js";
import loadMap from "./controller/loadmap.js";
import loadAssetMap from "./controller/LoadAssetMap.js";
import deletePlayer from "./controller/deletePlayer.js";
import goto from "./controller/goto.js";
import config from "./controller/config.js";
export default class mapView extends SpriteCreate {
    constructor() {
        super();
        this.base_map = '';
        this.srcDaLoad = [];
        this.gameMap = {
            setting: {
                maxY: 0,
                minY: 0,
                maxX: 0,
                minX: 0,
            },
            size: {
                idMaxX: 0,
                idMaxY: 0,
                idMinX: 0,
                idMinY: 0,

            }
        };
    }

    deletePlayer = () => {
        deletePlayer(this);
    }

    resetNone = () => {
        resetNone(this);
    }

    goto = (id,zone = null, x = null, y = null) => {
        goto(this,id,zone,x,y);
    }
    insertMap = () => {
        let base = this.base_map;
        this.loadGame.visible = true;
        this.LoadAssetMap();
    }
    LoadAssetMap = () => {
        loadAssetMap(this);
    }

    resetMap = () => {
        resetMap(this);
    }


    loadMap = () => {
        loadMap(this);
    }

    configMap = () => {
        config(this);
    }
}