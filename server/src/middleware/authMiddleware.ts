import { RequestHandler } from 'express';
import { env } from '../utils/envalid';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface JwtPayload {
  id: string;
}

export const protect: RequestHandler = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, env.JWT_SECRET);

      req.user = await User.findById((decoded as JwtPayload).id).select(
        '-password'
      );

      next();
    } catch (err) {
      res.status(401).json({ err: 'User not Authenticated' });
    }
  }
};
