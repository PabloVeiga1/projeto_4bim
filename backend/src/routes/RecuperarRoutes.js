import { Router } from "express";
import RecuperarSenhaController from "../controllers/RecuperarSenhaController.js";
const router = Router();

router.post("/", RecuperarSenhaController.alterarSenha);

export default router;
