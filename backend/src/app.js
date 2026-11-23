import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API do sistema de autenticação funcionando!"
  });
});

export default app;
