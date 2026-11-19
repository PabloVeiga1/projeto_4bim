import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoMicOutline,
  IoCloseOutline,
  IoCheckmarkOutline
} from "react-icons/io5";
import "../styles/PalestrantesForm.css";

const STORAGE_KEY = "eventos_ifal_palestrantes";

function PalestrantesForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const palestranteEdicao = location.state?.palestrante || null;

  const [formData, setFormData] = useState({
    nome: palestranteEdicao?.nome || "",
    email: palestranteEdicao?.email || "",
    telefone: palestranteEdicao?.telefone || "",
    instituicao: palestranteEdicao?.instituicao || "IFAL Maceió",
    especialidade: palestranteEdicao?.especialidade || "",
    titulacao: palestranteEdicao?.titulacao || "Especialista",
    bio: palestranteEdicao?.bio || "",
    status: palestranteEdicao?.status || "Ativo",
    termos: Boolean(palestranteEdicao)
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
      const atuais = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const { termos, ...dadosPalestrante } = formData;

      let novaLista;
      if (palestranteEdicao) {
        novaLista = atuais.map((item) =>
          item.id === palestranteEdicao.id
            ? { ...item, ...dadosPalestrante }
            : item
        );
      } else {
        const novoId =
          atuais.length > 0 ? Math.max(...atuais.map((i) => i.id)) + 1 : 1;
        novaLista = [...atuais, { id: novoId, ...dadosPalestrante }];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
      setIsSubmitting(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/palestrantes");
      }, 800);
    }, 400);
  };

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <button
          type="button"
          onClick={() => navigate("/palestrantes")}
          className="btn-back"
        >
          <IoArrowBackOutline className="btn-icon" />
          <span>Voltar para a lista</span>
        </button>

        <section className="form-card">
          <header className="form-card-header">
            <div className="form-title-row">
              <IoMicOutline className="form-header-icon" />
              <div>
                <h2>
                  {palestranteEdicao ? "Editar Palestrante" : "Novo Palestrante"}
                </h2>
                <p>
                  {palestranteEdicao
                    ? "Atualize os dados do palestrante selecionado"
                    : "Cadastre as informações do palestrante convidado"}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => navigate("/palestrantes")}
              title="Fechar"
            >
              <IoCloseOutline />
            </button>
          </header>

          {success && (
            <div className="alert-success">
              <IoCheckmarkOutline className="alert-icon" />
              <span>
                {palestranteEdicao
                  ? "Palestrante atualizado com sucesso! Redirecionando..."
                  : "Palestrante cadastrado com sucesso! Redirecionando..."}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-section">
              <h3>Dados de Contato</h3>
              <div className="form-grid">
                <div className="field-group field-full">
                  <label htmlFor="nome">Nome completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Ex: Dr. Ricardo Almeida"
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
                    placeholder="palestrante@instituicao.edu.br"
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
              <h3>Perfil Profissional e Acadêmico</h3>
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="instituicao">Instituição / Empresa *</label>
                  <input
                    type="text"
                    id="instituicao"
                    name="instituicao"
                    placeholder="Ex: IFAL Maceió"
                    value={formData.instituicao}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="especialidade">Área de Especialidade *</label>
                  <input
                    type="text"
                    id="especialidade"
                    name="especialidade"
                    placeholder="Ex: Inteligência Artificial"
                    value={formData.especialidade}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="titulacao">Titulação</label>
                  <select
                    id="titulacao"
                    name="titulacao"
                    value={formData.titulacao}
                    onChange={handleChange}
                  >
                    <option value="Graduado">Graduado</option>
                    <option value="Especialista">Especialista</option>
                    <option value="Mestre">Mestre</option>
                    <option value="Doutor">Doutor</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>

                <div className="field-group field-full">
                  <label htmlFor="bio">Mini Biografia</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    placeholder="Breve resumo da formação e experiência do palestrante..."
                    value={formData.bio}
                    onChange={handleChange}
                  />
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
                onClick={() => navigate("/palestrantes")}
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
                    : palestranteEdicao
                    ? "Salvar Alterações"
                    : "Cadastrar Palestrante"}
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default PalestrantesForm;