import { hash,compare } from 'bcrypt'
import User from '../models/user.js';

export const userSignUp = async (req, res) => {
    try {
        const { username, email, password, gender, profilePicture } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already taken" });
        }
        const hashedPassword = await hash(password,10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            profilePicture
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body; 
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid email/username or password" });
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email/username or password" });
        }
        res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const userLogout = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};