const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// टेस्ट रूट (बघण्यासाठी की सर्व्हर चालतोय का)
app.get('/', (req, res) => {
    res.json({ message: 'बॅकएंड सर्व्हर यशस्वीरीत्या सुरू आहे!' });
});

// MongoDB डेटाबेस कनेक्शन (तुम्ही MongoDB वापरत असल्यास)
mongoose.connect('mongodb://localhost:27017/backend-task-db')
    .then(() => console.log('MongoDB शी यशस्वी कनेक्शन झाले!'))
    .catch(err => console.error('डेटाबेस कनेक्ट करताना एरर आला:', err));

// सर्व्हर सुरू करणे
app.listen(PORT, () => {
    console.log(`सर्व्हर पोर्ट ${PORT} वर सुरू आहे...`);
});