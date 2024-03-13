const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')



router.post('/sendOTP' ,authController.sendOtp)
router.post('/signUp' , authController.signUp)
router.post('/login', authController.login)


module.exports = router