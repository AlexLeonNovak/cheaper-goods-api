import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  messages;

  constructor(messages) {
    super(messages, HttpStatus.UNPROCESSABLE_ENTITY);
    this.messages = messages;
  }
}
