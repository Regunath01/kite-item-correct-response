var path = require('path');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx', '.js', '.css'],
      },
    entry: './src/PreviewCorrectResponse.js',
    output: {
        path: path.resolve('lib'),
        filename: 'PreviewCorrectResponse.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.css$/,   
                use: ['style-loader', 'css-loader']
           },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
              }
        ]
    }
}