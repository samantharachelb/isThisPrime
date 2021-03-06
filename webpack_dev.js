const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        app: './app/scripts/main.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist/app'),
        filename: '[name].bundle.js',
    },

    devServer: {
        port: 3000,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.pug',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.webmanifest$/,
                include: /assets\//,
                use: ['file-loader', 'webmanifest-loader'],
            },
        ],
    },
};

module.exports = (env, argv) => {
    // if (argv.mode === 'development') {
    // }
    // if (argv.mode === 'production') {
    // }

    return config;
};