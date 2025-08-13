import express from 'express';
import { userSignUp, userLogin, userLogout } from '../controllers/userControllers.js';

const router = express.Router();

router.post("/signup", userSignUp);
router.post('/login', userLogin);
router.post("/logout", userLogout);

export default router;