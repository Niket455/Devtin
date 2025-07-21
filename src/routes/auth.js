const express = require("express");
const validateSignUpData = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      skills,
    } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    //Creating a new instance of the user model
    // Extract fields from request body

    // Create new user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      skills,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Email id not present");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //creating a jwt token

      const token = await user.getJWT();

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set true in production
      });
      res.send("Login Succefull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

authRouter.post("/signup", async (req, res) => {});
module.exports = authRouter;
