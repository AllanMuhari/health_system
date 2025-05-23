import prisma from "../config/db.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllClients = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, search } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const whereClause = search
    ? {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where: whereClause,
      skip,
      take: Number(limit),
      include: {
        programs: {
          include: {
            program: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.client.count({ where: whereClause }),
  ]);

  res.status(200).json({
    status: "success",
    results: total,
    data: {
      clients: clients.map((client) => ({
        ...client,
        programs: client.programs.map((p) => ({
          ...p.program,
          enrollmentDate: p.enrollmentDate,
          status: p.status,
        })),
      })),
    },
  });
});

export const getClient = catchAsync(async (req, res, next) => {
  const client = await prisma.client.findUnique({
    where: { id: req.params.id },
    include: {
      programs: {
        include: {
          program: true,
        },
      },
    },
  });

  if (!client) {
    return next(new AppError("No client found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      client: {
        ...client,
        programs: client.programs.map((p) => ({
          ...p.program,
          enrollmentDate: p.enrollmentDate,
          status: p.status,
        })),
      },
    },
  });
});

export const createClient = catchAsync(async (req, res) => {
  const newClient = await prisma.client.create({
    data: req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      client: newClient,
    },
  });
});

export const updateClient = catchAsync(async (req, res, next) => {
  const updatedClient = await prisma.client.update({
    where: { id: req.params.id },
    data: req.body,
    include: {
      programs: {
        include: {
          program: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      client: {
        ...updatedClient,
        programs: updatedClient.programs.map((p) => ({
          ...p.program,
          enrollmentDate: p.enrollmentDate,
          status: p.status,
        })),
      },
    },
  });
});

export const enrollClient = catchAsync(async (req, res, next) => {
  const { programId, programIds } = req.body;
  const clientId = req.params.id;

  // Handle both single programId or multiple programIds
  const programsToEnroll = programIds || (programId ? [programId] : []);

  if (programsToEnroll.length === 0) {
    return next(new AppError("No programs provided for enrollment", 400));
  }

  // Process all enrollments
  const enrollmentPromises = programsToEnroll.map(async (progId) => {
    // Check if enrollment exists
    const existingEnrollment = await prisma.programEnrollment.findFirst({
      where: {
        clientId,
        programId: progId,
      },
    });

    if (!existingEnrollment) {
      // Create enrollment if it doesn't exist
      return prisma.programEnrollment.create({
        data: {
          clientId,
          programId: progId,
          status: "active",
        },
      });
    }
    return null;
  });

  await Promise.all(enrollmentPromises);

  const updatedClient = await prisma.client.findUnique({
    where: { id: clientId },
    include: {
      programs: {
        include: {
          program: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      client: {
        ...updatedClient,
        programs: updatedClient.programs.map((p) => ({
          ...p.program,
          enrollmentDate: p.enrollmentDate,
          status: p.status,
        })),
      },
    },
  });
});

export const getClientEnrollments = catchAsync(async (req, res, next) => {
  const enrollments = await prisma.programEnrollment.findMany({
    where: { clientId: req.params.id },
    include: {
      program: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      enrollments,
    },
  });
});

export const updateEnrollmentStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const { id, enrollmentId } = req.params;

  const updatedEnrollment = await prisma.programEnrollment.update({
    where: {
      id: enrollmentId,
    },
    data: { status },
    include: {
      program: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      enrollment: updatedEnrollment,
    },
  });
});
