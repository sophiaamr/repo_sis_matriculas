import CursoModel from '../models/cursoModel.js'; // Import default
import autoBind from 'auto-bind';

export class CursoController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { nome, numCredito } = request.body;

            if (!nome || numCredito === undefined) {
                return response.status(400).send("Revise as informações fornecidas.");
            }

            CursoModel.create({ nome, numCredito }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar curso:', err.message);
                    return response.status(500).send('Erro ao criar curso.');
                }
                return response.status(201).json({
                    success: true,
                    message: "Curso criado com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar curso:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getAll(request, response) {
        try {
            CursoModel.getAll((err, cursos) => {
                if (err) {
                    console.error('Erro ao buscar cursos:', err.message);
                    return response.status(500).send('Erro ao buscar cursos.');
                }
                return response.status(200).json(cursos);
            });
        } catch (error) {
            console.error('Erro ao buscar cursos:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            CursoModel.getById(id, (err, curso) => {
                if (err) {
                    console.error('Erro ao buscar curso:', err.message);
                    return response.status(500).send('Erro ao buscar curso.');
                }
                if (!curso) {
                    return response.status(404).send('Curso não encontrado.');
                }
                return response.status(200).json(curso);
            });
        } catch (error) {
            console.error('Erro ao buscar curso:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { nome, numCredito } = request.body;

        try {
            CursoModel.update(id, { nome, numCredito }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar curso:', err.message);
                    return response.status(500).send('Erro ao atualizar curso.');
                }
                if (result.affectedRows === 0) {
                    return response.status(404).send('Curso não encontrado.');
                }
                return response.status(200).json({
                    success: true,
                    message: "Curso atualizado com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar curso:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            CursoModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar curso:', err.message);
                    return response.status(500).send('Erro ao deletar curso.');
                }
                if (result.affectedRows === 0) {
                    return response.status(404).send('Curso não encontrado.');
                }
                return response.status(200).json({
                    success: true,
                    message: "Curso deletado com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar curso:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
