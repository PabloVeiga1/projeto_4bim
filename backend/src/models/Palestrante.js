import conexao from "../config/database.js";

export default class Palestrante {
  static async listar() {
    const [palestrantes] = await conexao.execute(
      `SELECT id, nome, email, telefone, instituicao, especialidade, mini_biografia
       FROM Palestrante
       ORDER BY id DESC`
    );
    return palestrantes;
  }

  static async buscarPorId(id) {
    const [palestrantes] = await conexao.execute(
      `SELECT id, nome, email, telefone, instituicao, especialidade, mini_biografia
       FROM Palestrante
       WHERE id = ?`,
      [id]
    );
    return palestrantes[0] || null;
  }

  static async criar(palestrante) {
    const { nome, email, telefone, instituicao, especialidade, mini_biografia } = palestrante;
    const [resultado] = await conexao.execute(
      `INSERT INTO Palestrante (nome, email, telefone, instituicao, especialidade, mini_biografia)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, email, telefone, instituicao, especialidade, mini_biografia]
    );
    return resultado.insertId;
  }

  static async atualizar(id, palestrante) {
    const { nome, email, telefone, instituicao, especialidade, mini_biografia } = palestrante;
    const [resultado] = await conexao.execute(
      `UPDATE Palestrante
       SET nome = ?, email = ?, telefone = ?, instituicao = ?, especialidade = ?, mini_biografia = ?
       WHERE id = ?`,
      [nome, email, telefone, instituicao, especialidade, mini_biografia, id]
    );
    return resultado.affectedRows > 0;
  }

  static async excluir(id) {
    const [resultado] = await conexao.execute(
      "DELETE FROM Palestrante WHERE id = ?",
      [id]
    );
    return resultado.affectedRows > 0;
  }
}