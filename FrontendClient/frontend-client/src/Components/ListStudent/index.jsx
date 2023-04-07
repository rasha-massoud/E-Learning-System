import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListStudentsEnrolled() {
    const [enrolledStudents, setEnrolledStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/course/list', {
            headers: {
                'authorisation': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                setEnrolledStudents(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="list-block">
            <h1>ENROLLED STUDENTS</h1>
            <ul>
                {enrolledStudents.map(student => (
                    <li key={student._id}>
                        <h2>{student.name}</h2>
                        <ul>
                            {enrolledStudents.map(student => (
                                <li key={student._id}>
                                    <h2>{student.username}</h2>
                                    <ul>
                                        {student.enrolled_courses.map(course => (
                                            <li key={course}>{course}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListStudentsEnrolled;