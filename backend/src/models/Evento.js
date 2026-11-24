
import conexao from "../config/database.js";

class Evento {

    static async listar() {
        const [eventos] = await conexao.execute(
            "SELECT * FROM Evento"
        );

        return eventos;
    }

    static async buscarPorId(id) {
        const [eventos] = await conexao.execute(
            "SELECT * FROM Evento WHERE id = ?",
            [id]
        );

        return eventos[0] || null;
    }

    static async buscarPorNome(nome) {
        const [eventos] = await conexao.execute(
            "SELECT * FROM Evento WHERE nome LIKE ?",
            [`%${nome}%`]
        );

        return eventos;
    }

    static async criar(evento) {
        const { nome, descricao, local, status, data_inicio, data_fim, idUsuario } = evento;

        const [resultado] = await conexao.execute(
            `INSERT INTO Evento
            (nome, descricao, local, status, data_inicio, data_fim, idUsuario)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, descricao, local, status, data_inicio, data_fim, idUsuario]
        );

        return resultado.insertId;
    }

    static async atualizar(id, evento) {
        const { nome, descricao, local, status, data_inicio, data_fim, idUsuario } = evento;

        const [resultado] = await conexao.execute(
            `UPDATE Evento SET
            nome = ?,
            descricao = ?,
            local = ?,
            status = ?,
            data_inicio = ?,
            data_fim = ?,
            idUsuario = ?
            WHERE id = ?`,
            [nome, descricao, local, status, data_inicio, data_fim, idUsuario, id]
        );

        return resultado.affectedRows;
    }

    static async excluir(id) {
        const [resultado] = await conexao.execute(
            "DELETE FROM Evento WHERE id = ?",
            [id]
        );

        return resultado.affectedRows;
    }
}

export default Evento;
