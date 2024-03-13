const express = require("express")
const app = express()
require('dotenv').config()
const dbConnect = require('./config/db')
const bodyParser = require('body-parser')
const authRoute = require("./routes/authRoutes")

app.use(bodyParser.json())


//initiatiing server
const PORT = process.env.PORT || 4000
dbConnect()
app.use(authRoute)
app.listen(PORT , () => {
    console.log("App started on Port" , PORT)
})