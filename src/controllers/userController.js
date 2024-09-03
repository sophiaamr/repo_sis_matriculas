import Usuario from '../models/userModel.js';
import Aluno from '../models/alunoModel.js';
import Professor from '../models/professorModel.js';
import Secretaria from '../models/secretariaModel.js';
import autoBind from 'auto-bind';

export class UserController {

    constructor() {
        autoBind(this);
    }


    async login(req, res) {
        const { email, senha } = req.body;
    
        if (!email || !senha) {
            return res.status(400).json({ success: false, message: "Por favor, preencha todos os campos." });
        }
    
        try {
            const usuarioModel = new Usuario();
            const usuario = await new Promise((resolve, reject) => {
                usuarioModel.login(email, senha, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
    
            if (!usuario || usuario.senha !== senha) {
                return res.render('login', { message: "Email ou senha incorretos." });
            }
            
    
            const tipo = usuario.tipo;
    
            // Redireciona para a rota correspondente ao tipo de usuário com dados do usuário
            switch (tipo) {
                case "aluno":
                    return res.redirect(`/api/usuario/perfil/aluno/${usuario.idUsuario}`);
                case "professor":
                    return res.redirect(`/api/usuario/perfil/professor/${usuario.idUsuario}`);
                case "secretaria":
                    return res.redirect(`/api/usuario/perfil/secretaria/${usuario.idUsuario}`);
                default:
                    return res.status(500).json({ success: false, message: "Tipo de usuário desconhecido." });
            }
        }  catch (err) {
            console.error('Erro ao realizar login:', err.message);
            return res.status(500).render('login', { message: 'Erro interno do servidor' });
        }
    }
    
    async showAlunoProfile(req, res) {
        const { id } = req.params;
        const usuarioModel = new Usuario();
        usuarioModel.getById(id, (err, usuario) => {
            if (err) {
                console.error('Erro ao buscar dados do aluno:', err.message);
                return res.status(500).send('Erro interno do servidor');
            }
            if (!usuario || usuario.tipo !== 'aluno') {
                return res.status(404).send('Aluno não encontrado');
            }
    
           
            Aluno.getByUserId(id, (err, alunoData) => {
                if (err) {
                    console.error('Erro ao buscar dados adicionais do aluno:', err.message);
                    return res.status(500).send('Erro interno do servidor');
                }
    
                return res.render('perfil', { usuario: { ...usuario, ...alunoData }, userId: usuario.idUsuario });
            });
        });

    }

    async showProfessorProfile(req, res) {
        const { id } = req.params;
        const usuarioModel = new Usuario();
        usuarioModel.getById(id, (err, usuario) => {
            if (err) {
                console.error('Erro ao buscar dados do professor:', err.message);
                return res.status(500).send('Erro interno do servidor');
            }
            if (!usuario || usuario.tipo !== 'professor') {
                return res.status(404).send('Professor não encontrado');
            }
            return res.render('perfilProf', { usuario });
        });
    }

    async showSecretariaProfile(req, res) {
        const { id } = req.params;
        const usuarioModel = new Usuario();
        usuarioModel.getById(id, (err, usuario) => {
            if (err) {
                console.error('Erro ao buscar dados do professor:', err.message);
                return res.status(500).send('Erro interno do servidor');
            }
            if (!usuario || usuario.tipo !== 'secretaria') {
                return res.status(404).send('Secretaria não encontrado');
            }
            return res.render('perfilSecretaria', { usuario, userId: usuario.idUsuario });
        });
    }


    async createAluno(req, res) {
        const { nome, cpf, telefone, email, senha, matricula, periodo } = req.body;
        if (!nome || !cpf || !telefone || !email || !senha || !matricula || !periodo) {
            return res.status(400).render('cadastro', { message: "Revise as informações fornecidas." });
        }

        
        try {
            const usuarioModel = new Usuario();
            await new Promise((resolve, reject) => {
                usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'aluno', matricula, periodo }, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
            return res.status(201).render('cadastro', { success: true, message: 'Aluno criado com sucesso!' });
        } catch (err) {
            console.error('Erro ao criar aluno:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async getAllAlunos(req, res) {
        try {
            const alunoModel = new Aluno();
            alunoModel.getAll((err, alunos) => {
                if (err) {
                    console.error('Erro ao buscar alunos:', err.message);
                    return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
                }
    
                return res.status(200).render('cadastro', { alunos });
            });
        } catch (err) {
            console.error('Erro ao buscar alunos:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async createProfessor(req, res) {
        const { nome, cpf, telefone, email, senha, cargaHorario } = req.body;

        if (!nome || !cpf || !telefone || !email || !senha || !cargaHorario) {
            return res.status(400).render('cadastro', { message: "Revise as informações fornecidas." });
        }

        try {
            const usuarioModel = new Usuario();
            await new Promise((resolve, reject) => {
                usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'professor', cargaHorario }, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
            return res.status(201).render('cadastro', { success: true, message: 'Professor criado com sucesso!' });
        } catch (err) {
            console.error('Erro ao criar professor:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async getAllProfessors(req, res) {
        try {
            const professorModel = new Professor();
            const professores = await professorModel.getAll();
            return res.status(200).render('cadastro', { professores });
        } catch (err) {
            console.error('Erro ao buscar professores:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async createSecretaria(req, res) {
        const { nome, cpf, telefone, email, senha, departamento } = req.body;

        if (!nome || !cpf || !telefone || !email || !senha || !departamento) {
            return res.status(400).render('cadastro', { message: "Revise as informações fornecidas." });
        }

        try {
            const usuarioModel = new Usuario();
            await new Promise((resolve, reject) => {
                usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'secretaria', departamento }, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
            return res.status(201).render('cadastro', { success: true, message: 'Secretário criado com sucesso!' });
        } catch (err) {
            console.error('Erro ao criar secretário:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async getAllSecretaria(req, res) {
        try {
            const secretariaModel = new Secretaria();
            const secretarias = await secretariaModel.getAll();
            return res.status(200).render('cadastro', { secretarias });
        } catch (err) {
            console.error('Erro ao buscar secretarias:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async getById(req, res) {
        const { id } = req.params;

        try {
            const usuarioModel = new Usuario();
            const usuario = usuarioModel.getById(id);

            if (!usuario) {
                return res.status(404).render('cadastro', { message: 'Usuário não encontrado' });
            }

            let infoadicional = {};
            switch (usuario.tipo) {
                case 'aluno':
                    const alunoModel = new Aluno();
                    infoadicional = alunoModel.getByUserId(id);
                    if (infoadicional) {
                        infoadicional.disciplinas = await alunoModel.getDisciplinasByAlunoId(id);
                    }
                    break;
                case 'professor':
                    const professorModel = new Professor();
                    infoadicional = professorModel.getByUserId(id);
                    break;
                case 'secretaria':
                    const secretariaModel = new Secretaria();
                    infoadicional = secretariaModel.getByUserId(id);
                    break;
                default:
                    infoadicional = null;
            }

            console.log('Usuário:', usuario);
            console.log('Informações adicionais:', infoadicional);

            return res.status(200).render('cadastro', { usuario, infoadicional });
        } catch (err) {
            console.error('Erro ao buscar usuário por ID:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const usuarioModel = new Usuario();
            const result = await new Promise((resolve, reject) => {
                usuarioModel.deleteById(id, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            console.log(result)

            if (result.affectedRows === 0) {
                return res.status(404).render('cadastro', { message: 'Usuário não encontrado' });
            }

            return res.status(200).render('cadastro', { success: true, message: 'Usuário deletado com sucesso!' });
        } catch (err) {
            console.error('Erro ao deletar usuário:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async getAlunosByDisciplina(req, res) {
        const { idDisciplina } = req.params;

        try {
            const alunoModel = new Aluno();
            const alunos = await alunoModel.getAlunosByDisciplina(idDisciplina);

            if (!alunos.length) {
                return res.status(200).json({ message: 'Nenhum aluno encontrado para esta disciplina.' });
            }
            return res.status(200).json({ alunos });
        } catch (err) {
            console.error('Erro ao buscar alunos:', err.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async updateUserById(req, res) {
        const { id } = req.params;
        const data = req.body;
      
        try {
            const usuarioModel = new Usuario();
            await new Promise((resolve, reject) => {
                usuarioModel.updateById(id, data, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
      
            return res.status(200).json({ success: true, message: 'Usuário atualizado com sucesso!' });
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err.message);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        }
      }

    async getAll(req, res) {
        try {
            const usuarioModel = new Usuario();
            const usuarios = await new Promise((resolve, reject) => {
                usuarioModel.getAll((err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
    
            console.log('Todos os usuários:', usuarios);
            return res.status(200).render('login', { usuarios });
        } catch (err) {
            console.error('Erro ao buscar todos os usuários:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
        }
    }

    async getByNumeroMatricula(req, res) {
        const { matricula } = req.query;
    
        if (!matricula) {
            return res.status(400).json({ message: 'Número da matrícula é obrigatório.' });
        }
    
        try {
            const aluno = await Aluno.getByNumeroMatricula(matricula);
    
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado.' });
            }
    
            console.log('Aluno encontrado:', aluno); // Log para depuração
    
            return res.status(200).json({ idAluno: aluno.id });
        } catch (err) {
            console.error('Erro ao buscar aluno por matrícula:', err.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    
    

}