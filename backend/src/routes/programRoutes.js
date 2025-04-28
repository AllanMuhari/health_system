import express from "express";
import {
  getAllPrograms,
  createProgram,
  getProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllPrograms).post(createProgram);

router.route("/:id").get(getProgram).patch(updateProgram).delete(deleteProgram);

export default router;
