
let keydown_left = (self, key) => {
    let viewport = self.getPointer(self.pointer);
    if(!viewport) {
        self.pointer = null;
        return false;
    }
    let hienthinoidung = viewport.getChildByName('hienthinoidung');
    if(!hienthinoidung) {
        self.pointer = null;
        return false;
    }
    let children = hienthinoidung.children.filter(e => e.keycode === 'int04');
    let point = viewport.pages;

    if(key === 38) {
        point -= 1;
        if(point < 0) point = children.length - 1;

    }
    else if(key === 40) {
        point += 1;
        if(point >= children.length) point = 0;
    }

    if(key === 13) {
        let current = children[point];
        let event = self.getAllInteractiveChildren(current);
        if(event.length > 0) {
            event[0].emit('pointerdown');
            event[0].emit('pointerup');
        }
    }



    if(children[point]) {
        for(let i = 0; i < children.length; i++) {
            let icon = children[i].getChildByName('icon');
            if(icon) {
                icon.gotoAndStop(0);
            }
        }


        let icon = children[point].getChildByName('icon');
        if(icon) {
            icon.gotoAndStop(1);
        }

    }
    viewport.pages = point;
}

export default  keydown_left;