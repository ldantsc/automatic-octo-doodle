const express = require('express');
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const jwt = require('jsonwebtoken');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', signUp);
app.use('/', signIn);

function test(req, res, next) {
  const token = req.headers['authorization']
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) {
      return res.status(401).end()
    }
    req.userId = decoded.userId
    next()
  });
}

app.get('/',test, (req, res) => {
  res.send({
    Sobre: 'Desafio 2 Back-End Escribo feito por Lucas Dantas Coelho',
    Cadastro: 'Para cadastro utilize POST em /signup',
    Login: 'Para login utilize POST em /login',
  });
});

//servidor local na porta 3000
app.listen(port, () => {
  console.log(`servidor rodando em ${port}`);
});
