import express from "express";
import {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  enrollClient,
  getClientEnrollments,
  updateEnrollmentStatus,
} from "../controllers/clientController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllClients).post(createClient);

router.route("/:id").get(getClient).patch(updateClient);

router.post("/:id/enroll", enrollClient);
router.get("/:id/enrollments", getClientEnrollments);
router.patch("/:id/enrollments/:enrollmentId", updateEnrollmentStatus);


export default router;
