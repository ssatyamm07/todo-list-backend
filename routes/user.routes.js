import express from 'express';
import { register, login , logout} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.post('/signup', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

export default router;
