const jwt = require("jsonwebtoken");
const secret = require("../api/secrets");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    jwt.verify(authorization, secret.jwtSecret, function(err, decoded) {
      if (err) {
        res.status(401).json({ message: "Invalid Token!" });
      } else {
        req.user = { username: decoded.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login." });
  }
};
