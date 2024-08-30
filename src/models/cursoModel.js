import {connection} from '../db/connection.js';

class CursoModel {
    // Método para criar um novo curso
    static create(data, callback) {
        const query = `
            INSERT INTO curso (nome, numCredito)
            VALUES (?, ?)
        `;

        const values = [data.nome, data.numCredito];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao criar curso:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para buscar todos os cursos
    static getAll(callback) {
        const query = `
            SELECT * FROM curso
        `;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar cursos:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }

    // Método para buscar um curso pelo ID
    static getById(id, callback) {
        const query = `
            SELECT * FROM curso WHERE idCurso = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar curso por ID:', err.message);
                return callback(err);
            }
            callback(null, result[0]);
        });
    }

    // Método para atualizar um curso pelo ID
    static update(id, data, callback) {
        const query = `
            UPDATE curso
            SET nome = ?, numCredito = ?
            WHERE idCurso = ?
        `;

        const values = [data.nome, data.numCredito, id];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar curso:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para deletar um curso pelo ID
    static delete(id, callback) {
        const query = `
            DELETE FROM curso WHERE idCurso = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao deletar curso:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

  
    

}

export default CursoModel;