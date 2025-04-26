import app from "./app.js";
import prisma from "./config/db.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(async () => {
    await prisma.$disconnect();
    console.log("Process terminated");
  });
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
});
