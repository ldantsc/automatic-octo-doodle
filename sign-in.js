const express = require('express');
const { findUserEmail, userLogin, userPublicData } = require('./models/data');
const app = express.Router();
require('dotenv').config();

// SIGN IN (LOGAR USUÁRIO)
app.get('/login', (req, res) => {
  res.send({
    mensagem: 'Para fazer o login utilize o POST com email e senha do usuário',
  });
});

//POST
app.post('/login', (req, res) => {
  try {
    // usuario passando email/senha
    let { email, senha } = req.body;
    // verificar e validar email/senha
    const loginEmailValidate = findUserEmail(email);
    const loginPasswordValidate = userLogin(email, senha);
    // se email e senha não consta...
    if (loginEmailValidate && !loginPasswordValidate) {
      res.json('Usuário e/ ou senha inválidos');
    }
    // retorno do json
    res.status(201).json(userPublicData(loginEmailValidate));
  } catch (err) {
    res.send({ mensagem: 'Nenhum usuário cadastrado' });
  }
});

module.exports = app;
