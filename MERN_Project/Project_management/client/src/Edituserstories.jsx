import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link, useParams } from 'react-router-dom';
export const Edituserstories = (props) => {
    const [proj_id, setProjectId] = useState('');
    const [user_story, setUserStory] = useState('');
    const [priority, setPriority] = useState(0);
    const [projects, setProjects] = useState([]);
    const {userstory_id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects')
            .then(function (response) {
                setProjects(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const handleEditStories = (event) => {
        event.preventDefault()
        axios.put(`http://localhost:9000/edituserstories/${userstory_id}`, {  user_story, priority })
        .then((res) => {
            if (res.data) {
                alert('edit Successful')
                localStorage.clear();
                localStorage.setItem('editeditem', res.data.proj_id);
                navigate(`/userstories/${res.data.proj_id}`);
            }
            else {
                alert('Wrong Credentials')
            }
        })
        .catch((err) => alert('Error in editing user story'))
    }

    return (
        <form onSubmit={handleEditStories}>
        <div class='input'>
            <div class='text'>
                <p>project_id cant be edited, if you want to set a new userstory associate to another project,create a new one!</p>
                <label for="proj_id">Project Id</label>
                <label for="user_story">UserStory</label>
                <input type="text" id="user_story" name="user_story" placeholder="User Story" value={user_story} onChange={(event) => setUserStory(event.target.value)} />
                <label for="priority">Priority</label>
                <input type="text" id="priority" name="priority" placeholder="priority" value={priority} onChange={(event) =>setPriority(event.target.value)}/>
            </div>
            <div class='click'>
                <button type="button" onClick={(event) => handleEditStories(event,   user_story, priority)}>Edit User Story</button>
                <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
                <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
            </div>
        </div>

    </form>
    )
}
