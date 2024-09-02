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
        const {email, senha } = req.body;

        if (!email || !senha ) {
            return res.status(400).render('login', { message: "Por favor, preencha todos os campos." });
        }

        try {
            const usuarioModel = new Usuario();
            const usuario = await new Promise((resolve, reject) => {
                usuarioModel.login(email, senha, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            if (!usuario) {
                return res.status(404).render('login', { message: "Usuário não encontrado." });
            }

            // Verifica a senha (considerando que esteja em texto plano, use hashing em produção)
            if (usuario.senha !== senha) {
                return res.status(401).render('login', { message: "Senha incorreta." });
            }

            // Verifica o tipo de usuário e redireciona
            const tipo = usuario.tipo;
          
            let profilePath;

            switch (tipo) {
                case "aluno":
                    profilePath = 'perfil';
                    break;
                case "professor":
                    profilePath = 'perfilProf';
                    break;
                case "secretaria":
                    profilePath = 'secretaria';
                    break;
            }

            return res.status(200).render(profilePath, { usuario: usuario});
            
        } catch (err) {
            console.error('Erro ao realizar login:', err.message);
            return res.status(500).render('login', { message: 'Erro interno do servidor' });
        }
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
        const { disciplinaId } = req.params;

        try {
            const alunoModel = new Aluno();
            const alunos = await alunoModel.getAlunosByDisciplina(disciplinaId);

            if (!alunos.length) {
                return res.status(404).render('cadastro', { message: 'Nenhum aluno encontrado para esta disciplina.' });
            }

            return res.status(200).render('alunosDisciplinas', { alunos });
        } catch (err) {
            console.error('Erro ao buscar alunos:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
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

            return res.status(200).render('cadastro', { success: true, message: 'Usuário atualizado com sucesso!' });
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err.message);
            return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
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
    
    

    // async createUsuario(req, res) {
    //     const { tipo, nome, cpf, telefone, email, senha, matricula, periodo, cargaHorario, departamento } = req.body;
    
    //     let validationError = false;
    //     let errorMsg = "Revise as informações fornecidas.";
    
    //     if (!nome || !cpf || !telefone || !email || !senha) {
    //         validationError = true;
    //     } else {
    //         if (tipo === 'aluno' && (!matricula || !periodo)) {
    //             validationError = true;
    //         } else if (tipo === 'professor' && !cargaHorario) {
    //             validationError = true;
    //         } else if (tipo === 'secretaria' && !departamento) {
    //             validationError = true;
    //         }
    //     }
    
    //     if (validationError) {
    //         return res.status(400).render('cadastro', { message: errorMsg });
    //     }
    
    //     try {
    //         const usuarioModel = new Usuario();
    //         await new Promise((resolve, reject) => {
    //             usuarioModel.create({ nome, cpf, telefone, email, senha, tipo, matricula, periodo, cargaHorario, departamento }, (err, result) => {
    //                 if (err) reject(err);
    //                 resolve(result);
    //             });
    //         });
    //         return res.status(201).render('cadastro', { success: true, message: `${tipo} criado com sucesso!` });
    //     } catch (err) {
    //         console.error(`Erro ao criar ${tipo}:`, err.message);
    //         return res.status(500).render('cadastro', { message: 'Erro interno do servidor' });
    //     }
    // }
    
}