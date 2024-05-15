import { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const Home = (props) => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const {user_id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:9000/getUsers')
            .then(function (response) {
                setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const handleSignOut = (event) => {
        event.preventDefault()
        localStorage.clear()
        navigate("/Login");
    }
    return (
        <form onSubmit={handleSignOut}>
            <div class='input'>
                <div class='text'>
                    <>
                        {loggedInUser != null &&
                         <p> {"Welcome! " + loggedInUser}</p>
                          
                        } 
                    </>
                </div>
                <div class='click'>
                    <>
                        {loggedInUser != null &&

                            <><button type="button" onClick={(event) => {
                                handleSignOut(event);
                            } }>Sign Out</button>
                            <Link class="navlink" to="/Createproject"><button class="nav">manage project here!</button></Link>
                            <Link class="navlink" to="/CreateTeam"><button class="nav">create team here!</button></Link>
                            <Link class="navlink" to="/CreateTeamRoster"><button class="nav">create team roster here!</button></Link>
                            <Link to={`/ViewTeamsByUserId/${loggedInUser}`}><button class="nav" type="button">View User team here!</button></Link>
                            <Link class="navlink" to={`/viewunassigneduserstoriesbyuserid/${loggedInUser}`}><button class="nav">View all unassigned User Stories here!</button></Link>
                            <Link class="navlink" to={`/viewassigneduserstoriesbyuserid/${loggedInUser}`}><button class="nav">View all assigned User Stories here!</button></Link>
                            <Link class="navlink" to="/CreateUserStory"><button class="nav">create user story here!</button></Link>
                            <Link class="navlink" to="/Test"><button class="nav">Test Code here!</button></Link>
                            </>
                        }
                    </>
                    <>
                        {loggedInUser == null &&
                            <p className="text-center">
                                Already have an account? <button class="nav" ><Link to="/login">Login</Link></button>
                            </p>
                        }
                    </>
                </div>
            </div>

        </form>
    )
}