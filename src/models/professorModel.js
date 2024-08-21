import { connection } from '../db/connection.js';

class Professor {
  constructor() {
    this.tableName = 'Professor';
  }

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
}

export default Professor;