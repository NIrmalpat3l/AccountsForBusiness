const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
