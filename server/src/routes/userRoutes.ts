import express from 'express';
import { login, signup } from '../controllers/userController';

const router = express.Router();

router.post('/login', login);

router.post('/register', signup);

export default router;
