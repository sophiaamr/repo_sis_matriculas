import { connection } from '../db/connection.js';

class Aluno {
  constructor() {
    this.tableName = 'Aluno';
  }

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
}

export default Aluno;
