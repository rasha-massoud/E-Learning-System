const Course = require("../Models/courseModel.js");
const User = require("../Models/userModel.js");
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });

exports.uploadFiles = async (req, res) => {
    upload.single('file');
    const newFile = {
        name: req.file.originalname,
        url: req.file.path
    };

    try {
        const course = await Course.findByIdAndUpdate(
            req.body.courseId,
            { $push: { files: newFile } },
            { new: true }
        );

        res.json(course);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
}

exports.downloadFiles = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        const file = course.files.id(req.params.fileId);
        const filePath = path.join(__dirname, file.url);
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

exports.withdrawalForm = async (req, res) => {
    const { userId, courseId } = req.body;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!course.enrolled_students.includes(userId)) return res.status(400).json({ message: 'User is not enrolled in the course.' });

    course.withdrawal_requests.push({ user_id: userId })
    await course.save();

    user.withdrawal_requests.push({ course_id: courseId })
    await user.save();

    res.json({ course, user });
}

exports.withdrawalFormStatus = async (req, res) => {
    const { userId, courseId, status } = req.body;

    try {
        const user = await User.findOneAndUpdate({
            _id: userId,
            'withdrawal_requests.course_id': courseId
        },
        {
            $set: {
                'withdrawal_requests.$.status': status
            }
        },
        {
            new: true
        });

        const course = await Course.findOneAndUpdate({
            _id: courseId,
            'withdrawal_requests.user_id': userId
        },
        {
            $set: {
                'withdrawal_requests.$.status': status
            }
        },
        {
            new: true
        });
        res.json("Status updated successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
