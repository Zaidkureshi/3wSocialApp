const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post'); // Make sure this model exists
const router = express.Router();

// Set up multer storage for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create Post (with optional image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      content,
      image,
      likes: 0,
      comments: [],
    });

    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ msg: 'Could not create post' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});


// Toggle like (POST)
router.post('/:id/like', async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ msg: 'userId required' });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // Toggle logic
    const hasLiked = post.likes.includes(userId);
    if (hasLiked) {
      post.likes = post.likes.filter(id => id !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    return res.json({ likesCount: post.likes.length, likes: post.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

