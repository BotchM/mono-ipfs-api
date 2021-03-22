const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    tokenId: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    logs: [
      {
        log: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const Token = mongoose.model('Token', TokenSchema);

const addNewToken = async (token) => {
  try {
    // Add the new token
    await new Token(token).save((err) => {
      if (err) throw err;
    });

    return true;
  } catch (e) {
    return false;
  }
};

const removeToken = async (tokenId) => {
  try {
    await Token.deleteOne({ tokenId }, (err) => {
      if (err) throw err;
    });

    return true;
  } catch (e) {
    return false;
  }
};

// Log each access to a specifi token
const addTokenLog = async (id, log) => {
  try {
    const token = await Token.findById(id);

    token.logs.push(log);
    await token.save();

    return true;
  } catch (e) {
    return false;
  }
};

// Get api key based on tokenId
const getTokenById = async (tokenId) => await Token.find({ tokenId });

// Get all tokens and their logs
const getAllTokens = async () => await Token.find();

module.exports = exports = {
  Token,
  addNewToken,
  removeToken,
  addTokenLog,
  getTokenById,
  getAllTokens,
};
