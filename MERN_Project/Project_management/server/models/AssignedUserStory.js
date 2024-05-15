const mongoose = require("mongoose");

const AssignedUserStoriesSchema = new mongoose.Schema({
    user_story_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const AssignedUserStories = mongoose.model("assigneduserstories", AssignedUserStoriesSchema);

module.exports = AssignedUserStories;