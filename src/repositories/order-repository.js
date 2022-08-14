import mongoose from 'mongoose';

const Order = mongoose.model('Order');

export default class OrderRepository {
  static async get() {
    const res = await Order
      .find({}, 'number status user items')
      .populate('user', 'name')
      .populate('items.product', 'title');
    return res;
  }

  static async create(data) {
    const order = new Order(data);
    await order.save();
  }
}
