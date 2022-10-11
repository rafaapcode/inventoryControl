import bcryptjs from 'bcryptjs';
import User from '../models/User.js';

export async function createUser(req, res) {
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

  const salt = bcryptjs.genSaltSync();
  req.body.password = await bcryptjs.hashSync(req.body.password, salt);

  const newUser = await User.createUser(req.body);

  res.json(newUser);
}

export async function getUser(req, res) {
  const { email } = req.body;
  const user = await User.getUser(email);

  res.json(user);
}
