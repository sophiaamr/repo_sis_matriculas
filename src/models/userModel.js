import { connection } from '../db/connection.js';

class Usuario {
  constructor() {
    this.tableName = 'Usuario';
  }

  // Método para criar um novo usuário
  create(data) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${this.tableName} (nome, cpf, telefone, email, senha, tipo) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [data.nome, data.cpf, data.telefone, data.email, data.senha, data.tipo];

      connection.query(query, values, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  // Método para obter todos os usuários
  getAll(callback) {
    const query = `SELECT * FROM ${this.tableName}`;
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  // Método para obter um usuário pelo ID
  getById(id, callback) {
    const query = `SELECT * FROM ${this.tableName} WHERE idUsuario = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  // Método para atualizar um usuário
  updateById(id, data, callback) {
    connection.beginTransaction((err) => {
        if (err) return callback(err);

        const updateUser = `UPDATE usuario SET nome = ?, cpf = ?, telefone = ?, email = ?, senha = ? WHERE idUsuario = ?`;
        const userData = [data.nome, data.cpf, data.telefone, data.email, data.senha, id];

        connection.query(updateUser, userData, (err, results) => {
            if (err) return connection.rollback(() => callback(err));

            if (data.tipo === 'aluno') {
                const updateAluno = 'UPDATE aluno SET matricula = ? WHERE idUsuario = ?';
                connection.query(updateAluno, [data.matricula, id], (err, results) => {
                    if (err) return connection.rollback(() => callback(err));

                    connection.commit((err) => {
                        if (err) return connection.rollback(() => callback(err));
                        callback(null, results);
                    });
                });
            } else if (data.tipo === 'professor') {
                const updateProfessor = 'UPDATE professor SET cargaHorario = ? WHERE idUsuario = ?';
                connection.query(updateProfessor, [data.cargaHorario, id], (err, results) => {
                    if (err) return connection.rollback(() => callback(err));

                    connection.commit((err) => {
                        if (err) return connection.rollback(() => callback(err));
                        callback(null, results);
                    });
                });
            } else if (data.tipo === 'secretaria') {
                const updateSecretaria = 'UPDATE secretaria SET departamento = ? WHERE usuario_id = ?';
                connection.query(updateSecretaria, [data.departamento, id], (err, results) => {
                    if (err) return connection.rollback(() => callback(err));

                    connection.commit((err) => {
                        if (err) return connection.rollback(() => callback(err));
                        callback(null, results);
                    });
                });
            } else {
                connection.commit((err) => {
                    if (err) return connection.rollback(() => callback(err));
                    callback(null, results);
                });
            }
        });
    });
}

  // Método para deletar um usuário. 
  //Como as entidades professor, secretaria e aluno possuem uma FK com usuario, é necessario apaga-las de suas respectivas tabelas primeiro,
  // para depois apagar na tabela usuario. 
  deleteById(id, callback) {
    connection.beginTransaction((err) => {
        if (err) return callback(err);

        const deleteSecretaria = 'DELETE FROM secretaria WHERE usuario_id = ?';
        connection.query(deleteSecretaria, [id], (err, results) => {
            if (err) return connection.rollback(() => callback(err));

            const deleteProfessor = 'DELETE FROM professor WHERE idUsuario = ?';
            connection.query(deleteProfessor, [id], (err, results) => {
                if (err) return connection.rollback(() => callback(err));

                const deleteAluno = 'DELETE FROM aluno WHERE idUsuario = ?';
                connection.query(deleteAluno, [id], (err, results) => {
                    if (err) return connection.rollback(() => callback(err));

                    const deleteUser = `DELETE FROM usuario WHERE idUsuario = ?`;
                    connection.query(deleteUser, [id], (err, results) => {
                        if (err) return connection.rollback(() => callback(err));

                        connection.commit((err) => {
                            if (err) return connection.rollback(() => callback(err));
                            callback(null, results);
                        });
                    });
                });
            });
        });
    });
}
}

export default Usuario;
