import jwt from 'jsonwebtoken';

export default class AuthService {
  static async generateToken(data) {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
  }

  static async decodeToken(token) {
    const data = await jwt.verify(token, global.SALT_KEY);
    return data;
  }

  static authorize(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      res.status(401).json({
        message: 'Acesso Restrito',
      });
    } else {
      jwt.verify(token, global.SALT_KEY, (error) => {
        if (error) {
          res.status(401).json({
            message: 'Token Inválido',
          });
        } else {
          next();
        }
      });
    }
  }

  static isAdmin(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      res.status(401).json({
        message: 'Acesso Restrito',
      });
    } else {
      jwt.verify(token, global.SALT_KEY, (error, decoded) => {
        if (error) {
          res.status(401).json({
            message: 'Token Inválido',
          });
        } else if (decoded.roles.includes('admin')) {
          next();
        } else {
          res.status(403).json({
            message: 'Permissão negada. Função restrita para administradores.',
          });
        }
      });
    }
  }
}
