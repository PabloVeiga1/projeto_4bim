import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoPersonAddOutline,
  IoCloseOutline,
  IoCheckmarkOutline
} from "react-icons/io5";
import "../styles/ParticipantesForm.css";

function ParticipanteForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    instituicao: "IFAL Maceió",
    curso: "",
    tipo: "Estudante",
    termos: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termos) {
      alert("Por favor, confirme que as informações estão corretas.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/participantes");
      }, 800);
    }, 400);
  };

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <button
          type="button"
          onClick={() => navigate("/participantes")}
          className="btn-back"
        >
          <IoArrowBackOutline className="btn-icon" />
          <span>Voltar para a lista</span>
        </button>

        <section className="form-card">
          <header className="form-card-header">
            <div className="form-title-row">
              <IoPersonAddOutline className="form-header-icon" />
              <div>
                <h2>Novo Participante</h2>
                <p>Cadastre as informações do participante</p>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => navigate("/participantes")}
              title="Fechar"
            >
              <IoCloseOutline />
            </button>
          </header>

          {success && (
            <div className="alert-success">
              <IoCheckmarkOutline className="alert-icon" />
              <span>Participante cadastrado com sucesso! Redirecionando...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-section">
              <h3>Dados Pessoais</h3>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="nome">Nome completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Ex: Pablo Vinícius"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="cpf">CPF *</label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
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
                    placeholder="exemplo@ifal.edu.br"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="telefone">Telefone</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    placeholder="(82) 99999-9999"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Vínculo e Categoria</h3>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="instituicao">Instituição</label>
                  <input
                    type="text"
                    id="instituicao"
                    name="instituicao"
                    placeholder="Ex: IFAL Maceió"
                    value={formData.instituicao}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="curso">Curso</label>
                  <input
                    type="text"
                    id="curso"
                    name="curso"
                    placeholder="Ex: Informática"
                    value={formData.curso}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-group field-full">
                  <label htmlFor="tipo">Tipo de Participante</label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                  >
                    <option value="Estudante">Estudante</option>
                    <option value="Professor">Professor</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Profissional">Profissional</option>
                    <option value="Visitante">Visitante</option>
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
                onClick={() => navigate("/participantes")}
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
                <span>{isSubmitting ? "Salvando..." : "Cadastrar Participante"}</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ParticipanteForm;
