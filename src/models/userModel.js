import { connection } from '../db/connection.js';

class Usuario {
  constructor() {
    this.tableName = 'Usuario';
  }

  create(data, callback) {
    const query = `INSERT INTO ${this.tableName} (nome, cpf, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [data.nome, data.cpf, data.telefone, data.email, data.senha, data.tipo];

    connection.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
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

      const updateUser = `UPDATE ${this.tableName} SET nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE idUsuario = ?`;
      const userData = [data.nome, data.cpf, data.telefone, data.email, data.senha, id];

      connection.query(updateUser, userData, (err) => {
        if (err) return connection.rollback(() => callback(err));

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
            if (err) return connection.rollback(() => callback(err));

            connection.commit((err) => {
              if (err) return connection.rollback(() => callback(err));
              callback(null);
            });
          });
        } else {
          connection.commit((err) => {
            if (err) return connection.rollback(() => callback(err));
            callback(null);
          });
        }
      });
    });
  }

  deleteById(id, callback) {
    connection.beginTransaction((err) => {
      if (err) return callback(err);

      const deleteSecretaria = 'DELETE FROM Secretaria WHERE usuario_id = ?';
      connection.query(deleteSecretaria, [id], (err) => {
        if (err) return connection.rollback(() => callback(err));

        const deleteProfessor = 'DELETE FROM Professor WHERE idUsuario = ?';
        connection.query(deleteProfessor, [id], (err) => {
          if (err) return connection.rollback(() => callback(err));

          const deleteAluno = 'DELETE FROM Aluno WHERE idUsuario = ?';
          connection.query(deleteAluno, [id], (err) => {
            if (err) return connection.rollback(() => callback(err));

            const deleteUser = `DELETE FROM ${this.tableName} WHERE idUsuario = ?`;
            connection.query(deleteUser, [id], (err) => {
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
