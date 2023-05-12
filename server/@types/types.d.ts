import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: mongoose.Types.ObjectId;
        name: string;
        email: string;
        pfp: string;
      } | null;
    }
  }
}
