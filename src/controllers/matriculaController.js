import MatriculaModel from '../models/matriculaModel.js';
import CursoModel from '../models/cursoModel.js'; 
import AlunoModel from '../models/alunoModel.js';
import DisciplinaModel from '../models/disciplinaModel.js';
import autoBind from 'auto-bind';

export class MatriculaController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { numeroMatricula, idCurso, periodo, disciplinasObrigatorias, disciplinasOptativas } = request.body;

            // Verificação dos campos
            if (!numeroMatricula || !idCurso || !periodo || !disciplinasObrigatorias || !disciplinasOptativas) {
                return response.status(400).json({ message: "Revise as informações fornecidas." });
            }

            // Verificar o aluno com base no número de matrícula
            const alunoResult = await AlunoModel.getByMatricula(numeroMatricula);
            if (!alunoResult) {
                return response.status(404).json({ message: "Número de matrícula não encontrado." });
            }

            const idAluno = alunoResult.idAluno;

            // Verificação dos campos adicionais
            const validStatus = ['ativa', 'cancelada', 'encerrada'];
            if (!validStatus.includes('ativa')) { // Status fixo como 'ativa' no momento da criação
                return response.status(400).json({ message: "Status inválido." });
            }

            // Validar disciplinas obrigatórias e optativas
            if (disciplinasObrigatorias.length !== 4) {
                return response.status(400).json({ message: "Você deve selecionar exatamente 4 disciplinas obrigatórias." });
            }
            if (disciplinasOptativas.length !== 2) {
                return response.status(400).json({ message: "Você deve selecionar exatamente 2 disciplinas optativas." });
            }

            const data = {
                status: 'ativa', // Status fixo como 'ativa'
                idAluno,
                idCurso,
                periodo
            };

            // Instanciar o modelo antes de criar a matrícula
            const matriculaModel = new MatriculaModel();
            matriculaModel.create(data, (err, result) => {
                if (err) {
                    console.error('Erro ao criar matrícula:', err.message);
                    return response.status(500).json({ message: 'Erro ao criar matrícula.' });
                }
                return response.status(201).json({
                    success: true,
                    message: "Matrícula criada com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar matrícula:', error.message);
            return response.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getAll(request, response) {
        try {
            MatriculaModel.getAll((err, matriculas) => {
                if (err) {
                    console.error('Erro ao buscar matrículas:', err.message);
                    return response.status(500).render('matricula', { message: 'Erro ao buscar matrículas.' });
                }

                CursoModel.getAll((err, cursos) => {
                    if (err) {
                        console.error('Erro ao buscar cursos:', err.message);
                        return response.status(500).render('matricula', { message: 'Erro ao buscar cursos.' });
                    }

                    // Fetching disciplinas to pass to the template
                    DisciplinaModel.getAll((err, disciplinas) => {
                        if (err) {
                            console.error('Erro ao buscar disciplinas:', err.message);
                            return response.status(500).render('matricula', { message: 'Erro ao buscar disciplinas.' });
                        }

                        // Pass all required data to the EJS template
                        return response.status(200).render('matricula', { matriculas, cursos, disciplinas });
                    });
                });
            });
        } catch (error) {
            console.error('Erro ao buscar matrículas:', error.message);
            return response.status(500).render('matricula', { message: "Erro interno do servidor" });
        }
    }

    async getById(request, response) {
        const { id } = request.params;
    
        try {
            MatriculaModel.getById(id, (err, matricula) => {
                if (err) {
                    console.error('Erro ao buscar matrícula:', err.message);
                    return response.status(500).render('matricula', { message: 'Erro ao buscar matrícula.' });
                }
                if (!matricula) {
                    return response.status(404).render('matricula', { message: 'Matrícula não encontrada.' });
                }
    
                CursoModel.getAll((err, cursos) => {
                    if (err) {
                        console.error('Erro ao buscar cursos:', err.message);
                        return response.status(500).render('matricula', { message: 'Erro ao buscar cursos.' });
                    }
    
                    DisciplinaModel.getAll((err, disciplinas) => {
                        if (err) {
                            console.error('Erro ao buscar disciplinas:', err.message);
                            return response.status(500).render('matricula', { message: 'Erro ao buscar disciplinas.' });
                        }
    
                        return response.status(200).render('matricula', { matricula, cursos, disciplinas });
                    });
                });
            });
        } catch (error) {
            console.error('Erro ao buscar matrícula:', error.message);
            return response.status(500).render('matricula', { message: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { status } = request.body;

        try {
            // Verifica se status é um valor válido do Enum
            const validStatuses = ['ativa', 'encerrada'];
            if (status && !validStatuses.includes(status)) {
                return response.status(400).render('matricula', { message: "Status inválido." });
            }

            MatriculaModel.update(id, { status }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar matrícula:', err.message);
                    return response.status(500).render('matricula', { message: 'Erro ao atualizar matrícula.' });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('matricula', { message: 'Matrícula não encontrada.' });
                }
                return response.status(200).render('matricula', {
                    success: true,
                    message: "Matrícula atualizada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar matrícula:', error.message);
            return response.status(500).render('matricula', { message: "Erro interno do servidor" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            MatriculaModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar matrícula:', err.message);
                    return response.status(500).render('matricula', { message: 'Erro ao deletar matrícula.' });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('matricula', { message: 'Matrícula não encontrada.' });
                }
                return response.status(200).render('matricula', {
                    success: true,
                    message: "Matrícula deletada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar matrícula:', error.message);
            return response.status(500).render('matricula', { message: "Erro interno do servidor" });
        }
    }
}
