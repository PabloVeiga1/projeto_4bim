import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoShieldCheckmarkOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoAddOutline,
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoCloseOutline
} from "react-icons/io5";
import "../styles/Participantes.css";

const STORAGE_KEY = "eventos_ifal_usuarios";

const DADOS_INICIAIS = [
  {
    id: 1,
    nome: "Pablo Vinícius",
    email: "pvcv1@aluno.ifal.edu.br",
    perfil: "Administrador",
    setor: "Coordenação Geral",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Mariana Soares",
    email: "mariana.soares@ifal.edu.br",
    perfil: "Organizador",
    setor: "Comissão de Programação",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Rafael Torres",
    email: "rafael.torres@aluno.ifal.edu.br",
    perfil: "Monitor",
    setor: "Credenciamento e Presença",
    status: "Ativo"
  },
  {
    id: 4,
    nome: "Beatriz Lima",
    email: "beatriz.lima@aluno.ifal.edu.br",
    perfil: "Monitor",
    setor: "Apoio de Salas",
    status: "Inativo"
  }
];

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    if (salvos) return JSON.parse(salvos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DADOS_INICIAIS));
    return DADOS_INICIAIS;
  });

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroPerfil, setFiltroPerfil] = useState("Todos");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const salvarLista = (novaLista) => {
    setUsuarios(novaLista);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  };

  const handleExcluir = (id, nome) => {
    if (window.confirm(`Deseja remover o usuário ${nome}?`)) {
      const atualizada = usuarios.filter((u) => u.id !== id);
      salvarLista(atualizada);
      showToast(`Usuário ${nome} removido.`);
    }
  };

  const handleToggleStatus = (id) => {
    const atualizada = usuarios.map((u) => {
      if (u.id === id) {
        const novo = u.status === "Ativo" ? "Inativo" : "Ativo";
        showToast(`Status alterado para ${novo}.`);
        return { ...u, status: novo };
      }
      return u;
    });
    salvarLista(atualizada);
  };

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((u) => {
      const termo = busca.toLowerCase();
      const matchBusca =
        u.nome.toLowerCase().includes(termo) ||
        u.email.toLowerCase().includes(termo) ||
        u.setor.toLowerCase().includes(termo);

      const matchStatus = filtroStatus === "Todos" || u.status === filtroStatus;
      const matchPerfil = filtroPerfil === "Todos" || u.perfil === filtroPerfil;

      return matchBusca && matchStatus && matchPerfil;
    });
  }, [usuarios, busca, filtroStatus, filtroPerfil]);

  const total = usuarios.length;
  const totalAtivos = usuarios.filter((u) => u.status === "Ativo").length;
  const totalAdmins = usuarios.filter(
    (u) => u.perfil === "Administrador"
  ).length;
  const totalEquipe = usuarios.filter(
    (u) => u.perfil === "Organizador" || u.perfil === "Monitor"
  ).length;

  return (
    <div className="usuarios-page">
      {toastMessage && (
        <div className="toast-box">
          <span>{toastMessage}</span>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-logo">
            <IoShieldCheckmarkOutline className="logo-icon" />
            <span>Portal de Usuários</span>
          </Link>
          <div className="navbar-right">
            <Link to="/dashboard" className="btn-nav-dashboard">
              <IoHomeOutline className="btn-icon" />
              <span>Dashboard</span>
            </Link>
            <span className="navbar-user">Administrador</span>
            <button onClick={() => navigate("/")} className="btn-logout">
              <IoLogOutOutline className="btn-icon" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="content-container">
        <div className="content-header">
          <div>
            <h1>Usuários do Sistema</h1>
            <p>Controle de acesso, administradores, organizadores e monitores</p>
          </div>
          <Link to="/usuariosform" className="btn-primary-action">
            <IoAddOutline className="btn-icon" />
            <span>Novo Usuário</span>
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
            <span className="stat-title">Administradores</span>
            <span className="stat-number">{totalAdmins}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Organizadores / Monitores</span>
            <span className="stat-number">{totalEquipe}</span>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-wrapper">
            <IoSearchOutline className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar por nome, e-mail ou setor..."
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
                <IoCloseOutline />
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
              value={filtroPerfil}
              onChange={(e) => setFiltroPerfil(e.target.value)}
              className="select-filter"
            >
              <option value="Todos">Perfil: Todos</option>
              <option value="Administrador">Administrador</option>
              <option value="Organizador">Organizador</option>
              <option value="Monitor">Monitor</option>
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
                <th>Setor / Função</th>
                <th>Perfil</th>
                <th>Status</th>
                <th className="th-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((u) => (
                  <tr key={u.id}>
                    <td className="cell-id">#{u.id}</td>
                    <td className="cell-name">{u.nome}</td>
                    <td className="cell-email">{u.email}</td>
                    <td className="cell-sub">{u.setor}</td>
                    <td>
                      <span className="pill-nivel">{u.perfil}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(u.id)}
                        className={`pill-status ${
                          u.status === "Ativo" ? "status-ativo" : "status-inativo"
                        }`}
                        title="Alternar status"
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="cell-actions">
                      <Link
                        to="/usuariosform"
                        state={{ usuario: u }}
                        className="btn-table-edit"
                      >
                        <IoPencilOutline className="btn-icon" />
                        <span>Editar</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleExcluir(u.id, u.nome)}
                        className="btn-table-delete"
                      >
                        <IoTrashOutline className="btn-icon" />
                        <span>Excluir</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-message">
                    Nenhum usuário encontrado para os critérios selecionados.
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