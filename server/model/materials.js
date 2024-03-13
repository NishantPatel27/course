const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
    materialTitle: {
        type: String,
        required: true
    },
    materialBody: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Material", materialSchema)