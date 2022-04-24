import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { IsUserExistValidator } from '../../../common/validators/is-user-exist.validator';
import { UserStatuses } from '../../../common/enums/user.enum';

// import { Match } from '../../../decorators/match.decorator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  public readonly firstName: string;

  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  public readonly lastName: string;

  @IsNotEmpty()
  @Validate(IsUserExistValidator, {
    message: 'Email already exist',
  })
  @IsEmail({}, { message: 'Email is not valid' })
  public readonly email: string;

  @IsNotEmpty()
  @Validate(IsUserExistValidator, {
    message: 'Phone already exist',
  })
  @Matches(/(([\d+ ()-]+){10,20})/, {
    message: 'Phone is not valid',
  })
  public readonly phone: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[a-zA-Z]+/, {
    message: 'Password must include at least one letter',
  })
  @Matches(/\d+/, {
    message: 'Password must include at least one number',
  })
  public readonly password: string;

  // @IsNotEmpty()
  // @Match('password', {
  //   message: 'Password confirmation must match the password',
  // })
  // public readonly confirmPassword: string;

  @IsOptional()
  @IsEnum(UserStatuses, { each: true, message: 'Status not correct' })
  public readonly status: UserStatuses = UserStatuses.NEW;
}
