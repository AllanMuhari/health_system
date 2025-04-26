import prisma from "../config/db.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllPrograms = catchAsync(async (req, res) => {
  const programs = await prisma.program.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json({
    status: "success",
    results: programs.length,
    data: {
      programs,
    },
  });
});

export const createProgram = catchAsync(async (req, res) => {
  const newProgram = await prisma.program.create({
    data: req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      program: newProgram,
    },
  });
});
