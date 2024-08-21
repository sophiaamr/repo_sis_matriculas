import BaseModel from './BaseModel.js';

class Usuario extends BaseModel {
  constructor() {
    super('usuario'); // Nome da tabela base
  }

  // Métodos específicos para Usuario, se necessário
}

class Aluno extends BaseModel {
  constructor() {
    super('aluno'); // Nome da tabela correspondente aos alunos
  }

  // Métodos específicos para Aluno, se necessário
}

class Professor extends BaseModel {
  constructor() {
    super('professor'); // Nome da tabela correspondente aos professores
  }

  // Métodos específicos para Professor, se necessário
}

class Secretaria extends BaseModel {
  constructor() {
    super('secretaria'); // Nome da tabela correspondente à secretaria
  }

  // Métodos específicos para Secretaria, se necessário
}

export { Aluno, Professor, Secretaria, Usuario };
