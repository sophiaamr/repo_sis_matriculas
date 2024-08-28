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

CREATE TABLE IF NOT EXISTS Curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    numCredito INT NOT NULL,
    idDisciplinas INT,
    FOREIGN KEY (idDisciplinas) REFERENCES Disciplina(idDisciplinas)
);

CREATE TABLE IF NOT EXISTS Disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    nomeDisciplina VARCHAR(255) NOT NULL,
    valor DOUBLE NOT NULL,
    status ENUM('ativa', 'inativa') NOT NULL,
    tipo ENUM('obrigatoria', 'optativa') NOT NULL,
    qntdAluno INT,
    idCurso INT,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);


CREATE TABLE IF NOT EXISTS CursoDisciplina (
    idCurso INT,
    idDisciplina INT,
    PRIMARY KEY (idCurso, idDisciplina),
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina)
);


CREATE TABLE IF NOT EXISTS Aluno (
    idAluno INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    idUsuario INT,
    periodo VARCHAR(10),
    idCurso INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);

CREATE TABLE IF NOT EXISTS Professor (
    idProfessor INT PRIMARY KEY AUTO_INCREMENT,
    cargaHorario INT NOT NULL,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE IF NOT EXISTS Matricula (
    idMatricula INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('ativa', 'cancelada', 'encerrada') NOT NULL,
    idAluno INT,
    idCurso INT,
    periodo INT,
    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno),
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);

CREATE TABLE IF NOT EXISTS MatriculaDisciplinaObrigatoria (
    idMatricula INT,
    idDisciplina INT,
    PRIMARY KEY (idMatricula, idDisciplina),
    FOREIGN KEY (idMatricula) REFERENCES Matricula(idMatricula),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina)
);

CREATE TABLE IF NOT EXISTS MatriculaDisciplinaOptativa (
    idMatricula INT,
    idDisciplina INT,
    PRIMARY KEY (idMatricula, idDisciplina),
    FOREIGN KEY (idMatricula) REFERENCES Matricula(idMatricula),
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
ALTER TABLE Cobranca
ADD COLUMN valor DOUBLE NOT NULL;
CREATE TABLE IF NOT EXISTS Secretaria (
    idUsuario INT NOT NULL,
    departamento VARCHAR(255),
    PRIMARY KEY (idUsuario),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE IF NOT EXISTS Periodo (
    idPeriodo INT PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL,
    idCurso INT NOT NULL,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);


CREATE TABLE IF NOT EXISTS Curriculo (
    idCurriculo INT PRIMARY KEY AUTO_INCREMENT,
    idCurso INT NOT NULL,
    idPeriodo INT NOT NULL,
    idDisciplina INT NOT NULL,
    idProfessor INT NOT NULL,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso),
    FOREIGN KEY (idPeriodo) REFERENCES Periodo(idPeriodo),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina),
    FOREIGN KEY (idProfessor) REFERENCES Professor(idProfessor)
);




