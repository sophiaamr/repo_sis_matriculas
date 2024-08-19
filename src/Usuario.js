class Usuario {
    constructor(nome, cpf, telefone, email, senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
    }

    setSenha(novaSenha) {
        this.senha = novaSenha;
    }
}
