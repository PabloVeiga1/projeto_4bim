import conexao from "../config/database.js";

export default class Inscricao {
  static async listar() {
    const [inscricoes] = await conexao.execute(
      `SELECT i.id, DATE_FORMAT(i.data_inscricao, '%Y-%m-%d') AS data_inscricao,
              i.status, i.presenca,
              i.participante_id, p.nome AS participante,
              i.atividade_id, a.titulo AS atividade
       FROM Inscricao i
       JOIN Participante p ON p.id = i.participante_id
       JOIN Atividade a ON a.id = i.atividade_id
       ORDER BY i.id DESC`
    );
    return inscricoes;
  }

  static async listarOpcoes() {
    const [participantes] = await conexao.execute(
      "SELECT id, nome FROM Participante ORDER BY nome"
    );
    const [atividades] = await conexao.execute(
      "SELECT id, titulo, tipo FROM Atividade ORDER BY data, horario_inicio"
    );
    return { participantes, atividades };
  }

  static async buscarPorId(id) {
    const [inscricoes] = await conexao.execute(
      `SELECT id, data_inscricao, status, presenca, participante_id, atividade_id
       FROM Inscricao WHERE id = ?`,
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
