# 📍 Simple REST API

A Simple rest API project 🙂 <br>
It manipulates a fake business model with **Users**, **Products** and **Orders**.

## Built with
- Express
- Mongoose

## API Routes

### Users

| Route                | Method | Description                                                      |
|----------------------|--------|------------------------------------------------------------------|
| /users               | POST   | Create a new user                                                |
| /users/authenticate  | POST   | Authenticate a user (Used for login, it returns a session token) |
| /users/refresh-token | POST   | Generate a new token                                             |

### Products

| Route               | Method | Description                          |
|---------------------|--------|--------------------------------------|
| /products           | GET    | List all active products             |
| /products           | POST   | Create a new product                 |
| /products           | DELETE | Delete a product                     |
| /products/:slug     | GET    | Return a product by its slug         |
| /products/:id       | GET    | Return a product by its id           |
| /products/:id       | PUT    | Update a product                     |
| /products/tags/:tag | PUT    | Return all products with a given tag |

### Orders

| Route   | Method | Description             |
|---------|--------|-------------------------|
| /orders | GET    | List all created orders |
| /orders | POST   | Create a new order      |

## How to start
1. Add a config.js file at src/ with the following content:

```javascript
global.SALT_KEY = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'; // Salt key to enhance password security

module.exports = {
  connectiongString: 'xxxxxx', // DB connectiongString
  sendgridKey: 'xxxxxx', // SendGrid key
}
```

2. Install the dependencies and start the app
```bash
npm install && npm start
```


