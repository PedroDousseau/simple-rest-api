import uuid from 'uuid';
import Repository from '../repositories/order-repository';
import AuthService from '../services/auth-service';

export async function get(req, res) {
  try {
    const data = await Repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha na requisição',
    });
  }
}

export async function post(req, res) {
  try {
    // get the token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    const data = await AuthService.decodeToken(token);

    await Repository.create({
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
}
