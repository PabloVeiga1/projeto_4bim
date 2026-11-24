
import { Router } from "express";
import AtividadeController from "../controllers/AtividadeController.js";

const router = Router();

router.get("/", AtividadeController.listar);
router.get("/:id", AtividadeController.buscarPorId);
router.post("/", AtividadeController.criar);
router.put("/:id", AtividadeController.atualizar);
router.delete("/:id", AtividadeController.excluir);

export default router;
