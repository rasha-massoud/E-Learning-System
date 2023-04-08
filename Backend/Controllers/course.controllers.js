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

    if (user.enrolled_courses.includes(courseId)) return res.status(400).json({ message: 'User is already enrolled in this course' });

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

exports.uploadFiles = async (req, res) => {

    try {
        if (!req.files || !req.files.file) return res.status(400).send('No file uploaded');

        const file = req.files.file;

        const uploadPath = path.join(__dirname, '..', 'Uploads', file.name);
        file.mv(uploadPath, function (err) {
    
            if (err) {
                return res.status(500).send('Error while saving file');
            }

            const newFile = {
                name: file.name,
                type: file.mimetype,
                url: `/uploads/${file.name}`
            };

            console.log('req.body.courseId:', req.body.courseId);
            Course.findByIdAndUpdate(req.body.courseId, {
                $push: { files: newFile }
            },
                { new: true })
                .then((course) => {
                    course.save()
                        .then(() => {
                            res.send('File uploaded and saved successfully');
                        })
                        .catch((err) => {
                            res.status(500).send('Error while saving course');
                        });
                })
                .catch((err) => {
                    res.status(500).send('Error while updating course');
                });
        });
    } catch (err) {
        res.status(500).send('Error while uploading file');
    }
}

exports.downloadFiles = async (req, res) => {
    //On click Yeftah URL (FE)
    //REDIRECTORY (BE)
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
