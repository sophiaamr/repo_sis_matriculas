import CursoModel from '../models/cursoModel.js';
import autoBind from 'auto-bind';
import DisciplinaModel from '../models/disciplinaModel.js';

export class CursoController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { nome, numCredito } = request.body;

            if (!nome || numCredito === undefined) {
                return response.status(400).render('curso', {
                    message: "Revise as informações fornecidas."
                });
            } 

            CursoModel.create({ nome, numCredito }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar curso:', err.message);
                    return response.status(500).render('curso', {
                        message: 'Erro ao criar curso.'
                    });
                }
                return response.status(201).render('curso', {
                    message: "Curso criado com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar curso:', error.message);
            return response.status(500).render('curso', {
                message: "Erro interno do servidor"
            });
        }
    }

    async getAll(request, response) {
        try {
            const cursos = await new Promise((resolve, reject) => {
                CursoModel.getAll((err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            const disciplinas = await new Promise((resolve, reject) => {
                DisciplinaModel.getAll((err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            console.log(cursos)
            return response.status(200).render('curso', { cursos, disciplinas });
        } catch (error) {
            console.error('Erro ao buscar cursos e disciplinas:', error.message);
            return response.status(500).render('curso', {
                message: "Erro interno do servidor"
            });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            const curso = await new Promise((resolve, reject) => {
                CursoModel.getById(id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            if (!curso) {
                return response.status(404).render('curso', {
                    message: 'Curso não encontrado.'
                });
            }

            return response.status(200).render('curso', { curso });
        } catch (error) {
            console.error('Erro ao buscar curso:', error.message);
            return response.status(500).render('curso', {
                message: "Erro interno do servidor"
            });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { nome, numCredito } = request.body;

        try {
            const result = await new Promise((resolve, reject) => {
                CursoModel.update(id, { nome, numCredito }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            if (result.affectedRows === 0) {
                return response.status(404).render('curso', {
                    message: 'Curso não encontrado.'
                });
            }

            return response.status(200).render('curso', {
                message: "Curso atualizado com sucesso"
            });
        } catch (error) {
            console.error('Erro ao atualizar curso:', error.message);
            return response.status(500).render('curso', {
                message: "Erro interno do servidor"
            });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            const result = await new Promise((resolve, reject) => {
                CursoModel.delete(id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            if (result.affectedRows === 0) {
                return response.status(404).render('curso', {
                    message: 'Curso não encontrado.'
                });
            }

            return response.status(200).render('curso', {
                message: "Curso deletado com sucesso"
            });
        } catch (error) {
            console.error('Erro ao deletar curso:', error.message);
            return response.status(500).render('curso', {
                message: "Erro interno do servidor"
            });
        }
    }

    async getDisciplinasByCurso(request, response) {
        try {
            const { idCurso } = request.params;
 
            // Buscar o curso pelo ID
            const curso = await new Promise((resolve, reject) => {
                CursoModel.getById(idCurso, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
 
            // Buscar disciplinas do curso
            const disciplinas = await new Promise((resolve, reject) => {
                DisciplinaModel.getByCurso(idCurso, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
 
            // Renderizar a view com os dados
            response.status(200).render('curso', { curso, disciplinas });
        } catch (error) {
            console.error('Erro ao listar disciplinas:', error.message);
            response.status(500).render('curso', {
                message: "Erro interno do servidor"
            });
        }
    }

    async getPeriodos(req, res) {
        const { id } = req.params;
        try {
            const curso = await db.query('SELECT periodo FROM curso WHERE idCurso = ?', [id]);
            if (curso.length > 0) {
                res.json({ periodo: curso[0].periodo });
            } else {
                res.status(404).json({ message: 'Curso não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar curso', error });
        }
    }

    async getDisciplinasByCursoAndPeriodo(req, res) {
        const { cursoId, periodo } = req.query;
        try {
            const disciplinas = await new Promise((resolve, reject) => {
                DisciplinaModel.getByCursoAndPeriodo(cursoId, periodo, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            res.json(disciplinas);
        } catch (error) {
            console.error('Erro ao listar disciplinas:', error.message);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    
}
