// Reference http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

var express      = require('express'),
    path         = require('path'),
    httpProxy    = require('http-proxy'),
    proxy        = httpProxy.createProxyServer(),
    app          = express(),
    isProduction = process.env.NODE_ENV === 'production',
    publicPath   = path.resolve(__dirname, 'www'),
    ipAddress, port;

ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port      = process.env.OPENSHIFT_NODEJS_PORT || (isProduction ? process.env.PORT : 3000);
//port         = isProduction ? process.env.PORT : 3000,

app.use(express.static(publicPath));

// We only want to run the workflow when not in production
if (!isProduction) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./server/bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function (e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, ipAddress, function () {
  console.log('Server running', Date(Date.now()), ipAddress, port);
});