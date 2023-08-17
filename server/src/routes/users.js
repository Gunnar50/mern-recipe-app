import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username: username});
    
    if (user) {
        return res.json({message: "User already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({username: username, password: hashedPassword});
    await newUser.save();

    res.json({message: "User registered successfully!"});

});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username: username});
    
    if (!user) return res.json({message: "Username or Password is incorrect!"});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.json({message: "Username or Password is incorrect!"});

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({token:token, userID: user._id})


});

router.get("/verify-token", (req, res) => {
    const token = req.headers['authorization'];
    
    
    if (!token) return res.status(401).json({ message: "No token provided." });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: "Failed to authenticate token." });
        
        // Token is valid
        res.json({ valid: true });
    });
});



export {router as userRouter}