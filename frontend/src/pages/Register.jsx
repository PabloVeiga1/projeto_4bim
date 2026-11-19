import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline, IoMailOutline, IoLockClosedOutline } from "react-icons/io5";

import api from "../services/api";

import "../styles/Login.css";

function Register() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const resposta = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      });

      setSuccess(resposta.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <main className="login-card">

        <div className="login-header">
          <h1>Cadastro</h1>
          <p>Crie sua conta para acessar o sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label htmlFor="nome">Nome</label>

            <div className="input-box">
              <IoPersonOutline className="field-icon" />

              <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                maxLength={100}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>

            <div className="input-box">
              <IoMailOutline className="field-icon" />

              <input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={150}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>

            <div className="input-box">
              <IoLockClosedOutline className="field-icon" />

              <input
                id="senha"
                type="password"
                placeholder="Mínimo de 8 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">
              Confirmar senha
            </label>

            <div className="input-box">
              <IoLockClosedOutline className="field-icon" />

              <input
                id="confirmarSenha"
                type="password"
                placeholder="Repita sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="login-success" role="status">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="btn-solid-primary"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Criar conta"}
          </button>

          <p className="login-footer">
            Já possui uma conta? <Link to="/login">Entrar</Link>
          </p>

        </form>
      </main>
    </div>
  );
}

export default Register;
