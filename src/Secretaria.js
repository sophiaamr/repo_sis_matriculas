class Secretaria extends Usuario {
    constructor(nome, cpf, telefone, email, senha) {
        super(nome, cpf, telefone, email, senha);
    }

    gerarCurriculo() {
        console.log('Currículo gerado para o semestre.');
    }

    cancelarDisciplina(disciplina) {
        disciplina.cancelarDisciplina();
    }
}
