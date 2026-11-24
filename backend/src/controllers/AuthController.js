import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const opcoesCookie = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"
};

function erroInterno(res, error, operacao, mensagem) {
  console.error(`Erro ao ${operacao}:`, error);
  return res.status(500).json({ message: mensagem });
}

class AuthController {
  static async registrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos." });
      }
      if (senha.length < 8) {
        return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres." });
      }

      const nomeLimpo = nome.trim();
      const emailLimpo = email.trim().toLowerCase();
      if (await Usuario.buscarPorEmail(emailLimpo)) {
        return res.status(409).json({ message: "Este e-mail já está cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const id = await Usuario.criar(nomeLimpo, emailLimpo, senhaHash, "Participante");
      return res.status(201).json({
        message: "Cadastro realizado com sucesso.",
        usuario: { id, nome: nomeLimpo, email: emailLimpo }
      });
    } catch (error) {
      return erroInterno(res, error, "realizar cadastro", "Erro interno ao realizar cadastro.");
    }
  }

  static async login(req, res) {
    try {
      const { email, senha, rememberMe } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ message: "Informe e-mail e senha." });
      }

      const usuario = await Usuario.buscarPorEmail(email.trim().toLowerCase());
      if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(401).json({ message: "E-mail ou senha incorretos." });
      }

      const duracao = rememberMe ? 7 : 1;
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: `${duracao}d` }
      );
      res.cookie("token", token, {
        ...opcoesCookie,
        maxAge: duracao * 24 * 60 * 60 * 1000
      });

      return res.json({
        message: "Login realizado com sucesso.",
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
      });
    } catch (error) {
      return erroInterno(res, error, "realizar login", "Erro interno ao realizar login.");
    }
  }

  static async verificarSessao(req, res) {
    try {
      const usuario = await Usuario.buscarPorId(req.usuario.id);
      if (!usuario) {
        return res.status(401).json({ message: "Usuário não encontrado." });
      }
      return res.json({ autenticado: true, usuario });
    } catch (error) {
      return erroInterno(res, error, "verificar sessão", "Erro ao verificar sessão.");
    }
  }

  static logout(req, res) {
    res.clearCookie("token", opcoesCookie);
    return res.json({ message: "Logout realizado com sucesso." });
  }
}

export default AuthController;
