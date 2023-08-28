const express = require("express");
require("dotenv").config();
const blog = require("./routes/blog");
const connectWithDB = require("./config/database");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

//Mounting
app.use("/api/v1", blog);

connectWithDB();

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
