class Disciplina {
    constructor(nome, creditos, professor) {
        this.nome = nome;
        this.creditos = creditos;
        this.professor = professor;
        this.alunosMatriculados = [];
        this.status = 'inativa'; // "ativa" ou "inativa"
    }

    matricularAluno(aluno) {
        if (this.alunosMatriculados.length < 60) {
            this.alunosMatriculados.push(aluno);
        } else {
            console.log(`Disciplina ${this.nome} atingiu o número máximo de alunos.`);
        }
    }

    cancelarDisciplina() {
        this.status = 'cancelada';
    }

    ativarDisciplina() {
        if (this.alunosMatriculados.length >= 3) {
            this.status = 'ativa';
        } else {
            this.cancelarDisciplina();
        }
    }
}
