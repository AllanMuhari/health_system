import express from "express";
import { login, register, protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected routes (require valid JWT)
router.use(protect);

export default router;
