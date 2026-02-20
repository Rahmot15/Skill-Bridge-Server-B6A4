import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let details: any = null;

  // Prisma Validation Error
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid input data or missing required fields.";
  }

  // Prisma Known Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 400;
        message = "Duplicate value found. This record already exists.";
        details = err.meta?.target;
        break;

      case "P2025":
        statusCode = 404;
        message = "Requested resource not found.";
        break;

      case "P2003":
        statusCode = 400;
        message = "Foreign key constraint failed.";
        break;

      case "P2014":
        statusCode = 400;
        message = "Invalid relation data.";
        break;

      case "P2016":
        statusCode = 400;
        message = "Query interpretation error.";
        break;

      default:
        statusCode = 400;
        message = "Database request error.";
    }
  }

  // Prisma Unknown Error
  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Unknown database error occurred.";
  }

  // Prisma Initialization Error
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Database connection failed.";
  }

  // Prisma Panic Error
  else if (err instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = "Critical database error.";
  }

  // Zod Validation Error
  else if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation failed.";
    details = err.errors;
  }

  // Better Auth Unauthorized
  else if (err.message?.includes("Unauthorized")) {
    statusCode = 401;
    message = "Unauthorized access.";
  }

  // Default Error
  else {
    message = err.message || message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
    details,
  });
};

export default errorHandler;
