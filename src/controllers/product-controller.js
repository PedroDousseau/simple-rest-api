import ValidationContract from '../validators/fluent-validator';
import Repository from '../repositories/product-repository';

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

export async function getBySlug(req, res) {
  try {
    const data = await Repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({
      message: 'Falha na requisição',
    });
  }
}

export async function getById(req, res) {
  try {
    const data = await Repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({
      message: 'Falha na requisição',
    });
  }
}

export async function getByTag(req, res) {
  try {
    const data = await Repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({
      message: 'Falha na requisição',
      data: error,
    });
  }
}

export async function post(req, res) {
  const contract = new ValidationContract();

  // list of validations on post request
  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

  // post validation
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await Repository.create(req.body);
    res.status(201).send({
      message: 'Produto cadastrado com sucesso!',
    });
  } catch (error) {
    res.status(400).send({
      message: 'Falha ao cadastrar produto',
      error,
    });
  }
}

export async function put(req, res) {
  try {
    await Repository.update(req.params.id, req.body);
    res.status(200).send({
      message: 'Produto atualizado com sucesso!',
    });
  } catch (error) {
    res.status(400).send({
      message: 'Falha ao atualizar produto',
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    await Repository.deleteProduct(req.body.id);
    res.status(200).send({
      message: 'Produto removido com sucesso!',
    });
  } catch (error) {
    res.status(400).send({
      message: 'Falha ao remover produto',
      data: error,
    });
  }
}
