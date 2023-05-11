import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { env } from '../envalid';

const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

export default generateToken;
