import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

class UserController {
  async createUser(req, res) {
    try {
      const validatorEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!validatorEmail.test(req.body.email) || req.body.password < 5) {
        return res.status(401).json({
          message: ['Password must be at least 7 characters', 'Email incorrect'],
        });
      }

      if (await (User.getUser(req.body.email))) {
        return res.status(401).json({
          message: ['User already exists.'],
        });
      }

      const newUser = await User.createUser(req.body);

      res.json(newUser);
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
      res.json({ message: 'User not found' });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.getUser(email);

    if (!user) {
      return res.status(404).json({ error: 'Email or password incorrect' });
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return res.status(404).json({ error: 'Email or password incorrect' });
    }

    const { id, name, email: emailUser } = user;

    const token = jwt.sign({ id, emailUser }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

    res.header('Authrozation-token', token);
    res.json({ user: `User ${name} logged with Success !!` });
  }
}

export default new UserController();
