const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { publicDecrypt } = require('crypto');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            { test: /\.(png|jp(e*)g|svg|gif)$/, use: ['file-loader'], }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        static: './dist',
        compress: true,
        port: 8080,
        historyApiFallback: true
    }
};