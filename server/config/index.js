/**
 * Module dependencies.
 */
const path = require('path');
const cors = require('cors');
const chalk = require('chalk');
const logger = require('morgan');
const express = require('express');
const ApiRouter = require('./apiRouter');
const ProxyRouter = require('./proxyRouter');
const errorHandler = require('errorhandler');

// app.use('/api', ensureLoggedIn(), proxyController);

/**
 * Export our configuration
 */
module.exports = (app) => {
  /**
   * Express configuration.
   */
  app.set('port', process.env.PORT || 8000);
  app.use(logger('dev'));
  app.use(errorHandler());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', ApiRouter);
  app.use(ProxyRouter);
};
