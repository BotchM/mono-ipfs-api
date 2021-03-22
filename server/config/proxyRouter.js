const express = require('express');
const ProxyRouter = express.Router();
const { Proxy } = require('./proxy');
const { authenticateApiKey } = require('./middleware');

/**
 * Inject Api Key Middleware
 */
ProxyRouter.use(authenticateApiKey);

/**
 * Proxy routes
 */
ProxyRouter.use(Proxy);

module.exports = ProxyRouter;
