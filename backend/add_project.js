const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/project.js');

// POST route to add project
router.post('/add_project', async (req, res) => {
    const { name, start_date, end_date } = req.body;

    try {
        const newProject = new Project({
            name,
            start_date,
            end_date
        });

        await newProject.save();
        res.status(201).send('New project added successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;