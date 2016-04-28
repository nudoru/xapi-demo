var Webpack         = require('webpack'),
    path            = require("path"),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath       = path.resolve(__dirname, 'www', 'build'),
    mainPath        = path.resolve(__dirname, 'app', 'scripts', 'index.js');

module.exports = {

  devtool: 'source-map',
  entry  : mainPath,

  output: {
    path      : buildPath,
    filename  : 'app.js',
    publicPath: 'build/'
  },

  module         : {
    preLoaders: [
      {
        test   : /\.js$/,
        loader : "eslint-loader",
        exclude: [nodeModulesPath]
      }
    ],
    loaders   : [
      {
        test  : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test  : /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test   : /\.sass$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test   : /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test  : /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "ie 11"]}'
      },
      {
        test   : /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      // {
      //   test  : /.*\/app\/.*\.js$/,
      //   loader: "uglify"
      // },
      {
        test   : /\.js$/,
        exclude: [nodeModulesPath],
        loaders: ["babel-loader"]
      }
    ]
  },
  sassLoader     : {
    indentedSyntax: true
  },
  // 'uglify-loader': {
  //   mangle: false
  // },
  eslint         : {
    configFile   : './.eslintrc',
    quiet        : false,
    failOnWarning: false,
    failOnError  : false
  },
  plugins        : [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.optimize.DedupePlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};