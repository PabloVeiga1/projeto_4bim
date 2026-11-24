import conexao from "../config/database.js";

export default class Inscricao {
  static async listar() {
    const [inscricoes] = await conexao.execute(
      `SELECT i.id, DATE_FORMAT(i.data_inscricao, '%Y-%m-%d') AS data_inscricao,
              i.status, i.presenca,
              i.participante_id, p.nome AS participante,
              i.atividade_id, a.titulo AS atividade, e.nome AS evento,
              pa.nome AS palestrante
       FROM Inscricao i
       JOIN Participante p ON p.id = i.participante_id
       JOIN Atividade a ON a.id = i.atividade_id
       JOIN Evento e ON e.id = a.evento_id
       LEFT JOIN Palestrante pa ON pa.id = a.palestrante_id
       ORDER BY i.id DESC`
    );
    return inscricoes;
  }

  static async listarOpcoes() {
    const [participantes] = await conexao.execute(
      "SELECT id, nome FROM Participante ORDER BY nome"
    );
    const [atividades] = await conexao.execute(
      `SELECT a.id, a.titulo, a.tipo, e.nome AS evento, p.nome AS palestrante
       FROM Atividade a
       JOIN Evento e ON e.id = a.evento_id
       LEFT JOIN Palestrante p ON p.id = a.palestrante_id
       ORDER BY a.data, a.horario_inicio`
    );

    const [resumo] = await conexao.execute(
      `SELECT a.id AS atividade_id, a.titulo AS atividade, e.nome AS evento,
              COUNT(i.id) AS total,
              SUM(CASE WHEN i.status = 'Confirmada' THEN 1 ELSE 0 END) AS confirmadas,
              SUM(CASE WHEN i.presenca = 'Presente' THEN 1 ELSE 0 END) AS presentes
       FROM Atividade a
       JOIN Evento e ON e.id = a.evento_id
       LEFT JOIN Inscricao i ON i.atividade_id = a.id
       GROUP BY a.id, a.titulo, e.nome
       ORDER BY e.nome, a.titulo`
    );

    return { participantes, atividades, resumo };
  }

  static async buscarPorId(id) {
    const [inscricoes] = await conexao.execute(
      `SELECT i.id, DATE_FORMAT(i.data_inscricao, '%Y-%m-%d') AS data_inscricao,
              i.status, i.presenca, i.participante_id, p.nome AS participante,
              i.atividade_id, a.titulo AS atividade, e.nome AS evento,
              pa.nome AS palestrante
       FROM Inscricao i
       JOIN Participante p ON p.id = i.participante_id
       JOIN Atividade a ON a.id = i.atividade_id
       JOIN Evento e ON e.id = a.evento_id
       LEFT JOIN Palestrante pa ON pa.id = a.palestrante_id
       WHERE i.id = ?`,
      [id]
    );
    return inscricoes[0] || null;
  }

  static async criar(inscricao) {
    const { data_inscricao, status, presenca, participante_id, atividade_id } = inscricao;
    const [resultado] = await conexao.execute(
      `INSERT INTO Inscricao (data_inscricao, status, presenca, participante_id, atividade_id)
       VALUES (?, ?, ?, ?, ?)`,
      [data_inscricao, status, presenca, participante_id, atividade_id]
    );
    return resultado.insertId;
  }

  static async editar(id, inscricao) {
    const { data_inscricao, status, presenca, participante_id, atividade_id } = inscricao;
    const [resultado] = await conexao.execute(
      `UPDATE Inscricao
       SET data_inscricao = ?, status = ?, presenca = ?, participante_id = ?, atividade_id = ?
       WHERE id = ?`,
      [data_inscricao, status, presenca, participante_id, atividade_id, id]
    );
    return resultado.affectedRows > 0;
  }

  static async excluir(id) {
    const [resultado] = await conexao.execute(
      "DELETE FROM Inscricao WHERE id = ?",
      [id]
    );
    return resultado.affectedRows > 0;
  }
}
