import express from 'express';
import { userSignUp, userLogin, userLogout, getUserById, updateUser, deleteUser, getCommentsByUser } from '../controllers/userControllers.js';
import { upload } from '../controllers/userControllers.js';

const router = express.Router();

router.post("/signup",upload.single('profilePicture'), userSignUp);
router.post('/login', userLogin);
router.post("/logout", userLogout);
router.get('/:id',getUserById);
router.put('/:id', upload.single('profilePicture'), updateUser);
router.delete('/:id',deleteUser);
router.get('/:id/comments',getCommentsByUser);

export default router;