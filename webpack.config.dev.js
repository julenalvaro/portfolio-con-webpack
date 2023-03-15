//path is a node module that allows us to work with file paths in a cross-platform way (Windows, Mac, Linux)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',                    //punto de entrada de la aplicación, a partir de aquí se va a generar el bundle
  output: {
    path: path.resolve(__dirname, 'dist'),   // establece la ubicación del archivo de salida (el bundle) generado por     Webpack en un directorio específico (dist) dentro del proyecto.
    filename: '[name].[contenthash].js',     // establece el nombre del archivo de salida (el bundle) generado por Webpack.
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },
  mode:'development',
  watch: true,
  resolve: {
    extensions: ['.js'],                // extensiones que va a leer webpack
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'), // alias para importar archivos
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
    }
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
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: "asset/resource",
              generator: {
                filename: "assets/fonts/[hash][ext]",
              },
            }
          ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
    }),
    new miniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }
    ),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname , "src" , "assets/images"), // CARPETA A MOVER AL DIST
          to: "assets/images" // RUTA FINAL DEL DIST
        },
      ]
    }),
    new DotEnv(),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3006,
    open: true,
  },
};
