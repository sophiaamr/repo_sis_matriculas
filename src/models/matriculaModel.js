import { connection } from '../db/connection.js';

class MatriculaModel {
    // Método para criar uma nova matrícula
    static create(data, callback) {
        const query = `
            INSERT INTO matricula (status)
            VALUES (?)
        `;

        const values = [data.status];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao criar matrícula:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para buscar todas as matrículas
    static getAll(callback) {
        const query = `
            SELECT * FROM matricula
        `;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar matrículas:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }

    // Método para buscar uma matrícula pelo ID
    static getById(id, callback) {
        const query = `
            SELECT * FROM matricula WHERE idMatricula = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar matrícula por ID:', err.message);
                return callback(err);
            }
            callback(null, result[0]);
        });
    }

    // Método para atualizar uma matrícula pelo ID
    static update(id, data, callback) {
        const query = `
            UPDATE matricula
            SET status = ?
            WHERE idMatricula = ?
        `;

        const values = [data.status, id];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar matrícula:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para deletar uma matrícula pelo ID
    static delete(id, callback) {
        const query = `
            DELETE FROM matricula WHERE idMatricula = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao deletar matrícula:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }
}

export default MatriculaModel;
