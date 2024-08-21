import { connection } from '../db/connection.js';

class Usuario {
  constructor() {
    this.tableName = 'Usuario';
  }

  // Método para criar um novo usuário
  create(data) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${this.tableName} (nome, cpf, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [data.nome, data.cpf, data.telefone, data.email, data.senha, data.tipo];

      connection.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Método para obter todos os usuários
  getAll(callback) {
    const query = `SELECT * FROM ${this.tableName}`;
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  // Método para obter um usuário pelo ID
  getById(id, callback) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  // Método para atualizar um usuário
  update(id, data, callback) {
    const columns = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const query = `UPDATE ${this.tableName} SET ${columns} WHERE id = ?`;
    const values = [...Object.values(data), id];

    connection.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  // Método para deletar um usuário
  delete(id, callback) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
}

export default Usuario;
