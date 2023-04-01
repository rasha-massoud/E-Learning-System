
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./style.css";

function ViewAndDownloadFiles() {

    const [file, setFiles] = useState([]);
    const token = localStorage.getItem("token");

    axios.get('http://localhost:8000/api/v0.0.1/view_and_download_files', {
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => {
            useEffect(() => {
                setFiles(response.data.file);
            }, []);
        })
        .catch(error => {
            error.log("Fail!");
        });


    return (
        <div>
            <h1 className="title">FILES</h1>
            <div className="container">
                {files.map(file => (
                    <div key={file.id} className="box1">
                        <h2 className="center">{file.name}</h2>
                        <pre>{file.content}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ViewAndDownloadFiles;