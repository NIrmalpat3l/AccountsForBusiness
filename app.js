import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import Project from "./models/project.js"
import Material from './models/material.js';
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const uri = "mongodb+srv://nspp3305:NSPP3305@accountdb.cjvhgg1.mongodb.net";
mongoose.connect(uri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
    origin: "https://accounts-for-business.vercel.app/",
    Credential: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" directory

// Routes
app.post('/add_project', async (req, res) => {
    const { name, start_date, end_date } = req.body;
    const newProject = new Project({ name, start_date, end_date });
    try {
        await newProject.save();
        res.status(200).send('New project added successfully');
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).send('Server error');
    }
});

app.post('/add_material', async (req, res) => {
    const { project_id, material_name, quantity, cost_per_unit } = req.body;
    const newMaterial = new Material({ project_id, material_name, quantity, cost_per_unit });
    try {
        await newMaterial.save();
        res.status(200).send('Material added successfully');
    } catch (error) {
        console.error('Error adding material:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/materials/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const materials = await Material.find({ project_id: projectId });
        res.json(materials);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


export default app;