import { connection } from '../db/connection.js';

class Professor {
  constructor() {
    this.tableName = 'Professor';
  }

  //Método para criar Professor
  create(data) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${this.tableName} (idUsuario, cargaHorario) VALUES (?, ?)`;
      const values = [data.idUsuario, data.cargaHorario];

      connection.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  //Método para mostrar todos os professores
  async getAllProfessors(){
    const query = `
      SELECT u.*, a.cargaHorario 
      FROM usuario u
      JOIN professor a ON u.idUsuario = a.idUsuario
      WHERE u.tipo = 'professor'
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

export default Professor;