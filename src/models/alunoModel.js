import { connection } from '../db/connection.js';

class Aluno {
  constructor() {
    this.tableName = 'Aluno';
  }

  create(data, callback) {
    const query = `INSERT INTO ${this.tableName} (idUsuario, matricula, periodo) VALUES (?, ?, ?)`;
    const values = [data.idUsuario, data.matricula, data.periodo];

    connection.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  getAllAlunos(callback) {
    const query = `
      SELECT u.*, a.matricula, a.periodo
      FROM Usuario u
      JOIN Aluno a ON u.idUsuario = a.idUsuario
      WHERE u.tipo = 'aluno'
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

export default Aluno;
