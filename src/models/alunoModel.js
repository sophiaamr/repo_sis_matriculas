import { connection } from '../db/connection.js';
import Usuario from '../models/userModel.js';

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

    connection.query(query, async (err, results) => {
      if (err) return callback(err);

      // Mostrar todos os alunos
      console.log('Todos os alunos:', results);

      try {
        // Buscar todos os usuários
        const usuarioModel = new Usuario();
        const usuarios = await new Promise((resolve, reject) => {
          usuarioModel.getAll((err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
        
        // Mostrar todos os usuários
        console.log('Todos os usuários:', usuarios);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err.message);
      }

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
}

export default Aluno;
