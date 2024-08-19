class Matricula {
    constructor(id, aluno, disciplina) {
        this.id = id;
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.status = 'ativa'; // Status pode ser 'ativa' ou 'cancelada'
    }

    cancelarMatricula() {
        this.status = 'cancelada';
    }

    reativarMatricula() {
        this.status = 'ativa';
    }
}
