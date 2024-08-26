import connection from '../database/connection.js';

class DisciplinaModel {
    // Método para criar uma nova disciplina
    static create(data, callback) {
        const query = `
            INSERT INTO disciplina (nomeDisciplina, status, qtdAluno)
            VALUES (?, ?, ?)
        `;

        const values = [data.nomeDisciplina, data.status, data.qtdAluno];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao criar disciplina:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para buscar todas as disciplinas
    static getAll(callback) {
        const query = `
            SELECT * FROM disciplina
        `;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar disciplinas:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }

    // Método para buscar uma disciplina pelo ID
    static getById(id, callback) {
        const query = `
            SELECT * FROM disciplina WHERE idDisciplina = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar disciplina por ID:', err.message);
                return callback(err);
            }
            callback(null, result[0]);
        });
    }

    // Método para atualizar uma disciplina pelo ID
    static update(id, data, callback) {
        const query = `
            UPDATE disciplina
            SET nomeDisciplina = ?, status = ?, qtdAluno = ?
            WHERE idDisciplina = ?
        `;

        const values = [data.nomeDisciplina, data.status, data.qtdAluno, id];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar disciplina:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para deletar uma disciplina pelo ID
    static delete(id, callback) {
        const query = `
            DELETE FROM disciplina WHERE idDisciplina = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao deletar disciplina:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }
}

export default DisciplinaModel;
