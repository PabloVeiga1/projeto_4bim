import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import AuthRoutes from "./routes/AuthRoutes.js";
import EventoRoutes from "./routes/EventoRoutes.js";
import AtividadeRoutes from "./routes/AtividadeRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Rotas de autenticação
app.use("/api/auth", AuthRoutes);
app.use("/api/eventos", EventoRoutes);
app.use("/api/atividades", AtividadeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API do sistema de autenticação funcionando!"
  });
});

export default app;
