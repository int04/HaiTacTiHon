import shopView from "../shop/shop.js";
import viewMessages from "./views/viewMessages.js";
export default  class chatController extends  shopView{
    constructor() {
        super();
        this.chat = {
            all : [],
            sms : [],
        };
    }

    createNewChat = (id) => {
        let getMy = this.getMy(id);
        let data = {
            id : id,
            name : getMy ? getMy.name : '???',
            data : []
        }
        this.chat.sms.push(data);
        viewMessages(this,id);
    }

    test_chat = () => {
        //return listBox(this);
        viewMessages(this, 2);
    }


}