import mongoose from 'mongoose';
import orderSchema from './order';
import productSchema from './product';
import userSchema from './user';

export default function loadModels() {
  mongoose.model('Order', orderSchema);
  mongoose.model('Order', productSchema);
  mongoose.model('Order', userSchema);
}
