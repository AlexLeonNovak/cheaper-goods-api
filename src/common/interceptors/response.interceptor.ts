import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerResponse } from 'http';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(result => {
        const { statusCode: code, statusMessage: message } = context.switchToHttp().getResponse<ServerResponse>();
        const status = code === 500 ? 'fail' : 'success';
        return {
          code,
          status,
          result,
          ...(message ? { message } : {}),
        };
      }),
    );
  }
}
