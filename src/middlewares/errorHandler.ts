import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";

type ErrorSource = {
  path: string | number;
  message: string;
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorSources: ErrorSource[] = [];

  // Zod Validation Error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorSources = err.issues.map((issue) => ({
      path: issue.path[issue.path.length - 1] as string | number,
      message: issue.message,
    }));
  }

  // Prisma Validation Error
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid input data or missing required fields.";
  }

  // Prisma Known Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Unique constraint violation";
        const target = (err.meta?.target as string[]) || ["unknown"];
        errorSources = target.map((field) => ({
          path: field,
          message: `${field} already exists.`,
        }));
        break;

      case "P2025":
        statusCode = 404;
        message = (err.meta?.cause as string) || "Record not found";
        errorSources = [{ path: "", message }];
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
    errorSources: errorSources.length > 0 ? errorSources : undefined,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
};

export default errorHandler;
