const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/project.js');

// GET route to fetch all projects
router.get('/get_projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
