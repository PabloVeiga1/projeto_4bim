import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoMicOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoAddOutline,
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoCloseOutline
} from "react-icons/io5";
import { apiRequest } from "../services/api";
import "../styles/Palestrantes.css";

export default function Palestrantes() {
  const [palestrantes, setPalestrantes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroInstituicao, setFiltroInstituicao] = useState("Todas");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const carregarPalestrantes = async () => {
    try {
      setCarregando(true);
      setErroLista("");
      const dados = await apiRequest("/palestrantes");
      setPalestrantes(dados);
    } catch (err) {
      setErroLista(err.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPalestrantes();
  }, []);

  const handleExcluir = async (id, nome) => {
    if (!window.confirm(`Deseja remover o palestrante ${nome}?`)) return;

    try {
      await apiRequest(`/palestrantes/${id}`, { method: "DELETE" });
      setPalestrantes((prev) => prev.filter((p) => p.id !== id));
      showToast(`${nome} foi removido do banco de dados.`);
    } catch (err) {
      alert(err.message);
    }
  };

  const instituicoesUnicas = useMemo(() => {
    const lista = palestrantes
      .map((p) => p.instituicao)
      .filter(Boolean);
    return [...new Set(lista)];
  }, [palestrantes]);

  const palestrantesFiltrados = useMemo(() => {
    return palestrantes.filter((p) => {
      const termo = busca.toLowerCase();
      const matchBusca =
        (p.nome || "").toLowerCase().includes(termo) ||
        (p.email || "").toLowerCase().includes(termo) ||
        (p.instituicao || "").toLowerCase().includes(termo) ||
        (p.especialidade || "").toLowerCase().includes(termo);

      const matchInstituicao =
        filtroInstituicao === "Todas" || p.instituicao === filtroInstituicao;

      return matchBusca && matchInstituicao;
    });
  }, [palestrantes, busca, filtroInstituicao]);

  const total = palestrantes.length;
  const totalIfal = palestrantes.filter((p) =>
    (p.instituicao || "").toUpperCase().includes("IFAL")
  ).length;
  const totalExternos = total - totalIfal;
  const totalAreas = new Set(
    palestrantes.map((p) => p.especialidade).filter(Boolean)
  ).size;

  return (
    <div className="palestrantes-page">
      {toastMessage && (
        <div className="toast-box">
          <span>{toastMessage}</span>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-logo">
            <IoMicOutline className="logo-icon" />
            <span>Portal de Palestrantes</span>
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
            <h1>Palestrantes</h1>
            <p>Cadastro e gerenciamento de convidados para palestras e minicursos</p>
          </div>
          <Link to="/palestrantesform" className="btn-primary-action">
            <IoAddOutline className="btn-icon" />
            <span>Novo Palestrante</span>
          </Link>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-title">Total Cadastrados</span>
            <span className="stat-number">{total}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Docentes IFAL</span>
            <span className="stat-number stat-green">{totalIfal}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Convidados Externos</span>
            <span className="stat-number">{totalExternos}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Áreas de Especialidade</span>
            <span className="stat-number">{totalAreas}</span>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-wrapper">
            <IoSearchOutline className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar por nome, e-mail, instituição ou especialidade..."
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
              value={filtroInstituicao}
              onChange={(e) => setFiltroInstituicao(e.target.value)}
              className="select-filter"
            >
              <option value="Todas">Instituição: Todas</option>
              {instituicoesUnicas.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
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
                <th>Palestrante</th>
                <th>Contato</th>
                <th>Instituição</th>
                <th>Especialidade</th>
                <th>Mini Biografia</th>
                <th className="th-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="7" className="empty-message">
                    Carregando palestrantes do banco de dados...
                  </td>
                </tr>
              ) : palestrantesFiltrados.length > 0 ? (
                palestrantesFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td className="cell-id">#{p.id}</td>
                    <td className="cell-name">{p.nome}</td>
                    <td className="cell-email">
                      <div>{p.email}</div>
                      {p.telefone && <small>{p.telefone}</small>}
                    </td>
                    <td className="cell-sub">{p.instituicao}</td>
                    <td>
                      <span className="pill-nivel">{p.especialidade}</span>
                    </td>
                    <td className="cell-sub" title={p.mini_biografia || ""}>
                      {p.mini_biografia
                        ? p.mini_biografia.length > 45
                          ? `${p.mini_biografia.slice(0, 45)}...`
                          : p.mini_biografia
                        : "—"}
                    </td>
                    <td className="cell-actions">
                      <Link
                        to="/palestrantesform"
                        state={{ palestrante: p }}
                        className="btn-table-edit"
                      >
                        <IoPencilOutline className="btn-icon" />
                        <span>Editar</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleExcluir(p.id, p.nome)}
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
                    Nenhum palestrante encontrado para os critérios selecionados.
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