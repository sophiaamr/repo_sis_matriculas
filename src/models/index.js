import userModel from './userModel.js';

class Usuario extends userModel {
  constructor() {
    super('usuario'); // Nome da tabela base
  }

  // Métodos específicos para Usuario, se necessário
}

class Aluno extends userModel {
  constructor() {
    super('aluno'); // Nome da tabela correspondente aos alunos
  }

  // Métodos específicos para Aluno, se necessário
}

class Professor extends userModel {
  constructor() {
    super('professor'); // Nome da tabela correspondente aos professores
  }

  // Métodos específicos para Professor, se necessário
}

class Secretaria extends userModel {
  constructor() {
    super('secretaria'); // Nome da tabela correspondente à secretaria
  }

  // Métodos específicos para Secretaria, se necessário
}

export { Aluno, Professor, Secretaria, Usuario };
