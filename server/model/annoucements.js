const mongoose = require('mongoose')

const annoucementSchema = new mongoose.Schema({
    annoucementTitle: {
        type: String,
        required: true
    },
    annoucementDesciption: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Annoucement' , annoucementSchema)