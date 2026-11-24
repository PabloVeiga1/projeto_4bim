import conexao from "../config/database.js";

export default class Usuario {
  static async listar() {
    const [usuarios] = await conexao.execute(
      `SELECT id, nome, email, tipo, criado_em
       FROM usuarios
       ORDER BY id DESC`
    );
    return usuarios;
  }

  static async buscarPorEmail(email) {
    const [usuarios] = await conexao.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    return usuarios[0] || null;
  }

  static async buscarPorId(id) {
    const [usuarios] = await conexao.execute(
      "SELECT id, nome, email, tipo, criado_em FROM usuarios WHERE id = ?",
      [id]
    );
    return usuarios[0] || null;
  }

  static async criar(nome, email, senha, tipo) {
    const [resultado] = await conexao.execute(
      `INSERT INTO usuarios (nome, email, senha, tipo)
       VALUES (?, ?, ?, ?)`,
      [nome, email, senha, tipo]
    );
    return resultado.insertId;
  }

  static async atualizar(id, { nome, email, tipo, senhaHash }) {
    if (senhaHash) {
      const [resultado] = await conexao.execute(
        `UPDATE usuarios
         SET nome = ?, email = ?, tipo = ?, senha = ?
         WHERE id = ?`,
        [nome, email, tipo, senhaHash, id]
      );
      return resultado.affectedRows > 0;
    }

    const [resultado] = await conexao.execute(
      `UPDATE usuarios
       SET nome = ?, email = ?, tipo = ?
       WHERE id = ?`,
      [nome, email, tipo, id]
    );
    return resultado.affectedRows > 0;
  }

  static async excluir(id) {
    const [resultado] = await conexao.execute(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );
    return resultado.affectedRows > 0;
  }
}
