const express = require('express');
const ApiRouter = express.Router();
const { authenticateJWT } = require('./middleware');

/**
 * Controllers (route handlers).
 */
const authController = require('../controllers/authController');
const tokenController = require('../controllers/tokenController');

/**
 * Authentication routes
 */
ApiRouter.post('/auth/signup', authController.signup);
ApiRouter.post('/auth/signin', authController.signin);

/**
 * Api key routes
 * Must provide JWT token
 */
ApiRouter.get('/apiKey/all', [authenticateJWT], tokenController.getAllApiKeys);
ApiRouter.post('/create/apiKey', [authenticateJWT], tokenController.createApiKey);
ApiRouter.post('/delete/apiKey', [authenticateJWT], tokenController.deleteApiKey);

module.exports = ApiRouter;
