import { useState, useEffect, useMemo } from "react";
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
import { apiRequest } from "../services/api";
import "../styles/Usuarios.css";

function formatarData(dataIso) {
  if (!dataIso) return "—";
  return new Date(dataIso).toLocaleDateString("pt-BR");
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      setErroLista("");
      const dados = await apiRequest("/usuarios");
      setUsuarios(dados);
    } catch (err) {
      setErroLista(err.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleExcluir = async (id, nome) => {
    if (!window.confirm(`Deseja remover o usuário ${nome}?`)) return;

    try {
      await apiRequest(`/usuarios/${id}`, { method: "DELETE" });
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      showToast(`Usuário ${nome} removido com sucesso.`);
    } catch (err) {
      alert(err.message);
    }
  };

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((u) => {
      const termo = busca.toLowerCase();
      const matchBusca =
        (u.nome || "").toLowerCase().includes(termo) ||
        (u.email || "").toLowerCase().includes(termo) ||
        (u.tipo || "").toLowerCase().includes(termo);

      const matchTipo = filtroTipo === "Todos" || u.tipo === filtroTipo;

      return matchBusca && matchTipo;
    });
  }, [usuarios, busca, filtroTipo]);

  const total = usuarios.length;
  const totalAdmins = usuarios.filter((u) => u.tipo === "Administrador").length;
  const totalOrganizadores = usuarios.filter((u) => u.tipo === "Organizador").length;
  const totalParticipantes = usuarios.filter((u) => u.tipo === "Participante").length;

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
            <p>Controle de contas e perfis de acesso cadastrados no banco</p>
          </div>
          <Link to="/usuariosform" className="btn-primary-action">
            <IoAddOutline className="btn-icon" />
            <span>Novo Usuário</span>
          </Link>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-title">Total de Contas</span>
            <span className="stat-number">{total}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Administradores</span>
            <span className="stat-number stat-green">{totalAdmins}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Organizadores</span>
            <span className="stat-number">{totalOrganizadores}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Participantes</span>
            <span className="stat-number">{totalParticipantes}</span>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-wrapper">
            <IoSearchOutline className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar por nome, e-mail ou perfil..."
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
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="select-filter"
            >
              <option value="Todos">Perfil: Todos</option>
              <option value="Administrador">Administrador</option>
              <option value="Organizador">Organizador</option>
              <option value="Participante">Participante</option>
            </select>
          </div>
        </div>

        {erroLista && (
          <div className="alert-error-box">
            <span>{erroLista}</span>
          </div>
        )}

        <div className="table-wrapper">
          <table className="solid-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Perfil (Tipo)</th>
                <th>Criado em</th>
                <th className="th-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="6" className="empty-message">
                    Carregando usuários do banco de dados...
                  </td>
                </tr>
              ) : usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((u) => (
                  <tr key={u.id}>
                    <td className="cell-id">#{u.id}</td>
                    <td className="cell-name">{u.nome}</td>
                    <td className="cell-email">{u.email}</td>
                    <td>
                      <span className="pill-nivel">{u.tipo}</span>
                    </td>
                    <td className="cell-sub">{formatarData(u.criado_em)}</td>
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
                  <td colSpan="6" className="empty-message">
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