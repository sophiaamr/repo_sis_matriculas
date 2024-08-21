import { Usuario, Aluno, Professor, Secretaria } from './models/index.js';

// Função para criar um novo usuário e depois um aluno
const createAluno = (nome, cpf, telefone, email, senha, matricula) => {
  const usuarioModel = new Usuario();
  usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'aluno' }, (err, result) => {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      return;
    }

    const userId = result.insertId; // Obtendo o ID do usuário criado

    const alunoModel = new Aluno();
    alunoModel.create({ idUsuario: userId, matricula }, (err) => {
      if (err) {
        console.error('Erro ao criar aluno:', err);
        return;
      }
      console.log('Aluno criado com sucesso!');
    });
  });
};

// Função para criar um novo professor
const createProfessor = (nome, cpf, telefone, email, senha, cargaHorario) => {
  const usuarioModel = new Usuario();
  usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'professor' }, (err, result) => {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      return;
    }

    const userId = result.insertId; // Obtendo o ID do usuário criado

    const professorModel = new Professor();
    professorModel.create({ idUsuario: userId, cargaHorario }, (err) => {
      if (err) {
        console.error('Erro ao criar professor:', err);
        return;
      }
      console.log('Professor criado com sucesso!');
    });
  });
};

// Função para criar um novo secretário
const createSecretaria = (nome, cpf, telefone, email, senha, departamento) => {
  const usuarioModel = new Usuario();
  usuarioModel.create({ nome, cpf, telefone, email, senha, tipo: 'secretaria' }, (err, result) => {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      return;
    }

    const userId = result.insertId; // Obtendo o ID do usuário criado

    const secretariaModel = new Secretaria();
    secretariaModel.create({ usuario_id: userId, departamento }, (err) => {
      if (err) {
        console.error('Erro ao criar secretário:', err);
        return;
      }
      console.log('Secretário criado com sucesso!');
    });
  });
};

// Testando as funções com CPF válido e campos obrigatórios
createAluno('João', '12345678901', '11987654321', 'joao@example.com', 'senha123', '123456');
createProfessor('Maria', '98765432101', '11987654322', 'maria@example.com', 'senha123', 20);
createSecretaria('Carlos', '45678912301', '11987654323', 'carlos@example.com', 'senha123', 'Administração');
