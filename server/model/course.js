const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    pricing: {
        type: String,
        required: true
    },
    syllabus: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    annoucement: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Annoucement'
        }
    ],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Videos"
        }
    ],
    material: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Material"
        }
    ],
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }

})

module.exports = mongoose.model("Course" , courseSchema)