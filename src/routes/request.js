const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post(
  "/Sending a connection request",
  userAuth,
  async (req, res) => {
    const user = req.user;

    console.log("Sending a cooneciton request");

    res.send(user.firstName + "Sent a connextion request!");
  }
);

module.exports = requestRouter;
