import { connection } from '../db/connection.js';

class MatriculaModel {
    constructor() {
        this.tableName = 'Matricula'; // Ajuste aqui para o nome correto da tabela
    }

    create(data, callback) {
        const query = `INSERT INTO ${this.tableName} (status, idAluno, idCurso, periodo) VALUES (?, ?, ?, ?)`;
        const values = [data.status, data.idAluno, data.idCurso, data.periodo];

        connection.query(query, values, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }

    static getAll(callback) {
        const query = `SELECT * FROM Matricula`;
        connection.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }

    static getById(id, callback) {
        const query = `SELECT * FROM Matricula WHERE idMatricula = ?`;
        connection.query(query, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0]);
        });
    }

    static update(id, data, callback) {
        const query = `UPDATE Matricula SET status = ? WHERE idMatricula = ?`;
        const values = [data.status, id];
        connection.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }

    static delete(id, callback) {
        const query = `DELETE FROM Matricula WHERE idMatricula = ?`;
        connection.query(query, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
}

export default MatriculaModel;
