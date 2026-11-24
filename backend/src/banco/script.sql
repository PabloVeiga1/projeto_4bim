DROP DATABASE IF EXISTS sistema_login;

CREATE DATABASE sistema_login;

USE sistema_login;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

CREATE TABLE Participante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150),
    cpf VARCHAR(14),
    email VARCHAR(150),
    telefone VARCHAR(20),
    instituicao VARCHAR(150),
    curso VARCHAR(150),
    tipo INT
);

CREATE TABLE Atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT,
    tipo ENUM('Palestra', 'Minicurso') NOT NULL,
    titulo VARCHAR(150),
    carga_horaria INT,
    vagas INT,
    data DATETIME,
    horario_inicio TIME,
    horario_fim TIME,
    sala VARCHAR(100),
    evento_id INT,
    palestrante_id INT,

    FOREIGN KEY (evento_id) REFERENCES Evento(id),
    FOREIGN KEY (palestrante_id) REFERENCES Palestrante(id)
);

CREATE TABLE Inscricao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_inscricao DATE,
    status VARCHAR(50),
    presenca VARCHAR(50),
    participante_id INT,
    atividade_id INT,

    FOREIGN KEY (participante_id) REFERENCES Participante(id),
    FOREIGN KEY (atividade_id) REFERENCES Atividade(id),

    UNIQUE (participante_id, atividade_id)
);

INSERT INTO usuarios (id, tipo, senha, email, nome) VALUES
(1, 'Administrador', '$2b$10$Qh4v2bgBLSLVdFOK2TxrPey/qceKRGrfNyb0VQvwRwVqsNNCSfy76', 'admin@evento.com', 'Carlos Silva'),
(2, 'Organizador', '$2b$10$Od7XVE6JhnMDTlk7oPImB.7.GWApNFkPwSyFubaP5lr5jc28XL.bu', 'ana@evento.com', 'Ana Souza'),
(3, 'Organizador', '$2b$10$Od7XVE6JhnMDTlk7oPImB.7.GWApNFkPwSyFubaP5lr5jc28XL.bu', 'pedro@evento.com', 'Pedro Santos'),
(4, 'Organizador', '$2b$10$Od7XVE6JhnMDTlk7oPImB.7.GWApNFkPwSyFubaP5lr5jc28XL.bu', 'maria@evento.com', 'Maria Oliveira'),
(5, 'Participante', '$2b$10$NK5dxeGA75yVcQVk5QmyI.pnxtObAlXOMdtbzkhqEmhogw2zWwdGO', 'joao@email.com', 'João Lima'),
(6, 'Participante', '$2b$10$NK5dxeGA75yVcQVk5QmyI.pnxtObAlXOMdtbzkhqEmhogw2zWwdGO', 'lucas@email.com', 'Lucas Costa'),
(7, 'Participante', '$2b$10$NK5dxeGA75yVcQVk5QmyI.pnxtObAlXOMdtbzkhqEmhogw2zWwdGO', 'beatriz@email.com', 'Beatriz Alves'),
(8, 'Participante', '$2b$10$NK5dxeGA75yVcQVk5QmyI.pnxtObAlXOMdtbzkhqEmhogw2zWwdGO', 'marcos@email.com', 'Marcos Rocha'),
(9, 'Participante', '$2b$10$NK5dxeGA75yVcQVk5QmyI.pnxtObAlXOMdtbzkhqEmhogw2zWwdGO', 'julia@email.com', 'Júlia Martins'),
(10, 'Participante', '$2b$10$NK5dxeGA75yVcQVk5QmyI.pnxtObAlXOMdtbzkhqEmhogw2zWwdGO', 'gabriel@email.com', 'Gabriel Ferreira');

INSERT INTO Palestrante
(id, nome, email, telefone, instituicao, especialidade, mini_biografia)
VALUES
(1, 'Roberto Mendes', 'roberto@email.com', '82999990001', 'UFAL', 'Programação', 'Especialista em desenvolvimento web.'),
(2, 'Fernanda Lima', 'fernanda@email.com', '82999990002', 'IFAL', 'Inteligência Artificial', 'Pesquisadora em IA.'),
(3, 'André Costa', 'andre@email.com', '82999990003', 'CESMAC', 'Banco de Dados', 'Especialista em SQL.'),
(4, 'Camila Souza', 'camila@email.com', '82999990004', 'IFAL', 'Segurança da Informação', 'Profissional de cibersegurança.'),
(5, 'Ricardo Alves', 'ricardo@email.com', '82999990005', 'UFAL', 'Redes', 'Especialista em infraestrutura.'),
(6, 'Juliana Rocha', 'juliana@email.com', '82999990006', 'IFAL', 'UX/UI Design', 'Designer de interfaces.'),
(7, 'Marcos Oliveira', 'marcos@email.com', '82999990007', 'UFAL', 'Python', 'Desenvolvedor Python.'),
(8, 'Patrícia Santos', 'patricia@email.com', '82999990008', 'CESMAC', 'Ciência de Dados', 'Analista de dados.'),
(9, 'Eduardo Martins', 'eduardo@email.com', '82999990009', 'IFAL', 'Desenvolvimento Mobile', 'Desenvolvedor mobile.'),
(10, 'Larissa Ferreira', 'larissa@email.com', '82999990010', 'UFAL', 'Robótica', 'Pesquisadora em robótica.');

