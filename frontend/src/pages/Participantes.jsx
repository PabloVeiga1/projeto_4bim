import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Participantes.css";

export default function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [busca, setBusca] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const carregarParticipantes = async () => {
    setCarregando(true);
    setErro("");
    try {
      const response = await fetch("http://localhost:3000/api/participantes", {
        credentials: "include"
      });
      const lista = await response.json();
      if (!response.ok) throw new Error(lista.message || "Erro ao carregar participantes.");
      setParticipantes(lista);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    let ativo = true;

    fetch("http://localhost:3000/api/participantes", {
      credentials: "include"
    })
      .then(async (response) => {
        const lista = await response.json();
        if (!response.ok) throw new Error(lista.message || "Erro ao carregar participantes.");
        if (ativo) setParticipantes(lista);
      })
      .catch((error) => {
        if (ativo) setErro(error.message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("modo_visitante");
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
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

  const handleExcluir = async (id, nome) => {
    if (window.confirm(`Deseja remover o participante ${nome}?`)) {
      try {
        const response = await fetch(`http://localhost:3000/api/participantes/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Erro ao excluir participante.");
        setParticipantes((atual) => atual.filter((p) => p.id !== id));
        showToast(`Participante ${nome} foi removido.`);
      } catch (error) {
        showToast(error.message);
      }
    }
  };

  const participantesFiltrados = useMemo(() => {
    return participantes.filter((p) => {
      const termo = busca.toLowerCase();

      const matchBusca =
        p.nome?.toLowerCase().includes(termo) ||
        p.email?.toLowerCase().includes(termo) ||
        p.instituicao?.toLowerCase().includes(termo) ||
        p.curso?.toLowerCase().includes(termo);

      const matchNivel = filtroNivel === "Todos" || String(p.tipo) === filtroNivel;

      return matchBusca && matchNivel;
    });
  }, [participantes, busca, filtroNivel]);

  const total = participantes.length;
  const totalEstudantes = participantes.filter(
    (p) => Number(p.tipo) === 1
  ).length;
  const totalDocentes = participantes.filter(
    (p) => Number(p.tipo) === 2
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
            <span className="stat-title">Estudantes</span>
            <span className="stat-number">{totalEstudantes}</span>
          </div>

          <div className="stat-box">
            <span className="stat-title">Professores</span>
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
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="select-filter"
            >
              <option value="Todos">Tipo: Todos</option>
              <option value="1">Estudante</option>
              <option value="2">Professor</option>
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
                <th>Tipo</th>
                <th className="th-actions">Ações</th>
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="6" className="empty-message">Carregando participantes...</td>
                </tr>
              ) : erro ? (
                <tr>
                  <td colSpan="6" className="empty-message">
                    {erro}{" "}
                    <button type="button" onClick={carregarParticipantes}>Tentar novamente</button>
                  </td>
                </tr>
              ) : participantesFiltrados.length > 0 ? (
                participantesFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td className="cell-id">{p.id}</td>
                    <td className="cell-name">{p.nome}</td>
                    <td className="cell-email">{p.email}</td>
                    <td className="cell-sub">
                      {p.instituicao} · {p.curso}
                    </td>
                    <td>
                      <span className="pill-nivel">
                        {Number(p.tipo) === 1 ? "Estudante" : Number(p.tipo) === 2 ? "Professor" : `Tipo ${p.tipo}`}
                      </span>
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
                  <td colSpan="6" className="empty-message">
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
