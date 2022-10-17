import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { validateCreate, validateLogin } from '../service/validation.js';

dotenv.config();

class UserController {
  async createUser(req, res) {
    try {
      const { error } = validateCreate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      }

      if (await (User.getUser(req.body.email))) {
        return res.status(401).json({
          message: ['User already exists.'],
        });
      }

      const newUser = await User.createUser(req.body);

      res.status(201).json(newUser);
    } catch (error) {
      res.json({ message: 'Error creating a user' });
    }
  }

  async getUser(req, res) {
    try {
      const { email } = req.body;
      const { name, email: emailUser } = await User.getUser(email);

      res.json({ name, email: emailUser });
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async loginUser(req, res) {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;
    const user = await User.getUser(email);

    if (!user) {
      return res.status(404).json({ error: 'Email or password incorrect' });
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return res.status(404).json({ error: 'Email or password incorrect' });
    }

    const {
      id, name, email: emailUser, admin,
    } = user;

    const token = jwt.sign({ id, emailUser, admin }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

    res.header('authorization', token);
    res.json({ user: `User ${name} logged with Success !!` });
  }
}

export default new UserController();
