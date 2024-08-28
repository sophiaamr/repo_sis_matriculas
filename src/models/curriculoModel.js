import { connection } from '../db/connection.js';

class CurriculoModel {
    // Método para criar um novo currículo
    static create(data, callback) {
        const query = `
            INSERT INTO Curriculo (idCurso, idPeriodo, idDisciplina, idProfessor) VALUES (?, ?, ?, ?)
        `;
        const values = [data.idCurso, data.idPeriodo, data.idDisciplina, data.idProfessor]; // Corrigido aqui

        connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao criar currículo:', err.message);
                return callback(err);
            }
            callback(null, { idCurriculo: result.insertId });
        });
    }

    // Método para buscar todos os currículos
    static getAll(callback) {
        const query = `
            SELECT 
                Curso.nome AS nomeCurso,
                Periodo.numero AS periodoNumero,
                Disciplina.nome AS nomeDisciplina,
                Professor.nome AS nomeProfessor
            FROM Curriculo
            INNER JOIN Curso ON Curriculo.idCurso = Curso.idCurso
            INNER JOIN Periodo ON Curriculo.idPeriodo = Periodo.idPeriodo
            INNER JOIN Disciplina ON Curriculo.idDisciplina = Disciplina.idDisciplina
            INNER JOIN Professor ON Curriculo.idProfessor = Professor.idProfessor
            ORDER BY Curso.nome, Periodo.numero, Disciplina.nome;
        `;
    
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Erro ao buscar currículos:', err.message);
                return callback(err);
            }
    
            // Processar os resultados
            const curriculos = {};
            
            results.forEach(row => {
                const cursoNome = row.nomeCurso;
                const periodoNumero = row.periodoNumero;
                
                if (!curriculos[cursoNome]) {
                    curriculos[cursoNome] = { periodos: {} };
                }
    
                if (!curriculos[cursoNome].periodos[periodoNumero]) {
                    curriculos[cursoNome].periodos[periodoNumero] = { disciplinas: [] };
                }
    
                curriculos[cursoNome].periodos[periodoNumero].disciplinas.push({
                    nome: row.nomeDisciplina,
                    professor: row.nomeProfessor
                });
            });
    
            // Converter o objeto para um array de cursos
            const curriculosArray = Object.keys(curriculos).map(cursoNome => {
                return {
                    nome: cursoNome,
                    periodos: Object.keys(curriculos[cursoNome].periodos).map(periodoNumero => ({
                        numero: periodoNumero,
                        disciplinas: curriculos[cursoNome].periodos[periodoNumero].disciplinas
                    }))
                };
            });
    
            callback(null, curriculosArray);
        });
    }

    // Método para buscar um currículo pelo ID
    static getById(id, callback) {
        const query = `
            SELECT * FROM Curriculo WHERE idCurriculo = ?
        `;

        connection.query(query, [id], (err, result) => {
            if (err) {
                console.error('Erro ao buscar currículo por ID:', err.message);
                return callback(err);
            }
            callback(null, result[0]);
        });
    }

    // Método para atualizar um currículo
    static update(id, data, callback) {
        const queryUpdateCurriculo = `
            UPDATE Curriculo
            SET idCurso = ?, idDisciplina = ?, idProfessor = ?, idPeriodo = ?
            WHERE idCurriculo = ?
        `;
        const valuesUpdateCurriculo = [
            data.idCurso,
            data.idDisciplina,
            data.idProfessor,
            data.idPeriodo,
            id
        ];

        connection.query(queryUpdateCurriculo, valuesUpdateCurriculo, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar currículo:', err.message);
                return callback(err);
            }
            if (result.affectedRows === 0) {
                return callback(new Error('Currículo não encontrado.'));
            }
            callback(null, { message: 'Currículo atualizado com sucesso.' });
        });
    }

    // Método para deletar um currículo
    static delete(id, callback) {
        const queryDeleteCurriculo = `
            DELETE FROM Curriculo
            WHERE idCurriculo = ?
        `;
        const valuesDeleteCurriculo = [id];

        connection.query(queryDeleteCurriculo, valuesDeleteCurriculo, (err, result) => {
            if (err) {
                console.error('Erro ao deletar currículo:', err.message);
                return callback(err);
            }
            if (result.affectedRows === 0) {
                return callback(new Error('Currículo não encontrado.'));
            }
            callback(null, { message: 'Currículo deletado com sucesso.' });
        });
    }
}

export default CurriculoModel;
