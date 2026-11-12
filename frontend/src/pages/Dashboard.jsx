import { Link, useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoCalendarOutline,
  IoLayersOutline,
  IoMicOutline,
  IoReceiptOutline,
  IoBarChartOutline,
  IoLogOutOutline,
  IoArrowForwardOutline
} from "react-icons/io5";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Barra Lateral / Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Eventos IFAL</h2>
          <span className="sidebar-tag">Portal Acadêmico</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item ativo">
            <IoHomeOutline className="nav-icon" />
            <span>Início</span>
          </Link>

          <Link to="/participantes" className="nav-item">
            <IoPeopleOutline className="nav-icon" />
            <span>Participantes</span>
          </Link>

          <Link to="/participantesform" className="nav-item">
            <IoPersonAddOutline className="nav-icon" />
            <span>Novo Cadastro</span>
          </Link>

          <Link to="/eventos" className="nav-item">
            <IoCalendarOutline className="nav-icon" />
            <span>Eventos</span>
          </Link>

          <Link to="/atividades" className="nav-item">
            <IoLayersOutline className="nav-icon" />
            <span>Atividades</span>
          </Link>

          <Link to="/palestrantes" className="nav-item">
            <IoMicOutline className="nav-icon" />
            <span>Palestrantes</span>
          </Link>

          <Link to="/inscricoes" className="nav-item">
            <IoReceiptOutline className="nav-icon" />
            <span>Inscrições</span>
          </Link>

          <Link to="/relatorios" className="nav-item">
            <IoBarChartOutline className="nav-icon" />
            <span>Relatórios</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-sidebar-logout"
          >
            <IoLogOutOutline className="btn-icon" />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="dashboard-main">
        {/* Header Superior */}
        <header className="dashboard-header">
          <div>
            <h1>Painel Principal</h1>
            <p>Visão geral e gestão de eventos acadêmicos</p>
          </div>

          <div className="perfil-usuario">
            <div className="perfil-avatar">AD</div>
            <div className="perfil-info">
              <span className="perfil-nome">Administrador</span>
              <span className="perfil-status">Online</span>
            </div>
          </div>
        </header>

        {/* Card de Boas-Vindas */}
        <section className="dashboard-boas-vindas">
          <div className="boas-vindas-content">
            <h2>Gerencie seus eventos e participantes</h2>
            <p>
              Acompanhe inscrições, controle presenças e organize as atividades acadêmicas
              com rapidez em um único lugar.
            </p>
          </div>
          <Link to="/participantes" className="btn-boas-vindas">
            <span>Ver Participantes</span>
            <IoArrowForwardOutline className="btn-icon" />
          </Link>
        </section>

        {/* Indicadores / Estatísticas */}
        <section className="dashboard-indicadores">
          <article className="indicador-card">
            <span className="indicador-rotulo">Participantes</span>
            <h2 className="indicador-valor">5</h2>
            <p className="indicador-descricao">Membros cadastrados</p>
          </article>

          <article className="indicador-card">
            <span className="indicador-rotulo">Eventos Ativos</span>
            <h2 className="indicador-valor">3</h2>
            <p className="indicador-descricao">Eventos em andamento</p>
          </article>

          <article className="indicador-card">
            <span className="indicador-rotulo">Atividades</span>
            <h2 className="indicador-valor">12</h2>
            <p className="indicador-descricao">Palestras e oficinas</p>
          </article>

          <article className="indicador-card">
            <span className="indicador-rotulo">Inscrições</span>
            <h2 className="indicador-valor">48</h2>
            <p className="indicador-descricao">Inscrições confirmadas</p>
          </article>
        </section>

        {/* Acessos Rápidos */}
        <section className="dashboard-acessos">
          <div className="secao-titulo">
            <h2>Acesso Rápido</h2>
            <p>Navegue diretamente pelas áreas do sistema</p>
          </div>

          <div className="acessos-grid">
            <Link to="/participantes" className="acesso-card destaque">
              <div className="card-top-row">
                <IoPeopleOutline className="card-icon" />
                <span className="card-badge">Principal</span>
              </div>
              <h3>Participantes</h3>
              <p>Visualizar lista, filtrar status e gerenciar membros.</p>
            </Link>

            <Link to="/participantesform" className="acesso-card">
              <div className="card-top-row">
                <IoPersonAddOutline className="card-icon" />
              </div>
              <h3>Novo Participante</h3>
              <p>Cadastrar novo estudante, professor ou visitante.</p>
            </Link>

            <Link to="/eventos" className="acesso-card">
              <div className="card-top-row">
                <IoCalendarOutline className="card-icon" />
              </div>
              <h3>Eventos</h3>
              <p>Gerencie datas, locais e cronogramas acadêmicos.</p>
            </Link>

            <Link to="/atividades" className="acesso-card">
              <div className="card-top-row">
                <IoLayersOutline className="card-icon" />
              </div>
              <h3>Atividades</h3>
              <p>Gerencie palestras, minicursos e mesas-redondas.</p>
            </Link>

            <Link to="/palestrantes" className="acesso-card">
              <div className="card-top-row">
                <IoMicOutline className="card-icon" />
              </div>
              <h3>Palestrantes</h3>
              <p>Cadastro e gerenciamento de palestrantes convidados.</p>
            </Link>

            <Link to="/relatorios" className="acesso-card">
              <div className="card-top-row">
                <IoBarChartOutline className="card-icon" />
              </div>
              <h3>Relatórios</h3>
              <p>Exportação de presença, certificados e dados gerais.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
