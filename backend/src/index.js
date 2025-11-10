require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

const app = express();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads'); // relative to backend root
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Uploads folder created automatically');
}

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); // parse JSON bodies
app.use('/uploads', express.static(uploadDir)); // serve uploaded images

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('3W Social API running');
});

// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/social_app_db';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
