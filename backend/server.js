const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blog'));
// Test Route
app.get('/', (req, res) => {
  res.send('Codomax Blog API is running...');
});const mongoose = require('mongoose');

// MongoDB कनेक्ट करणे (तुमची MongoDB URI इथे टाका)
mongoose.connect('mongodb://localhost:27017/blog-app')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log(err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});