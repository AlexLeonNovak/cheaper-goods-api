import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '../exceptions/validation.exception';

/**
 * https://docs.nestjs.com/pipes#class-validator
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.validateMetaType(metatype)) {
      return value;
    }
    const obj = plainToInstance(metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = {};
      errors.map(err => (messages[err.property] = Object.values(err.constraints)));
      throw new ValidationException(messages);
    }
    return value;
  }

  protected validateMetaType(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
