const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String,

    },
    gender:{
        type: String
    }
})

module.exports = mongoose.model('Profile' , profileSchema)