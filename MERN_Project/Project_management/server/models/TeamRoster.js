const mongoose = require("mongoose");

const TeamRosterSchema = new mongoose.Schema({
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    selectedUsers: [{
        value: mongoose.Schema.Types.ObjectId
    }]

});

const TeamRoster = mongoose.model("teamrosters", TeamRosterSchema);

module.exports = TeamRoster;