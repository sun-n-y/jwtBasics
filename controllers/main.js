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
  const authHeader = req.headers.authorization;
  //check for bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('no token provided', 401);
  }
  const token = authHeader.split(' ')[1];

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your luck number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError('not authorized to access this route ', 401);
  }
};

module.exports = { login, dashboard };
