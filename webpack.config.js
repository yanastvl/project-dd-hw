const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        clean: true,
        filename: '[name].[contenthash].js',
        assetModuleFilename: "[name][ext]",
    },
    devServer: {
        hot: true,
        historyApiFallback: true
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                      loader: 'css-loader',
                      options: { sourceMap: true }
                    }, {
                      loader: 'postcss-loader',
                      options: {
                          postcssOptions: {
                              plugins: [
                                  'autoprefixer',
                                  'css-mqpacker', 
                                  'cssnano'
                                ]
                            }
                        }
                    }, {
                      loader: 'sass-loader',
                      options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '/[name].[ext]',
                        }
                    },
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource",
            },
        ]
    }
};
