import { Router } from "express";
import PalestranteController from "../controllers/PalestranteController.js";

const router = Router();

router.get("/", PalestranteController.listar);
router.get("/:id", PalestranteController.buscarPorId);
router.post("/", PalestranteController.criar);
router.put("/:id", PalestranteController.atualizar);
router.delete("/:id", PalestranteController.excluir);

export default router;