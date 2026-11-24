import { useState, useMemo } from "react";
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
import "../styles/Participantes.css";

const STORAGE_KEY = "eventos_ifal_palestrantes";

const DADOS_INICIAIS = [
  {
    id: 1,
    nome: "Dr. Ricardo Almeida",
    email: "ricardo.almeida@ifal.edu.br",
    telefone: "(82) 99911-2233",
    instituicao: "IFAL Maceió",
    especialidade: "Inteligência Artificial",
    titulacao: "Doutor",
    bio: "Pesquisador em Aprendizado de Máquina e Visão Computacional.",
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Profa. Fernanda Costa",
    email: "fernanda.costa@ufal.br",
    telefone: "(82) 99822-3344",
    instituicao: "UFAL",
    especialidade: "Engenharia de Software",
    titulacao: "Mestre",
    bio: "Especialista em Arquitetura de Sistemas e Métodos Ágeis.",
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Lucas Mendonça",
    email: "lucas.mendonca@techalagoas.com.br",
    telefone: "(82) 99733-4455",
    instituicao: "Tech Alagoas",
    especialidade: "Desenvolvimento Web",
    titulacao: "Especialista",
    bio: "Tech Lead Full Stack com foco em aplicações escaláveis.",
    status: "Ativo"
  },
  {
    id: 4,
    nome: "Dra. Camila Nogueira",
    email: "camila.nogueira@ifal.edu.br",
    telefone: "(82) 99644-5566",
    instituicao: "IFAL Arapiraca",
    especialidade: "Segurança da Informação",
    titulacao: "Doutor",
    bio: "Atua na área de Criptografia e Proteção de Dados (LGPD).",
    status: "Inativo"
  }
];

export default function Palestrantes() {
  const [palestrantes, setPalestrantes] = useState(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    if (salvos) return JSON.parse(salvos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DADOS_INICIAIS));
    return DADOS_INICIAIS;
  });

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [filtroTitulacao, setFiltroTitulacao] = useState("Todos");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const salvarLista = (novaLista) => {
    setPalestrantes(novaLista);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
  };

  const handleExcluir = (id, nome) => {
    if (window.confirm(`Deseja remover o palestrante ${nome}?`)) {
      const atualizada = palestrantes.filter((p) => p.id !== id);
      salvarLista(atualizada);
      showToast(`${nome} foi removido.`);
    }
  };

  const handleToggleStatus = (id) => {
    const atualizada = palestrantes.map((p) => {
      if (p.id === id) {
        const novo = p.status === "Ativo" ? "Inativo" : "Ativo";
        showToast(`Status alterado para ${novo}.`);
        return { ...p, status: novo };
      }
      return p;
    });
    salvarLista(atualizada);
  };

  const palestrantesFiltrados = useMemo(() => {
    return palestrantes.filter((p) => {
      const termo = busca.toLowerCase();
      const matchBusca =
        p.nome.toLowerCase().includes(termo) ||
        p.email.toLowerCase().includes(termo) ||
        p.instituicao.toLowerCase().includes(termo) ||
        p.especialidade.toLowerCase().includes(termo);

      const matchStatus = filtroStatus === "Todos" || p.status === filtroStatus;
      const matchTitulacao =
        filtroTitulacao === "Todos" || p.titulacao === filtroTitulacao;

      return matchBusca && matchStatus && matchTitulacao;
    });
  }, [palestrantes, busca, filtroStatus, filtroTitulacao]);

  const total = palestrantes.length;
  const totalAtivos = palestrantes.filter((p) => p.status === "Ativo").length;
  const totalMestresDoutores = palestrantes.filter(
    (p) => p.titulacao === "Mestre" || p.titulacao === "Doutor"
  ).length;
  const totalExternos = palestrantes.filter(
    (p) => !p.instituicao.toUpperCase().includes("IFAL")
  ).length;

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
            <span className="stat-title">Total</span>
            <span className="stat-number">{total}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Ativos</span>
            <span className="stat-number stat-green">{totalAtivos}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Mestres / Doutores</span>
            <span className="stat-number">{totalMestresDoutores}</span>
          </div>
          <div className="stat-box">
            <span className="stat-title">Convidados Externos</span>
            <span className="stat-number">{totalExternos}</span>
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
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="select-filter"
            >
              <option value="Todos">Status: Todos</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>

            <select
              value={filtroTitulacao}
              onChange={(e) => setFiltroTitulacao(e.target.value)}
              className="select-filter"
            >
              <option value="Todos">Titulação: Todas</option>
              <option value="Graduado">Graduado</option>
              <option value="Especialista">Especialista</option>
              <option value="Mestre">Mestre</option>
              <option value="Doutor">Doutor</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="solid-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Palestrante</th>
                <th>E-mail</th>
                <th>Instituição / Área</th>
                <th>Titulação</th>
                <th>Status</th>
                <th className="th-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {palestrantesFiltrados.length > 0 ? (
                palestrantesFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td className="cell-id">#{p.id}</td>
                    <td className="cell-name">{p.nome}</td>
                    <td className="cell-email">{p.email}</td>
                    <td className="cell-sub">
                      {p.instituicao} • {p.especialidade}
                    </td>
                    <td>
                      <span className="pill-nivel">{p.titulacao}</span>
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