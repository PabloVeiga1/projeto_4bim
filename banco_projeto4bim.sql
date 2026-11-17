
CREATE DATABASE IF NOT EXISTS sistema_eventos;

USE sistema_eventos;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    senha VARCHAR(50),
    email VARCHAR(150),
    nome VARCHAR(150)
);

CREATE TABLE Palestrante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    email VARCHAR(150),
    telefone VARCHAR(20),
    instituicao VARCHAR(150),
    especialidade VARCHAR(150),
    mini_biografia TEXT
);

CREATE TABLE Evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    descricao TEXT,
    local VARCHAR(150),
    status VARCHAR(50),
    data_inicio DATE,
    data_fim DATE,
    idUsuario INT,

    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Inscricao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_inscricao DATE,
    status VARCHAR(50),
    presenca VARCHAR(50)
);

CREATE TABLE Atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT,
    tipo VARCHAR(50),
    titulo VARCHAR(150),
    carga_horaria INT,
    vagas INT,
    data DATETIME,
    horario_inicio TIME,
    horario_fim TIME,
    sala VARCHAR(100),
    evento_id INT,
    palestrante_id INT,
    idInscricao INT,

    FOREIGN KEY (evento_id) REFERENCES Evento(id),
    FOREIGN KEY (palestrante_id) REFERENCES Palestrante(id),
    FOREIGN KEY (idInscricao) REFERENCES Inscricao(id)
);

CREATE TABLE Participante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    cpf VARCHAR(14),
    email VARCHAR(150),
    telefone VARCHAR(20),
    instituicao VARCHAR(150),
    curso VARCHAR(150),
    tipo INT,
    idInscricao INT,
    FOREIGN KEY (idInscricao) REFERENCES Inscricao(id)
);
