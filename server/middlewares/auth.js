const jwt = require("jsonwebtoken");

module.exports = function Auth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).send("access denide no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
