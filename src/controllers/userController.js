import Usuario from '../models/userModel.js';
import Aluno from '../models/alunoModel.js';
import Professor from '../models/professorModel.js';
import Secretaria from '../models/secretariaModel.js';
import autoBind from 'auto-bind';

export class UserController {
    constructor() {
        autoBind(this);
    }

    async createAluno(req, res) {
        try {
            const { nome, cpf, telefone, email, senha, matricula } = req.body;

            if (!nome || !cpf || !telefone || !email || !senha || !matricula) {
                return res.status(400).render('index', { message: "Revise as informações fornecidas." });
            }

            const usuarioModel = new Usuario();
            const result = await usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'aluno' });
            const userId = result.insertId;

            const alunoModel = new Aluno();
            await alunoModel.create({ idUsuario: userId, matricula });

            return res.status(201).render('index', { success: true, message: 'Aluno criado com sucesso!' });
        } catch (err) {
            console.error('Erro ao criar aluno:', err.message);
            return res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }

    async getAllAlunos(req, res) {
        try {
            const alunoModel = new Aluno();
            const alunos = await alunoModel.getAllAlunos();

            return res.status(200).render('index', { alunos });
        } catch (err) {
            console.error('Erro ao buscar alunos:', err.message);
            return res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }

    async createProfessor(req, res) {
        try {
            const { nome, cpf, telefone, email, senha, cargaHorario } = req.body;

            if (!nome || !cpf || !telefone || !email || !senha || !cargaHorario) {
                return res.status(400).render('index', { message: "Revise as informações fornecidas." });
            }

            const usuarioModel = new Usuario();
            const result = await usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'professor' });
            const userId = result.insertId;

            const professorModel = new Professor();
            await professorModel.create({ idUsuario: userId, cargaHorario });

            return res.status(201).render('index', { success: true, message: 'Professor criado com sucesso!' });
        } catch (err) {
            console.error('Erro ao criar professor:', err.message);
            return res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }

    async getAllProfessors(req, res) {
        try {
            const professorModel = new Professor();
            const professores = await professorModel.getAllProfessors();

            return res.status(200).render('index', { professores });
        } catch (err) {
            console.error('Erro ao buscar professores:', err.message);
            return res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }

    async createSecretaria(req, res) {
        try {
            const { nome, cpf, telefone, email, senha, departamento } = req.body;

            if (!nome || !cpf || !telefone || !email || !senha || !departamento) {
                return res.status(400).render('index', { message: "Revise as informações fornecidas." });
            }

            const usuarioModel = new Usuario();
            const result = await usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'secretaria' });
            const userId = result.insertId;

            const secretariaModel = new Secretaria();
            await secretariaModel.create({ usuario_id: userId, departamento });

            return res.status(201).render('index', { success: true, message: 'Secretário criado com sucesso!' });
        } catch (err) {
            console.error('Erro ao criar secretário:', err.message);
            return res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }

    async getAllSecretaria(req, res) {
        try {
            const secretariaModel = new Secretaria();
            const secretarias = await secretariaModel.getAllSecretaria();

            return res.status(200).render('index', { secretarias });
        } catch (err) {
            console.error('Erro ao buscar secretarias:', err.message);
            return res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }

    async getById(req, res) {
        const { id } = req.params;

        try {
            const usuarioModel = new Usuario();
            const usuario = await new Promise((resolve, reject) => {
                usuarioModel.getById(id, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            if (!usuario) {
                return res.status(404).render('index', { message: 'Usuário não encontrado' });
            }

            let infoadicional;
            switch (usuario.tipo) {
                case 'aluno':
                    infoadicional = await new Promise((resolve, reject) => {
                        const alunoModel = new Aluno();
                        alunoModel.getByUserId(id, (err, result) => {
                            if (err) reject(err);
                            resolve(result);
                        });
                    });
                    break;
                case 'professor':
                    infoadicional = await new Promise((resolve, reject) => {
                        const professorModel = new Professor();
                        professorModel.getByUserId(id, (err, result) => {
                            if (err) reject(err);
                            resolve(result);
                        });
                    });
                    break;
                case 'secretaria':
                    infoadicional = await new Promise((resolve, reject) => {
                        const secretariaModel = new Secretaria();
                        secretariaModel.getByUserId(id, (err, result) => {
                            if (err) reject(err);
                            resolve(result);
                        });
                    });
                    break;
                default:
                    infoadicional = null;
            }

            res.status(200).render('index', { usuario, infoadicional });
        } catch (err) {
            console.error('Erro ao buscar usuário por ID:', err.message);
            res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const usuarioModel = new Usuario();
            usuarioModel.deleteById(id, (err, results) => {
                if (err) {
                    console.error('Erro ao deletar usuário:', err.message);
                    return res.status(500).render('index', { message: 'Erro interno do servidor' });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).render('index', { message: 'Usuário não encontrado' });
                }
                return res.status(200).render('index', { success: true, message: 'Usuário deletado com sucesso!' });
            });
        } catch (err) {
            console.error('Erro ao deletar usuário:', err.message);
            return res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }

    async updateUserById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const usuarioModel = new Usuario();
            usuarioModel.updateById(id, data, (err, results) => {
                if (err) {
                    console.error('Erro ao atualizar usuário:', err.message);
                    return res.status(500).render('index', { message: 'Erro interno do servidor' });
                }
                return res.status(200).render('index', { success: true, message: 'Usuário atualizado com sucesso!' });
            });
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err.message);
            return res.status(500).render('index', { message: 'Erro interno do servidor' });
        }
    }
}
