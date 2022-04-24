import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';

@ValidatorConstraint({ name: 'isUserExist', async: true })
@Injectable()
export class IsUserExistValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    console.log(validationArguments);
    return 'The ($value) is already exist';
  }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    try {
      const user = await this.userService.findOne({
        [validationArguments.property]: value,
      });
      return !user;
    } catch (e) {
      return true;
    }
  }
}
