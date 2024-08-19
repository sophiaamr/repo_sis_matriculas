class Curso {
    constructor(nome, creditos) {
        this.nome = nome;
        this.creditos = creditos;
        this.disciplinas = [];
    }

    adicionarDisciplina(disciplina) {
        this.disciplinas.push(disciplina);
    }
}
