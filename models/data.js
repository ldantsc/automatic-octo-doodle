const bcrypt = require('bcryptjs');

let usersData = [];

function findUserEmail(match) {
  return usersData.find((user) => user.email === match);
}

function findUserPassword(password) {
   const test2 = usersData.find((user) => user.password === password)
   console.log(test2.password)
  const test = bcrypt.compare(password, test2.password);
  console.log(test)
  return test
}

function userViewer(user) {
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
  findUserPassword: findUserPassword,
  userViewer: userViewer,
};
