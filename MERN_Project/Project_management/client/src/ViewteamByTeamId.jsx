import { React, useState, useEffect } from "react";
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
export const ViewteamByTeamId = (props) => {

    const [teams, setTeams] = useState([]);
    const [members,setMembers]=useState([]);
    const {team_id} = useParams();

    useEffect(() => {
            axios.get(`http://localhost:9000/getTeambyTeamId/${team_id}`,{
                params:{
                    TeamId:team_id
                }
            })
            .then((res)=>
                setTeams(res.data))
            .catch(function (error) {
                console.log(error);
            })
            axios.get(`http://localhost:9000/getMembersByTeamId/${team_id}`,{
                params:{
                    TeamId:team_id
                }
            })
            .then((res)=>
                setMembers(res.data[0].selectedUsers))
            .catch(function (error) {
                console.log(error);
            })
           
    }, []);
    return (
        <div class='input'>
            <table>
                <thead>
                    <tr>
                        <th>Team Name</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr>
                            <td>{team.team_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Members</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr>
                            <td>{member.f_name} {member.l_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div class='click'>
            <Link class="navlink" to="/Viewteam"><button class="nav">back to Team page</button></Link>
            <Link class="navlink" to={`/projects/${team_id}`}><button class="nav">team projects is here</button></Link>
            <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
            <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
            </div>
     
        </div>
    )

}