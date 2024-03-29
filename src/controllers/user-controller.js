import md5 from 'md5';
import ValidationContract from '../validators/fluent-validator';
import Repository from '../repositories/user-repository';
import AuthService from '../services/auth-service';
// import EmailService from '../services/email-service';

export async function post(req, res) {
  const contract = new ValidationContract();

  // list of validations on post request
  contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
  contract.isEmail(req.body.email, 'Email inválido');
  contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

  // post validation
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await Repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: ['user'],
    });

    // Todo: Fix email sending
    // EmailService.send(
    //   req.body.email,
    //   'Bem vindo ao Node API Test',
    //   `'Olá, <strong>${req.body.name}</strong>, seja bem-vindo'`,
    // );

    res.status(201).send({
      message: 'Usuário cadastrado com sucesso!',
    });
  } catch (error) {
    res.status(400).send({
      message: 'Falha ao cadastrar usuário',
      error,
    });
  }
}

export async function authenticate(req, res) {
  try {
    const user = await Repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });

    if (!user) {
      res.status(404).send({
        message: 'Usuário ou senha inválidos',
      });
      return;
    }

    const token = await AuthService.generateToken({
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    });

    res.status(201).send({
      token,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: 'Falha ao autenticar usuário',
      error,
    });
  }
}

export async function refreshToken(req, res) {
  try {
    // get the token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    const data = await AuthService.decodeToken(token);

    const user = await Repository.getById(data.id);

    if (!user) {
      res.status(401).send({
        message: 'Usuário não encontrado',
      });
      return;
    }

    const newToken = await AuthService.generateToken({
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    });

    res.status(201).send({
      token: newToken,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: 'Falha ao cadastrar usuário',
      error,
    });
  }
}
