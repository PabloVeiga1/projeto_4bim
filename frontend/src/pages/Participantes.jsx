import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Participantes.css";

const DADOS_INICIAIS = [
  {
    id: 1,
    nome: "Pablo Vinícius",
    email: "pvcv1@aluno.ifal.edu.br",
    nivel: "Administrador",
    instituicao: "IFAL Maceió",
    curso: "Informática",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "João Silva",
    email: "joao.silva@aluno.ifal.edu.br",
    nivel: "Estudante",
    instituicao: "IFAL Arapiraca",
    curso: "Engenharia",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Maria Oliveira",
    email: "maria.oliveira@aluno.ifal.edu.br",
    nivel: "Estudante",
    instituicao: "IFAL Maceió",
    curso: "Design",
    status: "Ativo"
  },
  {
    id: 4,
    nome: "Carlos Eduardo",
    email: "carlos.eduardo@ifal.edu.br",
    nivel: "Professor",
    instituicao: "IFAL Reitoria",
    curso: "Docência",
    status: "Ativo"
  },
  {
    id: 5,
    nome: "Ana Beatriz Santos",
    email: "anabeatriz@gmail.com",
    nivel: "Visitante",
    instituicao: "UFAL",
    curso: "Computação",
    status: "Inativo"
  }
];

export default function Participantes() {
  const [participantes, setParticipantes] = useState(DADOS_INICIAIS);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleExcluir = (id, nome) => {
    if (window.confirm(`Deseja remover ${nome}?`)) {
      setParticipantes((prev) => prev.filter((p) => p.id !== id));
      showToast(`${nome} foi removido.`);
    }
  };

  const handleToggleStatus = (id) => {
    setParticipantes((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const novo = p.status === "Ativo" ? "Inativo" : "Ativo";
          showToast(`Status alterado para ${novo}.`);
          return { ...p, status: novo };
        }
        return p;
      })
    );
  };

  const participantesFiltrados = useMemo(() => {
    return participantes.filter((p) => {
      const termo = busca.toLowerCase();
      const matchBusca =
        p.nome.toLowerCase().includes(termo) ||
        p.email.toLowerCase().includes(termo) ||
        p.instituicao.toLowerCase().includes(termo) ||
        p.curso.toLowerCase().includes(termo);

      const matchStatus = filtroStatus === "Todos" || p.status === filtroStatus;
      const matchNivel = filtroNivel === "Todos" || p.nivel === filtroNivel;

      return matchBusca && matchStatus && matchNivel;
    });
  }, [participantes, busca, filtroStatus, filtroNivel]);

  const total = participantes.length;
  const totalAtivos = participantes.filter((p) => p.status === "Ativo").length;
  const totalEstudantes = participantes.filter((p) => p.nivel === "Estudante").length;
  const totalDocentes = participantes.filter((p) => p.nivel === "Professor" || p.nivel === "Administrador").length;

  return (
    <div className="participantes-page">
      {toastMessage && (
        <div className="toast-box">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-logo">
            Portal de Participantes
          </Link>
          <div className="navbar-right">
            <Link to="/dashboard" className="btn-nav-dashboard">
              Início / Dashboard
            </Link>
            <span className="navbar-user">Administrador</span>
            <button onClick={() => navigate("/")} className="btn-logout">
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="content-container">
        {/* Header */}
        <div className="content-header">
          <div>
            <h1>Participantes</h1>
            <p>Lista e controle de membros cadastrados</p>
          </div>
          <Link to="/participantesform" className="btn-primary-action">
            + Novo Participante
          </Link>
        </div>

        {/* Stats Grid Minimalista */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-title">Total</span>
            <span className="stat-number">{total}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Ativos</span>
            <span className="stat-number stat-green">{totalAtivos}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Estudantes</span>
            <span className="stat-number">{totalEstudantes}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Docentes / Admins</span>
            <span className="stat-number">{totalDocentes}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          <input
            type="text"
            placeholder="Pesquisar por nome, e-mail, curso..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-search"
          />

          <div className="selects-row">
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="select-filter"
            >
              <option value="Todos">Status: Todos</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>

            <select
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="select-filter"
            >
              <option value="Todos">Cargo: Todos</option>
              <option value="Administrador">Administrador</option>
              <option value="Estudante">Estudante</option>
              <option value="Professor">Professor</option>
              <option value="Visitante">Visitante</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="solid-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Instituição</th>
                <th>Nível</th>
                <th>Status</th>
                <th className="th-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {participantesFiltrados.length > 0 ? (
                participantesFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td className="cell-id">#{p.id}</td>
                    <td className="cell-name">{p.nome}</td>
                    <td className="cell-email">{p.email}</td>
                    <td className="cell-sub">
                      {p.instituicao} • {p.curso}
                    </td>
                    <td>
                      <span className="pill-nivel">{p.nivel}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p.id)}
                        className={`pill-status ${
                          p.status === "Ativo" ? "status-ativo" : "status-inativo"
                        }`}
                        title="Alternar status"
                      >
                        {p.status}
                      </button>
                    </td>
                    <td className="cell-actions">
                      <Link to="/participantesform" className="btn-table-edit">
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleExcluir(p.id, p.nome)}
                        className="btn-table-delete"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-message">
                    Nenhum participante encontrado para os critérios selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
