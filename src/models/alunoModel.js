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

 


  static getByNumeroMatricula(numeroMatricula) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Aluno WHERE numeroMatricula = ?`;
      connection.query(query, [numeroMatricula], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  
  static getAlunosByDisciplina(disciplinaId, callback) {
    const query = `
      SELECT a.* FROM Aluno a
      JOIN Matricula m ON a.idAluno = m.idAluno
      WHERE m.idDisciplina = ?
    `;

    connection.query(query, async (err, results) => {
      if (err) {
        console.error('Erro ao buscar alunos:', err.message);
        return callback(err);
      }

      // Mostrar alunos por disciplina
      console.log('Alunos por disciplina:', results);

      try {
        const usuarioModel = new Usuario();
        for (const aluno of results) {
          const usuario = await new Promise((resolve, reject) => {
            usuarioModel.getById(aluno.idUsuario, (err, result) => {
              if (err) reject(err);
              resolve(result);
            });
          });

          // Mostrar dados do usuário associado ao aluno
          console.log('Dados do usuário associado ao aluno:', usuario);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err.message);
      }

      callback(null, results);
    });
  }

  getByUserId(userId, callback) {
    const query = `SELECT * FROM Aluno WHERE idUsuario = ?`;
    connection.query(query, [userId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
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
