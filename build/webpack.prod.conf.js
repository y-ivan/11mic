const path = require("path")
const baseConfig = require("./webpack.base.conf")
const merge = require("webpack-merge")
const webpack = require("webpack")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")

const resolve = dir => path.join(__dirname, "..", dir)

module.exports = merge(baseConfig, {

    mode: "production",

    output: {
        publicPath: "",
        path: resolve("dist"),
        filename: "static/js/[name].[chunkhash].js",
        chunkFilename: "static/js/[id].[chunkhash].js"
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                // modules: true
                            }
                        },
                        "postcss-loader",
                        "resolve-url-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                indentedSyntax: false,
                                sourceMap: true
                            }
                        }
                    ],
                    publicPath: "../../"
                })
            }
        ]
    },

    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "\"production\""
        }),

        new ExtractTextWebpackPlugin({
            filename: "static/css/[name].[id].css",
            allChunks: true
        }),

        // keep module.id stable when vendor modules does not change
        // new webpack.HashedModuleIdsPlugin(),

        new HtmlWebpackPlugin({
            filename: resolve("dist/index.html"),
            template: "index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),

        new CleanWebpackPlugin(["dist"], {

        })
    ]
})
