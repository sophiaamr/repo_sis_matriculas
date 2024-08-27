import DisciplinaModel from '../models/disciplinaModel.js';
import autoBind from 'auto-bind';

export class DisciplinaController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { nomeDisciplina, status, qtdAluno } = request.body;

            if (!nomeDisciplina || !status || qtdAluno === undefined) {
                return response.status(400).render('index', {
                    message: "Revise as informações fornecidas"
                });
            }

            const validStatus = ['ATIVO', 'CANCELADO', 'ENCERRADO'];
            if (!validStatus.includes(status)) {
                return response.status(400).render('index', {
                    message: "Status inválido"
                });
            }

            DisciplinaModel.create({ nomeDisciplina, status, qtdAluno }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar disciplina: ', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao criar disciplina'
                    });
                }
                return response.status(201).render('index', {
                    message: 'Disciplina criada com sucesso',
                    result
                });
            });
        } catch (error) {
            console.error('Erro ao criar disciplina: ', error.message);
            return response.status(500).render('index', {
                message: 'Erro interno do servidor'
            });
        }
    }

    async getAll(request, response) {
        try {
            DisciplinaModel.getAll((err, disciplinas) => {
                if (err) {
                    console.error('Erro ao buscar disciplinas: ', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao buscar disciplinas.'
                    });
                }
                return response.status(200).render('index', { disciplinas });
            });
        } catch (error) {
            console.error('Erro ao buscar disciplinas: ', error.message);
            return response.status(500).render('index', {
                message: 'Erro interno do servidor'
            });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            DisciplinaModel.getById(id, (err, disciplina) => {
                if (err) {
                    console.error('Erro ao buscar disciplina:', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao buscar disciplina.'
                    });
                }
                if (!disciplina) {
                    return response.status(404).render('index', {
                        message: 'Disciplina não encontrada.'
                    });
                }
                return response.status(200).render('index', { disciplina });
            });
        } catch (error) {
            console.error('Erro ao buscar disciplina:', error.message);
            return response.status(500).render('index', {
                message: 'Erro interno do servidor'
            });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { nomeDisciplina, status, qtdAluno } = request.body;

        try {
            const validStatus = ['ATIVO', 'ENCERRADO', 'CANCELADO'];
            if (status && !validStatus.includes(status)) {
                return response.status(400).render('index', {
                    message: "Status inválido."
                });
            }

            DisciplinaModel.update(id, { nomeDisciplina, status, qtdAluno }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar disciplina:', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao atualizar disciplina.'
                    });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('index', {
                        message: 'Disciplina não encontrada.'
                    });
                }
                return response.status(200).render('index', {
                    message: "Disciplina atualizada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar disciplina:', error.message);
            return response.status(500).render('index', {
                message: "Erro interno do servidor"
            });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            DisciplinaModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar disciplina:', err.message);
                    return response.status(500).render('index', {
                        message: 'Erro ao deletar disciplina.'
                    });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('index', {
                        message: 'Disciplina não encontrada.'
                    });
                }
                return response.status(200).render('index', {
                    message: "Disciplina deletada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar disciplina:', error.message);
            return response.status(500).render('index', {
                message: "Erro interno do servidor"
            });
        }
    }
}
