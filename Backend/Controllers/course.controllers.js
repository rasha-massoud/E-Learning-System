const Course = require("../Models/courseModel.js");
const User = require("../Models/userModel.js");

exports.createCourse = async (req, res) => {
    const { name, description, semester } = req.body;

    const course = await Course.create({ name, description, semester });

    res.json(course)
}

exports.enroll = async (req, res) => {
}