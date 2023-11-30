const express = require('express');
const jwt = require("jsonwebtoken")
const Usuario = require('./models/user')
const { findUserEmail, userLogin, userPublicData } = require('./models/data');
const app = express.Router();
const SECRET = 'test'

// SIGN IN (LOGAR USUÁRIO)
app.get('/login', (req, res) => {});
{
}

//POST
app.post('/login', (req, res) => {
  try {
    // usuario passando email/senha
    let { id, email, senha } = req.body;
    // verificar e validar email/senha
    const loginEmailValidate = findUserEmail(email);
    const loginPasswordValidate = userLogin(email, senha);
    // se email e senha não consta...
    if (loginEmailValidate && !loginPasswordValidate) {
      res.json('Usuário e/ ou senha inválidos');
    }
    // retorno do json
    const token = jwt.sign({ userId: id }, SECRET, { expiresIn: 100 });
    res.status(201).json(userPublicData(loginEmailValidate, token));
  } catch (err) {
    res.json({ mensagem: 'mensagem invalida' });
  }
});

module.exports = app;
