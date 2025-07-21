const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Niket455:Niket4556@cluster0.fjnt5zl.mongodb.net/Devtin"
  );
};

module.exports = connectDB;
