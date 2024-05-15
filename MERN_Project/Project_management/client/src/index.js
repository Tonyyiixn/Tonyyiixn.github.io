import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Login } from './Login';
import { Signup } from './Signup';
import { Createproject } from './Createproject';
import { Createteam } from './Createteam';
import { Viewteam } from './Viewteam';
import { Viewprojects } from './Viewprojects';
import { Home } from './Home';
import { Createteamroster } from './Createteamroster';
import { Test } from './test';
import { Createuserstory } from './Createuserstory';
import {ViewteamByTeamId} from './ViewteamByTeamId';
import {Viewteamsbyuserid} from './ViewteamsByUserId';
import { ViewprojectsByTeamId } from './ViewprojectsByTeamId';
import { Viewuserstories } from './Viewuserstories';
import { Edituserstories } from './Edituserstories';
import { Unassigneduserstories } from './Unassigneduserstories';
import { ViewassigneduserstoriesByUserId } from './ViewassigneduserstoriesByUserId';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Home/:user_id" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/CreateProject" element={<Createproject />} />
      <Route path="/CreateTeam" element={<Createteam />} />
      <Route path="/ViewTeam" element={<Viewteam />} />
      <Route path="/ViewProjects" element={<Viewprojects />} />
      <Route path="/CreateTeamRoster" element={<Createteamroster />} />
      <Route path="/Test" element={<Test />} />
      <Route path="/CreateUserStory" element={<Createuserstory />} />
      <Route path = '/team/:team_id' element={<ViewteamByTeamId/>}/>
      <Route path = '/projects/:team_id' element={<ViewprojectsByTeamId/>}/>
      <Route path = '/userstories/:proj_id' element={<Viewuserstories/>}/>
      <Route path="/ViewTeamsByUserId/:user_id" element={<Viewteamsbyuserid />} />
      <Route path="/edituserstories/:userstory_id" element={<Edituserstories />} />
      <Route path="/viewunassigneduserstoriesbyuserid/:user_id" element={< Unassigneduserstories />} />
      <Route path="/viewassigneduserstoriesbyuserid/:user_id" element={< ViewassigneduserstoriesByUserId />} />
    </>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();