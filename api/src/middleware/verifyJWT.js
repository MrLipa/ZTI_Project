const jwt = require('jsonwebtoken');
require('dotenv').config();

const excludedPaths = [
  { path: '/flight', methods: ['GET'] },
  { path: '/find', methods: ['GET'] },
];

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const currentPath = req.originalUrl;
  const currentMethod = req.method;
  
  const excludedPath = excludedPaths.find((path) => {
    return currentPath.startsWith(path.path) && path.methods.includes(currentMethod);
  });

  if (excludedPath) {
    return next();
  }

  if (!authHeader) {
    return res.sendStatus(403);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.UserInfo.username;
    next();
  });
};

module.exports = verifyJWT;
