import { connection } from '../db/connection.js';
import Usuario from '../models/userModel.js';

class Aluno {
  constructor() {
    this.tableName = 'Aluno';
  }

  // Método para criar um aluno
  create(data, callback) {
    const query = `INSERT INTO ${this.tableName} (idUsuario, matricula, periodo) VALUES (?, ?, ?)`;
    const values = [data.idUsuario, data.matricula, data.periodo];

    connection.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  getAll(callback) {
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
    connection.query(query, [userId], async (err, results) => {
      if (err) return callback(err);

      // Mostrar aluno por ID
      console.log('Aluno por ID:', results[0]);

      try {
        // Buscar dados do usuário
        const usuarioModel = new Usuario();
        const usuario = await new Promise((resolve, reject) => {
          usuarioModel.getById(userId, (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });

        // Mostrar dados do usuário
        console.log('Dados do usuário:', usuario);
      } catch (err) {
        console.error('Erro ao buscar usuário:', err.message);
      }

      callback(null, results[0]);
    });
  }

  static getByNumeroMatricula(numeroMatricula) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Aluno WHERE numeroMatricula = ?`;
      connection.query(query, [numeroMatricula], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static getAlunosByDisciplina(idDisciplina, callback) {
    const query = `
      SELECT U.nome AS Aluno, D.nomeDisciplina
      FROM Matricula M
      INNER JOIN Aluno A ON M.idAluno = A.idAluno
      INNER JOIN Usuario U ON A.idUsuario = U.idUsuario
      INNER JOIN Disciplina D ON M.idDisciplina = D.idDisciplina
      WHERE M.idDisciplina = ?
      ORDER BY U.nome;
    `;

    connection.query(query, [idDisciplina], (err, results) => {
      if (err) {
        console.error('Erro ao buscar alunos:', err.message);
        return callback(err);
      }

      callback(null, results);
    });
}


  async getByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Aluno WHERE idUsuario = ?';
      connection.query(query, [userId], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  }

  async getDisciplinasByAlunoId(alunoId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT disciplinas.nome 
        FROM disciplinas 
        JOIN matriculas ON disciplinas.id = matriculas.disciplina_id 
        WHERE matriculas.aluno_id = ?`;
      connection.query(query, [alunoId], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

export default Aluno;
