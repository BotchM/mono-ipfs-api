const jwt = require('jsonwebtoken');
const { validate } = require('uuid');
const ApiRouter = require('./apiRouter');
const { getTokenById, addTokenLog, getAllTokens } = require('../models/token.model');

const tokenSecret = process.env.TOKEN_SECRET;

/**
 * Bearer Handler for JWT tokens
 */
exports.authenticateJWT = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Token Missing!' });
  }

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, tokenSecret, (err, user) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized!' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'You are not authorized!' });
  }
};

/**
 * Api key handler for proxy middleware
 */
exports.authenticateApiKey = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'ApiKey Missing!' });
  }

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // Validate uuid
    await validate(token);

    // check token in database
    const result = await getTokenById(token);

    if (Array.isArray(result) && !result.length)
      return res.status(401).send({ message: 'Unauthorized!' });

    // log access in database
    result &&
      (await addTokenLog(result?.[0]?.id, {
        log: `Granted Access to ${token} from ${req?.originalUrl}`,
      }));

    next();
  } else {
    res.status(401).json({ message: 'You are not authorized, check your api key!' });
  }
};
