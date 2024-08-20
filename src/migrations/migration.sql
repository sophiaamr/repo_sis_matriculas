CREATE DATABASE sisMatricula;
DROP DATABASE sismatricula;
USE sisMatricula;

CREATE TABLE IF NOT EXISTS Usuario(
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(150) NOT NULL,
    cpf varchar(11) not null,
    telefone varchar(11) not null,
    email varchar(100) not null,
    senha varchar(20) not null
);

CREATE TABLE Aluno (
    idAluno INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(20) NOT NULL,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Professor (
    idProfessor INT PRIMARY KEY AUTO_INCREMENT,
    cargaHorario INT NOT NULL,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    numCredito INT NOT NULL
);

CREATE TABLE Disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    nomeDisciplina VARCHAR(255) NOT NULL,
    status ENUM('ativa', 'inativa') NOT NULL,
    qntdAluno INT,
    idCurso INT,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);

CREATE TABLE Matricula (
    idMatricula INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('ativa', 'cancelada', 'encerrada') NOT NULL,
    idAluno INT,
    idDisciplina INT,
    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina)
);

CREATE TABLE Cobranca (
    idCobranca INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('pendente', 'paga', 'cancelada') NOT NULL,
    juros DOUBLE NOT NULL,
    dataInicio DATE NOT NULL,
    dataFim DATE NOT NULL,
    idAluno INT,
    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno)
);