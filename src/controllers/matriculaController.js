import MatriculaModel from '../models/matriculaModel.js';
import autoBind from 'auto-bind';

export class MatriculaController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { status } = request.body;

            if (!status) {
                return response.status(400).render('index', { message: "Revise as informações fornecidas." });
            }

            const validStatus = ['ATIVA', 'ENCERRADA'];
            if (!validStatus.includes(status)) {
                return response.status(400).render('index', { message: "Status inválido." });
            }

            MatriculaModel.create({ status }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar matrícula:', err.message);
                    return response.status(500).render('index', { message: 'Erro ao criar matrícula.' });
                }
                return response.status(201).render('index', {
                    success: true,
                    message: "Matrícula criada com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar matrícula:', error.message);
            return response.status(500).render('index', { message: "Erro interno do servidor" });
        }
    }

    async getAll(request, response) {
        try {
            MatriculaModel.getAll((err, matriculas) => {
                if (err) {
                    console.error('Erro ao buscar matrículas:', err.message);
                    return response.status(500).render('index', { message: 'Erro ao buscar matrículas.' });
                }
                return response.status(200).render('index', { matriculas });
            });
        } catch (error) {
            console.error('Erro ao buscar matrículas:', error.message);
            return response.status(500).render('index', { message: "Erro interno do servidor" });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            MatriculaModel.getById(id, (err, matricula) => {
                if (err) {
                    console.error('Erro ao buscar matrícula:', err.message);
                    return response.status(500).render('index', { message: 'Erro ao buscar matrícula.' });
                }
                if (!matricula) {
                    return response.status(404).render('index', { message: 'Matrícula não encontrada.' });
                }
                return response.status(200).render('index', { matricula });
            });
        } catch (error) {
            console.error('Erro ao buscar matrícula:', error.message);
            return response.status(500).render('index', { message: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { status } = request.body;

        try {
            // Verifica se status é um valor válido do Enum
            const validStatuses = ['ATIVA', 'ENCERRADA'];
            if (status && !validStatuses.includes(status)) {
                return response.status(400).render('index', { message: "Status inválido." });
            }

            MatriculaModel.update(id, { status }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar matrícula:', err.message);
                    return response.status(500).render('index', { message: 'Erro ao atualizar matrícula.' });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('index', { message: 'Matrícula não encontrada.' });
                }
                return response.status(200).render('index', {
                    success: true,
                    message: "Matrícula atualizada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar matrícula:', error.message);
            return response.status(500).render('index', { message: "Erro interno do servidor" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            MatriculaModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar matrícula:', err.message);
                    return response.status(500).render('index', { message: 'Erro ao deletar matrícula.' });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('index', { message: 'Matrícula não encontrada.' });
                }
                return response.status(200).render('index', {
                    success: true,
                    message: "Matrícula deletada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar matrícula:', error.message);
            return response.status(500).render('index', { message: "Erro interno do servidor" });
        }
    }
}
