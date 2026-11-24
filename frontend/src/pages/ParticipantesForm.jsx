import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoCheckmarkOutline
} from "react-icons/io5";
import api from "../services/api";
import "../styles/ParticipantesForm.css";

function ParticipanteForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const participanteEdicao = location.state?.participante || null;

  const [formData, setFormData] = useState({
    nome: participanteEdicao?.nome || "",
    cpf: participanteEdicao?.cpf || "",
    email: participanteEdicao?.email || "",
    telefone: participanteEdicao?.telefone || "",
    instituicao: participanteEdicao?.instituicao || "IFAL Maceió",
    curso: participanteEdicao?.curso || "",
    tipo: String(participanteEdicao?.tipo ?? 1),
    termos: Boolean(participanteEdicao)
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termos) {
      alert("Por favor, confirme que as informações estão corretas.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");

    const payload = {
      nome: formData.nome.trim(),
      cpf: formData.cpf.trim(),
      email: formData.email.trim(),
      telefone: formData.telefone.trim(),
      instituicao: formData.instituicao.trim(),
      curso: formData.curso.trim(),
      tipo: Number(formData.tipo)
    };

    try {
      await api(
        participanteEdicao
          ? `/participantes/${participanteEdicao.id}`
          : "/participantes",
        {
          method: participanteEdicao ? "PUT" : "POST",
          body: JSON.stringify(payload)
        }
      );
      setSuccess(true);
      setTimeout(() => {
        navigate("/participantes");
      }, 700);
    } catch (error) {
      setSubmissionError(error.message);
    } finally {
      setIsSubmitting(false);
    }
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
              <div>
                <h2>
                  {participanteEdicao
                    ? "Editar Participante"
                    : "Novo Participante"}
                </h2>
                <p>
                  {participanteEdicao
                    ? "Atualize as informações do participante"
                    : "Cadastre as informações do participante"}
                </p>
              </div>
            </div>
          </header>

          {success && (
            <div className="alert-success">
              <IoCheckmarkOutline className="alert-icon" />
              <span>
                {participanteEdicao
                  ? "Participante atualizado com sucesso! Redirecionando..."
                  : "Participante cadastrado com sucesso! Redirecionando..."}
              </span>
            </div>
          )}

          {submissionError && (
            <div className="alert-error-box" role="alert">
              {submissionError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-section">
              <h3>Dados Pessoais</h3>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="nome">Nome completo <span style={{color:"red"}}>*</span></label>
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
                  <label htmlFor="cpf">CPF <span style={{color:"red"}}>*</span></label>
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
                  <label htmlFor="email">E-mail <span style={{color:"red"}}>*</span></label>
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
                    <option value="1">Estudante</option>
                    <option value="2">Professor</option>
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
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? "Salvando..."
                    : participanteEdicao
                    ? "Salvar Alterações"
                    : "Cadastrar Participante"}
                </span>
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate("/participantes")}
                disabled={isSubmitting}
              >
                <span>Cancelar</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ParticipanteForm;
