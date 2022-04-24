import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { IsUserExistValidator } from '../../../common/validators/is-user-exist.validator';
import { UserStatuses } from '../../../common/enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  public readonly firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  public readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsUserExistValidator, {
    message: 'Email already exist',
  })
  @IsEmail({}, { message: 'Email is not valid' })
  public readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsUserExistValidator, {
    message: 'Phone already exist',
  })
  @Matches(/(([\d+ ()-]+){10,20})/, {
    message: 'Phone is not valid',
  })
  public readonly phone: string;

  @ApiProperty()
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

  @ApiProperty({ required: false })
  @IsOptional()
  public readonly status: UserStatuses;
}
