import { Router } from "express";
import ParticipanteController from "../controllers/Participante.js";
import autenticar from "../middlewares/AuthMiddleware.js";

const router = Router();

router.use(autenticar);

router.get("/", ParticipanteController.listar);
router.get("/:id", ParticipanteController.buscarPorId);
router.post("/", ParticipanteController.criar);
router.put("/:id", ParticipanteController.editar);
router.delete("/:id", ParticipanteController.excluir);

export default router;
