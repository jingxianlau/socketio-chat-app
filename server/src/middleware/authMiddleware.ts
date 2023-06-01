import { Request, RequestHandler } from 'express';
import { env } from '../utils/envalid';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import mongoose from 'mongoose';

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
  } else {
    res.status(401).json({ err: 'User not Authenticated' });
  }
};

type RequestWithUser = Request & {
  user: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    pfp: string;
  };
};
export function assertHasUser(req: Request): asserts req is RequestWithUser {
  if (!req.user) {
    throw new Error('Unexpectedly found request object without user');
  }
}
