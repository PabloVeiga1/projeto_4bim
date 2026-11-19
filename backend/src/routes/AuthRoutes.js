import { Router } from "express";

import AuthController from "../controllers/AuthController.js";
import autenticar from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post("/register", AuthController.registrar);

router.post("/login", AuthController.login);

router.get("/me", autenticar, AuthController.verificarSessao);

router.post("/logout", AuthController.logout);

export default router;
