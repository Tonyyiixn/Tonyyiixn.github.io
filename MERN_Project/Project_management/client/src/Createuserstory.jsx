import { React, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
export const Createuserstory = (props) => {
    const [proj_id, setProjectId] = useState('');
    const [user_story, setUserStory] = useState('');
    const [priority, setPriority] = useState(0);
    const [projects, setProjects] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:9000/getProjects')
            .then(function (response) {
                setProjects(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const handleCreateUserStory = (event,  proj_id,  user_story, priority) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createUserStory', {proj_id,  user_story, priority })
            .then((res) => alert('User story being created'))
            .catch((err) => alert('Error in Creating user story'))
    }



    return (
        <form onSubmit={handleCreateUserStory}>
            <div class='input'>
                <div class='text'>
                    <label for="proj_id">Project Id</label>
                    <select onChange={(e) => setProjectId(e.target.value)} value={proj_id}>
                        <option value="">Select Project Id</option>
                        {projects.map((project, index) => {
                            return <option key={index} value={project._id}>
                                {project.proj_name}
                            </option>
                        })
                        }
                    </select>
                    <label for="user_story">UserStory</label>
                    <input type="text" id="user_story" name="user_story" placeholder="User Story" value={user_story} onChange={(event) => setUserStory(event.target.value)} />
                    <label for="priority">Priority</label>
                    <input type="text" id="priority" name="priority" placeholder="priority" value={priority} onChange={(event) =>setPriority(event.target.value)}/>
                </div>
                <div class='click'>
                    <button type="button" onClick={(event) => handleCreateUserStory(event, proj_id,  user_story, priority)}>Create User Story</button>
                    <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
                    <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
                </div>
            </div>

        </form>
    )
}