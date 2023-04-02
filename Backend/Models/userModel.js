const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    enrolled_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    withdrawal_requests: [{
        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        status: {
            type: String,
            num: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        }
    }]
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;