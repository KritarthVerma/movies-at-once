import { hash,compare } from 'bcrypt'
import User from '../models/user.js';
import Comment from '../models/comment.js';
import multer from 'multer';
import Movie from '../models/movie.js';

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const addMovie = async (req, res) => {
    try {
        const { title, description, downloadLink, category } = req.body;
        const tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [];

        if (!title || !description || !downloadLink || !category) {
            return res.status(400).json({ message: "Title, description, download link, and category are required" });
        }

        if (!req.files || !req.files.poster || !req.files.background) {
            return res.status(400).json({ message: "Poster and background images are required" });
        }

        const posterFile = req.files.poster[0];
        const backgroundFile = req.files.background[0];

        const newMovie = new Movie({
            title,
            description,
            downloadLink,
            category,
            tags,
            poster: {
                data: posterFile.buffer,
                contentType: posterFile.mimetype,
            },
            background: {
                data: backgroundFile.buffer,
                contentType: backgroundFile.mimetype,
            }
        });

        await newMovie.save();
        res.status(201).json({ message: "Movie added successfully", movieId: newMovie._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};