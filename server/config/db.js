const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async (req, res) => {
    try {
        mongoose.connect(process.env.DB_URL)
            .then(() => {
                console.log("Database connected successfully")
            })

    }
    catch(err){
        console.log("Error is" , err)
    }
    
}

module.exports = dbConnect