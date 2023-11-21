const redis = require('redis');

const Redis = require("ioredis");


const client = redis.createClient();

client.connect();







// send message

// first connect delete all key users:*


let send = (data) => {
    return new Promise((resolve, reject) => {
        client.publish('message',data).then(res => {
            resolve(res);
        })
    });
}



// delete all key skill:*

client.keys('skill:*').then(data => {
    for(let i =0; i< data.length; i++)
    {
        client.del(data[i]);
    }
})

client.keys('users:*').then(data => {
    for(let i =0; i< data.length; i++)
    {
        client.del(data[i]);
    }
})

client.keys('boss:*').then(data => {
    for(let i =0; i< data.length; i++)
    {
        client.del(data[i]);
    }
})






let getPlayer = (id) => {
    return new Promise((resolve, reject) => {
        client.get('users:'+id).then((data) => {
            if(!data) return resolve(null);
            data = JSON.parse(data);
            resolve(data);
        })
    }); 
}


let setPlayer = async (id,data) => {
    if(typeof id == 'object') {
        data = id;
        id = data.id;
    }


    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        client.set('users:'+id,data).then((data) => {
            resolve(data);
        }) 
    });
}

let setHP = function(id,hp) {
    return new Promise((resolve, reject) => {
        client.hSet('userHP:'+id,'hp',hp).then((data) => {
            resolve(data);
        })
    });
}

let upHP = function(id,hp) {
    return new Promise((resolve, reject) => {
        client.hIncrBy('userHP:'+id,'hp',hp).then((data) => {
            resolve(data);
        })
    });
}

let getHP = function(id) {
    return new Promise((resolve, reject) => {
        client.hGet('userHP:'+id,'hp').then((data) => {
            resolve(data);
        })
    });
}





let updatePlayer = (id,fild,value) => {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}  



let delPlayer = async (id) =>  {
    // delete hp 
    let del = await client.del('userHP:'+id);
    
    return new Promise((resolve, reject) => {
        client.del('users:'+id).then((data) => {
            resolve(data);
        })
    });
}

let getItem = (id) => {
    return new Promise((resolve, reject) => {
        client.get('item:'+id).then((data) => {
            if(!data) return resolve(null);
            data = JSON.parse(data);
            resolve(data);
        })
    })
}

let getMob = (id) => {
    return new Promise((resolve, reject) => {
        client.get('mob:'+id).then((data) => {
            if(!data) return resolve(null);
            data = JSON.parse(data);
            resolve(data);
        })
    })
}


let setMob = (id,data) => {
    if(typeof id == 'object') {
        data = id;
        id = data.id;
    }
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        client.set('mob:'+id,data).then((data) => {
            resolve(data);
        })
    }
    );
}

let delMob = (id) => {
    return new Promise((resolve, reject) => {
        client.del('mob:'+id).then((data) => {
            resolve(data);
        })
    });
}



let setItem = (id,data) => {
    if(typeof id == 'object') {
        data = id;
        id = data.id;
    }
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        client.set('item:'+id,data).then((data) => {
            resolve(data);
        })
    });
}

let delItem = (id) => {
    return new Promise((resolve, reject) => {
        client.del('item:'+id).then((data) => {
            resolve(data);
        })
    });
}







let all = function(array) {
    return Promise.all(array);
}

let playerInZone = (map,zone, checkUID = false) =>
{
    return new Promise((resolve, reject) => {
        client.keys('users:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++) 
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {
                let users = [];
                for(let i =0; i< data.length; i++) 
                {
                    let e = JSON.parse(data[i]);
                    if(e && e.pos && e.pos.map == map && e.pos.zone == zone) 
                    {
                        if(!checkUID  && e.id == checkUID) {
                            continue;
                        }
                        else 
                        { 
                            users.push(e);
                        }
                    }
                }
                resolve(users);
            })
        }
        )

    });
}

let itemInZone = (map,zone) =>
{
    return new Promise((resolve, reject) => {
        client.keys('item:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++)
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {
                let items = [];
                for(let i =0; i< data.length; i++)
                {
                    let e = JSON.parse(data[i]);
                    if(e && e.pos && e.pos.map == map && e.pos.zone == zone)
                    {
                        items.push(e);
                    }
                }
                resolve(items);
            })
        }
        )

    });
}

let mobInZone = (map,zone) =>
{
    return new Promise((resolve, reject) => {
        client.keys('mob:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++)
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {

                let mobs = [];
                for(let i =0; i< data.length; i++)
                {
                    let e = JSON.parse(data[i]);
                    if(e && e.pos && e.pos.map == map && e.pos.zone == zone)
                    {
                        mobs.push(e);
                    }
                }
                resolve(mobs);
            })
        }
        )

    });
}



let mobCheckUid = (map,zone,uid) =>
{
    return new Promise((resolve, reject) => {
        client.keys('mob:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++)
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {
                let mobs = [];
                for(let i =0; i< data.length; i++)
                {
                    let e = JSON.parse(data[i]);
                    if(e && e.pos && e.pos.map == map && e.pos.zone == zone && e.uid == uid)
                    {
                        mobs.push(e);
                    }
                }
                resolve(mobs);
            })
        }
        )
    });
}






