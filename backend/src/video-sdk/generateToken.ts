import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const generateToken = () => {
  const apiKey = process.env.VIDEO_SDK_API_KEY;
  const secretKey = process.env.VIDEO_SDK_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error('VIDEO_SDK_API_KEY or VIDEO_SDK_SECRET_KEY is missing in .env');
  }

  const options: jwt.SignOptions = {
    expiresIn: '24h',
    algorithm: 'HS256',
  };

  const payload = {
    apikey: apiKey,
    permissions: ['allow_join', 'allow_mod'],
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};