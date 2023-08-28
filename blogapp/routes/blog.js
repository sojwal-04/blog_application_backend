const express = require("express");
const router = express.Router();

// Import controllers
const { createComment } = require("../controllers/commentController");
const { createPost, getAllPosts } = require("../controllers/postController");
const { likePost } = require("../controllers/likeController");

// Mapping
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts/getPosts", getAllPosts);
router.get("/likes/like", likePost);

// Export
module.exports = router;
