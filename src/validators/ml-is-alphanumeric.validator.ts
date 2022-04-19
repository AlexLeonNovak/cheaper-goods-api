import {
  isAlphanumeric,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'MLIsAlphanumeric' })
@Injectable()
export class MLIsAlphanumericValidator implements ValidatorConstraintInterface {
  private locales: string[] = ['en-US'];

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `$property must contain only letters in ${validationArguments.constraints.join(', ')} locale(s) and numbers`;
  }

  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const locales = validationArguments.constraints || this.locales;
    for (const locale of locales) {
      console.log(value, locale, isAlphanumeric(value, locale));
      if (isAlphanumeric(value, locale)) {
        return true;
      }
    }
    return false;
  }
}
