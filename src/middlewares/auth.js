import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export default async function authUser(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'Token is required.' });
    }

    const { emailUser } = jwt.verify(authorization, process.env.TOKEN_SECRET);

    const user = await User.getUser(emailUser);
    if (!user) {
      return res.status(401).json({ error: 'Token expired  or incorrect.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ errors: error.message.replace(/jwt/gi, 'Token') });
  }
}
