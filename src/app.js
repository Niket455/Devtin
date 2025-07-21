const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database connected...");
    app.listen(7770, () => {
      console.log("Server has started");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });
