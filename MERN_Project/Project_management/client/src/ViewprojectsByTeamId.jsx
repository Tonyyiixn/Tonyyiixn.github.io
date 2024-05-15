import { React, useState, useEffect } from "react";
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
export const ViewprojectsByTeamId = (props) => {

    const [projects, setProjects] = useState([]);
    const {team_id} = useParams();

    useEffect(() => {
            axios.get(`http://localhost:9000/getProjectsbyTeamId/${team_id}`,{
                params:{
                    TeamId:team_id
                }
            })
            .then((res)=>
                setProjects(res.data))
            .catch(function (error) {
                console.log(error);
            })
    }, []);
    return (
        <div class='input'>
            <table>
                <thead>
                    <th>Project Name</th>
                    <th>Project description</th>
                    <th>Product Owner Name</th>
                    <th>Project Manager Name</th>
                    <th>Team Name</th>
                </thead>
                <tbody>
            {projects.map((project) => (
                <tr key={project._id}>
                    <td><Link to={`/userstories/${project._id}`}>{project.proj_name}</Link></td>
                    <td>{project.proj_desc}</td>
                    <td>{project.prod_owner_name}</td>
                    <td>{project.manager_name}</td>
                    <td>{project.teams_name}</td>
                </tr>
            ))}
        </tbody>
            </table>
            <div class='click'>
            <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
            <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
            </div>
     
        </div>
    )

}