import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

export const Viewteamsbyuserid = (props) => {
    const [teams, setTeams] = useState([]);
    const { user_id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:9000/getTeamsByUserId/${user_id}`, { params: { user_id: user_id } })
            .then(function (response) {
                setTeams(response.data);
            })
            .catch(function (error) {
                console.error("Error fetching teams:", error); 
            });
    }, [user_id]);


    return (
        <div className='input'>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teams.map(team => {
                            return (
                                <tr>
                                    <td>
                                        <Link to={`/team/${team._id}`}>{team.team_name}</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <div className='click'>
                <Link className="navlink" to="/Login"><button className="nav">Back to login page</button></Link>
                <Link className="navlink" to="/Home"><button className="nav">Back to home page</button></Link>
            </div>
        </div>
    );
};
