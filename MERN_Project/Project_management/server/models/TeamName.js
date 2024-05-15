const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        require: true,
    }
});

const Team = mongoose.model("teams", TeamSchema);

module.exports = Team;