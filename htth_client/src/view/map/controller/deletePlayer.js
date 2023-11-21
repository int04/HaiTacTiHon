let deletePlayer = (self) => {
    let list = self.cache_player;
    list.forEach(element => {
        let id = element.id;
        self.deleteSprite(id);
        let index = list.findIndex(x => x.id == id);
        list.splice(index,1);

        let action = self.cache_action.find(x => x.id == id);
        if(action) {
            let index = self.cache_action.findIndex(x => x.id == id);
            self.cache_action.splice(index,1);
        }

    });
}
export default deletePlayer;