const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        alias: {
            pics: path.resolve(__dirname, 'public/pics')
        }
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/i,
                use: [ miniCss.loader,
                    'css-loader',
                    'sass-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: {
                        list: [
                            { tag: 'img', attribute: 'src', type: 'src' },
                            { tag: 'img', attribute: 'srcset', type: 'srcset' },
                            { tag: 'source', attribute: 'srcset', type: 'srcset' },

                            { tag: 'img', attribute: 'data-src', type: 'src' },
                        ],
                        urlFilter: (attribute, value, resourcePath) => {
                            if (value.startsWith('~')) {
                                return true;
                            }
                            if (value.startsWith('./') || value.startsWith('../')) {
                                return true;
                            }
                            return false;
                        }
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new miniCss({
            filename: 'style.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/pics',
                    to: 'pics',
                    noErrorOnMissing: true
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
    mode: 'development',
};