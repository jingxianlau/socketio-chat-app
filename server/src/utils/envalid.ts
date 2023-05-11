import { cleanEnv, port, str } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  CLOUDINARY_URL: str()
});
