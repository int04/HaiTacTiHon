/**
 * @since04
 * @param {object} io
 * @desc: phân tán CPU trò chơi.
 */


/**
 * @since04
 *                                     Cấu hình các hệ thống cluster
 *                      #####################################################################
 */

let cluster                         =           require("cluster");
let reset                    =           require("./reset.js");
/**
 * @since04
 * @desc: start server
 */

let startMain = async () => {
    let time = Date.now();
    await reset();
    if(cluster.isMaster)
    {
        require('./isMaster.js');
    }
    else
    {
        require('./isWork.js');
    }
}

startMain();

module.exports = {};