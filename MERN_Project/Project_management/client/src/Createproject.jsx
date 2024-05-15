import { React, useState, useEffect } from "react";
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';
import axios from "axios";
export const Createproject = (props) => {
    const [proj_name, setProjectName] = useState('');
    const [proj_desc, setProjectDescription] = useState('');
    const [prod_owner_id, setProductOwner] = useState('');
    const [mgr_id, setManager] = useState('');
    const [team_id, setTeam] = useState('');
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:9000/getUsers')
            .then(function (response) {
                setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:9000/getTeams')
            .then(function (response) {
                setTeams(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const handleCreateProject = (event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id, teams, users) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createProject', { proj_name, proj_desc, prod_owner_id, mgr_id, team_id, teams, users })
            .then((res) => alert('Project being created'))
            .catch((err) => alert('Error in Creating project'))
    }



    return (
        <form onSubmit={handleCreateProject}>
            <div class='input'>
                <div class='text'>
                    <label for="proj_name">ProjectName</label>
                    <input type="text" id="proj_name" name="proj_name" placeholder="Project Name" value={proj_name} onChange={(event) => setProjectName(event.target.value)} />
                    <label for="proj_desc">ProjectDescription</label>
                    <input type="text" id="proj_desc" name="proj_desc" placeholder="Project Description" value={proj_desc} onChange={(event) => setProjectDescription(event.target.value)} />
                    <label for="prod_owner_id">ProjectOwnerId</label>
                    <select onChange={(e) => setProductOwner(e.target.value)} value={prod_owner_id}>
                        <option value="">Select Project Owner</option>
                        {users.map((user, index) => {
                            return <option key={index} value={user._id}>
                                {user.f_name} {user.l_name}
                            </option>
                        })
                        }
                    </select>
                    {/* <input type="text" id="prod_owner_id" name="prod_owner_id" placeholder="Project Owner Id" value={prod_owner_id} onChange={(event) =>setProductOwner(event.target.value)}/> */}
                    <label for="mgr_id">ManagerId</label>
                    <select onChange={(e) => setManager(e.target.value)} value={mgr_id}>
                        <option value="">Select Manager</option>
                        {users.map((user, index) => {
                            return <option key={index} value={user._id}>
                                {user.f_name} {user.l_name}
                            </option>
                        })
                        }
                    </select>
                    {/* <input type="text" id="mgr_id" name="mgr_id" placeholder="Manager Id" value={mgr_id} onChange={(event) =>setManager(event.target.value)}/> */}
                    <label for="team_id">TeamId</label>
                    <select onChange={(e) => setTeam(e.target.value)} value={team_id}>
                        <option value="">Select Team</option>
                        {teams.map((team, index) => {
                            return <option key={index} value={team._id}>
                                {team.team_name}
                            </option>
                        })
                        }
                    </select>
                    
                    {/* <input type="text" id="team_id" name="team_id" placeholder="Team Id" value={team_id} onChange={(event) =>setTeam(event.target.value)}/> */}
                </div>
                <div class='click'>
                    <button type="button" onClick={(event) => handleCreateProject(event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id)}>Create Project</button>
                    <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
                    <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
                </div>
            </div>

        </form>
    )
}