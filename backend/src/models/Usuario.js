import conexao from "../config/database.js";

class Usuario {
  static async buscarPorEmail(email) {
    const [usuarios] = await conexao.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    return usuarios[0] || null;
  }
  
  static async buscarPorId(id) {
    const [usuarios] = await conexao.execute(
      "SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?",
      [id]
    );
    return usuarios[0] || null;
  }

  static async criar(nome, email, senha) {
    const [resultado] = await conexao.execute(
      `INSERT INTO usuarios (nome, email, senha)
       VALUES (?, ?, ?)`,
      [nome, email, senha]
    );
    return resultado.insertId;
  }
}

export default Usuario;
