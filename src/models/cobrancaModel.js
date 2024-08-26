import connection from '../database/connection.js';

class CobrancaModel {
    // Método para criar uma nova cobrança
    static create(data, callback) {
        const query = `
            INSERT INTO cobranca (status, juros, dataInicio, dataFim)
            VALUES (?, ?, ?, ?)
        `;

        const values = [data.status, data.juros, data.dataInicio, data.dataFim];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao criar cobrança:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para buscar todas as cobranças
    static getAll(callback) {
        const query = `
            SELECT * FROM cobranca
        `;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar cobranças:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }

    // Método para buscar uma cobrança pelo ID
    static getById(id, callback) {
        const query = `
            SELECT * FROM cobranca WHERE idCobranca = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar cobrança por ID:', err.message);
                return callback(err);
            }
            callback(null, result[0]);
        });
    }

    // Método para atualizar uma cobrança pelo ID
    static update(id, data, callback) {
        const query = `
            UPDATE cobranca
            SET status = ?, juros = ?, dataInicio = ?, dataFim = ?
            WHERE idCobranca = ?
        `;

        const values = [data.status, data.juros, data.dataInicio, data.dataFim, id];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar cobrança:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }

    // Método para deletar uma cobrança pelo ID
    static delete(id, callback) {
        const query = `
            DELETE FROM cobranca WHERE idCobranca = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao deletar cobrança:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }
}

export default CobrancaModel;
