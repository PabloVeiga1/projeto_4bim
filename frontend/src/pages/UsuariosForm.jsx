import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoShieldCheckmarkOutline,
  IoCloseOutline,
  IoCheckmarkOutline
} from "react-icons/io5";
import { apiRequest } from "../services/api";
import "../styles/UsuariosForm.css";

function UsuariosForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioEdicao = location.state?.usuario || null;

  const [formData, setFormData] = useState({
    nome: usuarioEdicao?.nome || "",
    email: usuarioEdicao?.email || "",
    senha: "",
    confirmarSenha: "",
    tipo: usuarioEdicao?.tipo || "Organizador",
    termos: Boolean(usuarioEdicao)
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioEdicao && formData.senha.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      setError("As senhas informadas não conferem.");
      return;
    }

    if (!formData.termos) {
      setError("Por favor, confirme que as informações estão corretas.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        nome: formData.nome,
        email: formData.email,
        tipo: formData.tipo,
        ...(formData.senha ? { senha: formData.senha } : {})
      };

      if (usuarioEdicao) {
        await apiRequest(`/usuarios/${usuarioEdicao.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
      } else {
        await apiRequest("/usuarios", {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/usuarios");
      }, 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <button
          type="button"
          onClick={() => navigate("/usuarios")}
          className="btn-back"
        >
          <IoArrowBackOutline className="btn-icon" />
          <span>Voltar para a lista</span>
        </button>

        <section className="form-card">
          <header className="form-card-header">
            <div className="form-title-row">
              <IoShieldCheckmarkOutline className="form-header-icon" />
              <div>
                <h2>{usuarioEdicao ? "Editar Usuário" : "Novo Usuário"}</h2>
                <p>
                  {usuarioEdicao
                    ? "Atualize os dados e o perfil de acesso do usuário"
                    : "Cadastre um usuário no banco de dados do sistema"}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => navigate("/usuarios")}
              title="Fechar"
            >
              <IoCloseOutline />
            </button>
          </header>

          {error && (
            <div className="alert-error-box">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert-success">
              <IoCheckmarkOutline className="alert-icon" />
              <span>
                {usuarioEdicao
                  ? "Usuário atualizado com sucesso! Redirecionando..."
                  : "Usuário cadastrado com sucesso! Redirecionando..."}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-section">
              <h3>Identificação e Credenciais</h3>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="nome">Nome completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Ex: Ana Souza"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="usuario@evento.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="senha">
                    {usuarioEdicao ? "Nova senha (opcional)" : "Senha *"}
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Mínimo 6 dígitos"
                    value={formData.senha}
                    onChange={handleChange}
                    required={!usuarioEdicao}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="confirmarSenha">Confirmar senha</label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Repita a senha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required={!usuarioEdicao || Boolean(formData.senha)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Permissão de Acesso</h3>
              <div className="form-grid">
                <div className="field-group field-full">
                  <label htmlFor="tipo">Perfil (Tipo de Usuário) *</label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Organizador">Organizador</option>
                    <option value="Participante">Participante</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="terms-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="termos"
                  checked={formData.termos}
                  onChange={handleChange}
                  required
                />
                <span>Confirmo que as informações fornecidas estão corretas.</span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate("/usuarios")}
                disabled={isSubmitting}
              >
                <IoCloseOutline className="btn-icon" />
                <span>Cancelar</span>
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                <IoCheckmarkOutline className="btn-icon" />
                <span>
                  {isSubmitting
                    ? "Salvando..."
                    : usuarioEdicao
                    ? "Salvar Alterações"
                    : "Cadastrar Usuário"}
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UsuariosForm;