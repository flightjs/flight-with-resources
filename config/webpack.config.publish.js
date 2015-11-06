var constants = require('./constants');
var baseConfig = require('./webpack.config');

module.exports = Object.assign(baseConfig, {
    output: {
        library: 'withResources',
        filename: 'flight-with-resources.js',
        libraryTarget: 'umd',
        path: constants.BUILD_DIRECTORY
    }
});
