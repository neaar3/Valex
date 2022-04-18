import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const serviceErrorToStatusCode = {
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
};

export function unauthorizedError(entity: string) {
  return { 
    type: "unauthorized",
    message: `You don't have permission to do this, chek your "${entity}"!` 
  };
}

export function forbiddenError(entity: string) {
  return { 
    type: "forbidden",
    message: `You don't have permission to do this, chek your "${entity}"!` 
  };
}

export function notFoundError(entity: string) {
  return { 
    type: "notFound",
    message: `Could not find specified "${entity}"!` 
  };
}

export function conflictError(entity: string) {
  return { 
    type: "conflict",
    message: `The specified "${entity}" already exists!` 
  };
}

export default function handleErrorsMiddleware(err , req: Request, res: Response, next: NextFunction) {
  if (err.type) {
    return res.status(serviceErrorToStatusCode[err.type]).send(err.message);
  }

  res.sendStatus(500);
}
