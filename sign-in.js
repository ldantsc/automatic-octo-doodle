const express = require('express');
const jwt = require('jsonwebtoken');
const { findUserEmail, userLogin, userPublicData } = require('./models/data');
const app = express.Router();
require('dotenv').config();

// SIGN IN (LOGAR USUÁRIO)
app.get('/login', (req, res) => {
  res.send('valido');
});

//POST
app.post('/login', (req, res) => {
  try {
    // usuario passando email/senha
    let { email, senha } = req.body;
    // verificar e validar email/senha
    const loginEmailValidate = findUserEmail(email);
    const loginPasswordValidate = userLogin(email, senha);
    const id = loginEmailValidate.id;
    // se email e senha não consta...
    if (loginEmailValidate && !loginPasswordValidate) {
      res.json('Usuário e/ ou senha inválidos');
    }
    // retorno do json
    const token = jwt.sign({ userId: id }, process.env.SECRET, {
      expiresIn: 1800,
    });
    res.status(201).json(userPublicData(loginEmailValidate, token));
  } catch (err) {
    res.json({ mensagem: 'mensagem invalida' });
  }
});

module.exports = app;
