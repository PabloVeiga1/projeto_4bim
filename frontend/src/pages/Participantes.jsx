import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/Participantes.css";

const STORAGE_KEY = "eventos_ifal_participantes";

const DADOS_INICIAIS = [
];

export default function Participantes() {
  const [participantes, setParticipantes] = useState(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);

    if (salvos) {
      try {
        return JSON.parse(salvos);
      } catch (e) {
        console.error("Erro ao carregar participantes salvos:", e);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(DADOS_INICIAIS));
    return DADOS_INICIAIS;
  });

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("modo_visitante");
      await api("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Erro ao sair:", err);
    } finally {
      navigate("/login");
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const salvarLista = (novaLista) => {
    setParticipantes(novaLista);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  };

  const handleExcluir = (id, nome) => {
    if (window.confirm(`Deseja remover o participante ${nome}?`)) {
      const atualizada = participantes.filter((p) => p.id !== id);
      salvarLista(atualizada);
      showToast(`Participante ${nome} foi removido.`);
    }
  };

  const handleToggleStatus = (id) => {
    const atualizada = participantes.map((p) => {
      if (p.id === id) {
        const novo = p.status === "Ativo" ? "Inativo" : "Ativo";
        showToast(`Status alterado para ${novo}.`);
        return { ...p, status: novo };
      }

      return p;
    });

    salvarLista(atualizada);
  };

  const participantesFiltrados = useMemo(() => {
    return participantes.filter((p) => {
      const termo = busca.toLowerCase();

      const matchBusca =
        p.nome?.toLowerCase().includes(termo) ||
        p.email?.toLowerCase().includes(termo) ||
        p.instituicao?.toLowerCase().includes(termo) ||
        p.curso?.toLowerCase().includes(termo);

      const matchStatus =
        filtroStatus === "Todos" || p.status === filtroStatus;

      const cargo = p.nivel || p.tipo;
      const matchNivel = filtroNivel === "Todos" || cargo === filtroNivel;

      return matchBusca && matchStatus && matchNivel;
    });
  }, [participantes, busca, filtroStatus, filtroNivel]);

  const total = participantes.length;
  const totalAtivos = participantes.filter(
    (p) => p.status === "Ativo"
  ).length;
  const totalEstudantes = participantes.filter(
    (p) => (p.nivel || p.tipo) === "Estudante"
  ).length;
  const totalDocentes = participantes.filter(
    (p) =>
      (p.nivel || p.tipo) === "Professor" ||
      (p.nivel || p.tipo) === "Administrador"
  ).length;

  return (
    <div className="participantes-page">
      {toastMessage && (
        <div className="toast-box">
          <span>{toastMessage}</span>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-logo">
            <span>Portal de Participantes</span>
          </Link>

          <div className="navbar-right">
            <span className="navbar-user">Administrador</span>

            <button onClick={handleLogout} className="btn-logout">
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="content-container">
        <div className="content-header">
          <div>
            <h1>Participantes</h1>
            <p>Lista e controle de membros cadastrados</p>
          </div>

          <Link to="/participantesform" className="btn-primary-action">
            Novo participante +
          </Link>
        </div>

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

        <div className="filters-bar">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Pesquisar por nome, e-mail ou curso..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="input-search"
            />

            {busca && (
              <button
                type="button"
                className="btn-clear-search"
                onClick={() => setBusca("")}
              >
                Limpar
              </button>
            )}
          </div>

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
                    <td className="cell-id">{p.id}</td>
                    <td className="cell-name">{p.nome}</td>
                    <td className="cell-email">{p.email}</td>
                    <td className="cell-sub">
                      {p.instituicao} · {p.curso}
                    </td>
                    <td>
                      <span className="pill-nivel">{p.nivel}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p.id)}
                        className={`pill-status ${
                          p.status === "Ativo"
                            ? "status-ativo"
                            : "status-inativo"
                        }`}
                        title="Alternar status"
                      >
                        {p.status}
                      </button>
                    </td>
                    <td className="cell-actions">
                      <Link
                        to="/participantesform"
                        state={{ participante: p }}
                        className="btn-table-edit"
                      >
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
                    Nenhum participante encontrado para os critérios
                    selecionados.
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
