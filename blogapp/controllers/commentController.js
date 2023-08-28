// import models

const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//Logic

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;

    const comment = new Comment({
      post: post,
      user: user,
      body: body,
    });

    const savedComment = await comment.save();
    /* // this is other way
    const savedComment = await Comment.create({
      post,
      user,
      body,
    });
    */

    //I have to make changes in post too
    //So i have to fetch post first and then add to array of comments in post

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true } //new: True returns updatedPost when all things are done
    )
      // .populate("comments")           //populate will store all comments data in post Colection
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    console.log(err);
    return res.json(500).json({ error: "Error while creating comment" });
  }
};
