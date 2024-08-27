import { connection } from '../db/connection.js';

class Usuario {
  constructor() {
    this.tableName = 'Usuario';
  }

  create(data, callback) {
    const query = `INSERT INTO ${this.tableName} (nome, cpf, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [data.nome, data.cpf, data.telefone, data.email, data.senha, data.tipo];

    connection.query(query, values, (err, result) => {
      if (err) return callback(err);

      // Após a inserção do usuário, insira os dados nas tabelas correspondentes
      const userId = result.insertId;
      let insertQuery;
      let insertValues;

      if (data.tipo === 'aluno') {
        insertQuery = 'INSERT INTO Aluno (idUsuario, matricula, periodo) VALUES (?, ?, ?)';
        insertValues = [userId, data.matricula, data.periodo];
      } else if (data.tipo === 'professor') {
        insertQuery = 'INSERT INTO Professor (idUsuario, cargaHorario) VALUES (?, ?)';
        insertValues = [userId, data.cargaHorario];
      } else if (data.tipo === 'secretaria') {
        insertQuery = 'INSERT INTO Secretaria (usuario_id, departamento) VALUES (?, ?)';
        insertValues = [userId, data.departamento];
      }

      if (insertQuery) {
        connection.query(insertQuery, insertValues, (err) => {
          if (err) return callback(err);
          callback(null, result);
        });
      } else {
        callback(null, result);
      }
    });
  }

  getAll() {
    const query = `SELECT * FROM ${this.tableName}`;

    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE idUsuario = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  updateById(id, data) {
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) return reject(err);

        const updateUser = `UPDATE ${this.tableName} SET nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE idUsuario = ?`;
        const userData = [data.nome, data.cpf, data.telefone, data.email, data.senha, id];

        connection.query(updateUser, userData, (err) => {
          if (err) return connection.rollback(() => reject(err));

          let updateQuery;
          let updateValues;

          if (data.tipo === 'aluno') {
            updateQuery = 'UPDATE Aluno SET matricula = ?, periodo = ? WHERE idUsuario = ?';
            updateValues = [data.matricula, data.periodo, id];
          } else if (data.tipo === 'professor') {
            updateQuery = 'UPDATE Professor SET cargaHorario = ? WHERE idUsuario = ?';
            updateValues = [data.cargaHorario, id];
          } else if (data.tipo === 'secretaria') {
            updateQuery = 'UPDATE Secretaria SET departamento = ? WHERE usuario_id = ?';
            updateValues = [data.departamento, id];
          }

          if (updateQuery) {
            connection.query(updateQuery, updateValues, (err) => {
              if (err) return connection.rollback(() => reject(err));

              connection.commit((err) => {
                if (err) return connection.rollback(() => reject(err));
                resolve();
              });
            });
          } else {
            connection.commit((err) => {
              if (err) return connection.rollback(() => reject(err));
              resolve();
            });
          }
        });
      });
    });
  }

  deleteById(id) {
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) return reject(err);

        const deleteSecretaria = 'DELETE FROM Secretaria WHERE usuario_id = ?';
        connection.query(deleteSecretaria, [id], (err) => {
          if (err) return connection.rollback(() => reject(err));

          const deleteProfessor = 'DELETE FROM Professor WHERE idUsuario = ?';
          connection.query(deleteProfessor, [id], (err) => {
            if (err) return connection.rollback(() => reject(err));

            const deleteAluno = 'DELETE FROM Aluno WHERE idUsuario = ?';
            connection.query(deleteAluno, [id], (err) => {
              if (err) return connection.rollback(() => reject(err));

              const deleteUser = `DELETE FROM ${this.tableName} WHERE idUsuario = ?`;
              connection.query(deleteUser, [id], (err) => {
                if (err) return connection.rollback(() => reject(err));

                connection.commit((err) => {
                  if (err) return connection.rollback(() => reject(err));
                  resolve();
                });
              });
            });
          });
        });
      });
    });
  }
}

export default Usuario;
