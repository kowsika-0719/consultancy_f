import React from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Manage from '../manage/manage';

const LoginPage=()=> {

  const navigate = useNavigate();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    

    const emailOrPhone = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(emailOrPhone);
    console.log(password);
    const validEmail = 'sathyamtraders@gmail.com'; // Replace with your valid email
    const validPassword = 'sathyam@2023'; // Replace with your valid password

    if (emailOrPhone !== validEmail || password !== validPassword) {
      alert('Invalid email or password');
    } else {
      alert('Successfully logged in');
      navigate('/manage');
    }
  };

    return (
      <div className="container6">
        <div className="wrapper">
          <div className="title"><span>Login Form</span></div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input type="text" id="email" placeholder="Email or Phone" required />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input type="password" id="password" placeholder="Password" required />
            </div>
  
            <div className="row button">
            {/* <Link to="/manage">             */}
              <input type="submit" value="Login" />
              {/* </Link> */}
            </div>
            
          </form>
        </div>
      </div>
    );
  }

export default LoginPage;