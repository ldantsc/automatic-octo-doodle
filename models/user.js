const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Criar usuario a partir da classe
class Usuario {
  constructor(id, name, email, password, phone, token) {
    this.id = id + 1;
    this.nome = name;
    this.email = email;
    this.senha = this.encryptPasswordGenerator(password);
    this.telefones = phone;
    this.data_criacao = this.localDate();
    this.data_atualizacao = this.localDate();
    this.ultimo_login = this.localDate();
  }

  // Data local
  localDate() {
    let date = Date.now();
    return date;
  }

  // Gerar hash
  encryptPasswordGenerator(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  // Gerar token
  tokenGenerator() {
    const SECRET = crypto.createSign('sha256').toString('base64');
    const token = jwt.sign({ id: this.id }, SECRET, { expiresIn: 100 });
    return token;
  }
}

module.exports = Usuario;
