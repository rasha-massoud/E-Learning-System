import React, { useState } from 'react';
import "./styles.css";
import axios from "axios";

const CreateCourse = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [semester, setSemester] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    }

    const handleFormSubmit = (e) => {

        e.preventDefault();
        axios.post('http://localhost:3000/course/create', {
            'name': name,
            'description': description,
            'semester': semester
        }, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="create-block">
            <h2>CREATE COURSE</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleNameChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="semester">Semester:</label>
                    <input type="text" id="semester" name="semester" value={semester} onChange={handleSemesterChange} required />
                </div>
                <div className="buttons">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;