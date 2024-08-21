import Usuario from '../models/userModel.js';
import Aluno from '../models/alunoModel.js';
import Professor from '../models/professorModel.js';
import Secretaria from '../models/secretariaModel.js';

export class UserController {
  async createAluno(req, res) {
    try {
      const { nome, cpf, telefone, email, senha, matricula } = req.body;

      const usuarioModel = new Usuario();
      const result = await usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'aluno' });
      const userId = result.insertId;

      const alunoModel = new Aluno();
      await alunoModel.create({ idUsuario: userId, matricula });

      return res.status(201).json({ success: true, message: 'Aluno criado com sucesso!' });
    } catch (err) {
      console.error('Erro ao criar aluno:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  async createProfessor(req, res) {
    try {
      const { nome, cpf, telefone, email, senha, cargaHorario } = req.body;
  
      const usuarioModel = new Usuario();
      const result = await usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'professor' });
      const userId = result.insertId;
  
      const professorModel = new Professor();
      await professorModel.create({ idUsuario: userId, cargaHorario });
  
      return res.status(201).json({ success: true, message: 'Professor criado com sucesso!' });
    } catch (err) {
      console.error('Erro ao criar professor:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  async createSecretaria(req, res) {
    try {
      const { nome, cpf, telefone, email, senha, departamento } = req.body;
  
      const usuarioModel = new Usuario();
      const result = await usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'secretaria' });
      const userId = result.insertId;
  
      const secretariaModel = new Secretaria();
      await secretariaModel.create({ usuario_id: userId, departamento });
  
      return res.status(201).json({ success: true, message: 'Secretário criado com sucesso!' });
    } catch (err) {
      console.error('Erro ao criar secretário:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  
}

export default new UserController();
