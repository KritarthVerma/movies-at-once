import express from 'express';
import { userSignUp, userLogin, userLogout, getUserById, updateUser, deleteUser } from '../controllers/userControllers.js';

const router = express.Router();

router.post("/signup", userSignUp);
router.post('/login', userLogin);
router.post("/logout", userLogout);
router.get('/:id',getUserById);
router.put('/:id', updateUser);
router.delete('/:id',deleteUser);

export default router;