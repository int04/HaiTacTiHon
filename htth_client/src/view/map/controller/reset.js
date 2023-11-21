let resetNone = (self) => {
    let list = self.player.children;
    list.forEach(element => {
        let id = element.name;
        let getmy = self.getMy(id);
        if(!getmy) {
            self.deleteSprite(id);
        }
    });
}

let resetMap = (self) => {
    self.map.removeChildren();
    self.che.removeChildren();
    self.may.removeChildren();
    self.bien.removeChildren();
    self.nui1.removeChildren();
    self.nui2.removeChildren();
    self.isGoToZone = false;
}


export  {resetNone, resetMap};