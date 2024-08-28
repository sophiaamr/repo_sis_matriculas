import DisciplinaModel from '../models/disciplinaModel.js';
import autoBind from 'auto-bind';

export class DisciplinaController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { nomeDisciplina, status, tipo, qtdAluno, idCurso, valor } = request.body;

            if (!nomeDisciplina || !status || !tipo || qtdAluno === undefined || !idCurso || valor === undefined) {
                return response.status(400).render('disciplinas', {
                    message: "Revise as informações fornecidas"
                });
            }

            const validStatus = ['ativa', 'inativa'];
            if (!validStatus.includes(status)) {
                return response.status(400).render('disciplinas', {
                    message: "Status inválido"
                });
            }

            const validTipo = ['obrigatoria', 'optativa'];
            if (!validTipo.includes(tipo)) {
                return response.status(400).render('disciplinas', {
                    message: "Tipo inválido"
                });
            }

            DisciplinaModel.create({ nomeDisciplina, status, tipo, qtdAluno, idCurso, valor }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar disciplina: ', err.message);
                    return response.status(500).render('disciplinas', {
                        message: 'Erro ao criar disciplina'
                    });
                }
                return response.status(201).render('Professor/disciplinas', {
                    message: 'Disciplina criada com sucesso',
                    result
                });
            });
        } catch (error) {
            console.error('Erro ao criar disciplina: ', error.message);
            return response.status(500).render('disciplinas', {
                message: 'Erro interno do servidor'
            });
        }
    }

    async getAll(request, response) {
        try {
            DisciplinaModel.getAll((err, disciplinas) => {
                if (err) {
                    console.error('Erro ao buscar disciplinas: ', err.message);
                    return response.status(500).render('disciplinas', {
                        message: 'Erro ao buscar disciplinas.'
                    });
                }
                console.log(disciplinas)
                return response.status(200).render('Professor/disciplinas', { disciplinas });
            });
        } catch (error) {
            console.error('Erro ao buscar disciplinas: ', error.message);
            return response.status(500).render('disciplinas', {
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
                    return response.status(500).render('disciplinas', {
                        message: 'Erro ao buscar disciplina.'
                    });
                }
                if (!disciplina) {
                    return response.status(404).render('disciplinas', {
                        message: 'Disciplina não encontrada.'
                    });
                }
                return response.status(200).render('disciplinas', { disciplina });
            });
        } catch (error) {
            console.error('Erro ao buscar disciplina:', error.message);
            return response.status(500).render('disciplinas', {
                message: 'Erro interno do servidor'
            });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { nomeDisciplina, status, tipo, qtdAluno, idCurso, valor } = request.body;

        try {
            const validStatus = ['ativa', 'inativa'];
            if (status && !validStatus.includes(status)) {
                return response.status(400).render('disciplinas', {
                    message: "Status inválido."
                });
            }

            const validTipo = ['obrigatoria', 'optativa'];
            if (tipo && !validTipo.includes(tipo)) {
                return response.status(400).render('disciplinas', {
                    message: "Tipo inválido."
                });
            }

            DisciplinaModel.update(id, { nomeDisciplina, status, tipo, qtdAluno, idCurso, valor }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar disciplina:', err.message);
                    return response.status(500).render('disciplinas', {
                        message: 'Erro ao atualizar disciplina.'
                    });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('disciplinas', {
                        message: 'Disciplina não encontrada.'
                    });
                }
                return response.status(200).render('disciplinas', {
                    message: "Disciplina atualizada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar disciplina:', error.message);
            return response.status(500).render('disciplinas', {
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
                    return response.status(500).render('disciplinas', {
                        message: 'Erro ao deletar disciplina.'
                    });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('disciplinas', {
                        message: 'Disciplina não encontrada.'
                    });
                }
                return response.status(200).render('disciplinas', {
                    message: "Disciplina deletada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar disciplina:', error.message);
            return response.status(500).render('disciplinas', {
                message: "Erro interno do servidor"
            });
        }
    }
}