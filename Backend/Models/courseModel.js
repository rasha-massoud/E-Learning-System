const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    enrolled_students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    files: [{
        name: String,
        type: String,
        url: String
    }],
    withdrawal_requests: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        }
    }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;