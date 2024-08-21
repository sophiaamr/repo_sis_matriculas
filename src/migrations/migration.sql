DROP DATABASE IF EXISTS sisMatricula;
CREATE DATABASE sisMatricula;
USE sisMatricula;

CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    tipo ENUM('secretaria', 'professor', 'aluno') NOT NULL
);

CREATE TABLE IF NOT EXISTS Aluno (
    idAluno INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE IF NOT EXISTS Professor (
    idProfessor INT PRIMARY KEY AUTO_INCREMENT,
    cargaHorario INT NOT NULL,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE IF NOT EXISTS Curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    numCredito INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    nomeDisciplina VARCHAR(255) NOT NULL,
    status ENUM('ativa', 'inativa') NOT NULL,
    qntdAluno INT,
    idCurso INT,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);

CREATE TABLE IF NOT EXISTS Matricula (
    idMatricula INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('ativa', 'cancelada', 'encerrada') NOT NULL,
    idAluno INT,
    idDisciplina INT,
    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina)
);

CREATE TABLE IF NOT EXISTS Cobranca (
    idCobranca INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('pendente', 'paga', 'cancelada') NOT NULL,
    juros DOUBLE NOT NULL,
    dataInicio DATE NOT NULL,
    dataFim DATE NOT NULL,
    idAluno INT,
    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno)
);

CREATE TABLE IF NOT EXISTS Secretaria (
    usuario_id INT NOT NULL,
    departamento VARCHAR(255),
    PRIMARY KEY (usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(idUsuario)
);
