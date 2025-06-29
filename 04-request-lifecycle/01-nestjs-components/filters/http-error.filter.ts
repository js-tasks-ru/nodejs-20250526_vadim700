import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { appendFileSync } from "node:fs";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === "object"
          ? (exceptionResponse as any).message || exceptionResponse
          : exceptionResponse;
    } else {
      status = 500;
      message = "Mock error for testing";
    }

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    };

    const { statusCode, timestamp } = errorResponse;
    appendFileSync(
      "errors.log",
      `[${timestamp}] ${statusCode} - ${errorResponse.message}\n`,
    );

    response.status(status);
    response.json(errorResponse);
  }
}
