import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { env } from './utils/envalid';
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import { protect } from './middleware/authMiddleware';

const app = express();

app.use(express.json());

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use('/api/user', userRoutes);

// protected routes
app.use('/api/chat', protect, chatRoutes);

// connect mongodb
mongoose
  .connect(env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    })
  )
  .catch(err => console.log(err));
