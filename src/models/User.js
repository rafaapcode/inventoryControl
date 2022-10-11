import UserModel from '../database/user.js';

export default class User {
  static async createUser(body) {
    const newUser = await UserModel.create(body);

    return newUser;
  }

  static async getUser(email) {
    const user = await UserModel.findOne({ email });

    return user;
  }
}
