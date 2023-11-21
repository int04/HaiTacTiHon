import loadingScient from './load.js';


export default class Loading_Assets extends loadingScient {
    constructor() {
        super();
        this.assets = [];
    }

    loadAssets = () => {

        return this.createGameConfig();
        let t = (url) => {
            return new Promise((res,fai) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', './assets/json/'+url+'.json');
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

        let c = ['ao','camtay','face','lung','non','quan','toc','sprite','base'];

        Promise.all(c.map(e => t(e))).then((e) => {
            this.create_sprite_my();
            this.loadAssetMap();

        });

    }

    loadAssetMap = () => {
        let t = (url) => {
            return new Promise((res,fai) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', './assets/'+url+'.json');
                xhr.onload = () => {
                    if (xhr.status < 400) {
                        try {
                            let data = JSON.parse(xhr.responseText);
                            if(data) {
                                // append to images concat
                                let img = data;
                                data.forEach(element => {
                                    this.assets.push(element);
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

        });
    }

}