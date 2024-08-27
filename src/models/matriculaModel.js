import { connection } from '../db/connection.js';

class MatriculaModel {
    // Método para criar uma nova matrícula
    static create(data, callback) {
        const queryMatricula = `
            INSERT INTO Matricula (status, idAluno, idCurso, periodo)
            VALUES (?, ?, ?, ?)
        `;

        const valuesMatricula = [
            data.status,
            data.idAluno,
            data.idCurso,
            data.periodo
        ];

        connection.query(queryMatricula, valuesMatricula, (err, result) => {
            if (err) {
                console.error('Erro ao criar matrícula:', err.message);
                return callback(err);
            }

            const idMatricula = result.insertId;

            // Inserir disciplinas obrigatórias
            const queryObrigatorias = `
                INSERT INTO MatriculaDisciplinaObrigatoria (idMatricula, idDisciplina)
                VALUES ?
            `;

            const valoresObrigatorias = data.disciplinasObrigatorias.map(disciplina => [idMatricula, disciplina]);

            connection.query(queryObrigatorias, [valoresObrigatorias], (err) => {
                if (err) {
                    console.error('Erro ao associar disciplinas obrigatórias:', err.message);
                    return callback(err);
                }

                // Inserir disciplinas optativas
                const queryOptativas = `
                    INSERT INTO MatriculaDisciplinaOptativa (idMatricula, idDisciplina)
                    VALUES ?
                `;

                const valoresOptativas = data.disciplinasOptativas.map(disciplina => [idMatricula, disciplina]);

                connection.query(queryOptativas, [valoresOptativas], (err) => {
                    if (err) {
                        console.error('Erro ao associar disciplinas optativas:', err.message);
                        return callback(err);
                    }

                    callback(null, result);
                });
            });
        });
    }

    // Método para buscar todas as matrículas
    static getAll(callback) {
        const query = `
            SELECT * FROM Matricula
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
            SELECT * FROM Matricula WHERE idMatricula = ?
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
            UPDATE Matricula
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
            DELETE FROM Matricula WHERE idMatricula = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao deletar matrícula:', err.message);
                return callback(err);
            }
            callback(null, result);
        });
    }
    static getMatriculaByAlunoAndPeriodo(idAluno, periodo) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT m.idMatricula, c.nome AS nomeCurso, m.periodo 
                FROM Matricula m
                JOIN Curso c ON m.idCurso = c.idCurso
                WHERE m.idAluno = ? AND m.periodo = ?
            `;
            db.query(query, [idAluno, periodo], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }

    static getDisciplinasObrigatorias(idMatricula) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT d.nomeDisciplina, d.tipo 
                FROM MatriculaDisciplinaObrigatoria mo
                JOIN Disciplina d ON mo.idDisciplina = d.idDisciplina
                WHERE mo.idMatricula = ?
            `;
            db.query(query, [idMatricula], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static getDisciplinasOptativas(idMatricula) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT d.nomeDisciplina, d.tipo 
                FROM MatriculaDisciplinaOptativa mo
                JOIN Disciplina d ON mo.idDisciplina = d.idDisciplina
                WHERE mo.idMatricula = ?
            `;
            db.query(query, [idMatricula], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

export default MatriculaModel;
