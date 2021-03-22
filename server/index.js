/**
* Load environment variables from .env file, where API keys and passwords are configured.
*/
require('dotenv').config()

/**
 * Module dependencies.
 */
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const config = require('./config');

/**
* Create Express server.
*/
const app = express();

/**
* Database setup and connection
*/
require('./db').connectToDB();

/**
* Express configuration.
*/
config(app);

/**
* Start Express server.
*/
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app; //module exported for testing
