// import * as path from 'path';
// import * as webpack from 'webpack';
// import 'webpack-dev-server';

const path = require('path');

// const config: webpack.Configuration = {
module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};

// export default config;
