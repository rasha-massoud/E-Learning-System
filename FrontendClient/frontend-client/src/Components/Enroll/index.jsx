import React, { useState } from 'react';
import './styles.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Enroll() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');

    const [enrollError, setEnrollError] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/v0.0.1/enroll', {
            username: username,
            email: email,
            course: course
        }, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setEnrollError("Successful Enrollment!");
        })
        .catch(error => {
            error.log("Enrollment Failed!");
        });
    }

    return (
        <div className="enroll-block">
            <img src="/LoginBackground.gif" className="logo" />
            <h2>ENROLL</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Name:</label>
                    <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="course">Course:</label>
                    <input type="text" id="course" name="course" value={course} onChange={handleCourseChange} autoComplete="off" />
                    {enrollError && <div className="error">{enrollError}</div>}
                </div>
                <button type="submit">Enroll</button>
            </form>
        </div>
    );
};

export default Enroll;