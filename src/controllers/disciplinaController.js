import DisciplinaModel from '../models/disciplinaModel.js';
import AlunoModel from '../models/alunoModel.js';

class DisciplinaController {

    // Método para exibir o formulário de cadastro de disciplinas
    showCadastroForm(req, res) {
        res.render('cadastrarDisciplinas'); // Renderiza a view 'cadastrarDisciplinas.ejs'
    }

    // Método para criar uma nova disciplina
    async create(req, res) {
        try {
            const data = req.body;
            DisciplinaModel.create(data, (err, result) => {
                if (err) {
                    return res.status(500).json({ 
                        success: false, 
                        message: 'Erro ao criar disciplina', 
                        error: err.message 
                    });
                }
                
                res.status(201).json({ 
                    success: true, 
                    message: 'Disciplina criada com sucesso', 
                    disciplina: result 
                });
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Erro interno do servidor', 
                error: error.message 
            });
        }
    }

    // Método para obter todas as disciplinas
    async getAll(req, res) {
        try {
            const disciplinas = await new Promise((resolve, reject) => {
                DisciplinaModel.getAll((err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            return res.status(200).render('disciplinas', { disciplinas });
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error.message);
            return res.status(500).render('disciplinas', {
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

    // Método para obter disciplinas por curso e período
    async getDisciplinasByCursoAndPeriodo(req, res) {
        const { cursoId, periodo } = req.query;
        try {
            DisciplinaModel.getByIdAndPeriodo(cursoId, periodo, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao buscar disciplinas' });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async getAlunosByDisciplina(req, res) {
        try {
            const { idDisciplina } = req.params;

            const disciplina = await new Promise((resolve, reject) => {
                DisciplinaModel.getById(idDisciplina, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            // Busca os alunos matriculados na disciplina
            const alunos = await new Promise((resolve, reject) => {
                AlunoModel.getAlunosByDisciplina(idDisciplina, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });

            res.status(200).render('disciplinas', { disciplina, alunos });
        } catch (error) {
            console.error('Erro ao listar disciplinas:', error.message);
            res.status(500).render('disciplinas', {
                message: "Erro interno do servidor"
            });
        }
    }

    async visualizarAlunos(req, res) {
        const { idDisciplina } = req.params;
    
        try {
            console.log('ID da Disciplina:', idDisciplina);
           
            const alunos = await new Promise((resolve, reject) => {
                AlunoModel.getAlunosByDisciplina(idDisciplina, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
    
            console.log('Alunos encontrados:', alunos);
    
            if (!alunos || alunos.length === 0) {
                return res.status(404).json({ error: 'Nenhum aluno encontrado para esta disciplina' });
            }
    
            const nomeDisciplina = alunos[0].nomeDisciplina;
            console.log('Nome da Disciplina:', nomeDisciplina);
    
            // Renderiza a view e passa os dados
            return res.render('visualizarAlunos', { nomeDisciplina, alunos });
        } catch (error) {
            console.error('Erro ao buscar alunos:', error.message);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

}

export { DisciplinaController };
