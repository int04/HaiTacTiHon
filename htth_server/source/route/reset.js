let cache_mob = require('../cache/mob');
let cache_player = require('../cache/player');
let cache_skill = require('../cache/skill');

let reset = () => {
    return new Promise( async (res,fai) => {
        await cache_mob.deleteMany().exec();
        await cache_player.deleteMany().exec();
        await cache_skill.deleteMany().exec();

        // reset index
        await cache_mob.collection.dropIndexes();
        await cache_player.collection.dropIndexes();
        await cache_skill.collection.dropIndexes();
        res(true);

    });

}

module.exports = reset;