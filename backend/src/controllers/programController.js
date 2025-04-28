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

export const getProgram = catchAsync(async (req, res, next) => {
  const program = await prisma.program.findUnique({
    where: { id: req.params.id },
    include: {
      clients: {
        include: {
          client: true,
        },
      },
    },
  });

  if (!program) {
    return next(new AppError('No program found with that ID', 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      program: {
        ...program,
        clients: program.clients.map((c) => ({
          ...c.client,
          enrollmentDate: c.enrollmentDate,
          status: c.status,
        })),
      },
    },
  });
});

export const updateProgram = catchAsync(async (req, res, next) => {
  const updatedProgram = await prisma.program.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.status(200).json({
    status: "success",
    data: {
      program: updatedProgram,
    },
  });
});

export const deleteProgram = catchAsync(async (req, res, next) => {
  await prisma.program.delete({
    where: { id: req.params.id },
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
