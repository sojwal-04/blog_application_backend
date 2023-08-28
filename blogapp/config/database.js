const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE_URL;

const connectWithDB = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connection successful"))
    .catch((err) => {
      console.log("DB facing connection error");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDB;
