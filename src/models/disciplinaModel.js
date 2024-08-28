import { connection } from '../db/connection.js';

class DisciplinaModel {
    constructor() {
        this.tableName = 'Disciplina';
    }

    static create(data, callback) {
        const query = `INSERT INTO Disciplina (nomeDisciplina, status, tipo, qntdAluno, idCurso) VALUES (?, ?, ?, ?, ?)`;
        const values = [data.nomeDisciplina, data.status, data.tipo, data.qntdAluno, data.idCurso];

        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Erro ao criar disciplina:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }

    static getAll(callback) {
        const query = `SELECT * FROM Disciplina`;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar Disciplinas:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }

    static getById(id, callback) {
        const query = `SELECT * FROM Disciplina WHERE idDisciplina = ?`;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar Disciplina por ID:', err.message);
                return callback(err);
            }
            callback(null, result[0] || null);
        });
    }

    static update(id, data, callback) {
        const query = `UPDATE Disciplina SET nomeDisciplina = ?, status = ?, tipo = ?, qntdAluno = ? WHERE idDisciplina = ?`;
        const values = [data.nomeDisciplina, data.status, data.tipo, data.qntdAluno, id];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar Disciplina:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    static delete(id, callback) {
        const query = `DELETE FROM Disciplina WHERE idDisciplina = ?`;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao deletar Disciplina:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para buscar um curso pelo ID
    static getCursoById(id, callback) {
        const query = `SELECT * FROM Curso WHERE idCurso = ?`;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar Curso por ID:', err.message);
                return callback(err);
            }
            callback(null, result[0]);
        });
    }


    static getByCurso(idCurso, callback) {
        const query = 'SELECT * FROM Disciplina WHERE idCurso = ?';
        connection.query(query, [idCurso], callback);
    }
}


export default DisciplinaModel;
