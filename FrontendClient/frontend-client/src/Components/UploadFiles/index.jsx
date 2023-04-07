import React, { useState } from "react";
import axios from "axios";

const UploadFiles = () => {
    const [file, setFile] = useState(null);
    const [courseId, setCourseId] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleCourseIdChange = (event) => {
        setCourseId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("courseId", courseId);

        try {
            const response = await axios.post("http://localhost:3000/course/upload", formData,
                {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'authorisation': 'Bearer ' + localStorage.getItem('token')
                    },
                })
                .then(response => {

                })
                .catch(error => {
                    console.log(error);
                });
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Course ID:
                <input type="text" value={courseId} onChange={handleCourseIdChange} />
            </label>
            <br />
            <label>
                File:
                <input type="file" onChange={handleFileChange} />
            </label>
            <br />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadFiles;