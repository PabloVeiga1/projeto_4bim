import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Participantes from "./pages/Participantes";
import ParticipantesForm from "./pages/ParticipantesForm";
import Palestrantes from "./pages/Palestrantes";
import PalestrantesForm from "./pages/PalestrantesForm";
import Usuarios from "./pages/Usuarios";
import UsuariosForm from "./pages/UsuariosForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/dashboard",
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
  }
]);

export default router;