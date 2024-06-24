const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Material = require('../models/material.js');

// POST route to add material
router.post('/add_material', async (req, res) => {
    const { project_id, material_name, quantity, cost_per_unit } = req.body;

    try {
        const newMaterial = new Material({
            project_id,
            material_name,
            quantity,
            cost_per_unit
        });
        
        await newMaterial.save();
        res.status(201).send('Material added successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
