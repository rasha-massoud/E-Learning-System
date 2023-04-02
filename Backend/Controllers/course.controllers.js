const mongoose = require("mongoose");
const Course = require("../Models/courseModel.js");
const User = require("../Models/userModel.js");

exports.createCourse = async (req, res) => {
    const { name, description, semester } = req.body;

    const course = await Course.create({ name, description, semester });

    res.json(course)
}

exports.enroll = async (req, res) => {
    const { userId, courseId } = req.body;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    course.enrolled_students.push(userId)
    await course.save();

    user.enrolled_courses.push(courseId)
    await user.save();

    res.json({ course, user });
}

exports.listStudentsEnrolled = async (req, res) => {
    try {
        const courses = await Course.find().populate('enrolled_students', '-password').select('name -_id');
        const enrolledStudents = courses.reduce((students, course) => {
            const courseName = course.name;
            const courseStudents = course.enrolled_students.map(student => {
                const studentInfo = student.toJSON();
                studentInfo.enrolled_courses = [courseName];
                return studentInfo;
            });
            return [...students, ...courseStudents];
        }, []);
        res.json(enrolledStudents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}