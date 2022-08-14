import mongoose from 'mongoose';

const User = mongoose.model('User');

export default class UserRepository {
  static async create(data) {
    const user = new User(data);

    await user.save();
  }

  static async authenticate(data) {
    const res = await User
      .findOne({
        email: data.email,
        password: data.password,
      });

    return res;
  }

  static async getById(id) {
    const res = await User.findById(id);

    return res;
  }
}
