const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  //check for empty values
  if (!username || !password) {
    throw new CustomAPIError('please provide username and password', 400);
  }
  res.send('fake login, register, signup');
  console.log(username, password);
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your luck number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
