import physics from './physics.js';

export default class renderViewChange extends physics {
    constructor() {
        super();
    }

    getDiv = (objectName) => {
        let find = (name,children) => {
            let result = false;
            for(let i = 0; i < children.length; i++) {
                let child = children[i];
                if(child.div == name) {
                    result = child;
                    break;
                }
                if(child.children.length >=1) {
                    result = find(name,child.children);
                    if(result) break;
                }
            }
            return result;
        }
        return find(objectName,this.app.stage.children);
    }

    findText = (name) => {
        // using recursive
        let find = (name,children) => {
            let result = false;
            for(let i = 0; i < children.length; i++) {
                let child = children[i];
                if(child.name == name) {
                    result = child;
                    break;
                }
                if(child.children.length >=1) {
                    result = find(name,child.children);
                    if(result) break;
                }
            }
            return result;
        }
        return find(name,this.app.stage.children);
    }

    findAllText = (name, newtext = '') => {
        // using recursive
        let find = (name,children) => {
            let result = [];
            for(let i = 0; i < children.length; i++) {
                let child = children[i];
                if(child.name == name) {
                    result.push(child);
                    if(newtext) child.text = newtext;
                }
                if(child.children.length >=1) {
                    let rs = find(name,child.children);
                    if(rs.length >=1) {
                        result = result.concat(rs);
                    }
                }
            }
            return result;
        }
        return find(name,this.app.stage.children);
    }

    findAllAndHideText  = (name, show = false) => {
        let find = (name,children) => {
            let result = false;
            for(let i = 0; i < children.length; i++) {
                let child = children[i];
                if(child.name == name) {
                    child.visible = show;
                }
                if(child.children.length >=1) {
                    find(name,child.children);
                }
            }
        }
        find(name,this.app.stage.children);
    }

    hideTextChild = (data,show = false) => {
        let find = (name,children) => {
            let result = false;
            for(let i = 0; i < children.length; i++) {
                let child = children[i];
                    child.visible = show;
                if(child.children.length >=1) {
                    find(name,child.children);
                }
            }
        }
        data.interactive = false;
        find(name,data.children);
    }





}