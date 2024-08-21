import { connection } from '../db/connection.js';

class Secretaria {
  constructor() {
    this.tableName = 'Secretaria';
  }

  create(data) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${this.tableName} (usuario_id, departamento) VALUES (?, ?)`;
      const values = [data.usuario_id, data.departamento];

      connection.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  async getAllSecretaria(){
    const query = `
      SELECT u.*, a.departamento 
      FROM usuario u
      JOIN secretaria a ON u.idUsuario = a.usuario_id
      WHERE u.tipo = 'secretaria'
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
    const query = `SELECT * FROM ${this.tableName} WHERE usuario_id = ?`;
    connection.query(query, [userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
}

export default Secretaria;