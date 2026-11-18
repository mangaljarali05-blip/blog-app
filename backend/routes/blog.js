const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog.js'); // Blog model इम्पोर्ट करणे

// 1. CREATE - नवीन ब्लॉग तयार करणे
router.post('/', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. READ - सर्व ब्लॉग्स फेच करणे
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. UPDATE - ब्लॉग अपडेट करणे
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE - ब्लॉग डिलीट करणे
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'ब्लॉग यशस्वीरित्या डिलीट झाला आहे.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;