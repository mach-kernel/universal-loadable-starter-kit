const express = require('express');
const compression = require('compression')

const sys = require('sys');
const path = require('path');

const asciimo = require('asciimo');
const colors = require('asciimo/lib/colors');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const cookiesMiddleware = require('universal-cookie-express');
const Cookies = require('universal-cookie');

const clientConfig = require(path.resolve('config', 'webpack.client.js'));
const serverConfig = require(path.resolve('config', 'webpack.server.js'));

const serverRender = require(path.resolve('dist', 'server', 'main.js'));
const Loadable = require('react-loadable');

const compiler = webpack([clientConfig, serverConfig]);
const app = express();

const ignoreStyle = require('ignore-styles');

asciimo.Figlet.write('hello!', 'speed', (art) => sys.puts(art.magenta));
console.log("Server coming up...please wait");

app.use(compression());
app.use(cookiesMiddleware());

// Use development middleware for non-prod environment
if (process.env.NODE_ENV !== 'production') {
  console.info("Booting app in development mode!");

  app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: '/static/'
  }));

  let clientPack = compiler.compilers.find((c) => c.name === 'client');
  app.use(webpackHotMiddleware(clientPack));
  app.use(webpackHotServerMiddleware(compiler));
}
else {
  console.info("Booting app in production mode!");

  // In production, use Express to serve static assets
  app.use('/static', express.static('dist/client'));
}

// Include our SSR middleware
app.get('*', serverRender.default());

// Start the server
Loadable.preloadAll().then(() => {
  app.listen(
    process.env.PORT, 
    () => console.log(`Server up on port ${process.env.PORT}`)
  );
})

module.exports = app;