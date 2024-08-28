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

  getAll(callback) {
    const query = `SELECT * FROM ${this.tableName}`;
    
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  getById(id, callback) {
    const query = `SELECT * FROM ${this.tableName} WHERE idUsuario = ?`;

    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  updateById(id, data, callback) {
    connection.beginTransaction((err) => {
      if (err) return callback(err);

      const updateUserQuery = `UPDATE ${this.tableName} SET nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE idUsuario = ?`;
      const updateUserValues = [data.nome, data.cpf, data.telefone, data.email, data.senha, id];
  
      connection.query(updateUserQuery, updateUserValues, (err) => {
        if (err) {
          return connection.rollback(() => callback(err));
        }

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
            if (err) {
              return connection.rollback(() => callback(err));
            }
  
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => callback(err));
              }
              callback(null);
            });
          });
        } else {
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => callback(err));
            }
            callback(null);
          });
        }
      });
    });
  }

  deleteById(id, callback) {
    connection.beginTransaction((err) => {
      if (err) return callback(err);

      const deleteSecretariaQuery = 'DELETE FROM Secretaria WHERE usuario_id = ?';
      connection.query(deleteSecretariaQuery, [id], (err) => {
        if (err) return connection.rollback(() => callback(err));

        const deleteProfessorQuery = 'DELETE FROM Professor WHERE idUsuario = ?';
        connection.query(deleteProfessorQuery, [id], (err) => {
          if (err) return connection.rollback(() => callback(err));

          const deleteAlunoQuery = 'DELETE FROM Aluno WHERE idUsuario = ?';
          connection.query(deleteAlunoQuery, [id], (err) => {
            if (err) return connection.rollback(() => callback(err));

            const deleteUserQuery = `DELETE FROM ${this.tableName} WHERE idUsuario = ?`;
            connection.query(deleteUserQuery, [id], (err) => {
              if (err) return connection.rollback(() => callback(err));

              connection.commit((err) => {
                if (err) return connection.rollback(() => callback(err));
                callback(null);
              });
            });
          });
        });
      });
    });
  }
}

export default Usuario;
