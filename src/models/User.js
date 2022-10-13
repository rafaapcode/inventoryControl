import bcryptjs from 'bcryptjs';
import UserModel from '../database/user.js';

export default class User {
  static async createUser(body) {
    const salt = bcryptjs.genSaltSync(14);

    const newUser = await UserModel.create({
      ...body,
      password: bcryptjs.hashSync(body.password, salt),
    });

    return newUser;
  }

  static async getUser(email) {
    const user = await UserModel.findOne({ email });

    return user;
  }
}
