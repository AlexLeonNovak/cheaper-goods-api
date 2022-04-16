import { IsEnum, IsOptional, IsString, Matches, MinLength, ValidateIf } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';
import { UserStatuses } from '../../../enums/user.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public readonly firstName: string;

  @IsString()
  // @IsAlphanumeric()
  @IsOptional()
  public readonly lastName: string;

  @IsOptional()
  @MinLength(8)
  @Matches(/[a-zA-Z]+/, {
    message: 'Password must include at least one letter',
  })
  @Matches(/[0-9]+/, {
    message: 'Password must include at least one number',
  })
  public readonly newPassword: string;

  @ValidateIf(o => o.password !== '')
  @Match('newPassword', { message: 'Password confirmation must match the password' })
  public readonly confirmNewPassword: string;

  @IsOptional()
  @IsEnum(UserStatuses, { each: true, message: 'Status not correct' })
  public readonly status: UserStatuses;
}
