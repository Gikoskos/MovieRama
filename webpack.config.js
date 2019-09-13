const path = require('path');

module.exports = (env) => ({
    mode: (env.production) ? 'production' : 'development',
    //entrypoint
    entry: './src/index.js',
    output: {
        filename: 'bundle.js', //compiled bundle filename
        path: path.resolve(__dirname, 'dist') //path resolved to {project_root}/dist
    },
    //generate sourcemap or not
    devtool: (env.production) ? false : 'source-map',
    //webpack development server
    devServer: {
        //reload when the files in the /dist folder change
        watchContentBase: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        //enable hot reload
        hot: true
    },
    /*@NOTE: I initially used babel to transpile
    experimental features like class method fields, but
    later on I decided to simply not use these (wanted to keep my 
    javascript as pure as possible, according to the specs and the exercise).
    Leaving this configuration here in case it's needed in the future.*/
    /*
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                'exclude': [
                                    'transform-regenerator'
                                ]
                            }
                        ]
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                    ],
                    cacheDirectory: true
                }
            },
        }]
    }*/
});
