const express = require('express');
const { usersData, findUserEmail, findUserPassword } = require('./models/data');
const app = express.Router();

// SIGN IN

app.get('/signin', (req, res) => {});

//POST

app.post('/signin', (req, res) => {
  try {
    let { email, senha } = req.body;
    const userEmailExist = findUserEmail(email);
    const userPasswordExist = findUserPassword(senha)
    console.log(userEmailExist, userPasswordExist)
    if (!userEmailExist && !userPasswordExist) {
      res.send({ mensagem: 'Usuário e/ou senha inválidos' });
    } else {
      res.send({ mensagem: 'logado' });
    }
  } catch (err) {
    res.send({ mensagem: 'mensagem de erro' });
  }
});

module.exports = app
