const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const Project = require('./models/Projects');
const TeamModel = require('./models/TeamName');
const TeamRosterModel = require('./models/TeamRoster');
const UserStoryModel = require('./models/UserStory');
const cors = require('cors');
const Team = require("./models/TeamName");
const AssignedUserStories = require('./models/AssignedUserStory')

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://ychen42:ychen42@cluster0.nwhwyfn.mongodb.net/lab"
);

app.post('/createUser', async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

app.post('/createTeam', async (req, res) => {
    try {
        const Team = new TeamModel(req.body);
        await Team.save()
        res.send(Team)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

app.post('/createTeamRoster', async (req, res) => {
    try {
        const TeamRoster = new TeamRosterModel(req.body);
        await TeamRoster.save()
        console.log(`TeamRoster created! ${TeamRoster}`)
        res.send(TeamRoster);
    }
    catch (error) {
        res.status(500).send(error)
    }
});


app.get("/getUser", async (req, res) => {
    const username = req.query.username;//query parameter
    const password = req.query.password;//query parameter
    try {
        const user = await UserModel.findOne({ username: username, password: password });
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        project.save()
        console.log(`Project created! ${project}`)
        res.send(project)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

app.post('/createUserStory', async (req, res) => {
    try {
        const UserStory = new UserStoryModel(req.body);
        await UserStory.save()
        res.send(UserStory)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

app.post('/createassigneduserstory', async (req, res) => { //works in client tools
    try {
        const assigneduserstories = new AssignedUserStories(req.body);
        await assigneduserstories.save()
        res.send(assigneduserstories)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

app.get('/getUsers', async (req, res) => {
    try {
        const userList = await UserModel.find({}, { f_name: 1, l_name: 1, _id: 1 });
        res.send(userList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getTeams', async (req, res) => {
    try {
        const teamList = await TeamModel.find({}, { team_name: 1, _id: 1 });
        res.send(teamList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get("/getTeamsByTheirId", async (req, res) => {
    try {
        const teamrosters = await TeamRosterModel.find()
        let responseDetails = []
        for (const teamroster of teamrosters) {
            const team = await Team.findById(teamroster.team_id)
            responseDetails.push({
                team_id: team.team_name,
            })
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

app.get("/getTeamMembersByTheirId", async (req, res) => {
    try {
        const teamrosters = await TeamRosterModel.find();
        let responseDetails = [];

        for (const teamroster of teamrosters) {
            // Map over selectedUsers to get an array of user IDs
            const userIds = teamroster.selectedUsers.map(user => user.value);

            // Fetch user details based on the user IDs
            const users = await UserModel.find({ _id: { $in: userIds } });

            responseDetails.push({
                selectedUsers: users.map(user => ({
                    _id: user._id,
                    f_name: user.f_name,
                    l_name: user.l_name,
                }))
            });
        }
        res.send(responseDetails);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/getTeamsByUserId/:UserId", async (req, res) => {//this works in client tools
    try {
        const userId = req.params.UserId;

        const teams = await TeamRosterModel.find({
            selectedUsers: {
                $elemMatch: {
                    value: userId
                }
            }
        });

        if (teams.length > 0) {
            const teamIds = teams.map(team => team.team_id);
            let responseDetails = [];

            for (const teamId of teamIds) {

                // Fetch user details based on the user IDs
                const team = await Team.findById(teamId);

                responseDetails.push({
                    _id: team._id,
                    team_name: team.team_name
                });
            }
            res.json(responseDetails);
            // res.send(responseDetails);
            // res.send(teamIds);
        } else {
            res.status(404).json({ message: 'No teams found for this user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get("/getTeambyTeamId/:TeamId", async (req, res) => {//this works in client tools

    try {
        const teams = await Team.findById(req.params.TeamId)
        let responseDetails = [];
        responseDetails.push({
            team_name: teams.team_name
        })
        res.send(responseDetails)
    }
    catch (error) {
        res.status(404).json({ message: 'Team not found ' });
    }

});

app.get("/getMembersbyTeamId/:TeamId", async (req, res) => {//this works in client tools

    try {
        const teamrosters = await TeamRosterModel.find({ team_id: { $in: req.params.TeamId } })
        let responseDetails = [];
        for (const teamroster of teamrosters) {
            const userIds = teamroster.selectedUsers.map(user => user.value);
            const users = await UserModel.find({ _id: { $in: userIds } });
            responseDetails.push({
                selectedUsers: users.map(user => ({
                    _id: user._id,
                    f_name: user.f_name,
                    l_name: user.l_name,
                }))
            })
        }

        res.send(responseDetails)
    }
    catch (error) {
        res.status(404).json({ message: 'Team not found or this team doesnt have a user yet' });
    }

});

app.get("/getProjectsbyTeamId/:TeamId", async (req, res) => {//this works in client tools

    try {
        const projects = await Project.find({ team_id: { $in: req.params.TeamId } })
        let responseDetails = []
        for (const project of projects) {
            const manager = await UserModel.findById(project.mgr_id)
            const owner = await UserModel.findById(project.prod_owner_id)
            const team = await TeamModel.findById(project.team_id)
            responseDetails.push({
                _id: project._id,
                proj_name: project.proj_name,
                proj_desc: project.proj_desc,
                manager_name: manager.f_name,
                prod_owner_name: owner.f_name,
                teams_name: team.team_name
            })
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(404).json({ message: 'project not found or this team doesnt have a project yet' });
    }

});

app.get("/getUserstoriesbyTeamId/:TeamId", async (req, res) => {//this works in client tools

    try {
        const projects = await Project.find({ team_id: { $in: req.params.TeamId } })
        let responseDetails = []
        for (const project of projects) {
            const userstories = await UserStoryModel.find({ proj_id: { $in: project._id } })
            for (const userstory of userstories) {
                responseDetails.push({
                    _id: userstory._id,
                    user_story: userstory.user_story,
                    priority: userstory.priority,
                })
            }
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(404).json({ message: 'project not found or this team doesnt have a project yet' });
    }

});

app.get("/getunassigneduserstoriesByUserId/:UserId", async (req, res) => {//this works in client tools
    try {
        const userId = req.params.UserId;

        const teams = await TeamRosterModel.find({
            selectedUsers: {
                $elemMatch: {
                    value: userId
                }
            }
        });
 let responseDetails = []
        if (teams.length > 0) {
            const teamIds = teams.map(team => team.team_id);
           
            for (const teamId of teamIds) {
                // Fetch user details based on the user IDs
                const team = await Team.findById(teamId);
                const team_id = team._id;
                const projects = await Project.find({ team_id: { $in: team_id } })
                if (projects.length > 0) {
                    for (const project of projects) {
                        const userstories = await UserStoryModel.find({ proj_id: { $in: project._id } })
                        for (const userstory of userstories) {
                            if (userstories.length > 0) {
                                const project = await Project.findById(userstory.proj_id)
                                responseDetails.push({
                                    _id: userstory._id,
                                    proj_id: project.proj_name,
                                    user_story: userstory.user_story,
                                    priority: userstory.priority,
                                })
                            }
                        }
                    }
                }
            } 
           
        } else {
            res.status(404).json({ message: 'No teams found for this user' });
        }
        res.send(responseDetails);
    } catch (error) {
        res.status(500).json({ message: "meet an error,need to restart server" });
    }
});


app.get('/getUserstoriesByProjectId/:ProjectId', async (req, res) => {//this works in client tools
    try {
        const userstories = await UserStoryModel.find({ proj_id: { $in: req.params.ProjectId } })
        let responseDetails = []
        for (const userstory of userstories) {
            const project = await Project.findById(userstory.proj_id)
            responseDetails.push({
                _id: userstory._id,
                proj_id: project.proj_name,
                user_story: userstory.user_story,
                priority: userstory.priority
            })
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(404).json({ message: 'userstory not found or this project doesnt have a userstory yet' });
    }
})

app.get('/getTeamrosters', async (req, res) => {
    try {
        const teamrosterList = await TeamRosterModel.find();
        console.log(teamrosterList.length)
        res.send(teamrosterList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

// DELETE a user story by ID
app.delete('/deleteuserstories/:id', async (req, res) => {
    try {
        const userStoryId = req.params.id;
        // Find the user story by ID
        const userStory = await UserStoryModel.findByIdAndDelete(userStoryId);

        if (!userStory) {
            return res.status(404).json({ error: 'User story not found' });
        }

        res.json({ message: 'User story deleted successfully' });
    } catch (err) {
        console.error('Error deleting user story:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Edit a user story by ID
app.put('/edituserstories/:id', async (req, res) => {
    try {
        const userStoryId = req.params.id;
        // Find the user story by ID
        const userStory = await UserStoryModel.findByIdAndUpdate(userStoryId,
            { $set: req.body });

        if (!userStory) {
            return res.status(404).json({ error: 'User story not found' });
        }

        const newuserStory = await UserStoryModel.findById(userStoryId);

        res.send(newuserStory)

    } catch (err) {
        console.error('Error editing user story:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});



app.get('/getUserstories', async (req, res) => {
    try {
        const userstories = await UserStoryModel.find()
        let responseDetails = []
        for (const userstory of userstories) {
            const project = await Project.findById(userstory.proj_id)
            responseDetails.push({
                _id: userstory._id,
                proj_id: project.proj_name,
                user_story: userstory.user_story,
                priority: userstory.priority
            })
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getProjects', async (req, res) => {
    try {
        const projects = await Project.find()
        let responseDetails = []
        for (const project of projects) {
            const manager = await UserModel.findById(project.mgr_id)
            const owner = await UserModel.findById(project.prod_owner_id)
            const team = await TeamModel.findById(project.team_id)
            responseDetails.push({
                _id: project._id,
                proj_name: project.proj_name,
                proj_desc: project.proj_desc,
                manager_name: manager.f_name,
                prod_owner_name: owner.f_name,
                teams_name: team.team_name
            })
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getAssignedUserstoriesbyUserId/:user_id', async (req, res) => {
    try {
        const assigneduserstories = await AssignedUserStories.find({ user_id: { $in: req.params.user_id } })
        let responseDetails = []
        for (const assigneduserstory of assigneduserstories) {
            const userstory = await UserStoryModel.findById(assigneduserstory.user_story_id)
            const project = await Project.findById(userstory.proj_id)
            responseDetails.push({
                _id: assigneduserstory._id,
                proj_id: project.proj_name,
                user_story: userstory.user_story,
                priority: userstory.priority
            })
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(404).json({ message: 'assigned userstory not found or this user doesnt have a assigned user story yet' });
    }
})

app.listen(9000, () => {
    console.log("server started at ${9000}");
});
