const jwt = require('jsonwebtoken');
const usuarios = require('../index');

module.exports = (req, res, next) => {
	try {
		const decode = jwt.verify(req.body.token, usuarios.id.token);
		req.usuarios = decode;
		next();
	} catch (error) {
		return res.status(401).send({
			mensagem: 'falha na autenticação',
		});
	}
};
