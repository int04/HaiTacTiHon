import update from "./update.js";

export default class updateChat extends update {
    constructor() {
        super();
    }

    ioInsertChat = (data) => {
        let logChat = this.cache_chat;
        for(let i = 0; i < logChat.length; i++) {
            if(logChat[i].uid == data._1) {
                logChat[i].type = 'delete';
            }
        }
        logChat.push({
            id: this.randomAZ(10),
            uid: data._1,
            text: data._2,
            type: 'chat'
        })
    }

    updateChatMap = (delta) => {
        if(this.cache_chat.length === 0) return;

        const bubblePadding = 10;

        this.cache_chat.forEach((message) => {

            if(this.Chat.getChildByName(message.id) == undefined) {
                const bubble = new PIXI.Graphics();
                bubble.name = message.id;
                bubble.id = message.id;
                bubble.uid = message.uid;


                const newmessage = new PIXI.Text(message.text, {
                    align: "center",
                    breakWords: true,
                    fontSize: 14,
                    whiteSpace: "normal",
                    wordWrap: true,
                    wordWrapWidth: 150,
                    fontWeight: "bold",
                });
                // text is center
                newmessage.anchor.set(0.5);

                newmessage.wordWrapWidth = 200 - bubblePadding * 2;
                newmessage.name = message.id;
                newmessage.id = message.id;
                newmessage.anchor.set(0.5);
                newmessage.time = 0;
                newmessage.dem = 0;

                bubble.addChild(newmessage);
                newmessage.position.set(bubble.width / 2, bubble.height / 2 );
                newmessage.resolution = 2;
                bubble.lineStyle(1, 0x000000, 3)
                bubble.beginFill(0xfebd6c);
                bubble.drawRoundedRect(
                    -bubblePadding,
                    -bubblePadding,
                    newmessage.width + bubblePadding * 2 < 150 ?
                    150 :
                    newmessage.width + bubblePadding * 2,
                    newmessage.height + bubblePadding * 2 < 50 ?
                    50 :
                    newmessage.height + bubblePadding * 2,
                    10
                );
                bubble.endFill();



                bubble.pivot.set(bubble.width / 2, bubble.height / 2);
                bubble.visible = false;

                // trangle chat bottom bubble
                const trangle = new PIXI.Graphics();
                trangle.beginFill(0xfebd6c);
                trangle.lineStyle(1, 0x000000, 3)
                trangle.moveTo(0, 0);
                trangle.lineTo(10, 10);
                trangle.lineTo(20, 0);
                trangle.endFill();
                trangle.pivot.set(trangle.width / 2, trangle.height / 2);
                trangle.position.set(bubble.width / 2 - trangle.width/2, bubble.height - trangle.height + 4  );
                bubble.addChild(trangle);
                this.Chat.addChild(bubble);
            } else {
                let bubble = this.Chat.getChildByName(message.id);
                let mess = bubble.getChildByName(message.id);

                if(message.type == "delete") {
                    this.Chat.removeChild(bubble);
                    this.cache_chat = this.cache_chat.filter(function(obj) {
                        return obj.id !== message.id;
                    });
                    return false;
                }

                let mucTieuChat = this.getSprite(message.uid);
                if(!mucTieuChat) return (message.type = "delete");
                if(mucTieuChat != undefined)
                    bubble.position.set(
                        mucTieuChat.x + Math.abs(mucTieuChat.maxWdith/2) ,
                        mucTieuChat.y - (mess.height + bubblePadding * 2) / 2 - 50
                    );
                if(mess.dem % 1 == 0) {
                    if(mess.time >= 800 ) {
                        this.Chat.removeChild(bubble);
                        this.cache_chat = this.cache_chat.filter(function(obj) {
                            return obj.id !== message.id;
                        });
                    }
                }
                mess.dem++;
                mess.time++;
                bubble.visible = true;
                // game.cache_chat.push({uid : 1, text : 'đit mẹ'})
            }
        });

    }
}