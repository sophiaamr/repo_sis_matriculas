class Professor extends Usuario {
    constructor(nome, cpf, telefone, email, senha) {
        super(nome, cpf, telefone, email, senha);
        this.disciplinas = [];
    }

    atribuirDisciplina(disciplina) {
        this.disciplinas.push(disciplina);
    }

    visualizarAlunos(disciplina) {
        return disciplina.alunosMatriculados;
    }
}
