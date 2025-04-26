import express from "express";
import morgan from "morgan";
import cors from "cors";
import { swaggerSpec, swaggerUi } from "./utils/swagger.js";
import clientRoutes from "./routes/clientRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import errorHandler from "./middlewares/error.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/programs", programRoutes);

// Error handling
app.use(errorHandler);

export default app;
