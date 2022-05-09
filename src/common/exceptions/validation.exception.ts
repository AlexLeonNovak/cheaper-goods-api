import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  details;

  constructor(details) {
    super('Some of the fields have invalid values', HttpStatus.UNPROCESSABLE_ENTITY);
    this.details = details;
  }
}
