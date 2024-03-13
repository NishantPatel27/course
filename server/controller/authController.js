const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const speakeasy = require('speakeasy')
const OTP = require('../model/otp')
const z = require('zod')
require('dotenv').config()


exports.generateOtp = () => {
    return speakeasy.totp({
        secret: speakeasy.generateSecret().base32,
        digits: 6,
        step: 30
    })
}
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(401).json({
                success: false,
                message: "Email Already In Use"
            })
        }
        //generate otp 
        const otp = this.generateOtp();
        console.log("OTP generated", otp)

        const otpPayload = { email, otp }
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody)

        return res.status(300).json({
            message: "Otp generated",
            success: true
        })
    }
    catch (error) {
        console.log('Error in send mail function', error)
        return res.status(500).json({
            message: "Internal Server Error in Otp generation",
            success: false
        })
    }
}

//signup
exports.signUp = async (req, res) => {
    try {
        const adminEmail = "np3687344@gmail.com"
        const singupSchema = z.object({
            email: z.string().email(),
            firstName: z.string(),
            lastName: z.string(),
            password: z.string().min(8),
            otp: z.string()
        })
        const {
            email,
            firstName,
            lastName,
            password,
            otp
        } = singupSchema.parse(req.body)

        //validation
        if (!email || !firstName || !lastName || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }
        let accountType = "Student"
        if (email === adminEmail) {
            accountType = "Admin"
        }
        //check if userexist
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(403).json({
                success: false,
                message: "Email already in use"
            })
        }
        //validate otp
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length === 0 || otp.toString() !== recentOtp[0].otp.toString()) {
            return res.status(401).json({
                message: "Invalid OTP",
                success: false
            });
        }


        let hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            accountType,

        })
        await user.save()
        //delete otp 
        await OTP.deleteOne({ email })

        return res.status(200).json({
            success: true,
            data: user._id,
            message: "User created successfully"
        })
    }
    catch (error) {
        console.log("Error in signup is", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string().min(8)
        })
        const { email, password } = loginSchema.parse(req.body)

        //userExist
        const userCheck = await User.findOne({ email })
        if (!userCheck) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            })
        }
        //hashed password
        const comparePassword = await bcrypt.compare(password, userCheck.password)
        // generate jwt
        let token = jwt.sign({ userId: userCheck._id }, process.env.MY_SECRET, { expiresIn: '30d' })
        // return response 
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

        return res.status(200).json({
            success: true,
            message: "Login successful"
        });
    }
    catch (error) {
        console.log("Error while logging in:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
