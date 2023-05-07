import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.get('/', (req, res) => {
  res.send('API is Running');
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
