import express from 'express';
import { login, signup, searchForUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', login);

router.post('/register', signup);

router.get('/', protect, searchForUser);

export default router;
