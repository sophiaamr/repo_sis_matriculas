import { connection } from '../db/connection.js';

class Aluno {
  constructor() {
    this.tableName = 'Aluno';
  }
  //Método para criar aluno. 
  create(data) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${this.tableName} (idUsuario, matricula) VALUES (?, ?)`;
      const values = [data.idUsuario, data.matricula];

      connection.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  //Metódo para mostrar todos os alunos. 
  async getAllAlunos() {
    const query = `
      SELECT u.*, a.matricula 
      FROM usuario u
      JOIN aluno a ON u.idUsuario = a.idUsuario
      WHERE u.tipo = 'aluno'
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
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
