import { Router } from "express";
import InscricaoController from "../controllers/InscricaoController.js";
import autenticar from "../middlewares/AuthMiddleware.js";

const router = Router();

router.use(autenticar);
router.get("/", InscricaoController.listar);
router.get("/opcoes", InscricaoController.listarOpcoes);
router.get("/:id", InscricaoController.buscarPorId);
router.post("/", InscricaoController.criar);
router.put("/:id", InscricaoController.editar);
router.delete("/:id", InscricaoController.excluir);

export default router;
