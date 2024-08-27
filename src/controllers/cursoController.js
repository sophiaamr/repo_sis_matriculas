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
                return response.status(400).render('index', {
                    message: "Revise as informações fornecidas."
                });
            }

            CursoModel.create({ nome, numCredito }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar curso:', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao criar curso.'
                    });
                }
                return response.status(201).render('index', {
                    message: "Curso criado com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar curso:', error.message);
            return response.status(500).render('index', {
                message: "Erro interno do servidor"
            });
        }
    }

    async getAll(request, response) {
        try {
            CursoModel.getAll((err, cursos) => {
                if (err) {
                    console.error('Erro ao buscar cursos:', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao buscar cursos.'
                    });
                }
                return response.status(200).render('index', { cursos });
            });
        } catch (error) {
            console.error('Erro ao buscar cursos:', error.message);
            return response.status(500).render('index', {
                message: "Erro interno do servidor"
            });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            CursoModel.getById(id, (err, curso) => {
                if (err) {
                    console.error('Erro ao buscar curso:', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao buscar curso.'
                    });
                }
                if (!curso) {
                    return response.status(404).render('index', {
                        message: 'Curso não encontrado.'
                    });
                }
                return response.status(200).render('index', { curso });
            });
        } catch (error) {
            console.error('Erro ao buscar curso:', error.message);
            return response.status(500).render('index', {
                message: "Erro interno do servidor"
            });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { nome, numCredito } = request.body;

        try {
            CursoModel.update(id, { nome, numCredito }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar curso:', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao atualizar curso.'
                    });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('index', {
                        message: 'Curso não encontrado.'
                    });
                }
                return response.status(200).render('index', {
                    message: "Curso atualizado com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar curso:', error.message);
            return response.status(500).render('index', {
                message: "Erro interno do servidor"
            });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            CursoModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar curso:', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao deletar curso.'
                    });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('index', {
                        message: 'Curso não encontrado.'
                    });
                }
                return response.status(200).render('index', {
                    message: "Curso deletado com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar curso:', error.message);
            return response.status(500).render('index', {
                message: "Erro interno do servidor"
            });
        }
    }
}
