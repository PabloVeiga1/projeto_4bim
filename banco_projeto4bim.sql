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

INSERT INTO Usuario (id, tipo, senha, email, nome) VALUES
(1, 'Administrador', 'admin123', 'admin@evento.com', 'Carlos Silva'),
(2, 'Organizador', 'org123', 'ana@evento.com', 'Ana Souza'),
(3, 'Organizador', 'org123', 'pedro@evento.com', 'Pedro Santos'),
(4, 'Organizador', 'org123', 'maria@evento.com', 'Maria Oliveira'),
(5, 'Participante', '123456', 'joao@email.com', 'João Lima'),
(6, 'Participante', '123456', 'lucas@email.com', 'Lucas Costa'),
(7, 'Participante', '123456', 'beatriz@email.com', 'Beatriz Alves'),
(8, 'Participante', '123456', 'marcos@email.com', 'Marcos Rocha'),
(9, 'Participante', '123456', 'julia@email.com', 'Júlia Martins'),
(10, 'Participante', '123456', 'gabriel@email.com', 'Gabriel Ferreira');

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

INSERT INTO Inscricao (id, data_inscricao, status, presenca) VALUES
(1, '2026-11-10', 'Confirmada', 'Presente'),
(2, '2026-11-10', 'Confirmada', 'Presente'),
(3, '2026-11-11', 'Confirmada', 'Ausente'),
(4, '2026-11-11', 'Pendente', 'Não informado'),
(5, '2026-11-12', 'Confirmada', 'Presente'),
(6, '2026-11-12', 'Confirmada', 'Presente'),
(7, '2026-11-13', 'Cancelada', 'Não informado'),
(8, '2026-11-13', 'Confirmada', 'Ausente'),
(9, '2026-11-14', 'Confirmada', 'Presente'),
(10, '2026-11-14', 'Pendente', 'Não informado');

INSERT INTO Atividade
(id, descricao, tipo, titulo, carga_horaria, vagas, data,
 horario_inicio, horario_fim, sala, evento_id, palestrante_id, idInscricao)
VALUES
(1, 'Introdução ao desenvolvimento web.', 'Palestra', 'Desenvolvimento Web', 2, 50, '2026-11-20 09:00:00', '09:00:00', '11:00:00', 'Auditório 1', 1, 1, 1),
(2, 'Fundamentos de inteligência artificial.', 'Palestra', 'Introdução à IA', 2, 40, '2026-11-20 14:00:00', '14:00:00', '16:00:00', 'Auditório 1', 1, 2, 2),
(3, 'Aprendendo consultas SQL.', 'Workshop', 'Banco de Dados na Prática', 3, 30, '2026-11-23 09:00:00', '09:00:00', '12:00:00', 'Laboratório 1', 2, 3, 3),
(4, 'Conceitos de segurança digital.', 'Palestra', 'Segurança da Informação', 2, 50, '2026-11-25 10:00:00', '10:00:00', '12:00:00', 'Auditório Central', 3, 4, 4),
(5, 'Configuração de redes.', 'Workshop', 'Redes de Computadores', 3, 25, '2026-12-05 09:00:00', '09:00:00', '12:00:00', 'Laboratório 3', 5, 5, 5),
(6, 'Criação de interfaces modernas.', 'Workshop', 'UX e UI Design', 2, 30, '2026-12-08 14:00:00', '14:00:00', '16:00:00', 'Sala 10', 6, 6, 6),
(7, 'Programação utilizando Python.', 'Palestra', 'Python para Iniciantes', 2, 40, '2026-12-10 09:00:00', '09:00:00', '11:00:00', 'Auditório 2', 7, 7, 7),
(8, 'Análise e visualização de dados.', 'Workshop', 'Ciência de Dados', 3, 25, '2026-12-12 13:00:00', '13:00:00', '16:00:00', 'Laboratório 2', 8, 8, 8),
(9, 'Desenvolvimento de aplicativos.', 'Palestra', 'Desenvolvimento Mobile', 2, 50, '2026-12-15 09:00:00', '09:00:00', '11:00:00', 'Sala 10', 9, 9, 9),
(10, 'Construção de robôs.', 'Workshop', 'Robótica na Prática', 4, 20, '2026-12-18 08:00:00', '08:00:00', '12:00:00', 'Ginásio IFAL', 10, 10, 10);

INSERT INTO Participante
(id, nome, cpf, email, telefone, instituicao, curso, tipo, idInscricao)
VALUES
(1, 'João Lima', '111.111.111-01', 'joao@email.com', '82988880001', 'IFAL', 'Informática', 1, 1),
(2, 'Lucas Costa', '111.111.111-02', 'lucas@email.com', '82988880002', 'IFAL', 'Sistemas de Informação', 1, 2),
(3, 'Beatriz Alves', '111.111.111-03', 'beatriz@email.com', '82988880003', 'UFAL', 'Ciência da Computação', 2, 3),
(4, 'Marcos Rocha', '111.111.111-04', 'marcos@email.com', '82988880004', 'IFAL', 'Informática', 1, 4),
(5, 'Júlia Martins', '111.111.111-05', 'julia@email.com', '82988880005', 'UFAL', 'Engenharia de Computação', 2, 5),
(6, 'Gabriel Ferreira', '111.111.111-06', 'gabriel@email.com', '82988880006', 'IFAL', 'Informática', 1, 6),
(7, 'Ana Clara', '111.111.111-07', 'anaclara@email.com', '82988880007', 'CESMAC', 'Sistemas de Informação', 2, 7),
(8, 'Pedro Henrique', '111.111.111-08', 'pedro@email.com', '82988880008', 'IFAL', 'Informática', 1, 8),
(9, 'Mariana Souza', '111.111.111-09', 'mariana@email.com', '82988880009', 'UFAL', 'Ciência da Computação', 2, 9),
(10, 'Rafael Santos', '111.111.111-10', 'rafael@email.com', '82988880010', 'IFAL', 'Informática', 1, 10);

-- Consultas com JOIN --
SELECT
    Evento.nome AS evento,
    Evento.local,
    Evento.data_inicio,
    Evento.data_fim,
    Usuario.nome AS organizador
FROM Evento
INNER JOIN Usuario
    ON Evento.idUsuario = Usuario.id;


SELECT
    Atividade.titulo AS atividade,
    Atividade.tipo,
    Evento.nome AS evento,
    Palestrante.nome AS palestrante,
    Atividade.carga_horaria
FROM Atividade
INNER JOIN Evento
    ON Atividade.evento_id = Evento.id
INNER JOIN Palestrante
    ON Atividade.palestrante_id = Palestrante.id;


SELECT
    Participante.nome AS participante,
    Participante.curso,
    Participante.instituicao,
    Inscricao.data_inscricao,
    Inscricao.status,
    Inscricao.presenca
FROM Participante
INNER JOIN Inscricao
    ON Participante.idInscricao = Inscricao.id;

-- Consulta com GROUP BY --

SELECT
    Evento.nome AS evento,
    COUNT(Atividade.id) AS quantidade_atividades,
    SUM(Atividade.carga_horaria) AS carga_horaria_total
FROM Evento
INNER JOIN Atividade
    ON Evento.id = Atividade.evento_id
GROUP BY Evento.id, Evento.nome
ORDER BY quantidade_atividades DESC;
