const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// db connection
mongoose.connect(config.connectiongString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// load models
require('./models/product');
require('./models/user');
require('./models/order');

// load routes
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const userRoute = require('./routes/user-route');
const orderRoute = require('./routes/order-route');

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

module.exports = app;
