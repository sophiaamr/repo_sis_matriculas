
import DisciplinaModel from '../models/disciplinaModel.js';


class DisciplinaController {
    // Método para criar uma nova disciplina
    async create(req, res) {
        try {
            const data = req.body;
            DisciplinaModel.create(data, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao criar disciplina' });
                }
                res.status(201).json({ message: 'Disciplina criada com sucesso', result });
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // Método para obter todas as disciplinas
    async getAll(request, response) {
        try {
            const disciplinas = await new Promise((resolve, reject) => {
                DisciplinaModel.getAll((err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
    
            return response.status(200).render('matricula', { disciplinas });
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error.message);
            return response.status(500).render('matricula', {
                message: "Erro interno do servidor"
            });
        }
    }
    
    
    

    // Método para obter uma disciplina pelo ID
    async getById(req, res) {
        const id = req.params.id;
        try {
            DisciplinaModel.getById(id, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao buscar disciplina' });
                }
                if (!result) {
                    return res.status(404).json({ error: 'Disciplina não encontrada' });
                }
                res.status(200).json(result);
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // Método para atualizar uma disciplina pelo ID
    async update(req, res) {
        const id = req.params.id;
        const data = req.body;
        try {
            DisciplinaModel.update(id, data, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao atualizar disciplina' });
                }
                res.status(200).json({ message: 'Disciplina atualizada com sucesso', result });
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // Método para deletar uma disciplina pelo ID
    async delete(req, res) {
        const id = req.params.id;
        try {
            DisciplinaModel.delete(id, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao deletar disciplina' });
                }
                res.status(200).json({ message: 'Disciplina deletada com sucesso' });
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    
    
}

export { DisciplinaController };
