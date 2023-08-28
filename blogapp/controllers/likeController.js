// Import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    // Check if the post exists
    const existingPost = await Post.findById(post);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if the like already exists
    const existingLike = await Like.findOne({ post, user });
    if (existingLike) {
      return res.status(409).json({
        success: false,
        message: "You have already liked this post",
      });
    }

    // Create and save the like
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();

    // Update the post with the new like
    existingPost.likes.push(savedLike._id);
    await existingPost.save();

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Could not like",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    // Check if the post exists
    const existingPost = await Post.findById(post);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Find and delete the like using its ID
    const deletedLike = await Like.findByIdAndDelete(like);

    if (!deletedLike) {
      return res.status(404).json({
        success: false,
        message: "Like not found",
      });
    }

    // Update the post by removing the like ID from the likes array
    existingPost.likes.pull(deletedLike._id);
    await existingPost.save();

    return res.status(200).json({
      success: true,
      message: "Post unliked successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Couldn't unlike post",
    });
  }
};