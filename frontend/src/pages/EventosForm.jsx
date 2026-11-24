
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoCalendarOutline,
  IoCloseOutline,
  IoCheckmarkOutline
} from "react-icons/io5";

import api from "../services/api";
import "../styles/EventosForm.css";

function EventosForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    local: "",
    status: "Planejado",
    data_inicio: "",
    data_fim: ""
  });

  const [idUsuario, setIdUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const respostaUsuario = await api("/auth/me");
        setIdUsuario(respostaUsuario.usuario.id);

        if (id) {
          const evento = await api(`/eventos/${id}`);

          setFormData({
            nome: evento.nome || "",
            descricao: evento.descricao || "",
            local: evento.local || "",
            status: evento.status || "Planejado",
            data_inicio: evento.data_inicio
              ? String(evento.data_inicio).slice(0, 10)
              : "",
            data_fim: evento.data_fim
              ? String(evento.data_fim).slice(0, 10)
              : ""
          });
        }
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idUsuario) {
      setErro("Não foi possível identificar o usuário. Faça login novamente.");
      return;
    }

    if (formData.data_fim < formData.data_inicio) {
      setErro("A data de término não pode ser anterior à data de início.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErro("");

      const dadosEvento = {
        ...formData,
        idUsuario
      };

      if (id) {
        await api(`/eventos/${id}`, {
          method: "PUT",
          body: JSON.stringify(dadosEvento)
        });
      } else {
        await api("/eventos", {
          method: "POST",
          body: JSON.stringify(dadosEvento)
        });
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/eventos");
      }, 1000);
    } catch (error) {
      setErro(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (carregando) {
    return (
      <div className="form-page">
        <p>Carregando formulário...</p>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <button
          type="button"
          onClick={() => navigate("/eventos")}
          className="btn-back"
        >
          <IoArrowBackOutline className="btn-icon" />
          <span>Voltar para a lista</span>
        </button>

        <section className="form-card">
          <header className="form-card-header">
            <div className="form-title-row">
              <IoCalendarOutline className="form-header-icon" />

              <div>
                <h2>{id ? "Editar Evento" : "Novo Evento"}</h2>
                <p>
                  {id
                    ? "Atualize as informações do evento"
                    : "Cadastre as informações do novo evento"}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={() => navigate("/eventos")}
              title="Fechar"
            >
              <IoCloseOutline />
            </button>
          </header>

          {success && (
            <div className="alert-success">
              <IoCheckmarkOutline className="alert-icon" />
              <span>
                {id
                  ? "Evento atualizado com sucesso! Redirecionando..."
                  : "Evento cadastrado com sucesso! Redirecionando..."}
              </span>
            </div>
          )}

          {erro && <div className="alert-error">{erro}</div>}

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-section">
              <h3>Informações do Evento</h3>

              <div className="form-grid">
                <div className="field-group field-full">
                  <label htmlFor="nome">Nome do evento *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Ex: Semana de Tecnologia"
                    value={formData.nome}
                    onChange={handleChange}
                    maxLength="150"
                    required
                  />
                </div>

                <div className="field-group field-full">
                  <label htmlFor="descricao">Descrição</label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva o evento..."
                    value={formData.descricao}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>

                <div className="field-group field-full">
                  <label htmlFor="local">Local *</label>
                  <input
                    type="text"
                    id="local"
                    name="local"
                    placeholder="Ex: Auditório do IFAL"
                    value={formData.local}
                    onChange={handleChange}
                    maxLength="150"
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Planejado">Planejado</option>
                    <option value="Aberto">Aberto</option>
                    <option value="Encerrado">Encerrado</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Período do Evento</h3>

              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="data_inicio">Data de início *</label>
                  <input
                    type="date"
                    id="data_inicio"
                    name="data_inicio"
                    value={formData.data_inicio}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="data_fim">Data de término *</label>
                  <input
                    type="date"
                    id="data_fim"
                    name="data_fim"
                    value={formData.data_fim}
                    onChange={handleChange}
                    min={formData.data_inicio || undefined}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate("/eventos")}
                disabled={isSubmitting}
              >
                <IoCloseOutline className="btn-icon" />
                <span>Cancelar</span>
              </button>

              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting || success}
              >
                <IoCheckmarkOutline className="btn-icon" />
                <span>
                  {isSubmitting
                    ? "Salvando..."
                    : id
                    ? "Salvar Alterações"
                    : "Cadastrar Evento"}
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EventosForm;
