
export default (self) => {
    self.config.map = 0; // reset đất
    let mapid = self.my.pos.map;
    let data = self.listMap.find(e => e.id === mapid);
    if(data) {
        if(data.config && data.config.sea === 1) {
            self.config.map = 1; // if is sea
        }
    }
}