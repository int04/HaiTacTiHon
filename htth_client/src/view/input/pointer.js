import keydown_left from "./pointer/menuLeft.js";
let pointer = (self, key) => {
    if(self.pointer !== null) {

        if(self.pointer === 'menuleft') return keydown_left(self, key);
    }

}

export default  pointer;
