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
}

export default Secretaria;