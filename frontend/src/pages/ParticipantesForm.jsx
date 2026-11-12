import "../../styles/ParticipanteForm.css";

function ParticipanteForm() {
return (
<div className="form-overlay">
<section className="participante-form-container">

    <header className="form-header">
      <div>
        <h2>Novo participante</h2>
        <p>Preencha os dados para cadastrar um participante.</p>
      </div>

      <button type="button" className="form-fechar">
        ×
      </button>
    </header>

    <form>
      <div className="form-campos">

        <div className="campo">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome completo"
          />
        </div>

        <div className="campo">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            placeholder="000.000.000-00"
          />
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="exemplo@email.com"
          />
        </div>

        <div className="campo">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="campo">
          <label htmlFor="instituicao">Instituição</label>
          <input
            type="text"
            id="instituicao"
            placeholder="Nome da instituição"
          />
        </div>

        <div className="campo">
          <label htmlFor="curso">Curso</label>
          <input
            type="text"
            id="curso"
            placeholder="Digite seu curso"
          />
        </div>

        <div className="campo campo-completo">
          <label htmlFor="tipo">Tipo de participante</label>
          <select id="tipo">
            <option>Selecione uma opção</option>
            <option>Estudante</option>
            <option>Professor</option>
            <option>Profissional</option>
            <option>Visitante</option>
          </select>
        </div>

      </div>

      <label className="checkbox-termos">
        <input type="checkbox" />
        <span>
          Confirmo que as informações fornecidas estão corretas.
        </span>
      </label>

      <div className="form-acoes">
        <button type="button" className="btn-cancelar">
          Cancelar
        </button>

        <button type="button" className="btn-salvar">
          Cadastrar
        </button>
      </div>

    </form>
  </section>
</div>

);
}

export default ParticipanteForm; 