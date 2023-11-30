const express = require('express');
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const app = express();

const port = process.env.PORT || 3000;

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
app.listen(port, () => {
  console.log(`servidor rodando em ${port}`);
});
