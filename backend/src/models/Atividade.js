
import conexao from "../config/database.js";

class Atividade {
    static async listar() {
        const [atividades] = await conexao.execute(
            "SELECT * FROM Atividade ORDER BY data ASC"
        );

        return atividades;
    }

    static async buscarPorId(id) {
        const [atividades] = await conexao.execute(
            "SELECT * FROM Atividade WHERE id = ?",
            [id]
        );

        return atividades[0] || null;
    }

    static async criar(dados) {
        const {
            descricao,
            tipo,
            titulo,
            carga_horaria,
            vagas,
            data,
            horario_inicio,
            horario_fim,
            sala,
            evento_id,
            palestrante_id,
            idInscricao
        } = dados;

        const [resultado] = await conexao.execute(
            `INSERT INTO Atividade
            (descricao, tipo, titulo, carga_horaria, vagas, data,
             horario_inicio, horario_fim, sala, evento_id,
             palestrante_id, idInscricao)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                descricao,
                tipo,
                titulo,
                carga_horaria,
                vagas,
                data,
                horario_inicio,
                horario_fim,
                sala,
                evento_id,
                palestrante_id,
                idInscricao
            ]
        );

        return resultado.insertId;
    }

    static async atualizar(id, dados) {
        const {
            descricao,
            tipo,
            titulo,
            carga_horaria,
            vagas,
            data,
            horario_inicio,
            horario_fim,
            sala,
            evento_id,
            palestrante_id,
            idInscricao
        } = dados;

        await conexao.execute(
            `UPDATE Atividade SET
            descricao = ?, tipo = ?, titulo = ?, carga_horaria = ?,
            vagas = ?, data = ?, horario_inicio = ?, horario_fim = ?,
            sala = ?, evento_id = ?, palestrante_id = ?, idInscricao = ?
            WHERE id = ?`,
            [
                descricao,
                tipo,
                titulo,
                carga_horaria,
                vagas,
                data,
                horario_inicio,
                horario_fim,
                sala,
                evento_id,
                palestrante_id,
                idInscricao,
                id
            ]
        );
    }

    static async excluir(id) {
        await conexao.execute(
            "DELETE FROM Atividade WHERE id = ?",
            [id]
        );
    }
}

export default Atividade;
