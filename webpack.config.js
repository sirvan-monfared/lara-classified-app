const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        static: './public/'
    }
}