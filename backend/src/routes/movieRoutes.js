import express from 'express';
import { addMovie } from '../controllers/movieControllers.js';
import { upload } from '../controllers/movieControllers.js'; // Import the multer upload middleware

const router = express.Router();

router.post('/add', upload.fields([{ name: "poster" }, { name: "background" }]), addMovie);

export default router;