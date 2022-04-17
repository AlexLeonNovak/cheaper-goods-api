import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  public readonly password: string;
}
