
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import conexao from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    const connection = await conexao.getConnection();

    console.log("MySQL conectado com sucesso!");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Erro ao conectar com MySQL:", error.message);
    process.exit(1);
  }
}

iniciarServidor();
