import { useEffect, useState } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import RecuperarSenha from "./pages/RecuperarSenha";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Participantes from "./pages/Participantes";
import ParticipantesForm from "./pages/ParticipantesForm";
import Atividades from "./pages/Atividades";

import EventosForm from "./pages/EventosForm";
import Eventos from "./pages/Eventos";
import Palestrantes from "./pages/Palestrantes";
import PalestrantesForm from "./pages/PalestrantesForm";
import Usuarios from "./pages/Usuarios";
import UsuariosForm from "./pages/UsuariosForm";

import AtividadesForm from "./pages/AtividadesForm";

// Componente simples para proteger rotas privadas sem Context API
function RotaPrivada({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const isVisitante = sessionStorage.getItem("modo_visitante") === "true";

    fetch("http://localhost:3000/api/auth/me", {
      credentials: "include"
    })
      .then((response) => {
        if (!response.ok) throw new Error("Não autenticado");
        setAutenticado(true);
      })
      .catch(() => {
        // Se entrou pelo botão "Acessar sem login", permite a visualização como visitante
        if (isVisitante) {
          setAutenticado(true);
        } else {
          setAutenticado(false);
        }
      });
  }, []);

  if (autenticado === null) {
    return null;
  }

  return autenticado ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/dashboard",
    element: (
      <RotaPrivada>
        <Dashboard />
      </RotaPrivada>
    )
  },
  {
    path: "/eventos",
    element: (
      <RotaPrivada>
        <Eventos />
      </RotaPrivada>
    )
  },
  {
    path: "/eventosform",
    element: (
      <RotaPrivada>
        <EventosForm />
      </RotaPrivada>
    )
  },
  {
    path: "/participantes",
    element: (
      <RotaPrivada>
        <Participantes />
      </RotaPrivada>
    )
  },
  {
    path: "/participantesform",
    element: (
      <RotaPrivada>
        <ParticipantesForm />
      </RotaPrivada>
    )
  },
  {
    path: "/palestrantes",
    element: (
      <RotaPrivada>
        <Palestrantes />
      </RotaPrivada>
    )
  },
  {
    path: "/palestrantesform",
    element: (
      <RotaPrivada>
        <PalestrantesForm />
      </RotaPrivada>
    )
  },
  {
    path: "/usuarios",
    element: (
      <RotaPrivada>
        <Usuarios />
      </RotaPrivada>
    )
  },
  {
    path: "/usuariosform",
    element: (
      <RotaPrivada>
        <UsuariosForm />
      </RotaPrivada>
    )
  },
{
  path: "/atividades",
  element: (
    <RotaPrivada>
      <Atividades />
    </RotaPrivada>
  )
},
{
  path: "/atividades/disponiveis",
  element: (
    <RotaPrivada>
      <Atividades />
    </RotaPrivada>
  )
},
{
  path: "/atividades/cadastrar",
  element: (
    <RotaPrivada>
      <AtividadesForm />
    </RotaPrivada>
  )
},
{
  path: "/minhas-atividades",
  element: (
    <RotaPrivada>
      <Atividades />
    </RotaPrivada>
  )
},
{
    path: "/recuperar-senha",
    element: (
        <RecuperarSenha />
    )
  },
]);

export default router;
