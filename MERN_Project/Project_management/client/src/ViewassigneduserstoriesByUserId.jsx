import { React, useState, useEffect } from "react";
import { Link,useNavigate,useParams} from 'react-router-dom';
import axios from "axios";
export const ViewassigneduserstoriesByUserId = (props) => {

    const [assigneduserstories, setassignedUserstories] = useState([]);
    const {user_id} = useParams();
    

    useEffect(() => {
        axios.get(`http://localhost:9000/getAssignedUserstoriesbyUserId/${user_id}`,{
            params:{
            User_Id:user_id,
        }
        }) 
            .then(function (response) {
                setassignedUserstories(response.data)
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
                    <th>user_story</th>
                    <th>priority</th>
                </thead>
                <tbody>
                    { 
                        assigneduserstories.map(assigneduserstory => {
                            return <tr key={assigneduserstory._id}>
                                <td>{assigneduserstory.proj_id}</td>
                                <td>{assigneduserstory.user_story}</td>
                                <td>{assigneduserstory.priority}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div class="click">
                <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
            </div>
            
        </div>
    
  
        
    )

}
