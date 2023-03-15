//path is a node module that allows us to work with file paths in a cross-platform way (Windows, Mac, Linux)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',                    //punto de entrada de la aplicación, a partir de aquí se va a generar el bundle
  output: {
    path: path.resolve(__dirname, 'dist'),   // establece la ubicación del archivo de salida (el bundle) generado por     Webpack en un directorio específico (dist) dentro del proyecto.
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js'],                      // extensiones que va a leer webpack
  },
  module:{
    rules:[
            {
              //utiliza cualquier extensión que sea .js o .mjs
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
              },          
            },
            {
              //archivos css y stylus
              test: /\.css|.styl$/i,
              use: [miniCssExtractPlugin.loader, 
                    'css-loader',
                    'stylus-loader'],
            },
            
          ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
    }),
    new miniCssExtractPlugin(),
  ],
};
