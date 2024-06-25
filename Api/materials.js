import express from 'express';
import Material from '../models/material.js';
const router = express.Router();


router.post('/', async (req, res) => {
  const { projectId, materialName, quantity, costPerUnit } = req.body;
  const material = new Material({ projectId, materialName, quantity, costPerUnit });
  try {
    const savedMaterial = await material.save();
    res.json(savedMaterial);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const materials = await Material.find({ projectId: req.params.projectId });
    res.json(materials);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
