import React, { useState } from 'react';
import './styles.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const LoginBlock = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError('');

    if (value.length < 8 || !/[A-Z]/.test(value) || !/\d/.test(value) ||
      !/[!@#$%^&*()_+={}\[\]:;<>?,./~\-]/.test(value)) {
      setPasswordError(
        'Incorrect Email or Password'
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/login', {
      email: email,
      password: password
    }, {
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => {
        console.log(response);
        localStorage.setItem('id', JSON.stringify(response.data.user._id));
        localStorage.setItem('token', response.data.token);

        if (localStorage.getItem('token')) {
          navigate("/enroll");
        }
      })
      .catch(error => {
        console.error("Incorrect Crendetials!");
      });
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="login-block">
      <img src="/LoginBackground.gif" className="logo" />
      <h2>LOGIN</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} autoComplete="off" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} autoComplete="off" />
        </div>
        <p>Don't Have an Account? <Link to="/register">Sign Up Here</Link></p>
        <div className="buttons">
          <button type="submit">Login</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default LoginBlock;