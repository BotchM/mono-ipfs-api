const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  last_login: Date,
});

const User = mongoose.model('User', UserSchema);

const addNewUser = async (user) => {
  try {
    // Check if email exists
    const email = await User.findOne({ email: user.email });
    if (email != null) return 'Duplicate email: ' + user.email;

    // Add the new user
    await new User(user).save((err) => {
      if (err) throw err;
    });

    return true;
  } catch (e) {
    return false;
  }
};

const getByUsername = (username) => User.findOne({ username: username });

// Get user by id
const getById = async function (id) {
  return await User.findById(id);
};

module.exports = exports = { User, addNewUser, getByUsername };
