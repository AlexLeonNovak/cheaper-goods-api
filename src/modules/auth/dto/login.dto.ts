import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}
