const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    //Another way
    const savedPost = await Post.create({
      title,
      body,
    });

    // const post = new Post({
    //   title, body
    // })

    // const savedPost = await post.save();

    res.json({
      post: savedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while saving the posts",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();

    res.send({
      posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while getting all posts",
    });
  }
};
