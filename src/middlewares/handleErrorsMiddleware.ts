import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const serviceErrorToStatusCode = {
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
};

export function unauthorizedError() {
  return { 
    type: "unauthorized",
    
  };
}

export function forbiddenError() {
  return { type: "forbidden" };
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
