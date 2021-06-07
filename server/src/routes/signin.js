const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Password = require("../services/password");
const User = require("../models/user");

const router = express.Router();

router.post(
  "/users/signin",
  // username must be an email
  body("email").isEmail().withMessage("Email must be valid"),
  // password must be at least 5 chars long
  body("password").trim().notEmpty().withMessage("Must supply a password"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ error: "Invalid email or password" });
      throw new Error("Invalid email or password");
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.json({ error: "no user" });
      throw new Error("Not user found");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      res.json({ error: "Invalid password" });
      throw new Error("Invalid Credentials");
    }

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      "asdfsa"
    );

    req.session = { jwt: userJwt };

    //Store it on session object

    res.status(200).send(existingUser);
  }
);

module.exports = router;
