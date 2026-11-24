import conexao from "../config/database.js";

export default class Participante {
    static async listarParticipantes() {
        const [participantes] = await conexao.execute(
            `SELECT id, nome, cpf, email, telefone, instituicao, curso, tipo
             FROM Participante
             ORDER BY id`
        );
        return participantes;
    }

    static async buscarPorId(id) {
        const [participantes] = await conexao.execute(
            `SELECT id, nome, cpf, email, telefone, instituicao, curso, tipo
             FROM Participante
             WHERE id = ?`,
            [id]
        );
        return participantes[0] || null;
    }

    static async adicionarParticipante(participante) {
        const { nome, email, cpf, telefone, instituicao, curso, tipo } = participante;
        const [resultado] = await conexao.execute(
            `INSERT INTO Participante (nome, email, cpf, telefone, instituicao, curso, tipo)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, email, cpf, telefone, instituicao, curso, tipo]
        );
        return resultado.insertId;
    }

    static async editarParticipante(id, participante) {
        const { nome, email, cpf, telefone, instituicao, curso, tipo } = participante;
        const [resultado] = await conexao.execute(
            `UPDATE Participante
             SET nome = ?, email = ?, cpf = ?, telefone = ?, instituicao = ?, curso = ?, tipo = ?
             WHERE id = ?`,
            [nome, email, cpf, telefone, instituicao, curso, tipo, id]
        );
        return resultado.affectedRows > 0;
    }

    static async deletarParticipante(id) {
        const [resultado] = await conexao.execute(
            "DELETE FROM Participante WHERE id = ?",
            [id]
        );
        return resultado.affectedRows > 0;
    }
}