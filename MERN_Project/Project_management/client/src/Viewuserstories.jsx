import { React, useState, useEffect } from "react";
import { Link,useNavigate,useParams} from 'react-router-dom';
import axios from "axios";
export const Viewuserstories = (props) => {

    const [userstories, setUserstories] = useState([]);
    const {proj_id} = useParams();
    const loggedInUser = localStorage.getItem('loggedInUser');

    useEffect(() => {
        axios.get(`http://localhost:9000/getUserstoriesByProjectId/${proj_id}`,{
            params:{
            Project_Id:proj_id,
        }
        }) 
            .then(function (response) {
                setUserstories(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const handleAssign = (userstory_id,user_id) => {
        axios.post(`http://localhost:9000/createassigneduserstory` ,{ userstory_id,user_id})
        .then((res) => alert('assign Successful'))
        .catch((err) => alert('Error in assign'))
    }
    const handleDelete = (_id) => {
        axios.delete(`http://localhost:9000/deleteuserstories/${_id}`)
            .then(() => {
                alert('User story deleted successfully');
                // Refresh user stories after deletion
                axios.get(`http://localhost:9000/getUserstoriesByProjectId/${proj_id}`)
                  .then((response) => {
                    setUserstories(response.data);
                  })
                  .catch((error) => {
                    console.error('Error fetching user stories:', error);
                  });
              })
            .catch((err) => alert('Error in delete'))
    }
    return (
    <div class='input'>
            <table>
                <thead>
                    <th>proj_name</th>
                    <th>user_story</th>
                    <th>priority</th>
                    <th>option</th>
                </thead>
                <tbody>
                    { 
                        userstories.map(userstory => {
                            return <tr key={userstory._id}>
                                <td>{userstory.proj_id}</td>
                                <td>{userstory.user_story}</td>
                                <td>{userstory.priority}</td>
                                <td><button class="nav" onClick={() => handleAssign(userstory._id, loggedInUser)}>assign</button>
                                <Link to={`/edituserstories/${userstory._id}`}><button class="nav">edit</button></Link>
                                <button class="nav" onClick={() => handleDelete(userstory._id)}>delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div class="click">
                <Link class="navlink" to="/Viewprojects"><button class="nav">back to projects page</button></Link>
                <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
                <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
            </div>
            
        </div>
    
  
        
    )

}
