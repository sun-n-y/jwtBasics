const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //check for bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('no token provided');
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
    throw new UnauthenticatedError('not authorized to access this route ');
  }
};

module.exports = authenticationMiddleware;
