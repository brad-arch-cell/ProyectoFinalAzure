const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.user = decoded; // Contendrá el email
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

module.exports = verifyToken;
