const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/tests/index.test.js',
    output: {
        filename: 'bundle.test.js',
        path: path.resolve(__dirname, 'test')
    },
};
