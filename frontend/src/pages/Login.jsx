import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  IoPersonCircleSharp, 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoEyeOutline, 
  IoEyeOffOutline, 
  IoLogInOutline,
  IoFlashOutline
} from "react-icons/io5";
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
          <div className="login-title-row">
            <IoPersonCircleSharp className="login-header-icon" />
            <h1>Login</h1>
          </div>
          <p>Informe suas credenciais para acessar o painel</p>
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
            <IoLogInOutline className="btn-icon" />
            <span>Entrar</span>
          </button>

          <button
            type="button"
            className="btn-solid-secondary"
            onClick={() => navigate("/dashboard")}
          >
            <IoFlashOutline className="btn-icon" />
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

export default Login;
