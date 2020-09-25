const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const config = require('src/config');
const logger = require('src/logger');

const app = express();
app.set('port', config.port);
app.use(expressWinston.logger({winstonInstance: logger}));
app.use(bodyParser.json());

module.exports = app;