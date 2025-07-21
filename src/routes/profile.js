const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
