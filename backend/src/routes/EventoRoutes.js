
import { Router } from "express";
import EventoController from "../controllers/EventoController.js";

const router = Router();

router.get("/", EventoController.listar);

router.get("/buscar", EventoController.buscarPorNome);

router.get("/:id", EventoController.buscarPorId);

router.post("/", EventoController.criar);

router.put("/:id", EventoController.atualizar);

router.delete("/:id", EventoController.excluir);

export default router;
