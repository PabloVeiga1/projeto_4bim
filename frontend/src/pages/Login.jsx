import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      sessionStorage.removeItem("modo_visitante");
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          senha: password
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Erro ao fazer login.");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcessarSemLogin = () => {
    sessionStorage.setItem("modo_visitante", "true");
    navigate("/dashboard");
  };

  return (
    <div className="login-wrapper">
      <main className="login-card">
        <div className="login-header">
          <div className="login-title-row">
            <h1>Login</h1>
          </div>
          <p>
            Informe suas credenciais para acessar o painel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-box">
              <IoMailOutline className="field-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Senha</label>
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                <span>{showPassword ? "Ocultar" : "Mostrar"}</span>
              </button>
            </div>

            <div className="input-box">
              <IoLockClosedOutline className="field-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="form-options">
            <Link to="/recuperar-senha" className="forgot-link">
              Esqueceu a senha?
            </Link>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-solid-primary"
            disabled={loading}
          >
            <span>
              {loading ? "Entrando..." : "Entrar"}
            </span>
          </button>

          <button
            type="button"
            className="btn-solid-secondary"
            onClick={handleAcessarSemLogin}
          >
            <span>Acessar sem login</span>
          </button>

          <p className="login-footer">
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
