const express = require("express");
const router = express.Router();

// Import controllers
const { createComment } = require("../controllers/commentController");
const { createPost } = require("../controllers/postController");

// Mapping
router.post("/comments/create", createComment);
router.post("/posts/create", createPost)

// Export
module.exports = router;
