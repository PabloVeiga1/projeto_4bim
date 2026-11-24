import Palestrante from "../models/Palestrante.js";

function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

function validarDados(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { erro: "Envie os dados do palestrante em formato JSON." };
  }

  const dados = {
    nome: texto(body.nome),
    email: texto(body.email).toLowerCase(),
    telefone: texto(body.telefone) || null,
    instituicao: texto(body.instituicao),
    especialidade: texto(body.especialidade),
    mini_biografia: texto(body.mini_biografia) || null
  };

  if (!dados.nome || !dados.email || !dados.instituicao || !dados.especialidade) {
    return { erro: "Nome, e-mail, instituição e especialidade são obrigatórios." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    return { erro: "Informe um e-mail válido." };
  }

  if (
    dados.nome.length > 150 ||
    dados.email.length > 150 ||
    (dados.telefone && dados.telefone.length > 20) ||
    dados.instituicao.length > 150 ||
    dados.especialidade.length > 150
  ) {
    return { erro: "Um ou mais campos excedem o tamanho máximo permitido." };
  }

  return { dados };
}

function responderErro(res, error, operacao) {
  console.error(`Erro ao ${operacao} palestrante:`, error);

  if (
    operacao === "excluir" &&
    (error.code === "ER_ROW_IS_REFERENCED_2" || error.code === "ER_ROW_IS_REFERENCED")
  ) {
    return res.status(409).json({
      message: "Não é possível excluir: existem atividades vinculadas a este palestrante."
    });
  }

  return res.status(500).json({ message: `Erro ao ${operacao} palestrante.` });
}

class PalestranteController {
  static async listar(req, res) {
    try {
      const lista = await Palestrante.listar();
      return res.json(lista);
    } catch (error) {
      return responderErro(res, error, "listar");
    }
  }

  static async buscarPorId(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de palestrante inválido." });

    try {
      const palestrante = await Palestrante.buscarPorId(id);
      if (!palestrante) {
        return res.status(404).json({ message: "Palestrante não encontrado." });
      }
      return res.json(palestrante);
    } catch (error) {
      return responderErro(res, error, "buscar");
    }
  }

  static async criar(req, res) {
    const resultado = validarDados(req.body);
    if (resultado.erro) return res.status(400).json({ message: resultado.erro });

    try {
      const id = await Palestrante.criar(resultado.dados);
      return res.status(201).json({
        message: "Palestrante cadastrado com sucesso.",
        id
      });
    } catch (error) {
      return responderErro(res, error, "cadastrar");
    }
  }

  static async atualizar(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de palestrante inválido." });

    const resultado = validarDados(req.body);
    if (resultado.erro) return res.status(400).json({ message: resultado.erro });

    try {
      const existente = await Palestrante.buscarPorId(id);
      if (!existente) {
        return res.status(404).json({ message: "Palestrante não encontrado." });
      }

      await Palestrante.atualizar(id, resultado.dados);
      return res.json({ message: "Palestrante atualizado com sucesso." });
    } catch (error) {
      return responderErro(res, error, "atualizar");
    }
  }

  static async excluir(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de palestrante inválido." });

    try {
      const excluido = await Palestrante.excluir(id);
      if (!excluido) {
        return res.status(404).json({ message: "Palestrante não encontrado." });
      }
      return res.json({ message: "Palestrante excluído com sucesso." });
    } catch (error) {
      return responderErro(res, error, "excluir");
    }
  }
}

export default PalestranteController;