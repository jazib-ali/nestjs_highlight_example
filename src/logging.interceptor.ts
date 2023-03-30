import { H } from '@highlight-run/node';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const parsed = H.parseHeaders(request.headers)

    const now = Date.now();
    return next
      .handle()
      .pipe(
        catchError(err => {
            H.consumeError(err, parsed?.secureSessionId, parsed?.requestId)
            console.log("consuming error")
            return throwError(() => err);
          }),
      );
  }
}