const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //check for bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('no token provided', 401);
  }
  const token = authHeader.split(' ')[1];

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    //creates a user property in request for next middle ware aka dashboard
    req.user = { id, username };
    //nex middleware aka dashboard
    next();
  } catch (error) {
    throw new CustomAPIError('not authorized to access this route ', 401);
  }
};

module.exports = authenticationMiddleware;
