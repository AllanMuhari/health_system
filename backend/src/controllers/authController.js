import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = catchAsync(async (req, res, next) => {
  const { email, password, role = "doctor" } = req.body;

  // 1) Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return next(new AppError("Email already in use", 400));
  }

  // 2) Create new user (in a real app, you'd hash the password)
  const newUser = await prisma.user.create({
    data: {
      email,
      password, // Note: In production, hash the password with bcrypt
      role,
    },
  });

  // 3) Generate JWT token
  const token = signToken(newUser.id);

  // 4) Send response
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) Check if user exists and password is correct
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // In a real app, you'd compare hashed passwords
  if (!user || user.password !== password) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) Generate JWT token
  const token = signToken(user.id);

  // 4) Send response
  res.status(200).json({
    status: "success",
    token,
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    },
  });
});

// Middleware to protect routes
export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Get token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  // 4) Grant access to protected route
  req.user = currentUser;
  next();
});
