import { useEffect, useState } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Participantes from "./pages/Participantes";
import ParticipantesForm from "./pages/ParticipantesForm";
<<<<<<< HEAD
import Palestrantes from "./pages/Palestrantes";
import PalestrantesForm from "./pages/PalestrantesForm";
import Usuarios from "./pages/Usuarios";
import UsuariosForm from "./pages/UsuariosForm";
=======
import api from "./services/api";

// Componente simples para proteger rotas privadas sem Context API
function RotaPrivada({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const isVisitante = sessionStorage.getItem("modo_visitante") === "true";

    api("/auth/me")
      .then(() => setAutenticado(true))
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
>>>>>>> 7f82e38 (criei a tela de login / cadastro)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
<<<<<<< HEAD
=======
    path: "/login",
    element: <Login />
  },
  {
>>>>>>> 7f82e38 (criei a tela de login / cadastro)
    path: "/register",
    element: <Register />
  },
  {
    path: "/dashboard",
<<<<<<< HEAD
    element: <Dashboard />
  },
  {
    path: "/participantes",
    element: <Participantes />
  },
  {
    path: "/participantesform",
    element: <ParticipantesForm />
  },
  {
    path: "/palestrantes",
    element: <Palestrantes />
  },
  {
    path: "/palestrantesform",
    element: <PalestrantesForm />
  },
  {
    path: "/usuarios",
    element: <Usuarios />
  },
  {
    path: "/usuariosform",
    element: <UsuariosForm />
=======
    element: (
      <RotaPrivada>
        <Dashboard />
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
>>>>>>> 7f82e38 (criei a tela de login / cadastro)
  }
]);

export default router;
