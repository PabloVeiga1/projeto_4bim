
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    IoHomeOutline,
    IoPeopleOutline,
    IoCalendarOutline,
    IoLayersOutline,
    IoMicOutline,
    IoShieldCheckmarkOutline,
    IoLogOutOutline,
    IoArrowForwardOutline,
    IoClipboardOutline,
    IoBookOutline,
    IoTimeOutline,
} from "react-icons/io5";

import "../styles/Dashboard.css";
import "../styles/Atividades.css";

function Atividades() {
    const [usuario, setUsuario] = useState(null);
    const [atividades, setAtividades] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const estaEmDisponiveis = location.pathname === "/atividades/disponiveis";
    const estaEmMinhas = location.pathname === "/minhas-atividades";
    const estaNoInicio = !estaEmDisponiveis && !estaEmMinhas;

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", {
      credentials: "include"
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok && data?.usuario) setUsuario(data.usuario);
      })
      .catch((err) => console.error("Erro ao carregar usuário:", err));
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

    let tituloPagina = "Gerenciamento de Atividades";
    let descricaoPagina = "Cadastre e organize as atividades acadêmicas.";

    if (estaEmDisponiveis) {
        tituloPagina = "Atividades disponíveis";
        descricaoPagina = "Confira as palestras e minicursos disponíveis na área de informática.";
    } else if (estaEmMinhas) {
        tituloPagina = "Minhas atividades";
        descricaoPagina = "Acompanhe as atividades nas quais você realizou sua inscrição.";
    }

    return (
        <div className="atividades-layout">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <h2>Eventos IFAL</h2>
                    <span className="sidebar-tag">Portal Acadêmico</span>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item">
                        <IoHomeOutline className="nav-icon" />
                        <span>Início</span>
                    </Link>

                    <Link to="/participantes" className="nav-item">
                        <IoPeopleOutline className="nav-icon" />
                        <span>Participantes</span>
                    </Link>

                    <Link to="/eventos" className="nav-item">
                        <IoCalendarOutline className="nav-icon" />
                        <span>Eventos</span>
                    </Link>

                    <Link to="/atividades" className="nav-item ativo">
                        <IoLayersOutline className="nav-icon" />
                        <span>Atividades</span>
                    </Link>

                    <Link to="/palestrantes" className="nav-item">
                        <IoMicOutline className="nav-icon" />
                        <span>Palestrantes</span>
                    </Link>

                    <Link to="/usuarios" className="nav-item">
                        <IoShieldCheckmarkOutline className="nav-icon" />
                        <span>Usuários</span>
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <p className="sidebar-user-greeting">
                        Olá, {usuario?.nome || "visitante"}
                    </p>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="btn-sidebar-logout"
                    >
                        <IoLogOutOutline className="btn-icon" />
                        <span>Sair da conta</span>
                    </button>
                </div>
            </aside>

            <main className="atividades-main">
                <header className="atividades-header">
                    <div>
                        <h1>{tituloPagina}</h1>
                        <p>{descricaoPagina}</p>
                    </div>

                    <div className="atividades-perfil">
                        <span className="atividades-avatar">
                            {(usuario?.nome || "P").charAt(0).toUpperCase()}
                        </span>

                        <div>
                            <strong>{usuario?.nome || "Participante"}</strong>
                            <span>Participante</span>
                        </div>
                    </div>
                </header>

                {estaNoInicio && (
                    <>
                        <section className="atividades-boas-vindas">
                            <div>
                                <h2>Organize sua participação</h2>
                                <p>
                                    Acesse as atividades disponíveis ou acompanhe
                                    aquelas em que você já está inscrito.
                                </p>
                            </div>

                            <IoClipboardOutline className="atividades-boas-vindas-icon" />
                        </section>

                        <section className="atividades-secao">
                            <div className="atividades-secao-titulo">
                                <h2>Gerenciamento</h2>
                                <p>Escolha uma opção para continuar.</p>
                            </div>

                            <div className="atividades-cards-inicio">
                                <article className="atividade-opcao-card">
                                    <div className="atividade-opcao-icone">
                                        <IoBookOutline />
                                    </div>

                                  <h3>Cadastrar atividade</h3>
                             <p>
                           Adicione novas palestras e minicursos ao sistema.
                                                                      </p>
                        <Link
                              to="/atividades/cadastrar"
                              className="atividade-link-botao"
                                                              >
                                + Cadastrar <IoArrowForwardOutline />
                                
                                </Link>
                                </article>

                                <article className="atividade-opcao-card">
                                    <div className="atividade-opcao-icone">
                                        <IoClipboardOutline />
                                    </div>

                                    <h3>Minhas atividades</h3>
                                    <p>
                                        Consulte as atividades nas quais você já
                                        realizou sua inscrição.
                                    </p>

                                    <Link
                                        to="/minhas-atividades"
                                        className="atividade-link-botao"
                                    >
                                        Acessar atividades <IoArrowForwardOutline />
                                    </Link>
                                </article>
                            </div>
                        </section>
                    </>
                )}

                {estaEmDisponiveis && (
                    <section className="atividades-secao">
                        <div className="atividades-secao-titulo">
                            <h2>Explore as atividades</h2>
                            <p>Veja as opções disponíveis para sua participação.</p>
                        </div>

                        {carregando && <p>Carregando atividades...</p>}

                        {erro && <p>{erro}</p>}

                        {!carregando && !erro && atividades.length === 0 && (
                            <div className="atividades-vazio">
                                <h2>Nenhuma atividade encontrada</h2>
                                <p>Não existem atividades cadastradas no momento.</p>
                            </div>
                        )}

                        {!carregando && !erro && atividades.length > 0 && (
                            <div className="atividades-lista-cards">
                                {atividades.map((atividade) => (
                                    <article
                                        className="atividade-card"
                                        key={atividade.id}
                                    >
                                        <span className="atividade-tipo">
                                            {atividade.tipo}
                                        </span>

                                        <h2>{atividade.titulo}</h2>

                                        <p>{atividade.descricao}</p>

                                        <div className="atividade-card-rodape">
                                            <span>
                                                <IoTimeOutline />
                                                {atividade.horario_inicio?.slice(0, 5)}
                                                {" às "}
                                                {atividade.horario_fim?.slice(0, 5)}
                                            </span>

                                            <span className="atividade-detalhes-breve">
                                                {atividade.vagas} vagas
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {estaEmMinhas && (
                    <section className="atividades-secao">
                        <div className="atividades-secao-titulo">
                            <h2>Atividades em que estou inscrito</h2>
                            <p>As inscrições realizadas aparecerão nesta área.</p>
                        </div>

                        <div className="atividades-vazio">
                            <div className="atividades-vazio-icone">
                                <IoClipboardOutline />
                            </div>

                            <h2>Nenhuma atividade encontrada</h2>

                            <p>
                                Quando você realizar sua inscrição em uma atividade,
                                ela aparecerá aqui.
                            </p>

                            <Link
                                to="/atividades/disponiveis"
                                className="atividade-link-botao"
                            >
                                Ver atividades disponíveis <IoArrowForwardOutline />
                            </Link>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Atividades;
