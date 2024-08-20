import { connection } from '../db/connection.js';

export const UserModel = {

  createUser: (userData, callback) => {
    const query = 'INSERT INTO users (nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?)';
    const { nome, cpf, telefone, email, senha } = userData;
    connection.query(query, [nome, cpf, telefone, email, senha], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getUsers: (callback) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getUserById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  updateUser: (id, userData, callback) => {
    const query = 'UPDATE users SET nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE id = ?';
    const { nome, cpf, telefone, email, senha } = userData;
    connection.query(query, [nome, cpf, telefone, email, senha, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  deleteUser: (id, callback) => {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};