let mobALL = () =>
{
    return new Promise((resolve, reject) => {
        client.keys('mob:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++)
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {

                let mobs = [];
                for(let i =0; i< data.length; i++)
                {
                    let e = JSON.parse(data[i]);
                    mobs.push(e);
                }
                resolve(mobs);
            })
        }
        )

    });
}



let getSkill = (id) => {
    return new Promise((resolve, reject) => {
        client.get('skill:'+id).then((data) => {
            if(!data) return resolve(null);
            data = JSON.parse(data);
            resolve(data);
        })
    })
}

let randomAZ = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


let setSkill = (id,data) => {
    if(typeof id == 'object') {
        data = id;
        id = data.id;
        if(!id) id = randomAZ(10);
    }

    if(data.id == undefined) data.id = id;

    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        client.set('skill:'+id,data).then((data) => {
            resolve(data);
        })
    });
}

let delSkill = (id) => {
    return new Promise((resolve, reject) => {
        client.del('skill:'+id).then((data) => {
            resolve(data);
        })
    });
}

let whereSkill = (keyid, loai) => {
    return new Promise((resolve, reject) => {
        client.keys('skill:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++)
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {
                let skills = [];
                for(let i =0; i< data.length; i++)
                {
                    let e = JSON.parse(data[i]);
                    if(e &&  e.keyid == keyid && e.loai == loai)
                    {
                        skills.push(e);
                    }
                }
                resolve(skills);
            })
        }
        )

    });
}





let listMapHavePlayer = () =>
{
    return new Promise((resolve, reject) => {
        client.keys('users:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++) 
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {
                let users = [];
                for(let i =0; i< data.length; i++) 
                {
                    let e = JSON.parse(data[i]);
                    if(e && e.pos && e.pos.map) 
                    {
                        if(users.find(t2 => t2.map == e.pos.map && t2.zone == e.pos.zone)) continue;
                        users.push({
                            map : e.pos.map,
                            zone : e.pos.zone
                        });
                    }
                }
                resolve(users);
            })
        }
        )

    });
}

setBoss = (id,data) => {
    if(typeof id == 'object') {
        data = id;
        id = data.id;
    }
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        client.set('boss:'+id,data).then((data) => {
            resolve(data);
        })
    });
}

getBoss = (id) => {
    return new Promise((resolve, reject) => {
        client.get('boss:'+id).then((data) => {
            if(!data) return resolve(null);
            data = JSON.parse(data);
            resolve(data);
        })
    })
}

delBoss = (id) => {
    return new Promise((resolve, reject) => {
        client.del('boss:'+id).then((data) => {
            resolve(data);
        })
    });
}


let bossInZone = (map,zone) =>
{
    return new Promise((resolve, reject) => {
        client.keys('boss:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++)
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {

                let mobs = [];
                for(let i =0; i< data.length; i++)
                {
                    let e = JSON.parse(data[i]);
                    if(e && e.pos && e.pos.map == map && e.pos.zone == zone)
                    {
                        mobs.push(e);
                    }
                }
                resolve(mobs);
            })
        }
        )

    });
}

let getAllBoss = () =>
{
    return new Promise((resolve, reject) => {
        client.keys('boss:*').then(data => {
            let array = [];
            for(let i =0; i< data.length; i++)
            {
                array.push(client.get(data[i]));
            }
            all(array).then(data => {

                let mobs = [];
                for(let i =0; i< data.length; i++)
                {
                    let e = JSON.parse(data[i]);
                    mobs.push(e);
                }
                resolve(mobs);
            })
        }
        )
    });
}



let getPlayer2 = (id,map,zone) => {
    return new Promise((resolve, reject) => {
        client.get('users:'+id).then((data) => {
            if(!data) return resolve(null);
            data = JSON.parse(data);
            if(data && data.pos && data.pos.map == map && data.pos.zone == zone) return resolve(data);
            resolve(null);
        })
    }); 
}


let getBossDie = () => {
    return new Promise((resolve, reject) => {
        client.get('bossDie').then((data) => {  
            if(!data) return resolve([]);
            data = JSON.parse(data);
            resolve(data);
        })
    });
}

let setBossDie = (data) => {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        client.set('bossDie',data).then((data) => {
            resolve(data);
        })
    });
}


module.exports = {
    getBossDie : getBossDie,
    setBossDie : setBossDie,
    updatePlayer : updatePlayer,
    send : send,
    getPlayer2 : getPlayer2,
    client : client,
    getPlayer : getPlayer,
    setPlayer : setPlayer,
    delPlayer : delPlayer,
    playerInZone : playerInZone,
    getItem : getItem,
    setItem : setItem,
    delItem : delItem,
    itemInZone : itemInZone,
    setMob : setMob,
    delMob : delMob,
    mobInZone : mobInZone,
    mobCheckUid : mobCheckUid,
    mobALL : mobALL, 
    getMob : getMob,
    getSkill : getSkill,
    setSkill : setSkill,
    delSkill : delSkill,
    whereSkill : whereSkill, 
    listMapHavePlayer : listMapHavePlayer,
    setBoss : setBoss,
    getBoss : getBoss,
    delBoss : delBoss,
    bossInZone : bossInZone, 
    getAllBoss : getAllBoss, 
    setHP : setHP,
    upHP : upHP,
    getHP : getHP,


    

};