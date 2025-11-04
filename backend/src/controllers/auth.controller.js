const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req,res){

    const {name, email, password, role} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).send({
            messsge: "User already exists"
        })
    }

    // if user dont exist then  first we will hash or encrypt the password
    // because we should not store password in normal text format in database for security purpose

    const hashedPassword = await bcrypt.hash(password,10); // 10 is salt rounds

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET
    );// long token secret key will increase security of the project but also reduces performance of the server
    
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }// we will not send password back to user , we never send password to frontend
    })
}

async function loginUser(req,res){
    // login logic
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).send({
            message: "Invalid email or password"
        })// dictionary attack and brute force attack prevention(left to read)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).send({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET
    );

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}

async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    })
}
module.exports = {
    registerUser,
    loginUser,
    logoutUser
}