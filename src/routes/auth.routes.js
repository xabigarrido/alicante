import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
  verifyToken2,
} from "../controllers/auth.controller.js";
import { auhtRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatormid.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/auth/verify", verifyToken2);
router.get("/profile", auhtRequired, profile);
export default router;
