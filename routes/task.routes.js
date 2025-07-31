import express from 'express';
import { getTasks, addTask , updateTask, deleteTask } from '../controllers/task.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware); // Protect all routes below
router.get('/', getTasks);
router.post('/', addTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;
