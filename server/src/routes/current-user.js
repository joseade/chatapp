const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/users/currentuser", (req, res) => {
  console.log(req.session);
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  try {
    const payload = jwt.verify(req.session.jwt, "asdfsa");
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

module.exports = router;
