import { connection } from '../db/connection.js';

class DisciplinaModel {
    // Método para criar uma nova disciplina
    static create(data, callback) {
        const query = `
            INSERT INTO disciplina (nomeDisciplina, valor, status, qntdAluno, idCurso, periodo, numCredito)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [data.nomeDisciplina, data.valor, data.status, data.qntdAluno, data.idCurso, data.periodo, data.numCredito];

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
        SELECT disciplina.*, curso.nome AS nomeCurso 
        FROM disciplina 
        JOIN curso ON disciplina.idCurso = curso.idCurso
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
    static delete(idDisciplina, callback) {
        const query = 'DELETE FROM disciplina WHERE idDisciplina = ?';

        connection.query(query, [idDisciplina], (err, result) => {
            if (err) {
                console.error('Erro ao deletar disciplina:', err.message);
                return callback(err);
            }
            if(result.affectedRows === 0) { 
                return callback(new Error('Disciplina não encontrada'));
            }
            callback(null, result);
        });
    }


    static getDisciplinasByCurso(cursoId, callback) {
        const query = `
             SELECT c.nome, d.periodo, d.nomeDisciplina, d.valor, d.status, d.qntdAluno, d.numCredito
        FROM disciplina d
        JOIN curso c ON d.idCurso = c.idCurso
        WHERE d.idCurso = ?
        ORDER BY d.periodo ASC
        `;

        connection.query(query, [cursoId], (err, results) => {
            if (err) {
                console.error('Erro ao buscar disciplinas por curso:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }


    static getDisciplinasByAluno(idAluno, callback) {
        const query = `
            SELECT 
                d.nomeDisciplina, 
                d.valor, 
                d.status, 
                d.idDisciplina
            FROM 
                Disciplina d
            JOIN 
                Curso c ON d.idCurso = c.idCurso
            JOIN 
                Aluno a ON a.idCurso = c.idCurso
            WHERE 
                a.idAluno = ?;  
        `;
    
        connection.query(query, [idAluno], (err, results) => {
            if (err) {
                console.error('Erro ao buscar disciplinas por aluno:', err.message);
                return callback(err);
            }
            callback(null, results);
        });
    }
    
}




export default DisciplinaModel;
