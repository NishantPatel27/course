const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['Admin', 'Student'],
        required: true
    },
    course:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
})

module.exports = mongoose.model("User" , userSchema)