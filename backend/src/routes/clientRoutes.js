import express from "express";
import {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  enrollClient,
} from "../controllers/clientController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllClients).post(createClient);

router.route("/:id").get(getClient).patch(updateClient);

router.post("/:id/enroll", enrollClient);

export default router;
