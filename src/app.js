const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("Hello from the server");
});

app.listen(7770, () => {
  console.log("Server has started");
});
