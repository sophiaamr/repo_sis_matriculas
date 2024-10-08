DROP DATABASE IF EXISTS sisMatricula;
CREATE DATABASE sisMatricula;
USE sisMatricula;


-- Tabela Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    tipo ENUM('secretaria', 'professor', 'aluno') NOT NULL
);


-- Tabela Aluno
CREATE TABLE IF NOT EXISTS Aluno (
    idAluno INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    idUsuario INT,
    periodo VARCHAR(10),
    idCurso INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE SET NULL,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso) ON DELETE SET NULL
);

-- Tabela Professor
CREATE TABLE IF NOT EXISTS Professor (
    idProfessor INT PRIMARY KEY AUTO_INCREMENT,
    cargaHorario INT NOT NULL,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE SET NULL
);

-- Tabela Secretaria
CREATE TABLE IF NOT EXISTS Secretaria (
    idUsuario INT PRIMARY KEY,
    departamento VARCHAR(255),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE CASCADE
);


-- Tabela Disciplina
CREATE TABLE IF NOT EXISTS Disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    nomeDisciplina VARCHAR(255) NOT NULL,
    valor DOUBLE NOT NULL,
    status ENUM('ativa', 'inativa') NOT NULL,
    qntdAluno INT,
    idCurso INT,
    periodo INT,
    numCredito INT,
     professorId INT,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso) ON DELETE SET NULL,
    FOREIGN KEY (professorId) REFERENCES Professor(idProfessor)
);


-- Tabela Curso
CREATE TABLE IF NOT EXISTS Curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    numCredito INT NOT NULL,
    periodo INT
);

-- Tabela CursoDisciplina
CREATE TABLE IF NOT EXISTS CursoDisciplina (
    idCurso INT,
    idDisciplina INT,
    PRIMARY KEY (idCurso, idDisciplina),
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso) ON DELETE CASCADE,
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina) ON DELETE CASCADE
);

-- Tabela Matricula
CREATE TABLE IF NOT EXISTS Matricula (
    idMatricula INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('ativa', 'cancelada', 'encerrada') NOT NULL,
    idAluno INT,
    idCurso INT,
    idDisciplina INT,
    periodo INT,
    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno) ON DELETE SET NULL,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso) ON DELETE SET NULL,
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina) ON DELETE SET NULL
);


-- Tabela Cobranca
CREATE TABLE IF NOT EXISTS Cobranca (
    idCobranca INT PRIMARY KEY AUTO_INCREMENT,    
    status ENUM('pendente', 'paga', 'cancelada') NOT NULL,
    juros DOUBLE NOT NULL,
    dataInicio DATE NOT NULL,
    dataFim DATE NOT NULL,
    idAluno INT,
    valor DOUBLE NOT NULL,
    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno) ON DELETE SET NULL
);


-- Consultas para verificar as inserções
SELECT * FROM Usuario;
SELECT * FROM Aluno;
SELECT * FROM Professor;
SELECT * FROM Secretaria;
SELECT * FROM Disciplina;
SELECT * FROM Curso;
SELECT * FROM Matricula;
SELECT * FROM Cobranca;
SELECT * FROM CursoDisciplina;
