const jwt = require('jsonwebtoken');

function validateJwt(req, res, next) {
  try {
    // Bearer token, split para trazer apenas o token
    const token = req.headers.authorization.split(' ')[1];
    // método de veficação do jwt
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        if (err.message === 'jwt expired') {
          res.status(401).send({ mensagem: 'Sessão Invalida' });
        } else {
          // se não for válido...
          res.send({ mensagem: 'Não autorizado' });
        }
        res.status(401).end();
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (err) {
    next();
  }
}

module.exports = validateJwt;
