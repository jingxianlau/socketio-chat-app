import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import { env } from './utils/envalid';
import userRoutes from './routes/userRoutes';
import morgan from 'morgan';

const app = express();

app.use(express.json());

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use('/api/user', userRoutes);

mongoose
  .connect(env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    })
  )
  .catch(err => console.log(err));
