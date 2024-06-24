const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://nspp3305:NSPP3305@accountdb.cjvhgg1.mongodb.net/?retryWrites=true&w=majority&appName=AccountDB/Acc', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose models
const Project = require('./models/Project');
const Material = require('./models/Material');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Routes
app.get('/api/materials/:materialId', async (req, res) => {
    try {
        const material = await Material.findById(req.params.materialId);
        res.json(material);
    } catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/materials/project/:projectId', async (req, res) => {
    try {
        const materials = await Material.find({ project_id: req.params.projectId });
        res.json(materials);
    } catch (error) {
        console.error('Error fetching project materials:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/options.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'options.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
