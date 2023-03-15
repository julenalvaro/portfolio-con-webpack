//path is a node module that allows us to work with file paths in a cross-platform way (Windows, Mac, Linux)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',                    //punto de entrada de la aplicación, a partir de aquí se va a generar el bundle
  output: {
    path: path.resolve(__dirname, 'dist'),   // establece la ubicación del archivo de salida (el bundle) generado por     Webpack en un directorio específico (dist) dentro del proyecto.
    filename: 'main.js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
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
              test: /\.css$|\.styl$/,
              use: [miniCssExtractPlugin.loader, 
                    'css-loader',
                    'stylus-loader'],
            },
            {
              //archivos png
              test: /\.png/,
              type: 'asset/resource',
            },
            {
              test: /\.(woff|woff2)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  mimetype: "application/font-woff",
                  name: "[name].[ext]",
                  outputPath: "./assets/fonts/",
                  publicPath: "./assets/fonts/",
                  esModule: false,
                },
              }
            }
          ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
    }),
    new miniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname , "src" , "assets/images"), // CARPETA A MOVER AL DIST
          to: "assets/images" // RUTA FINAL DEL DIST
        },
      ]
    }),
  ]
};
