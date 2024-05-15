import { React, useState, useEffect } from "react";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from "axios";

export const Createteamroster = (props) => {
    const [team_id, setTeamId] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([])
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

    const userOptions = users.map((user) => {
        return { label: user.f_name + user.l_name, value: user._id }
    })

    const handleCreateTeamroster = (event, team_id, selectedUsers) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createTeamRoster', { team_id, selectedUsers })
            .then((res) => alert('Team being created'))
            .catch((err) => alert('Error in Creating Team'))
    }

    return (
        <form onSubmit={handleCreateTeamroster}>
            <div class='input'>
                <div class='text'>
                    <label for="team_id">TeamId</label>
                    <select onChange={(e) => setTeamId(e.target.value)} value={team_id}>
                        <option value="">Select Team</option>
                        {teams.map((team, index) => {
                            return <option key={index} value={team._id}>
                                {team.team_name}
                            </option>
                        })
                        }
                    </select>
                    <label for="user_id">UserId</label>
                    <Select
                        isMulti
                        label="user_id"
                        placeholder="select users here"
                        value={selectedUsers}
                        onChange={setSelectedUsers}
                        options={userOptions}
                    />
                </div>
                <div class='click'>
                    <button type="button" onClick={(event) => handleCreateTeamroster(event, team_id, selectedUsers)}>Create Team Roster</button>
                    <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
                    <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
                </div>
            </div>

        </form>
    )
}