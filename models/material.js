const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    material_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    cost_per_unit: { type: Number, required: true }
});

const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
