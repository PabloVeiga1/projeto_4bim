import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas informadas não conferem.");
      return;
    }
    if (formData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (!formData.acceptTerms) {
      setError("Você deve concordar com os termos para prosseguir.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="register-wrapper">
      <main className="register-card">
        <header className="register-header">
          <h1>Criar Conta</h1>
          <p>Preencha os campos abaixo para se cadastrar</p>
        </header>

        {error && (
          <div className="alert-error">
            <span>{error}</span>
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-row">
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
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repita a senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="form-terms">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <span>Concordo com os Termos de Uso e Política de Privacidade</span>
            </label>
          </div>

          <button type="submit" className="btn-solid-primary">
            Cadastrar
          </button>

          <p className="register-footer">
            Já possui uma conta? <Link to="/">Fazer login</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Register;
