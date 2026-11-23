import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"
};

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

      const usuarioExistente = await Usuario.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(409).json({ message: "Este e-mail já está cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const id = await Usuario.criar(
        nome.trim(),
        email.trim().toLowerCase(),
        senhaHash
      );

      return res.status(201).json({
        message: "Cadastro realizado com sucesso.",
        usuario: {
          id,
          nome: nome.trim(),
          email: email.trim().toLowerCase()
        }
      });
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return res.status(500).json({ message: "Erro interno ao realizar cadastro." });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha, rememberMe } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ message: "Informe e-mail e senha." });
      }

      const usuario = await Usuario.buscarPorEmail(email.trim().toLowerCase());
      if (!usuario) {
        return res.status(401).json({ message: "E-mail ou senha incorretos." });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ message: "E-mail ou senha incorretos." });
      }

      const tempoExpiracao = rememberMe ? "7d" : "1d";
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: tempoExpiracao }
      );

      const maxAge = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
      res.cookie("token", token, { ...cookieConfig, maxAge });

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno ao realizar login." });
    }
  }

  static async verificarSessao(req, res) {
    try {
      const usuario = await Usuario.buscarPorId(req.usuario.id);
      if (!usuario) {
        return res.status(401).json({ message: "Usuário não encontrado." });
      }

      return res.status(200).json({
        autenticado: true,
        usuario
      });
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      return res.status(500).json({ message: "Erro ao verificar sessão." });
    }
  }

  static logout(req, res) {
    res.clearCookie("token", cookieConfig);
    return res.status(200).json({ message: "Logout realizado com sucesso." });
  }
}

export default AuthController;
