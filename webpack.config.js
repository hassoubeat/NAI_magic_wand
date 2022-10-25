const path = require('path');
const glob = require("glob");

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { htmlWebpackPluginTemplateCustomizer } = require("template-ejs-loader");

const srcPath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist");

module.exports = env => {
  const MODE = env.production ? "production" : "development";
  return {
    mode: MODE,
    entry: {
      popup: "./src/js/popup/main.js"
    },
    output: {
      filename: 'js/[name].bundle.js',
      path: distPath
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // Loader process ignore path.
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { modules: false }]],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.ejs$/i,
          include: srcPath,
          use: ['html-loader','template-ejs-loader']
        },
        {
          test: /\.(sc|c|sa)ss$/,
          include: srcPath,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.vue' ],
      alias: {
        '~': srcPath,
      },
    },
    plugins: [
      ...getEJSEntrys(srcPath, MODE),
      new CopyWebpackPlugin({
        patterns: [
          {
            context: srcPath,
            from: "**/*.(gif|png|jpg|jpeg|svg|webp|eot|wof|woff|ttf|otf|mp4|json)",
            to: distPath,
          },
        ],
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new VueLoaderPlugin()
    ],
    // for ChromeExtension working development build(unuse "eval" code)
    devtool: 'cheap-module-source-map',
    devServer: {
      host: "0.0.0.0",
      port: 8081,
      static: {
        directory: distPath,
      },
      devMiddleware: {
        writeToDisk: true
      },
      historyApiFallback: true,
    },
    // Update MaxSize 10MB
    performance: {
      maxEntrypointSize: 10485760,
      maxAssetSize: 10485760,
    },

  }
}

function getEJSEntrys(srcPath, mode) {
  return glob
    .sync(`**/*.ejs`, {
      // process ignore files have "_" start name.
      ignore: "**/_*.ejs",
      cwd: srcPath,
    })
    .map((file) => {
      return new HtmlWebpackPlugin({
        filename: `${path.dirname(file)}/${path.basename(file, ".ejs")}.html`,
        template: htmlWebpackPluginTemplateCustomizer({
          templatePath: `${srcPath}/${file}`,
          htmlLoaderOption: {
            sources: false,
            minimize: false
          },
          templateEjsLoaderOption:{
            root:'',
            data: require(`${srcPath}/ejs/_var/${mode}/var.js`)
          }
        }),
        // js & css auto-output & minify off.
        inject: false,
        minify: false,
      });
    });
}