import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/AuthRoutes.js";
import ParticipanteRoutes from "./routes/ParticipanteRoutes.js";
import InscricaoRoutes from "./routes/InscricaoRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true
}));

app.use("/api/auth", AuthRoutes);
app.use("/api/participantes", ParticipanteRoutes);
app.use("/api/inscricoes", InscricaoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
});
