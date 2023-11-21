import boxshop from "./views/boxshop.js";
import {viewBuy, viewSell} from "./button.js";
import cuongHoaView from "../cuonghoa/cuonghoa.js";


export default class shopView extends cuongHoaView {
    constructor() {
        super();
        this.cache.idShop = [];
        this.cache.costShop = [];
    }

    boxshop = (id) => {
        boxshop(this,id);
    }

    btn_shop = (id) => {
        return viewBuy(this,id);
    }

    btnShopSell = (id) => {
        return viewSell(this,id);
    }

}