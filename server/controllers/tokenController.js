const { v4: uuidv4 } = require('uuid');
const { Token, addNewToken, removeToken, getAllTokens } = require('../models/token.model');

/**
 * POST /
 *  New Api Key
 */
exports.createApiKey = async (req, res) => {
  const randomKey = uuidv4();

  const token = new Token({
    tokenId: randomKey,
    user_id: req.user.id,
  });

  try {
    const addToken = await addNewToken(token);

    addToken && res.status(200).json({ message: 'Api key was created!', key: randomKey });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: 'Api key was not created!' });
  }
};

/**
 * POST /
 *  Delete Api Key
 */
exports.deleteApiKey = async (req, res) => {
  try {
    const tokenId = req?.body?.tokenId.trim();

    const removeApiKey = await removeToken(tokenId);

    removeApiKey && res.status(200).json({ message: 'Api key was removed!' });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: 'Api key was not removed!' });
  }
};

/**
 * GET /
 *  All API keys with logs
 */
exports.getAllApiKeys = async (req, res) => {
  try {
    res.status(200).send(await getAllTokens());
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'No Api Keys!' });
  }
};
