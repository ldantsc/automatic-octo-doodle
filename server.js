const express = require('express');
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const app = express();

app.use(express.json());

app.use('/', signUp);
app.use('/', signIn);

app.get('/', (req, res) => {
  res.send({
    Cadastro: 'Para cadastro utilize /signup',
    Login: 'Para login utilize /login',
  });
});

//servidor local na porta 3000
app.listen(3000, () => {
  console.log('servidor rodando');
});
