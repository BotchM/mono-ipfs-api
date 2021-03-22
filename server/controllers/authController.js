const { User, addNewUser, getByUsername } = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const tokenSecret = process.env.TOKEN_SECRET;

/**
 * POST /
 *  New User.
 */
exports.signup = async (req, res) => {
  if (!req.body) res.status(401).json({ message: 'Body Missing!' });

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  try {
    // Try to handle duplicate email error
    const result = await addNewUser(user);

    result && res.json({ message: 'User was created!' });
  } catch (e) {
    res.status(500).json({ message: 'User was not created!' });
  }
};

exports.signin = async (req, res) => {
  try {
    console.log(req.body);
    // Find User by username
    const user = await getByUsername(req.body.username);
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password!' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      tokenSecret,
      { expiresIn: '24h' },
    );

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch ({ message }) {
    res.status(500).json(message);
  }
};
