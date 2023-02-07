const bcrypt = require("bcrypt");
const express = require("express");

const { User, validationLogIn } = require("../models/User");
const logInRouter = express.Router();

//! log in
logInRouter.post("/", async (req, res) => {
  const { error } = validationLogIn(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("email or password not valid");
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (passwordMatch) {
    const token = user.generateJWT();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({ token });
  } else {
    return res.status(400).send("email or password not valid");
  }
});

module.exports = logInRouter;
