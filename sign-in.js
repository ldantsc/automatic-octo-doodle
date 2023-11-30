const express = require('express');
const { findUserEmail, userLogin, userPublicData } = require('./models/data');
const app = express.Router();

// SIGN IN (LOGAR USUÁRIO)
app.get('/signin', (req, res) => {});
{
}

//POST
app.post('/signin', (req, res) => {
  try {
    let { email, senha } = req.body;
    const loginEmailValidate = findUserEmail(email);
    const loginPasswordValidate = userLogin(email, senha);
    if (loginEmailValidate && !loginPasswordValidate) {
      res.json('Usuário e/ ou senha inválidos');
    }
    res.status(201).json(userPublicData(loginEmailValidate));
  } catch (err) {
    res.json({ mensagem: 'mensagem invalida' });
  }
});

module.exports = app;
