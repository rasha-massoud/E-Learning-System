import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./styles.css";

function ViewAndDownloadFiles() {

    const [files, setFiles] = useState([]);
    const [courseId, setCourseId] = useState('course_id'); // replace with the actual course ID

    const handleDownload = (fileUrl) => {
        axios.get(`http://localhost:3000/download/${courseId}/files/${fileUrl}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            responseType: 'blob'
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileUrl.substring(fileUrl.lastIndexOf('/') + 1));
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error(error);
            });
    };

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
            <h1 className="title">FILES</h1>
            <div className="container">
                {files.map(file => (
                    <div key={file._id} className="file">
                        <h3>{file.name}</h3>
                        <button onClick={() => handleDownload(file.url)}>Download</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAndDownloadFiles;