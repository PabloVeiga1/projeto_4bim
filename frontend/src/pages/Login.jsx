import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-wrapper">
      <main className="login-card">
        <div className="login-header">
          <h1>Entrar</h1>
          <p>Informe suas credenciais para acessar o painel</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
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

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Senha</label>
              <button
                type="button"
                className="btn-link-action"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
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

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Lembrar de mim</span>
            </label>
            <a
              href="#recuperar"
              onClick={(e) => {
                e.preventDefault();
                alert("Instruções enviadas para o seu e-mail.");
              }}
              className="forgot-link"
            >
              Esqueceu a senha?
            </a>
          </div>

          <button type="submit" className="btn-solid-primary">
            Entrar
          </button>

          <button
            type="button"
            className="btn-solid-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Acessar sem login
          </button>

          <p className="login-footer">
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
