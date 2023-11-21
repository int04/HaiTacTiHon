import ruongView from "../box/ruong.js";
import view from "./nangcap/view.js";
import {btn_nangcap} from "./button.js";

import view_ghep from "./ghep/view.js";
import {btn_ghep} from "./ghep/button.js";

import action_nangcap from "./nangcap/action.js";

import vew_duclo from "./duclo/view.js";
import  {btn_duclo} from "./duclo/button.js";

import view_khamda from "./khamda/view.js";
import {btn_khamda} from "./khamda/button.js";

export default class cuongHoaView extends  ruongView {
    constructor() {
        super();
        this.cache.nangcap = {
            id : "9A18H0AGyUM",
            data : ["9A18H0AGyUM","QacK1XfXQCg"],
        };
        this.cache.ghepItem = {
            id : -1,
            data : ["RbIVgI4LLOv", "MfgGm6jC4Hz"],
        }
        this.cache.duclo = {
            id : 'Ri84N6pRddU',
            data : ['jMxnQcXl2Nk', 'Ri84N6pRddU'],
        }
        this.cache.khamda = {
            id : 'Ri84N6pRddU',
            data : ['VCGQvsaAq2y', 'Ri84N6pRddU'],
        }
    }

    khamda = (reset = 0) => {
        if(reset === 'a') {
            this.cache.khamda.data = [];
            this.cache.khamda.id = 0;
        }
        return view_khamda(this,'int04');
    }
    btn_khamda = (id) => {
        return btn_khamda(this,id);
    }

    duclo = (reset = 0) => {
        if(reset === 'a') {
            this.cache.duclo.data = [];
            this.cache.duclo.id = 0;
        }
        return vew_duclo(this,'int04');
    }
    btn_duclo = (id) => {
        return btn_duclo(this,id);
    }

    nangcap = (reset = 0) => {
        if(reset === 'a') {
            this.cache.nangcap.data = [];
            this.cache.nangcap.id = 0;
        }
        return view(this,'int04');
    }

    ghep =(reset = 0) => {
        if(reset === 'a') {
            this.cache.ghepItem.data = [];
            this.cache.ghepItem.id = -1;
        }
        return view_ghep(this,'int04');
    }

    btn_ghep = (id) => {
        return btn_ghep(this,id);
    }

    btn_nangcap = (id) => {
        return btn_nangcap(this,id);
    }

    test_nangcap = () => {
        action_nangcap(this);
    }
}