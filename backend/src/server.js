import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/AuthRoutes.js";
import ParticipanteRoutes from "./routes/ParticipanteRoutes.js";
import EventoRoutes from "./routes/EventoRoutes.js";
import AtividadeRoutes from "./routes/AtividadeRoutes.js";
import PalestranteRoutes from "./routes/PalestranteRoutes.js";
import UsuarioRoutes from "./routes/UsuarioRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const origensPermitidas = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: origensPermitidas,
  credentials: true
}));

app.use("/api/auth", AuthRoutes);
app.use("/api/participantes", ParticipanteRoutes);
app.use("/api/eventos", EventoRoutes);
app.use("/api/atividades", AtividadeRoutes);
app.use("/api/palestrantes", PalestranteRoutes);
app.use("/api/usuarios", UsuarioRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
});