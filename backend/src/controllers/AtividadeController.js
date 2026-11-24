
import Atividade from "../models/Atividade.js";

class AtividadeController {
    static async listar(req, res) {
        try {
            const atividades = await Atividade.listar();
            return res.status(200).json(atividades);
        } catch (erro) {
            return res.status(500).json({
                message: "Erro ao listar atividades.",
                erro: erro.message
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const atividade = await Atividade.buscarPorId(req.params.id);

            if (!atividade) {
                return res.status(404).json({
                    message: "Atividade não encontrada."
                });
            }

            return res.status(200).json(atividade);
        } catch (erro) {
            return res.status(500).json({
                message: "Erro ao buscar atividade.",
                erro: erro.message
            });
        }
    }

    static async criar(req, res) {
        try {
            const id = await Atividade.criar(req.body);

            return res.status(201).json({
                message: "Atividade cadastrada com sucesso!",
                id
            });
        } catch (erro) {
            return res.status(500).json({
                message: "Erro ao cadastrar atividade.",
                erro: erro.message
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const atividade = await Atividade.buscarPorId(req.params.id);

            if (!atividade) {
                return res.status(404).json({
                    message: "Atividade não encontrada."
                });
            }

            await Atividade.atualizar(req.params.id, req.body);

            return res.status(200).json({
                message: "Atividade atualizada com sucesso!"
            });
        } catch (erro) {
            return res.status(500).json({
                message: "Erro ao atualizar atividade.",
                erro: erro.message
            });
        }
    }

    static async excluir(req, res) {
        try {
            const atividade = await Atividade.buscarPorId(req.params.id);

            if (!atividade) {
                return res.status(404).json({
                    message: "Atividade não encontrada."
                });
            }

            await Atividade.excluir(req.params.id);

            return res.status(200).json({
                message: "Atividade excluída com sucesso!"
            });
        } catch (erro) {
            return res.status(500).json({
                message: "Erro ao excluir atividade.",
                erro: erro.message
            });
        }
    }
}

export default AtividadeController;
