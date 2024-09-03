import { connection } from '../db/connection.js';

class Secretaria {
  constructor() {
    this.tableName = 'Secretaria';
  }

  create(data, callback) {
    const query = `INSERT INTO ${this.tableName} (usuario_id, departamento) VALUES (?, ?)`;
    const values = [data.usuario_id, data.departamento];

    connection.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  getAllSecretaria(callback) {
    const query = `
      SELECT u.*, s.departamento
      FROM Usuario u
      JOIN Secretaria s ON u.idUsuario = s.usuario_id
      WHERE u.tipo = 'secretaria'
    `;

    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  getByUserId(userId, callback) {
    const query = `SELECT * FROM ${this.tableName} WHERE idUsuario = ?`;
    connection.query(query, [userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
}

export default Secretaria;
