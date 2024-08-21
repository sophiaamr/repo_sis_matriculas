import MatriculaModel from '../models/matriculaModel.js'; // Import default
import autoBind from 'auto-bind';

export class MatriculaController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { status } = request.body;

            if (!status) {
                return response.status(400).send("Revise as informações fornecidas.");
            }

            // Verifica se status é um valor válido do Enum
            const validStatus = ['ATIVA', 'ENCERRADA'];
            if (!validStatus.includes(status)) {
                return response.status(400).send("Status inválido.");
            }

            MatriculaModel.create({ status }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar matrícula:', err.message);
                    return response.status(500).send('Erro ao criar matrícula.');
                }
                return response.status(201).json({
                    success: true,
                    message: "Matrícula criada com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar matrícula:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getAll(request, response) {
        try {
            MatriculaModel.getAll((err, matriculas) => {
                if (err) {
                    console.error('Erro ao buscar matrículas:', err.message);
                    return response.status(500).send('Erro ao buscar matrículas.');
                }
                return response.status(200).json(matriculas);
            });
        } catch (error) {
            console.error('Erro ao buscar matrículas:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            MatriculaModel.getById(id, (err, matricula) => {
                if (err) {
                    console.error('Erro ao buscar matrícula:', err.message);
                    return response.status(500).send('Erro ao buscar matrícula.');
                }
                if (!matricula) {
                    return response.status(404).send('Matrícula não encontrada.');
                }
                return response.status(200).json(matricula);
            });
        } catch (error) {
            console.error('Erro ao buscar matrícula:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { status } = request.body;

        try {
            // Verifica se status é um valor válido do Enum
            const validStatuses = ['ATIVA', 'CANCELADA', 'PENDENTE'];
            if (status && !validStatuses.includes(status)) {
                return response.status(400).send("Status inválido.");
            }

            MatriculaModel.update(id, { status }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar matrícula:', err.message);
                    return response.status(500).send('Erro ao atualizar matrícula.');
                }
                if (result.affectedRows === 0) {
                    return response.status(404).send('Matrícula não encontrada.');
                }
                return response.status(200).json({
                    success: true,
                    message: "Matrícula atualizada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar matrícula:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            MatriculaModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar matrícula:', err.message);
                    return response.status(500).send('Erro ao deletar matrícula.');
                }
                if (result.affectedRows === 0) {
                    return response.status(404).send('Matrícula não encontrada.');
                }
                return response.status(200).json({
                    success: true,
                    message: "Matrícula deletada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar matrícula:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
