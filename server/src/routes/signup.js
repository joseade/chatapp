const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post(
  "/users/signup",
  // username must be an email
  body("email").isEmail().withMessage("Email must be valid"),
  // password must be at least 5 chars long
  body("password")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage("Password must be between five and twenty characters"),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ error: "no user" });
      throw new Error("Invalid email or password");
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.json({ error: "Email in use" });

      throw new Error("Email in use");
    }

    const user = new User({ name, email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "asdfsa"
    );

    req.session = { jwt: userJwt };

    //Store it on session object

    res.status(201).send(user);
  }
);

module.exports = router;
