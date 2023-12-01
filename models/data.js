const bcrypt = require('bcryptjs');

// usuarios cadastrados será guardado nesta varíavel
let usersData = [];

// procurar usuario pelo email
function findUserEmail(match) {
  return usersData.find((user) => user.email === match);
}

//procurar usuario pelo
function findUserId(match) {
  return usersData.find((user) => user.id === match);
}

// procurar usuario pelo email e verificar se senha esta correta
function userLogin(mail, password) {
  const user = findUserEmail(mail);
  const passwordMatch = bcrypt.compareSync(password, user.senha);
  return passwordMatch;
}

// dados visiveis ao usuario
function userPublicData(user) {
  const { id, data_criacao, data_atualizacao, ultimo_login, token } = user;
  const userData = {
    id: id,
    data_criacao: data_criacao,
    data_atualizacao: data_atualizacao,
    ultimo_login: ultimo_login,
    token: token,
  };
  return userData;
}

module.exports = {
  usersData: usersData,
  findUserEmail: findUserEmail,
  userLogin: userLogin,
  userPublicData: userPublicData,
  findUserId: findUserId,
};
