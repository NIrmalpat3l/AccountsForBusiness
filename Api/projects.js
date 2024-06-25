import express from 'express';
import Project from '../models/project.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, startDate, endDate } = req.body;
  const project = new Project({ name, startDate, endDate });
  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