INSERT INTO Evento
(id, nome, descricao, local, status, data_inicio, data_fim, idUsuario)
VALUES
(1, 'Semana de Tecnologia', 'Evento sobre tecnologia e inovação.', 'IFAL Maceió', 'Aberto', '2026-11-20', '2026-11-22', 2),
(2, 'Workshop de Python', 'Introdução à programação Python.', 'Laboratório 1', 'Aberto', '2026-11-23', '2026-11-23', 3),
(3, 'Congresso de IA', 'Discussões sobre inteligência artificial.', 'Auditório Central', 'Aberto', '2026-11-25', '2026-11-27', 2),
(4, 'Feira de Ciências', 'Apresentação de projetos científicos.', 'Ginásio IFAL', 'Aberto', '2026-12-01', '2026-12-02', 4),
(5, 'Semana da Computação', 'Palestras sobre computação.', 'IFAL Maceió', 'Planejado', '2026-12-05', '2026-12-07', 3),
(6, 'Workshop de Banco de Dados', 'Práticas com SQL.', 'Laboratório 2', 'Aberto', '2026-12-08', '2026-12-08', 2),
(7, 'Encontro de Desenvolvedores', 'Comunidade de desenvolvimento.', 'Auditório 2', 'Aberto', '2026-12-10', '2026-12-10', 4),
(8, 'Jornada de Redes', 'Estudos sobre redes de computadores.', 'Laboratório 3', 'Planejado', '2026-12-12', '2026-12-13', 3),
(9, 'Simpósio de Design', 'Design e experiência do usuário.', 'Sala 10', 'Aberto', '2026-12-15', '2026-12-15', 2),
(10, 'Mostra de Robótica', 'Exposição de projetos de robótica.', 'Ginásio IFAL', 'Planejado', '2026-12-18', '2026-12-19', 4);

INSERT INTO Participante
(id, nome, cpf, email, telefone, instituicao, curso, tipo)
VALUES
(1, 'João Lima', '111.111.111-01', 'joao@email.com', '82988880001', 'IFAL', 'Informática', 1),
(2, 'Lucas Costa', '111.111.111-02', 'lucas@email.com', '82988880002', 'IFAL', 'Sistemas de Informação', 1),
(3, 'Beatriz Alves', '111.111.111-03', 'beatriz@email.com', '82988880003', 'UFAL', 'Ciência da Computação', 2),
(4, 'Marcos Rocha', '111.111.111-04', 'marcos@email.com', '82988880004', 'IFAL', 'Informática', 1),
(5, 'Júlia Martins', '111.111.111-05', 'julia@email.com', '82988880005', 'UFAL', 'Engenharia de Computação', 2),
(6, 'Gabriel Ferreira', '111.111.111-06', 'gabriel@email.com', '82988880006', 'IFAL', 'Informática', 1),
(7, 'Ana Clara', '111.111.111-07', 'anaclara@email.com', '82988880007', 'CESMAC', 'Sistemas de Informação', 2),
(8, 'Pedro Henrique', '111.111.111-08', 'pedro@email.com', '82988880008', 'IFAL', 'Informática', 1),
(9, 'Mariana Souza', '111.111.111-09', 'mariana@email.com', '82988880009', 'UFAL', 'Ciência da Computação', 2),
(10, 'Rafael Santos', '111.111.111-10', 'rafael@email.com', '82988880010', 'IFAL', 'Informática', 1);

INSERT INTO Atividade
(id, descricao, tipo, titulo, carga_horaria, vagas, data,
 horario_inicio, horario_fim, sala, evento_id, palestrante_id)
VALUES
(1, 'Introdução ao desenvolvimento web.', 'Palestra', 'Desenvolvimento Web', 2, 50, '2026-11-20 09:00:00', '09:00:00', '11:00:00', 'Auditório 1', 1, 1),
(2, 'Fundamentos de inteligência artificial.', 'Palestra', 'Introdução à IA', 2, 40, '2026-11-20 14:00:00', '14:00:00', '16:00:00', 'Auditório 1', 1, 2),
(3, 'Aprendendo consultas SQL.', 'Minicurso', 'Banco de Dados na Prática', 3, 30, '2026-11-23 09:00:00', '09:00:00', '12:00:00', 'Laboratório 1', 2, 3),
(4, 'Conceitos de segurança digital.', 'Palestra', 'Segurança da Informação', 2, 50, '2026-11-25 10:00:00', '10:00:00', '12:00:00', 'Auditório Central', 3, 4),
(5, 'Configuração de redes.', 'Minicurso', 'Redes de Computadores', 3, 25, '2026-12-05 09:00:00', '09:00:00', '12:00:00', 'Laboratório 3', 5, 5),
(6, 'Criação de interfaces modernas.', 'Minicurso', 'UX e UI Design', 2, 30, '2026-12-08 14:00:00', '14:00:00', '16:00:00', 'Sala 10', 6, 6),
(7, 'Programação utilizando Python.', 'Palestra', 'Python para Iniciantes', 2, 40, '2026-12-10 09:00:00', '09:00:00', '11:00:00', 'Auditório 2', 7, 7),
(8, 'Análise e visualização de dados.', 'Minicurso', 'Ciência de Dados', 3, 25, '2026-12-12 13:00:00', '13:00:00', '16:00:00', 'Laboratório 2', 8, 8),
(9, 'Desenvolvimento de aplicativos.', 'Palestra', 'Desenvolvimento Mobile', 2, 50, '2026-12-15 09:00:00', '09:00:00', '11:00:00', 'Sala 10', 9, 9),
(10, 'Construção de robôs.', 'Minicurso', 'Robótica na Prática', 4, 20, '2026-12-18 08:00:00', '08:00:00', '12:00:00', 'Ginásio IFAL', 10, 10);


SELECT * FROM usuarios;

SELECT * FROM Palestrante;

SELECT * FROM Evento;

SELECT * FROM Participante;

SELECT * FROM Atividade;

SELECT * FROM Inscricao;
