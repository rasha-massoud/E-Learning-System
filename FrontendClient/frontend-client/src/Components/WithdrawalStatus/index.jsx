import React, { useState } from 'react';
import './styles.css'
import axios from "axios";

function WithdrawalStatus() {
    const [userId, setUserId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [status, setStatus] = useState('');

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleCourseIdChange = (e) => {
        setCourseId(e.target.value);
    };

    const handleStatusChange = (e) => {
        console.log(e.target.value);
        setStatus(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/course/withdrawal_form_status', {
            'userId': userId,
            'courseId': courseId,
            'status': status
        }, {
            headers: {
                'Accept': 'application/json',
                'authorisation': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error("Update Failed!");
            });
    }

    return (
        <div className="withdrawal-status-block">
            <img src="/LoginBackground.gif" className="logo" />
            <h2>WithDrawal Response</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="userId">User ID:</label>
                    <input type="text" id="userId" name="userId" value={userId} onChange={handleUserIdChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="courseId">Course ID:</label>
                    <input type="text" id="courseId" name="courseId" value={courseId} onChange={handleCourseIdChange} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" name="status" value={status} onChange={handleStatusChange} autoComplete="off">
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="buttons">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default WithdrawalStatus;