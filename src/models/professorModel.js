import { connection } from '../db/connection.js';

class Professor {
  constructor() {
    this.tableName = 'Professor';
  }

  create(data, callback) {
    const query = `INSERT INTO ${this.tableName} (idUsuario, cargaHorario) VALUES (?, ?)`;
    const values = [data.idUsuario, data.cargaHorario];

    connection.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  getAllProfessors(callback) {
    const query = `
      SELECT u.*, p.cargaHorario
      FROM Usuario u
      JOIN Professor p ON u.idUsuario = p.idUsuario
      WHERE u.tipo = 'professor'
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

  getAllProfessorsWithName(callback) {
    const query = `
         SELECT p.idProfessor, u.nome
            FROM Professor p
            JOIN Usuario u ON p.idUsuario = u.idUsuario
            WHERE u.tipo = 'professor'
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            return callback(err); // Certifique-se de que o erro é tratado
        }
        console.log('Resultados da query:', results); // Isso deve mostrar os resultados
        callback(null, results); // Certifique-se de que os resultados estão sendo passados
    });
}
}

export default Professor;
