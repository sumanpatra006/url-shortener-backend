export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      sucess: false,
    });
  }
  console.log(err)
  res.status(500).json({ 
    message: err.message || "internal server error",
    sucess : false
});
};

export class AppError extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError{
    constructor(message = "Resource not found"){
        super(message,404)
    }
}

export class ConflictError extends AppError{
    constructor(message = "Conflict occurred"){
        super(message,409)
    }
}

export class BadRequestError extends AppError{
    constructor(message = "Bad request"){
        super(message,400)
    }
}