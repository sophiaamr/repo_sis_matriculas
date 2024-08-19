class SistemaDeMatriculas {
    constructor() {
        this.alunos = [];
        this.professores = [];
        this.disciplinas = [];
    }

    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }

    adicionarProfessor(professor) {
        this.professores.push(professor);
    }

    adicionarDisciplina(disciplina) {
        this.disciplinas.push(disciplina);
    }

    ativarDisciplinas() {
        this.disciplinas.forEach(disciplina => disciplina.ativarDisciplina());
    }
}
