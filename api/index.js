import "dotenv/config"; // Carrega as variaveis de ambiente
import express from "express";
import clientRoutes from "./routes/clients.js";
import cors from "cors";

const app = express();

// Middleware para converter o corpo das requisições em formato JSON
app.use(express.json());

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Configuração das rotas para os clientes
app.use("/api/", clientRoutes);

// Inicia o servidor na porta 8800
app.listen(8800);
