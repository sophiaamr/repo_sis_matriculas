class Aluno extends Usuario {
    constructor(nome, cpf, telefone, email, senha, matricula) {
        super(nome, cpf, telefone, email, senha);
        this.matricula = matricula;
        this.disciplinasMatriculadas = [];
    }

    matricular(disciplina) {
        if (this.disciplinasMatriculadas.length < 4) {
            this.disciplinasMatriculadas.push(disciplina);
            disciplina.matricularAluno(this);
        } else {
            console.log(`${this.nome} já está matriculado em 4 disciplinas obrigatórias.`);
        }
    }

    cancelarMatricula(disciplina) {
        const index = this.disciplinasMatriculadas.indexOf(disciplina);
        if (index > -1) {
            this.disciplinasMatriculadas.splice(index, 1);
            disciplina.alunosMatriculados = disciplina.alunosMatriculados.filter(aluno => aluno !== this);
        }
    }
}
