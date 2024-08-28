import DisciplinaModel from '../models/disciplinaModel.js'; // Certifique-se de que o caminho está correto

class DisciplinaController {
    // Método para criar uma nova disciplina
    async create(req, res) {
        try {
            const data = req.body;
            await DisciplinaModel.create(data, (err, result) => {
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
    async getAll(req, res) {
        try {
            await DisciplinaModel.getAll((err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao buscar disciplinas' });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // Método para obter uma disciplina pelo ID
    async getById(req, res) {
        const id = req.params.id;
        try {
            await DisciplinaModel.getById(id, (err, result) => {
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
            await DisciplinaModel.update(id, data, (err, result) => {
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
            await DisciplinaModel.delete(id, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao deletar disciplina' });
                }
                res.status(200).json({ message: 'Disciplina deletada com sucesso' });
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // Método para obter disciplinas por curso e período
    async getDisciplinasByCursoAndPeriodo(req, res) {
        const { cursoId, periodo } = req.query;
        try {
            const disciplinas = await DisciplinaModel.getByCursoAndPeriodo(cursoId, periodo, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao buscar disciplinas' });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export { DisciplinaController };
