const mongoose = require("mongoose");

//Route handler
const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", //This is reference to the Post model
  },
  user: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

//export it
module.exports = mongoose.model("Comment", commentSchema);
