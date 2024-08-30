import { connection } from '../db/connection.js';

class DisciplinaModel {
    // Método para criar uma nova disciplina
    static create(data, callback) {
        const query = `
            INSERT INTO disciplina (nomeDisciplina, valor, status, qntdAluno, idCurso, periodo, numCredito)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [data.nomeDisciplina, data.valor, data.status, data.tipo, data.qntdAluno, data.idCurso, data.periodo, data.numCredito];

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
        const query = 'SELECT * FROM disciplina';

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
        const query = 'SELECT * FROM disciplina WHERE idDisciplina = ?';

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar disciplina por ID:', err.message);
                return callback(err);
            }
            callback(null, result[0] || null);
        });
    }

    // Método para atualizar uma disciplina pelo ID
    static update(id, data, callback) {
        const query = `
            UPDATE disciplina
            SET nomeDisciplina = ?, valor = ?, status = ?, qntdAluno = ?, idCurso = ?, periodo = ?, numCredito = ?
            WHERE idDisciplina = ?
        `;
        const values = [data.nomeDisciplina, data.valor, data.status, data.tipo, data.qntdAluno, data.idCurso, data.periodo, data.numCredito, id];

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
        const query = 'DELETE FROM disciplina WHERE idDisciplina = ?';

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao deletar disciplina:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para buscar disciplinas por curso e período
    static getByIdAndPeriodo(idCurso, periodo, callback) {
        const query = 'SELECT * FROM disciplina WHERE idCurso = ? AND periodo = ?';

        connection.query(query, [idCurso, periodo], (err, results) => {
            if (err) {
                console.error('Erro ao buscar disciplinas por curso e período:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }
    static getDisciplinasByCurso(cursoId, callback) {
        const query = `
            SELECT periodo, nomeDisciplina, valor, status, qntdAluno, numCredito
            FROM disciplina
            WHERE idCurso = ?
            ORDER BY periodo ASC
        `;
    
        connection.query(query, [cursoId], (err, results) => {
            if (err) {
                console.error('Erro ao buscar disciplinas por curso:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }
}


export default DisciplinaModel;
