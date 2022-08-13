const uuid = require('uuid');
const repository = require('../repositories/order-repository');
const authService = require('../services/auth-service');

exports.get = async (req, res) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha na requisição',
    });
  }
};

exports.post = async (req, res) => {
  try {
    // get the token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    const data = await authService.decodeToken(token);

    await repository.create({
      user: data.id,
      number: uuid().substring(0, 6),
      items: req.body.items,
    });
    res.status(201).send({
      message: 'Pedido cadastrado com sucesso!',
    });
  } catch (error) {
    res.status(400).send({
      message: 'Falha ao cadastrar pedido',
      error,
    });
  }
};
