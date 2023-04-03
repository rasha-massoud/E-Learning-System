import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./styles.css";

function ViewAndDownloadFiles() {

    const [files, setFiles] = useState([]);
    const [courseId, setCourseId] = useState('course_id'); // replace with the actual course ID
    const [fileId, setFileId] = useState(null);

    useEffect(() => {
        if (fileId) {
            axios.get(`http://localhost:3000/course/${courseId}/files/${fileId}/download`, {
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
                    link.setAttribute('download', fileId);
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [courseId, fileId]);

    const handleDownload = (fileId) => {
        setFileId(fileId);
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/course/download/${courseId}/${fileId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            responseType: 'blob'
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                setFiles(prevFiles => [...prevFiles, { id: fileId, url }]);
            })
            .catch(error => {
                console.error(error);
            });
    }, [courseId, fileId]);

    return (
        <div>
            <h1 className="title">FILES</h1>
            <div className="container">
                {files.map(file => (
                    <div key={file.id} className="box1">
                        <h2 className="center">{file.id}</h2>
                        <button onClick={() => handleDownload(file.id)}>Download</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAndDownloadFiles;