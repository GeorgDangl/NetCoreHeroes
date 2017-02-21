const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: { extensions: ['.js'] },
    entry: {
        vendor: [
            '@angular/core',
            '@angular/common',
            '@angular/compiler',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/http',
            '@angular/router',
            '@angular/forms',
            'es6-shim',
            'rxjs',
            'zone.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'wwwroot', 'dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        library: '[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
            name: '[name]_[hash]'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}
