const express = require('express');
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const validateJwt = require('./controllers/auth');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

//rotas login e cadastro
app.use('/', signUp);
app.use('/', signIn);

app.get('/', validateJwt, (req, res) => {
  res.send({
    Sobre: 'Desafio 2 Back-End Escribo feito por Lucas Dantas Coelho :)',
    Cadastro: 'Para cadastro utilize POST em /signup',
    Login: 'Para login utilize POST em /login',
    Buscar: 'Para requisição bearder, utilizar GET nesta mesma rota',
  });
});

//servidor local na porta 3000
app.listen(port, () => {
  console.log(`servidor rodando em ${port}`);
});
