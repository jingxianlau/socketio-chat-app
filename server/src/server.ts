import express from 'express';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is Running');
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
