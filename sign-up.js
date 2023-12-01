const express = require('express');
const Usuario = require('./models/user');
const { usersData, findUserEmail, userPublicData } = require('./models/data');
const jwt = require('jsonwebtoken');
const app = express.Router();
require('dotenv').config();

// SIGN UP (CADASTRO DE USUÁRIO)
app.get('/signup', (req, res) => {
  res.json(usersData);
});

// método POST
app.post('/signup', (req, res) => {
  // Criando usuario...
  try {
    let { nome, email, senha, telefones } = req.body;
    //verificar se email existe no array de dados usuarios
    const isEmailExist = findUserEmail(email);
    //se usuario não existir, criar novo usuario
    if (!isEmailExist) {
      const token = jwt.sign(
        { userId: usersData.length + 1 },
        process.env.SECRET,
        {
          expiresIn: '30s',
        }
      );
      const newUser = new Usuario(
        usersData.length,
        nome,
        email,
        senha,
        telefones,
        token
      );
      usersData.push(newUser);
      const login = findUserEmail(newUser.email);
      res.status(201).json(userPublicData(login));
    } else {
      // seu email existe...
      res.send({ mensagem: 'E-mail já existente' });
    }
  } catch (err) {
    res.send({ mensagem: 'Erro ao cadastrar' });
  }
});

module.exports = app;
