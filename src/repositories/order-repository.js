const mongoose = require('mongoose');

const Order = mongoose.model('Order');

exports.get = async () => {
  const res = await Order
    .find({}, 'number status user items')
    .populate('user', 'name')
    .populate('items.product', 'title');
  return res;
};

exports.create = async (data) => {
  const order = new Order(data);
  await order.save();
};
