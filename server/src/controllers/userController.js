import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

export const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });

    if (user) {
        return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username: username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully!" });
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });

    if (!user) return res.json({ message: "Username or Password is incorrect!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.json({ message: "Username or Password is incorrect!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token: token, userID: user._id });
};

export const getCurrentUser = async (req, res) => {
    try{    
        const user = await UserModel.findById(req.params.id);
        res.json({username: user.username});
    } catch(err) {console.log(err);}
}

export const verifyToken = (req, res) => {
    // Since the auth middleware is already verifying the token, 
    // you can just respond here that it's valid.
    res.json({ valid: true });
};
