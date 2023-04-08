import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./styles.css";

function ViewAndDownloadFiles() {

    const [files, setFiles] = useState([]);
    const [courseId, setCourseId] = useState('');

    const handleCourseIdChange = (e) => {
        setCourseId(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // axios.post('http://localhost:3000/course/enroll', {
        //     courseId: courseId
        // }, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'authorisation': 'Bearer ' + localStorage.getItem('token')
        //     }
        // })
        // .then(response => {
        // })
        // .catch(error => {
        //     console.error("Enrollment Failed!");
        // });
    }

    // const handleDownload = (fileUrl) => {
    //     axios.get(`http://localhost:3000/download/${courseId}/files/${fileUrl}`, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer ' + localStorage.getItem('token')
    //         },
    //         responseType: 'blob'
    //     })
    //         .then(response => {
    //             const url = window.URL.createObjectURL(new Blob([response.data]));
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', fileUrl.substring(fileUrl.lastIndexOf('/') + 1));
    //             document.body.appendChild(link);
    //             link.click();
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };

    useEffect(() => {
        axios.get(`http://localhost:3000/course/files/${courseId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [courseId]);

    return (
        <div className="download-block">
            <h2>FILES</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="courseId">Course Id:</label>
                    <input type="text" id="courseId" name="courseId" value={courseId} onChange={handleCourseIdChange} autoComplete="off" />
                </div>
                <div className="buttons">
                    <button type="submit">Get Files</button>   
                </div>
            </form>
        </div>
    );
};

export default ViewAndDownloadFiles;