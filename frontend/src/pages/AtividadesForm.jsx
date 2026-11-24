
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

import api from "../services/api";
import "../styles/AtividadesForm.css";

function AtividadesForm() {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        titulo: "",
        tipo: "Palestra",
        descricao: "",
        carga_horaria: "",
        vagas: "",
        data: "",
        horario_inicio: "",
        horario_fim: "",
        sala: "",
        evento_id: "",
        palestrante_id: "",
        idInscricao: ""
    });

    const [eventos, setEventos] = useState([]);
    const [palestrantes, setPalestrantes] = useState([]);
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        api("/eventos")
            .then(setEventos)
            .catch((err) => console.error("Erro ao carregar eventos:", err));

        api("/palestrantes")
            .then(setPalestrantes)
            .catch((err) => console.error("Erro ao carregar palestrantes:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        if (
            !formulario.titulo ||
            !formulario.descricao ||
            !formulario.carga_horaria ||
            !formulario.vagas ||
            !formulario.data ||
            !formulario.horario_inicio ||
            !formulario.horario_fim ||
            !formulario.sala ||
            !formulario.evento_id ||
            !formulario.palestrante_id
        ) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            setSalvando(true);

            await api("/atividades", {
                method: "POST",
                body: JSON.stringify({
                    ...formulario,
                    carga_horaria: Number(formulario.carga_horaria),
                    vagas: Number(formulario.vagas),
                    evento_id: Number(formulario.evento_id),
                    palestrante_id: Number(formulario.palestrante_id),
                    idInscricao: formulario.idInscricao
                        ? Number(formulario.idInscricao)
                        : null
                })
            });

            alert("Atividade cadastrada com sucesso!");
            navigate("/atividades/disponiveis");
        } catch (err) {
            console.error("Erro ao cadastrar atividade:", err);
            setErro(err.message || "Não foi possível cadastrar a atividade.");
        } finally {
            setSalvando(false);
        }
    };

    return (
        <main className="atividade-form-page">
            <section className="atividade-form-container">
                <button
                    type="button"
                    className="atividade-voltar"
                    onClick={() => navigate("/atividades")}
                >
                    <IoArrowBackOutline /> Voltar
                </button>

                <header className="atividade-form-header">
                    <h1>Cadastrar atividade</h1>
                    <p>Preencha os dados para adicionar uma nova atividade.</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="atividade-form-grid">
                        <label>
                            Título *
                            <input
                                name="titulo"
                                value={formulario.titulo}
                                onChange={handleChange}
                                placeholder="Ex.: Introdução à programação"
                            />
                        </label>

                        <label>
                            Tipo *
                            <select
                                name="tipo"
                                value={formulario.tipo}
                                onChange={handleChange}
                            >
                                <option value="Palestra">Palestra</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Minicurso">Minicurso</option>
                            </select>
                        </label>

                        <label className="atividade-form-completa">
                            Descrição *
                            <textarea
                                name="descricao"
                                value={formulario.descricao}
                                onChange={handleChange}
                                placeholder="Descreva a atividade..."
                                rows="3"
                            />
                        </label>

                        <label>
                            Carga horária (horas) *
                            <input
                                type="number"
                                min="1"
                                name="carga_horaria"
                                value={formulario.carga_horaria}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Quantidade de vagas *
                            <input
                                type="number"
                                min="1"
                                name="vagas"
                                value={formulario.vagas}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Data *
                            <input
                                type="date"
                                name="data"
                                value={formulario.data}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Sala *
                            <input
                                name="sala"
                                value={formulario.sala}
                                onChange={handleChange}
                                placeholder="Ex.: Laboratório 1"
                            />
                        </label>

                        <label>
                            Horário de início *
                            <input
                                type="time"
                                name="horario_inicio"
                                value={formulario.horario_inicio}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Horário de término *
                            <input
                                type="time"
                                name="horario_fim"
                                value={formulario.horario_fim}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Evento *
                            <select
                                name="evento_id"
                                value={formulario.evento_id}
                                onChange={handleChange}
                            >
                                <option value="">Selecione um evento</option>
                                {eventos.map((evento) => (
                                    <option key={evento.id} value={evento.id}>
                                        {evento.nome}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Palestrante *
                            <select
                                name="palestrante_id"
                                value={formulario.palestrante_id}
                                onChange={handleChange}
                            >
                                <option value="">Selecione um palestrante</option>
                                {palestrantes.map((palestrante) => (
                                    <option key={palestrante.id} value={palestrante.id}>
                                        {palestrante.nome}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {erro && <p className="atividade-form-erro">{erro}</p>}

                    <footer className="atividade-form-acoes">
                        <button
                            type="button"
                            className="atividade-btn-cancelar"
                            onClick={() => navigate("/atividades")}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="atividade-btn-salvar"
                            disabled={salvando}
                        >
                            {salvando ? "Salvando..." : "Salvar atividade"}
                        </button>
                    </footer>
                </form>
            </section>
        </main>
    );
}

export default AtividadesForm;
