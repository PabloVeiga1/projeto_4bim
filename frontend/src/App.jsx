import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Participantes from "./pages/Participantes";
import ParticipantesForm from "./pages/ParticipantesForm";

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
        path: "/participantes",
        element: <Participantes/>
    },
    {
        path: "/participantesform",
        element: <ParticipantesForm />
    }
]);

export default router;