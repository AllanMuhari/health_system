import express from "express";
import {
  getAllPrograms,
  createProgram,
  deleteProgram,
} from "../controllers/programController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllPrograms).post(createProgram).delete(deleteProgram);

export default router;
