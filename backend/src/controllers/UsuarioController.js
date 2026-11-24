import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";

const TIPOS_PERMITIDOS = ["Administrador", "Organizador", "Participante"];

function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

function responderErro(res, error, operacao) {
  console.error(`Erro ao ${operacao} usuário:`, error);

  if (
    operacao === "excluir" &&
    (error.code === "ER_ROW_IS_REFERENCED_2" || error.code === "ER_ROW_IS_REFERENCED")
  ) {
    return res.status(409).json({
      message: "Não é possível excluir: existem eventos vinculados a este usuário."
    });
  }

  return res.status(500).json({ message: `Erro ao ${operacao} usuário.` });
}

class UsuarioController {
  static async listar(req, res) {
    try {
      const usuarios = await Usuario.listar();
      return res.json(usuarios);
    } catch (error) {
      return responderErro(res, error, "listar");
    }
  }

  static async buscarPorId(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de usuário inválido." });

    try {
      const usuario = await Usuario.buscarPorId(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      return res.json(usuario);
    } catch (error) {
      return responderErro(res, error, "buscar");
    }
  }

  static async criar(req, res) {
    const nome = texto(req.body?.nome);
    const email = texto(req.body?.email).toLowerCase();
    const senha = typeof req.body?.senha === "string" ? req.body.senha : "";
    const tipo = texto(req.body?.tipo);

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ message: "Nome, e-mail, senha e perfil são obrigatórios." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Informe um e-mail válido." });
    }
    if (nome.length > 100 || email.length > 150) {
      return res.status(400).json({ message: "Nome ou e-mail excedem o limite permitido." });
    }
    if (senha.length < 6) {
      return res.status(400).json({ message: "A senha deve ter no mínimo 6 caracteres." });
    }
    if (!TIPOS_PERMITIDOS.includes(tipo)) {
      return res.status(400).json({ message: "Perfil de usuário inválido." });
    }

    try {
      const jaExiste = await Usuario.buscarPorEmail(email);
      if (jaExiste) {
        return res.status(409).json({ message: "Este e-mail já está cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const id = await Usuario.criar(nome, email, senhaHash, tipo);

      return res.status(201).json({
        message: "Usuário cadastrado com sucesso.",
        id
      });
    } catch (error) {
      return responderErro(res, error, "cadastrar");
    }
  }

  static async atualizar(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de usuário inválido." });

    const nome = texto(req.body?.nome);
    const email = texto(req.body?.email).toLowerCase();
    const senha = typeof req.body?.senha === "string" ? req.body.senha : "";
    const tipo = texto(req.body?.tipo);

    if (!nome || !email || !tipo) {
      return res.status(400).json({ message: "Nome, e-mail e perfil são obrigatórios." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Informe um e-mail válido." });
    }
    if (nome.length > 100 || email.length > 150) {
      return res.status(400).json({ message: "Nome ou e-mail excedem o limite permitido." });
    }
    if (senha && senha.length < 6) {
      return res.status(400).json({ message: "A nova senha deve ter no mínimo 6 caracteres." });
    }
    if (!TIPOS_PERMITIDOS.includes(tipo)) {
      return res.status(400).json({ message: "Perfil de usuário inválido." });
    }

    try {
      const existente = await Usuario.buscarPorId(id);
      if (!existente) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const emailEmUso = await Usuario.buscarPorEmail(email);
      if (emailEmUso && emailEmUso.id !== id) {
        return res.status(409).json({ message: "Este e-mail já está sendo usado por outro usuário." });
      }

      const senhaHash = senha ? await bcrypt.hash(senha, 10) : null;
      await Usuario.atualizar(id, { nome, email, tipo, senhaHash });

      return res.json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      return responderErro(res, error, "atualizar");
    }
  }

  static async excluir(req, res) {
    const id = validarId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID de usuário inválido." });

    try {
      const excluido = await Usuario.excluir(id);
      if (!excluido) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      return res.json({ message: "Usuário excluído com sucesso." });
    } catch (error) {
      return responderErro(res, error, "excluir");
    }
  }
}

export default UsuarioController;