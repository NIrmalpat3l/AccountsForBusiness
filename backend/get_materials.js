const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Material = require('../models/material');

// GET route to fetch materials by project_id
router.get('/get_materials/:project_id', async (req, res) => {
    const { project_id } = req.params;

    try {
        const materials = await Material.find({ project_id });
        res.json(materials);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;