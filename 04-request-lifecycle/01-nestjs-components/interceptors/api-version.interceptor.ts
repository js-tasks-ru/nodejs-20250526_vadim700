import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";

import { map, Observable } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    let start = Date.now();

    return next.handle().pipe(
      map((data) => ({
        ...data,
        apiVersion: "1.0",
        executionTime: `${Date.now() - start}ms`,
      })),
    );
  }