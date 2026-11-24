import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Inscricoes.css";

function dataDeHoje() {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}

const novaInscricao = () => ({
  participante_id: "",
  atividade_id: "",
  data_inscricao: dataDeHoje(),
  status: "Pendente",
  presenca: "Não informado"
});

export default function Inscricoes() {
  const [inscricoes, setInscricoes] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [resumo, setResumo] = useState([]);
  const [form, setForm] = useState(novaInscricao);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);

  async function carregarDados() {
    return Promise.all([
      api("/inscricoes"),
      api("/inscricoes/opcoes")
    ]);
  }

  function atualizarTela([lista, opcoes]) {
    setInscricoes(lista);
    setParticipantes(opcoes.participantes);
    setAtividades(opcoes.atividades);
    setResumo(opcoes.resumo);
  }

  useEffect(() => {
    let ativa = true;
    carregarDados()
      .then((dados) => {
        if (ativa) atualizarTela(dados);
      })
      .catch((error) => {
        if (ativa) setErro(error.message);
      })
      .finally(() => {
        if (ativa) setCarregando(false);
      });

    return () => {
      ativa = false;
    };
  }, []);

  async function recarregarDados() {
    setErro("");
    try {
      atualizarTela(await carregarDados());
    } catch (error) {
      setErro(error.message);
    }
  }

  function mudarCampo(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function editar(inscricao) {
    setEditandoId(inscricao.id);
    setForm({
      participante_id: String(inscricao.participante_id),
      atividade_id: String(inscricao.atividade_id),
      data_inscricao: String(inscricao.data_inscricao).slice(0, 10),
      status: inscricao.status,
      presenca: inscricao.presenca
    });
    setErro("");
    setMensagem("");
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setForm(novaInscricao());
  }

  async function salvar(event) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    const dados = {
      ...form,
      participante_id: Number(form.participante_id),
      atividade_id: Number(form.atividade_id)
    };

    try {
      await api(editandoId ? `/inscricoes/${editandoId}` : "/inscricoes", {
        method: editandoId ? "PUT" : "POST",
        body: JSON.stringify(dados)
      });
      setMensagem(editandoId ? "Inscrição atualizada." : "Inscrição cadastrada.");
      cancelarEdicao();
      await recarregarDados();
    } catch (error) {
      setErro(error.message);
    }
  }

  async function excluir(inscricao) {
    if (!window.confirm(`Excluir a inscrição de ${inscricao.participante}?`)) return;

    setErro("");
    setMensagem("");
    try {
      await api(`/inscricoes/${inscricao.id}`, { method: "DELETE" });
      setMensagem("Inscrição excluída.");
      setInscricoes((lista) => lista.filter((item) => item.id !== inscricao.id));
      if (editandoId === inscricao.id) cancelarEdicao();
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <main className="inscricoes-page">
      <header className="inscricoes-header">
        <div>
          <Link to="/dashboard">← Painel</Link>
          <h1>Inscrições</h1>
          <p>Cadastre e gerencie inscrições em atividades.</p>
        </div>
        <span>Total: {inscricoes.length}</span>
      </header>

      <section className="inscricoes-card">
        <h2>{editandoId ? "Editar inscrição" : "Nova inscrição"}</h2>
        {erro && <p className="inscricoes-alert erro" role="alert">{erro}</p>}
        {mensagem && <p className="inscricoes-alert sucesso" role="status">{mensagem}</p>}

        <form className="inscricoes-form" onSubmit={salvar}>
          <label>
            Participante
            <select name="participante_id" value={form.participante_id} onChange={mudarCampo} required>
              <option value="">Selecione</option>
              {participantes.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </label>

          <label>
            Atividade
            <select name="atividade_id" value={form.atividade_id} onChange={mudarCampo} required>
              <option value="">Selecione</option>
              {atividades.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.titulo || `Atividade ${a.id}`} ({a.tipo}) — {a.evento}
                </option>
              ))}
            </select>
          </label>

          <label>
            Data da inscrição
            <input type="date" name="data_inscricao" value={form.data_inscricao} onChange={mudarCampo} required />
          </label>

          <label>
            Status
            <select name="status" value={form.status} onChange={mudarCampo}>
              <option>Pendente</option>
              <option>Confirmada</option>
              <option>Cancelada</option>
            </select>
          </label>

          <label>
            Presença
            <select name="presenca" value={form.presenca} onChange={mudarCampo}>
              <option>Não informado</option>
              <option>Presente</option>
              <option>Ausente</option>
            </select>
          </label>

          <div className="inscricoes-actions">
            <button type="submit" disabled={!participantes.length || !atividades.length}>
              {editandoId ? "Salvar alterações" : "Cadastrar inscrição"}
            </button>
            {editandoId && <button type="button" className="secundario" onClick={cancelarEdicao}>Cancelar</button>}
          </div>
        </form>

        {(!participantes.length || !atividades.length) && !carregando && (
          <p className="inscricoes-empty">Cadastre pelo menos um participante e uma atividade antes de criar inscrições.</p>
        )}
      </section>

      <section className="inscricoes-card">
        <h2>Inscrições cadastradas</h2>
        {carregando ? <p>Carregando...</p> : (
          <div className="inscricoes-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Participante</th>
                  <th>Atividade</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Presença</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {inscricoes.map((inscricao) => (
                  <tr key={inscricao.id}>
                    <td>{inscricao.participante}</td>
                    <td>{inscricao.atividade}</td>
                    <td>{String(inscricao.data_inscricao).slice(0, 10)}</td>
                    <td>{inscricao.status}</td>
                    <td>{inscricao.presenca}</td>
                    <td className="inscricoes-row-actions">
                      <button type="button" onClick={() => editar(inscricao)}>Editar</button>
                      <button type="button" className="excluir" onClick={() => excluir(inscricao)}>Excluir</button>
                    </td>
                  </tr>
                ))}
                {!inscricoes.length && (
                  <tr><td colSpan="6">Nenhuma inscrição cadastrada.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="inscricoes-card">
        <h2>Resumo por atividade</h2>
        <div className="inscricoes-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Atividade</th>
                <th>Evento</th>
                <th>Inscritos</th>
                <th>Confirmadas</th>
                <th>Presentes</th>
              </tr>
            </thead>
            <tbody>
              {resumo.map((item) => (
                <tr key={item.atividade_id}>
                  <td>{item.atividade}</td>
                  <td>{item.evento}</td>
                  <td>{item.total}</td>
                  <td>{item.confirmadas}</td>
                  <td>{item.presentes}</td>
                </tr>
              ))}
              {!resumo.length && (
                <tr><td colSpan="5">Nenhuma atividade cadastrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
