const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: String, default: 'anon' },
  user: { type: String, default: 'Anonymous' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, default: 'anon' },
    username: { type: String, required: true, default: 'Anonymous' },
    text: { type: String, trim: true },
    imageUrl: { type: String }, // example: "https://via.placeholder.com/150"
    likes: [{ type: String }], // store array of userIds who liked the post
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
