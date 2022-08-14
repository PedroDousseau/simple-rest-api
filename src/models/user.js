import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  }],
});

export default mongoose.model('User', schema);
