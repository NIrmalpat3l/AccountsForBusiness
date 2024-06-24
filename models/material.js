const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    material_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    cost_per_unit: { type: Number, required: true }
});

module.exports = mongoose.model('Material', MaterialSchema);
