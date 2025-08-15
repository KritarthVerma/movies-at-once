import { hash,compare } from 'bcrypt'
import User from '../models/user.js';
import Comment from '../models/comment.js';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const userSignUp = async (req, res) => {
    try {
        const { username, email, password, gender } = req.body;
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
            gender
        });
        if (req.file) {
            newUser.profilePicture.data = req.file.buffer;
            newUser.profilePicture.contentType = req.file.mimetype;
        }
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
};

export const userLogout = (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // hide password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (req.file) {
            updates.profilePicture = req.file.buffer;
        }
        // Update user with new data
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getCommentsByUser = async (req, res) => {
    try {
        const comments = await Comment.find({ user: req.params.id });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}