const express = require('express');
const path = require('path');
const server = require('./server');
const bodyParser = require('body-parser');

const app = express();

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../public')));
// app.use(express.static('./public'));

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../../webpack.config')
var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler));

const main = () => {
  server(app)
  app.listen(3000, () => console.info('Express: listening on 3000'))
}

main();
