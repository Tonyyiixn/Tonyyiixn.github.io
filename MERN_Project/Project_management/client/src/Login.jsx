import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';
export const Login = (props) => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault()
        axios.get('http://localhost:9000/getUser', {
            params: {
                username: username,
                password: password,
            }
        })
            .then((res) => {
                if (res.data) {

                    alert('Login Successful')
                    localStorage.clear();
                    localStorage.setItem('loggedInUser', res.data._id);
                    navigate(`/Home/${res.data._id}`);
                }
                else {
                    alert('Wrong Credentials')
                }
            })
            .catch((err) => alert('Error in Login'))
    }

    return (
        <form onSubmit={handleLogin}>
            <div class='input'>
                <div class='text'>
                    <label for="uname">username</label>
                    <input type="text" id="uname" name="uname" placeholder="User ID" value={username} onChange={(event) => setusername(event.target.value)} />
                    <label for="password">password</label>
                    <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(event) => setpassword(event.target.value)} />
                </div>
                <div class='click'>
                    <button onclick={handleLogin} type="submit">Log in</button>
                    <Link class="navlink" to="/Signup"><button class="nav" >sign up here!</button></Link>
                    <Link class="navlink" to="/Createproject"><button class="nav" >manage project here!</button></Link>
                    <Link class="navlink" to="/CreateTeam"><button class="nav" >create team here!</button></Link>
                    <Link class="navlink" to="/CreateTeamRoster"><button class="nav" >create team roster here!</button></Link>
                    <Link class="navlink" to="/ViewTeam"><button class="nav" >View team here!</button></Link>
                    <Link class="navlink" to="/ViewProjects"><button class="nav" >View Project here!</button></Link>
                    <Link class="navlink" to="/CreateUserStory"><button class="nav" >create user story here!</button></Link>
                    <Link class="navlink" to="/Test"><button class="nav" >Test Code here!</button></Link>
                </div>
            </div>

        </form>
    )
}