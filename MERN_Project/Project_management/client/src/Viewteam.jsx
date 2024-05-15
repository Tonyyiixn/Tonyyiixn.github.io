import { React, useState, useEffect } from "react";
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';
import axios from "axios";

export const Viewteam = (props) => {

    const [teams, setTeams] = useState([]);
    const [user_id,setuser_id] = useState("");


    useEffect(() => {
        axios.get('http://localhost:9000/getTeams')
            .then(function (response) {
                setTeams(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);
    return (
        <div class='input'>
            <table>
                <thead>
                    <th>Team</th>
                </thead>
                <tbody>
                    {
                        teams.map(team => {
                            return <tr>
                                <td> <Link to={`/team/${team._id}`}>{team.team_name}</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div class="click">
                  <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
            <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
            </div>
          
        </div>
    )

}



