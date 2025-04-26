import express from "express";
import {
  getAllPrograms,
  createProgram,
} from "../controllers/programController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllPrograms).post(createProgram);

export default router;
