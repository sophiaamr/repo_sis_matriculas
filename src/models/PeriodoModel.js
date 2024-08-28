// src/models/periodoModel.js
import { connection } from '../db/connection.js';

class PeriodoModel {
    static getPeriodosByCurso(idCurso, callback) {
        const query = `
            SELECT DISTINCT periodo
            FROM Disciplina
            WHERE idCurso = ?
        `;

        connection.query(query, [idCurso], (err, results) => {
            if (err) {
                console.error('Erro ao buscar períodos:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }
}

export default PeriodoModel;
