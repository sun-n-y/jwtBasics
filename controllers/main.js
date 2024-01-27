const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  //check for empty values
  if (!username || !password) {
    throw new CustomAPIError('please provide username and password', 400);
  }
  //for demo, usually provided by db
  const id = new Date().getDate();
  //create new jwt token, sign token
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your luck number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
