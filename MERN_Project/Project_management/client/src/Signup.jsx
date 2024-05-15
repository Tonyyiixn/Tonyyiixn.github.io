import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';
export const Signup = (props) => {
    const [f_name, setf_name] = useState("");
    const [l_name, setl_name] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const handleSignUp = (event) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createUser', { f_name, l_name, username, password, })
            .then((res) => alert('Sign Up Successful'))
            .catch((err) => alert('Error in Signing Up'))
    }

    return (
        <form onSubmit={handleSignUp}>
            <div class='input'>
                <div class='text'>
                    <label for="fname">firstname</label>
                    <input type="text" id="fname" name="fname" placeholder="First name" value={f_name} onChange={(event) => setf_name(event.target.value)} />
                    <label for="lname">lastname</label>
                    <input type="text" id="lname" name="lname" placeholder="Last name" value={l_name} onChange={(event) => setl_name(event.target.value)} />
                    <label for="uname">username</label>
                    <input type="text" id="uname" name="uname" placeholder="User ID" value={username} onChange={(event) => setusername(event.target.value)} />
                    <label for="password">password</label>
                    <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(event) => setpassword(event.target.value)} />
                </div>
                <div class='click'>
                    <button onclick={handleSignUp} type="submit">Sign up</button>
                    <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
                    
                </div>
            </div>

        </form>
    )
}
