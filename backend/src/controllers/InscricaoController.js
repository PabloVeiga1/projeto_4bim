import Inscricao from "../models/Inscricao.js";

const statusPermitidos = ["Pendente", "Confirmada", "Cancelada"];
const presencasPermitidas = ["Não informado", "Presente", "Ausente"];

function validarId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function validarDados(body) {
  const participante_id = Number(body?.participante_id);
  const atividade_id = Number(body?.atividade_id);
  const data_inscricao = body?.data_inscricao;
  const status = body?.status;
  const presenca = body?.presenca;

  if (!Number.isInteger(participante_id) || participante_id < 1) {
    return "Selecione um participante.";
  }
  if (!Number.isInteger(atividade_id) || atividade_id < 1) {
    return "Selecione uma atividade.";
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data_inscricao || "")) {
    return "Informe uma data válida.";
  }
  const [ano, mes, dia] = data_inscricao.split("-").map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  if (
    data.getUTCFullYear() !== ano ||
    data.getUTCMonth() !== mes - 1 ||
    data.getUTCDate() !== dia
  ) {
    return "Informe uma data válida.";
  }
  if (!statusPermitidos.includes(status)) {
    return "Selecione um status válido.";
  }
  if (!presencasPermitidas.includes(presenca)) {
    return "Selecione uma opção de presença válida.";
  }

  return { participante_id, atividade_id, data_inscricao, status, presenca };
}

function responderErro(res, error, acao) {
  console.error(`Erro ao ${acao} inscrição:`, error);

  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      message: "Este participante já está inscrito nessa atividade."
    });
  }
  if (error.code === "ER_NO_REFERENCED_ROW_2" || error.code === "ER_NO_REFERENCED_ROW") {
    return res.status(400).json({
      message: "O participante ou a atividade selecionada não existe."
    });
  }
  return res.status(500).json({ message: `Erro ao ${acao} inscrição.` });
}

export default class InscricaoController {
  static async listar(req, res) {
    try {
      return res.json(await Inscricao.listar());
    } catch (error) {
      return responderErro(res, error, "listar");
    }
  }

  static async listarOpcoes(req, res) {
    try {
      return res.json(await Inscricao.listarOpcoes());
    } catch (error) {
      return responderErro(res, error, "carregar opções de");
    }
  }

  static async buscarPorId(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de inscrição inválido." });

    try {
      const inscricao = await Inscricao.buscarPorId(id);
      if (!inscricao) return res.status(404).json({ message: "Inscrição não encontrada." });
      return res.json(inscricao);
    } catch (error) {
      return responderErro(res, error, "buscar");
    }
  }

  static async criar(req, res) {
    const dados = validarDados(req.body);
    if (typeof dados === "string") return res.status(400).json({ message: dados });

    try {
      const id = await Inscricao.criar(dados);
      return res.status(201).json({ message: "Inscrição cadastrada com sucesso.", id });
    } catch (error) {
      return responderErro(res, error, "cadastrar");
    }
  }

  static async editar(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de inscrição inválido." });

    const dados = validarDados(req.body);
    if (typeof dados === "string") return res.status(400).json({ message: dados });

    try {
      const atualizada = await Inscricao.editar(id, dados);
      if (!atualizada && !(await Inscricao.buscarPorId(id))) {
        return res.status(404).json({ message: "Inscrição não encontrada." });
      }
      return res.json({ message: "Inscrição atualizada com sucesso." });
    } catch (error) {
      return responderErro(res, error, "atualizar");
    }
  }

  static async excluir(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de inscrição inválido." });

    try {
      if (!(await Inscricao.excluir(id))) {
        return res.status(404).json({ message: "Inscrição não encontrada." });
      }
      return res.json({ message: "Inscrição excluída com sucesso." });
    } catch (error) {
      return responderErro(res, error, "excluir");
    }
  }
}

