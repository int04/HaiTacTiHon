const path = require('path');

module.exports = {
    entry: './src/game.js',
    mode: 'production',
    output: {
        filename: 'com.int04.build.js',
        path: path.resolve(__dirname, './'),
    },
};


// npx webpack --config webpack.config.js
