import Participante from "../models/Participante.js";

function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

function validarDados(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { erro: "Envie os dados do participante em formato JSON." };
  }

  const dados = {
    nome: texto(body.nome),
    email: texto(body.email).toLowerCase(),
    cpf: texto(body.cpf),
    telefone: texto(body.telefone) || null,
    instituicao: texto(body.instituicao) || null,
    curso: texto(body.curso) || null,
    tipo: Number(body.tipo)
  };

  if (!dados.nome || !dados.email || !dados.cpf) {
    return { erro: "Nome, e-mail e CPF são obrigatórios." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    return { erro: "Informe um e-mail válido." };
  }
  if (
    dados.nome.length > 150 ||
    dados.email.length > 150 ||
    dados.cpf.length > 14 ||
    dados.telefone?.length > 20 ||
    dados.instituicao?.length > 150 ||
    dados.curso?.length > 150
  ) {
    return { erro: "Um ou mais campos excedem o tamanho permitido." };
  }
  if (!Number.isSafeInteger(dados.tipo) || dados.tipo < 1 || dados.tipo > 2147483647) {
    return { erro: "O tipo deve ser um número inteiro positivo." };
  }

  return { dados };
}

function responderErro(res, error, operacao) {
  console.error(`Erro ao ${operacao} participante:`, error);

  if (
    operacao === "excluir" &&
    (error.code === "ER_ROW_IS_REFERENCED_2" || error.code === "ER_ROW_IS_REFERENCED")
  ) {
    return res.status(409).json({
      message: "Não é possível excluir: existem inscrições vinculadas."
    });
  }

  return res.status(500).json({ message: `Erro ao ${operacao} participante.` });
}

export default class ParticipanteController {
  static async listar(req, res) {
    try {
      return res.json(await Participante.listarParticipantes());
    } catch (error) {
      return responderErro(res, error, "listar");
    }
  }

  static async buscarPorId(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de participante inválido." });

    try {
      const participante = await Participante.buscarPorId(id);
      if (!participante) {
        return res.status(404).json({ message: "Participante não encontrado." });
      }
      return res.json(participante);
    } catch (error) {
      return responderErro(res, error, "buscar");
    }
  }

  static async criar(req, res) {
    const resultado = validarDados(req.body);
    if (resultado.erro) return res.status(400).json({ message: resultado.erro });

    try {
      const id = await Participante.adicionarParticipante(resultado.dados);
      return res.status(201).json({ message: "Participante cadastrado com sucesso.", id });
    } catch (error) {
      return responderErro(res, error, "cadastrar");
    }
  }

  static async editar(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de participante inválido." });

    const resultado = validarDados(req.body);
    if (resultado.erro) return res.status(400).json({ message: resultado.erro });

    try {
      const atualizado = await Participante.editarParticipante(id, resultado.dados);
      if (!atualizado && !(await Participante.buscarPorId(id))) {
        return res.status(404).json({ message: "Participante não encontrado." });
      }
      return res.json({ message: "Participante atualizado com sucesso." });
    } catch (error) {
      return responderErro(res, error, "atualizar");
    }
  }

  static async excluir(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de participante inválido." });

    try {
      const excluido = await Participante.deletarParticipante(id);
      if (!excluido) {
        return res.status(404).json({ message: "Participante não encontrado." });
      }
      return res.json({ message: "Participante excluído com sucesso." });
    } catch (error) {
      return responderErro(res, error, "excluir");
    }
  }
}

