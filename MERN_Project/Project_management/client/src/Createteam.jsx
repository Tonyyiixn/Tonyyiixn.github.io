import { React, useState, useEffect } from "react";
import Select from 'react-select';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';
import axios from "axios";

export const Createteam = (props) => {
    const [team_name, setTeam] = useState('');

    const handleCreateTeam = (event, team_name) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createTeam', { team_name })
            .then((res) => alert('Team being created'))
            .catch((err) => alert('Error in Creating Team'))
    }



    return (
        <form onSubmit={handleCreateTeam}>
            <div class='input'>
                <div class='text'>
                    <label for="team_id">TeamId</label>
                    <input type="text" id="team_id" name="team_id" placeholder="Team Id" value={team_name} onChange={(event) => setTeam(event.target.value)} />
                </div>
                <div class='click'>
                    <button type="button" onClick={(event) => handleCreateTeam(event, team_name)}>Create Team</button>
                    <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
                    <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
                </div>
            </div>

        </form>
    )
}