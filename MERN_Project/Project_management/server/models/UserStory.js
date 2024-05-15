const mongoose = require("mongoose");

const UserStoriesSchema = new mongoose.Schema({
    proj_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user_story: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    priority: {
        type: mongoose.Schema.Types.Number,
        default:0,
        required: true,
    }
});

const UserStories = mongoose.model("userstories", UserStoriesSchema);

module.exports = UserStories;