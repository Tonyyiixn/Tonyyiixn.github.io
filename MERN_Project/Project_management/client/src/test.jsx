import React, { useState,useEffect } from "react";
import Select from 'react-select';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Link } from 'react-router-dom';
import axios from "axios";

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
];


export const Test = (prop) => {
    
  const [selectedOptions, setSelectedOptions] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);

    const userOptions = users.map((user) => ({
        value: `${user.f_name} ${user.l_name}`,
        label: `${user.f_name} ${user.l_name}`// Assuming f_name and l_name are separate fields
    }));

  useEffect(() => {
    axios.get('http://localhost:9000/getUsers')
        .then(function (response) {
            setUsers(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    axios.get('http://localhost:9000/getTeams')
        .then(function (response) {
            setTeams(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}, []);
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <div>
      <h1>Multi-Select Example</h1>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={userOptions}
        placeholder="Select multiple options"
      />
      <div>
        {selectedOptions.length > 0 ? (
          <div>
            <p>Selected Options:</p>
            <ul>
              {selectedOptions.map(option => (
                <li key={option.value}>{option.label}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No options selected</p>
        )}
      </div>
      <div class="click">
              <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
      <Link class="navlink" to="/Home"><button class="nav">back to home page</button></Link>
      </div>
    </div>
  );
};

export default Test;
