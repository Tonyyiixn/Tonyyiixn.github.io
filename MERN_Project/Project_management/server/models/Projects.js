const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    proj_name: {
        type: String,
        required: true,
    },
    proj_desc: {
        type: String,
        required: true,
    },
    prod_owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    mgr_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const Project = mongoose.model("projects", ProjectSchema);

module.exports = Project;