import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';

// load models (Todo: Find a way to not have unused-vars)
import Product from './models/product';
import Order from './models/order';
import User from './models/user';

// load routes
import indexRoute from './routes/index-route';
import productRoute from './routes/product-route';
import userRoute from './routes/user-route';
import orderRoute from './routes/order-route';

const app = express();

// db connection
mongoose.connect(config.connectiongString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json({
  limit: '5mb',
}));
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Enable o CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);

export default app;
