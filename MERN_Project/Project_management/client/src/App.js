import { useState } from "react";
import './App.css';
import './index';
import { Login } from './Login';
import { Signup } from './Signup';
import { Createproject } from './Createproject';

function App() {

  const [currentForm, setcurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setcurrentForm(formName);
  }

  return (
    <div className='App'>
    </div>
  );
}
export default App;