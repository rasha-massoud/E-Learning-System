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