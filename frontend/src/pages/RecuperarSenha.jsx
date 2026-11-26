import "../styles/RecuperarSenha.css";
import {useNavigate } from "react-router-dom";
import { useState } from "react";
export default function RecuperarSenha() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [novaSenha,setNovaSenha] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, novaSenha }),
      });

      if (response.ok) {
        alert("Senha alterada com sucesso!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Erro ao alterar senha: ${errorData.message}`);
      }
  }
  catch (error) {
    console.error(`Erro ao enviar solicitação: ${error}`);
    alert("Erro ao enviar solicitação. Verifique o console para mais detalhes.");
  }
  };


  return (
    <div className="recuperar-senha-wrapper">
      <main className="recuperar-senha-card">
        <div className="recuperar-senha-header">
          <div className="recuperar-senha-title-row">
            <h1>Recuperar senha</h1>
          </div>
        </div>
        <form className="recuperar-senha-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email"
            required
            onChange={(e)=> setEmail(e.target.value)}
          />
          <label htmlFor="novaSenha">Nova senha</label>
          <input
            type="password"
            id="novaSenha"
            name="novaSenha"
            placeholder="Digite sua nova senha"
            required
            onChange={(e)=> setNovaSenha(e.target.value)}
          />
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/login")}>
            Voltar
          </button>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}                           