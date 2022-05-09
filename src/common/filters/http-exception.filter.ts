import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(HttpException, ValidationException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | ValidationException | Error, host: ArgumentsHost): any {
    console.error(exception);
    const code = exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception.message || 'Internal error';
    const details = exception instanceof ValidationException ? exception.details : [];
    const response = host.switchToHttp().getResponse();

    return response.status(code).json({
      status: code === 500 ? 'fail' : 'error',
      code,
      message,
      details,
    });
  }
}
