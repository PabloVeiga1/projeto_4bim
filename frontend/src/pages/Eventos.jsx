
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoAddOutline,
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline
} from "react-icons/io5";

import "../styles/Participantes.css";

const API_URL = "http://localhost:3000/api/eventos";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os eventos.");
      }

      const dados = await resposta.json();
      setEventos(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  function showToast(mensagem) {
    setToastMessage(mensagem);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  }

  function formatarData(data) {
    if (!data) return "-";

    return new Date(data).toLocaleDateString("pt-BR", {
      timeZone: "UTC"
    });
  }

  async function handleExcluir(id, nome) {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o evento "${nome}"?`
    );

    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível excluir o evento.");
      }

      setEventos((listaAtual) =>
        listaAtual.filter((evento) => evento.id !== id)
      );

      showToast("Evento excluído com sucesso!");
    } catch (error) {
      showToast(error.message);
    }
  }

  const eventosFiltrados = useMemo(() => {
    return eventos.filter((evento) => {
      const textoBusca = busca.toLowerCase();

      const correspondeBusca =
        evento.nome?.toLowerCase().includes(textoBusca) ||
        evento.local?.toLowerCase().includes(textoBusca);

      const correspondeStatus =
        filtroStatus === "Todos" || evento.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [eventos, busca, filtroStatus]);

  const eventosAbertos = eventos.filter(
    (evento) => evento.status === "Aberto"
  ).length;

  const eventosPlanejados = eventos.filter(
    (evento) => evento.status === "Planejado"
  ).length;

  const eventosEncerrados = eventos.filter(
    (evento) => evento.status === "Encerrado"
  ).length;

  return (
    <div className="participantes-page">
      {toastMessage && (
        <div className="toast-box">{toastMessage}</div>
      )}

      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-logo">
            <IoCalendarOutline className="logo-icon" />
            <span>Portal de Eventos</span>
          </Link>

          <div className="navbar-right">
            <Link to="/dashboard" className="btn-nav-dashboard">
              <IoHomeOutline />
              Dashboard
            </Link>

            <span className="navbar-user">Administrador</span>

            <button
              onClick={() => navigate("/")}
              className="btn-logout"
            >
              <IoLogOutOutline />
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="content-container">
        <div className="content-header">
          <div>
            <h1>Eventos</h1>
            <p>Cadastro e gerenciamento dos eventos do sistema.</p>
          </div>

          <Link to="/eventosform" className="btn-primary-action">
            <IoAddOutline />
            Novo Evento
          </Link>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-title">Abertos</span>
            <strong className="stat-number stat-green">
              {eventosAbertos}
            </strong>
          </div>

          <div className="stat-box">
            <span className="stat-title">Planejados</span>
            <strong className="stat-number">
              {eventosPlanejados}
            </strong>
          </div>

          <div className="stat-box">
            <span className="stat-title">Encerrados</span>
            <strong className="stat-number">
              {eventosEncerrados}
            </strong>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-wrapper">
            <IoSearchOutline />

            <input
              type="text"
              className="input-search"
              placeholder="Buscar por nome ou local..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="selects-row">
            <select
              className="select-filter"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="Todos">Todos os status</option>
              <option value="Aberto">Aberto</option>
              <option value="Planejado">Planejado</option>
              <option value="Encerrado">Encerrado</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="solid-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Evento</th>
                <th>Local</th>
                <th>Período</th>
                <th>Status</th>
                <th className="th-actions">Ações</th>
              </tr>
            </thead>

            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="6" className="empty-message">
                    Carregando eventos...
                  </td>
                </tr>
              ) : erro ? (
                <tr>
                  <td colSpan="6" className="empty-message">
                    {erro}
                  </td>
                </tr>
              ) : eventosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-message">
                    Nenhum evento encontrado.
                  </td>
                </tr>
              ) : (
                eventosFiltrados.map((evento) => (
                  <tr key={evento.id}>
                    <td className="cell-id">{evento.id}</td>

                    <td className="cell-name">
                      {evento.nome}
                    </td>

                    <td>{evento.local}</td>

                    <td>
                      {formatarData(evento.data_inicio)}
                      {" - "}
                      {formatarData(evento.data_fim)}
                    </td>

                    <td>
                      <span
                        className={`pill-status ${
                          evento.status === "Aberto"
                            ? "status-ativo"
                            : "status-inativo"
                        }`}
                      >
                        {evento.status}
                      </span>
                    </td>

                    <td className="cell-actions">
                      <Link
                        to={`/eventosform/${evento.id}`}
                        className="btn-table-edit"
                        title="Editar evento"
                      >
                        <IoPencilOutline />
                      </Link>

                      <button
                        onClick={() =>
                          handleExcluir(evento.id, evento.nome)
                        }
                        className="btn-table-delete"
                        title="Excluir evento"
                      >
                        <IoTrashOutline />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
