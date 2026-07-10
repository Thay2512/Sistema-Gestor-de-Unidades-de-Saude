import { Router } from "express";
import { AuthController } from "../controller/auth.controller";


const router = Router();

const authController =
  new AuthController();

router.post("/create",authController.create);
router.post("/login", authController.login);
router.post("/logout",authController.logout);

export {router as authRoutes};