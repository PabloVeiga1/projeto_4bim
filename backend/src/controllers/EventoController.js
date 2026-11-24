
import Evento from "../models/Evento.js";

class EventoController {

    static async listar(req, res) {
        try {
            const eventos = await Evento.listar();

            return res.status(200).json(eventos);

        } catch (error) {
            console.error("Erro ao listar eventos:", error);
            return res.status(500).json({
                mensagem: "Erro ao buscar eventos."
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const evento = await Evento.buscarPorId(id);

            if (!evento) {
                return res.status(404).json({
                    mensagem: "Evento não encontrado."
                });
            }

            return res.status(200).json(evento);

        } catch (error) {
            console.error("Erro ao buscar evento:", error);
            return res.status(500).json({
                mensagem: "Erro ao buscar evento."
            });
        }
    }

    static async buscarPorNome(req, res) {
        try {
            const { nome } = req.query;

            if (!nome) {
                return res.status(400).json({
                    mensagem: "Informe o nome do evento."
                });
            }

            const eventos = await Evento.buscarPorNome(nome);

            return res.status(200).json(eventos);

        } catch (error) {
            console.error("Erro ao pesquisar eventos:", error);
            return res.status(500).json({
                mensagem: "Erro ao pesquisar eventos."
            });
        }
    }

    static async criar(req, res) {
        try {
            const evento = req.body;

            const id = await Evento.criar(evento);

            return res.status(201).json({
                mensagem: "Evento cadastrado com sucesso!",
                id
            });

        } catch (error) {
            console.error("Erro ao cadastrar evento:", error);
            return res.status(500).json({
                mensagem: "Erro ao cadastrar evento."
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const evento = req.body;

            const resultado = await Evento.atualizar(id, evento);

            if (resultado === 0) {
                return res.status(404).json({
                    mensagem: "Evento não encontrado ou sem alterações."
                });
            }

            return res.status(200).json({
                mensagem: "Evento atualizado com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
            return res.status(500).json({
                mensagem: "Erro ao atualizar evento."
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;

            const resultado = await Evento.excluir(id);

            if (resultado === 0) {
                return res.status(404).json({
                    mensagem: "Evento não encontrado."
                });
            }

            return res.status(200).json({
                mensagem: "Evento excluído com sucesso!"
            });

        } catch (error) {
            console.error("Erro ao excluir evento:", error);
            return res.status(500).json({
                mensagem: "Erro ao excluir evento. Verifique se existem atividades vinculadas."
            });
        }
    }
}

export default EventoController;
