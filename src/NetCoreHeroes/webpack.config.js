const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    resolve: { extensions: ['.ts', '.js'] }, // .ts is first so that .ts files are preffered over js file, this ensures
    // that angular 2 components are passed through the angular2-template-loader and have their templates and styles inlined
    entry: { 'main': './App/main.ts' },
    output: {
        path: path.join(__dirname, './wwwroot/dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            { test: /\.ts$/, include: /App/, use: ['awesome-typescript-loader?silent=true', 'angular2-template-loader']
            },
            { test: /\.html$/, use: 'html-loader?minimize=false' },
            { test: /\.css$/, use: ['to-string-loader', 'css-loader'] }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
