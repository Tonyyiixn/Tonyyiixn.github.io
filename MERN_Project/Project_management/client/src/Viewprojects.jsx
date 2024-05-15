import { React, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
export const Viewprojects = (props) => {

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
    return (
        <div class='input'>
            <table>
                <thead>
                    <th>proj_name</th>
                    <th>proj_desc</th>
                    <th>prod_owner_name</th>
                    <th>mgr_name</th>
                    <th>team_name</th>
                </thead>
                <tbody>
                    {
                        projects.map(project => {
                            return <tr>
                                <td><Link to={`/userstories/${project._id}`}>{project.proj_name}</Link></td>
                                <td>{project.proj_desc}</td>
                                <td>{project.prod_owner_name}</td>
                                <td>{project.manager_name}</td>
                                <td>{project.teams_name}</td>
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



